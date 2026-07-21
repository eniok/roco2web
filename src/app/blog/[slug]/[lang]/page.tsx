/* eslint-disable @typescript-eslint/no-explicit-any */

import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import parse from 'html-react-parser';
import Script from 'next/script';
import { ArrowLeft, ArrowUpRight, Share2 } from 'lucide-react';

import { collection, doc, getDoc, getDocs } from 'firebase/firestore/lite';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import { BlogPost, Lang } from '@/constants/blogData';
import { db } from '@/lib/firebase/firestore';

const SITE_URL = 'https://roal.design';
const BRAND = 'ROAL Mobileri';

function readingTime(html: string): number {
  const text = html.replace(/<[^>]*>/g, '');
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

function normalizeSlug<T extends Partial<BlogPost>>(data: T, id: string): BlogPost {
  return { ...data, slug: (data as any).slug ?? id } as BlogPost;
}

async function getBlogPost(slug: string): Promise<BlogPost | null> {
  const snap = await getDoc(doc(db, 'blogPosts', slug));
  if (!snap.exists()) return null;
  return normalizeSlug(snap.data() as Partial<BlogPost>, snap.id);
}

async function getAllPosts(): Promise<BlogPost[]> {
  const snap = await getDocs(collection(db, 'blogPosts'));
  return snap.docs.map((d) => normalizeSlug(d.data() as Partial<BlogPost>, d.id));
}

async function getPublicImageUrl(imageUrl: string): Promise<string> {
  if (imageUrl.startsWith('http')) return imageUrl;

  if (imageUrl.includes('firebase') || imageUrl.includes('googleapis')) {
    try {
      const storage = getStorage();
      return await getDownloadURL(ref(storage, imageUrl));
    } catch (error) {
      console.warn('Failed to get Firebase Storage URL:', error);
    }
  }

  if (imageUrl.startsWith('/')) return `${SITE_URL}${imageUrl}`;
  return `${SITE_URL}/images/${imageUrl}`;
}

function generateStructuredData(post: BlogPost, lang: Lang, publicImageUrl: string) {
  const postUrl = `${SITE_URL}/blog/${post.slug}/${lang}`;

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.titles[lang],
    description: post.excerpts[lang],
    image: publicImageUrl,
    author: { '@type': 'Person', name: post.authors[lang] },
    publisher: {
      '@type': 'Organization',
      name: BRAND,
      logo: { '@type': 'ImageObject', url: `${SITE_URL}/logo.png` },
    },
    // Prefer the ISO timestamp (valid schema.org Date); locale strings like
    // "9 Janar 2025" are not parseable by search engines.
    datePublished: (post as any).publishedAt || post.dates[lang],
    dateModified: (post as any).updatedAt || (post as any).publishedAt || post.dates[lang],
    mainEntityOfPage: { '@type': 'WebPage', '@id': postUrl },
    url: postUrl,
    inLanguage: lang === 'sq' ? 'sq' : 'en',
    isAccessibleForFree: true,
    articleSection: 'Furniture Design',
    keywords:
      post.seo?.keywords || 'mobileri me porosi, kuzhina me masë, dizajn interieri',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: lang === 'sq' ? 'Kreu' : 'Home',
          item: SITE_URL,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Blog',
          item: `${SITE_URL}/blog`,
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: post.titles[lang],
          item: postUrl,
        },
      ],
    },
  };
}

function sortByDateDesc(posts: BlogPost[], lang: Lang) {
  return [...posts].sort(
    (a, b) => new Date(b.dates[lang]).getTime() - new Date(a.dates[lang]).getTime(),
  );
}

async function getNextPosts(currentSlug: string, lang: Lang, count = 3): Promise<BlogPost[]> {
  const posts = await getAllPosts();
  return sortByDateDesc(posts, lang)
    .filter((p) => p.slug !== currentSlug)
    .slice(0, count);
}

export async function generateStaticParams() {
  // Prebuild every post in both languages. If Firestore is unreachable at build
  // time, fall back to [] so the build never fails — posts still render on demand
  // (dynamicParams defaults to true) and get cached via `revalidate`.
  const posts = await getAllPosts().catch(() => [] as BlogPost[]);
  return (['en', 'sq'] as Lang[]).flatMap((lang) =>
    posts.map((p) => ({ slug: p.slug, lang })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; lang: Lang }>;
}): Promise<Metadata> {
  const { slug, lang } = await params;
  const post = await getBlogPost(slug);
  if (!post) return {};

  const seo = post.seo;
  const baseUrl = new URL(SITE_URL);
  const canonicalPath = `/blog/${slug}/${lang}`;
  const selfUrl = `${baseUrl.origin}${canonicalPath}`;
  // Honor a CMS-provided canonical only when it matches THIS language AND this
  // origin; otherwise self-canonicalize. A post-level canonicalUrl hardcoded to
  // the /sq variant would make the /en page disown itself toward /sq, and one
  // pointing at a foreign domain (legacy roalmobileri.com data) would disown the
  // page from the site entirely.
  const canonicalUrl =
    seo?.canonicalUrl &&
    seo.canonicalUrl.startsWith(SITE_URL) &&
    seo.canonicalUrl.endsWith(`/${lang}`)
      ? seo.canonicalUrl
      : selfUrl;

  const imageUrl = seo?.ogImage || post.imageUrl;
  const publicImageUrl = await getPublicImageUrl(imageUrl);

  // The root layout applies the `%s | ROAL Mobileri` template, so the document
  // <title> must NOT already include the brand. Use the bare post title (template
  // appends the brand once); a CMS-provided metaTitle is treated as complete and
  // bypasses the template via `absolute`. OG/Twitter titles don't go through the
  // template, so they carry the brand explicitly.
  const titleText = post.titles[lang];
  const socialTitle = seo?.ogTitle || seo?.metaTitle || `${titleText} | ${BRAND}`;
  const description = seo?.metaDescription || post.excerpts[lang];

  return {
    metadataBase: baseUrl,
    title: seo?.metaTitle ? { absolute: seo.metaTitle } : titleText,
    description,
    keywords:
      seo?.keywords?.split(',').map((k) => k.trim()) || [
        'mobileri me porosi',
        'kuzhina me masë',
        'garderoba me porosi',
        'dizajn interieri',
        'mobileri Tiranë',
        'ROAL Mobileri',
      ],
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'sq-AL': `/blog/${slug}/sq`,
        'en-AL': `/blog/${slug}/en`,
      },
    },
    openGraph: {
      title: socialTitle,
      description: seo?.ogDescription || description,
      url: seo?.ogUrl && seo.ogUrl.startsWith(SITE_URL) ? seo.ogUrl : canonicalUrl,
      type: seo?.ogType || 'article',
      images: [
        {
          url: publicImageUrl,
          width: 1200,
          height: 630,
          alt: post.titles[lang],
        },
      ],
      locale: lang === 'sq' ? 'sq_AL' : 'en_US',
      siteName: BRAND,
      publishedTime: post.dates[lang],
      authors: [post.authors[lang]],
      tags: seo?.keywords?.split(',').map((k) => k.trim()) || [],
    },
    twitter: {
      card: 'summary_large_image',
      title: socialTitle,
      description: seo?.ogDescription || description,
      images: [{ url: publicImageUrl, alt: post.titles[lang] }],
      site: '@roalmobileri',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    other: {
      'article:published_time': post.dates[lang],
      'article:author': post.authors[lang],
      'article:section': 'Furniture Design',
      'article:tag': seo?.keywords?.split(',').map((k) => k.trim()) || [],
    },
  };
}

export const revalidate = 3600;

export default async function BlogPage({
  params,
}: {
  params: Promise<{ slug: string; lang: Lang }>;
}) {
  const { slug, lang } = await params;
  const post = await getBlogPost(slug);
  if (!post) return notFound();

  const suggestions = await getNextPosts(slug, lang);

  const { titles, authors, dates, content, imageUrl } = post;
  const title = titles[lang];
  const author = authors[lang];
  const date = dates[lang];
  const rawHtml = content[lang];
  const mins = readingTime(rawHtml);

  const cleaned = rawHtml
    .replace(/\[oaicite:\d+][^]*?}/g, '')
    .replace(/className\s*=\s*"/g, 'class="');

  const shareUrl = `${SITE_URL}/blog/${slug}/${lang}`;
  const publicImageUrl = await getPublicImageUrl(imageUrl);
  const structuredData = generateStructuredData(post, lang, publicImageUrl);

  const t = {
    home: lang === 'sq' ? 'Kreu' : 'Home',
    blog: 'Blog',
    minRead: lang === 'sq' ? 'min lexim' : 'min read',
    related: lang === 'sq' ? 'Shkrime të tjera' : 'You might also like',
    backToBlog: lang === 'sq' ? 'Kthehu te blogu' : 'Back to blog',
    share: lang === 'sq' ? 'Ndaje' : 'Share',
  };

  return (
    <>
      <Script
        id="structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <main id="main-content" className="relative bg-[#FAF8F4] text-[#15130F]">
      <article>
        <div className="mx-auto max-w-3xl px-6 pt-32 sm:px-8 sm:pt-40">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-10">
            <ol className="flex flex-wrap items-center gap-x-2 text-xs uppercase tracking-[0.18em] text-[#15130F]/55">
              <li>
                <Link href="/" className="hover:text-[#8B4A2E] transition-colors">
                  {t.home}
                </Link>
              </li>
              <li aria-hidden="true">·</li>
              <li>
                <Link
                  href="/blog"
                  className="hover:text-[#8B4A2E] transition-colors"
                >
                  {t.blog}
                </Link>
              </li>
              <li aria-hidden="true">·</li>
              <li className="text-[#8B4A2E] normal-case tracking-normal" aria-current="page">
                <span className="line-clamp-1 max-w-[60vw]">{title}</span>
              </li>
            </ol>
          </nav>

          {/* Header */}
          <header>
            <p className="text-xs uppercase tracking-[0.18em] text-[#15130F]/55">
              <time dateTime={date}>{date}</time>
              <span className="mx-2">·</span>
              {author}
              <span className="mx-2">·</span>
              {mins} {t.minRead}
            </p>
            <h1
              className="mt-4 text-balance font-serif font-normal leading-[1.05] tracking-tight"
              style={{
                fontFamily: 'var(--font-fraunces), Georgia, serif',
                fontSize: 'clamp(2rem, 5vw, 3.6rem)',
              }}
            >
              {title}
            </h1>
          </header>
        </div>

        {/* Full-width hero image */}
        <div className="mx-auto mt-12 max-w-5xl px-6 sm:px-8">
          <div className="relative overflow-hidden bg-[#E8E3DB]" style={{ aspectRatio: '16 / 9' }}>
            <img
              src={imageUrl}
              alt={title}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        {/* Content */}
        <div className="mx-auto mt-12 max-w-2xl px-6 pb-20 sm:px-8">
          <div
            className="prose prose-lg max-w-none
              prose-headings:font-serif prose-headings:font-normal prose-headings:tracking-tight
              prose-h2:text-[1.75rem] prose-h3:text-xl
              prose-p:text-[#3A352C] prose-p:leading-relaxed
              prose-a:text-[#8B4A2E] prose-a:no-underline hover:prose-a:underline
              prose-strong:text-[#15130F]
              prose-blockquote:border-l-[#8B4A2E] prose-blockquote:text-[#3A352C]
              prose-img:rounded-none"
            style={{ ['--tw-prose-headings' as any]: '#15130F' }}
          >
            {parse(cleaned)}
          </div>
        </div>

        {/* Suggestions */}
        {suggestions.length > 0 && (
          <section className="border-t border-[#15130F]/15 bg-[#FAF8F4]">
            <div className="mx-auto max-w-6xl px-6 py-20 sm:px-8 sm:py-24">
              <h2
                className="text-balance font-serif font-normal leading-[1.1] tracking-tight"
                style={{
                  fontFamily: 'var(--font-fraunces), Georgia, serif',
                  fontSize: 'clamp(1.6rem, 3.2vw, 2.4rem)',
                }}
              >
                {t.related}
              </h2>

              <ul
                role="list"
                className="mt-10 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3"
              >
                {suggestions.map((s) => (
                  <li key={s.slug}>
                    <Link
                      href={`/blog/${s.slug}/${lang}`}
                      className="group block focus:outline-none"
                    >
                      <div
                        className="relative overflow-hidden bg-[#E8E3DB]"
                        style={{ aspectRatio: '4 / 5' }}
                      >
                        <img
                          src={s.imageUrl}
                          alt={s.titles[lang]}
                          loading="lazy"
                          decoding="async"
                          className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.03]"
                        />
                      </div>
                      <div className="mt-5">
                        <p className="text-xs uppercase tracking-[0.18em] text-[#15130F]/55">
                          {s.dates[lang]} · {s.authors[lang]}
                        </p>
                        <h3
                          className="mt-3 text-balance font-serif text-xl font-normal leading-snug tracking-tight text-[#15130F] transition-colors group-hover:text-[#8B4A2E] sm:text-2xl"
                          style={{ fontFamily: 'var(--font-fraunces), Georgia, serif' }}
                        >
                          {s.titles[lang]}
                        </h3>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {/* Footer: back + share */}
        <div className="border-t border-[#15130F]/15">
          <div className="mx-auto flex max-w-3xl flex-col items-start gap-6 px-6 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-8">
            <Link
              href="/blog"
              className="group inline-flex items-center gap-2 text-sm font-medium text-[#15130F] underline-offset-[6px] hover:underline"
            >
              <ArrowLeft
                className="h-4 w-4 transition-transform group-hover:-translate-x-0.5"
                aria-hidden="true"
              />
              {t.backToBlog}
            </Link>

            <div className="flex items-center gap-2 text-sm">
              <Share2 className="h-4 w-4 text-[#15130F]/60" aria-hidden="true" />
              <span className="text-[#15130F]/60">{t.share}</span>
              <Link
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-1 inline-flex items-center gap-1 text-[#15130F] hover:text-[#8B4A2E]"
              >
                Facebook
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>
              <Link
                href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(title)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[#15130F] hover:text-[#8B4A2E]"
              >
                X
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </article>
      </main>
    </>
  );
}
