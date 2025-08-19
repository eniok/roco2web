export const dynamic        = 'force-dynamic'; 

/* eslint-disable @typescript-eslint/no-explicit-any */

/* -------------------------------------------------------------------------- */
/*  ⛳  BLOG POST PAGE  (ISR + i18n)                                           */
/* -------------------------------------------------------------------------- */

import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import parse from 'html-react-parser';
import Script from 'next/script';
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ShareIcon,
} from '@heroicons/react/24/solid';

import { collection, doc, getDoc, getDocs } from 'firebase/firestore/lite';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import { BlogPost, Lang } from '@/constants/blogData';
import { db } from '@/lib/firebase/firestore';

/* -------------------------------------------------------------------------- */
/* -------------------------------------------------------------------------- */

function readingTime(html: string): number {
  const text  = html.replace(/<[^>]*>/g, '');
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

function normalizeSlug<T extends Partial<BlogPost>>(data: T, id: string): BlogPost {
  return { ...data, slug: (data as any).slug ?? id } as BlogPost;
}

async function getBlogPost(slug: string): Promise<BlogPost | null> {
  const snap = await getDoc(doc(db, 'blogPosts', slug));
  if (!snap.exists()) return null;

  const data = snap.data() as Partial<BlogPost>;
  return normalizeSlug(data, snap.id);
}

async function getAllPosts(): Promise<BlogPost[]> {
  const snap = await getDocs(collection(db, 'blogPosts'));
  return snap.docs.map(d => normalizeSlug(d.data() as Partial<BlogPost>, d.id));
}

// Utility function to get public image URL for Open Graph
async function getPublicImageUrl(imageUrl: string): Promise<string> {
  const baseUrl = 'https://roal.design';
  
  // If it's already a full URL, return it
  if (imageUrl.startsWith('http')) {
    return imageUrl;
  }
  
  // If it's a Firebase Storage path, try to get the download URL
  if (imageUrl.includes('firebase') || imageUrl.includes('googleapis')) {
    try {
      const storage = getStorage();
      const url = await getDownloadURL(ref(storage, imageUrl));
      return url;
    } catch (error) {
      console.warn('Failed to get Firebase Storage URL:', error);
    }
  }
  
  // If it's a relative path, make it absolute
  if (imageUrl.startsWith('/')) {
    return `${baseUrl}${imageUrl}`;
  }
  
  // Default fallback
  return `${baseUrl}/images/${imageUrl}`;
}

// Generate structured data for the blog post
function generateStructuredData(post: BlogPost, lang: Lang, publicImageUrl: string) {
  const baseUrl = 'https://roal.design';
  const postUrl = `${baseUrl}/blog/${post.slug}/${lang}`;
  
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.titles[lang],
    description: post.excerpts[lang],
    image: publicImageUrl,
    author: {
      '@type': 'Person',
      name: post.authors[lang],
    },
    publisher: {
      '@type': 'Organization',
      name: 'RO-AL Mobileri',
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/logo.png`,
      },
    },
    datePublished: post.dates[lang],
    dateModified: post.dates[lang], // You might want to add a modified date field
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': postUrl,
    },
    url: postUrl,
    inLanguage: lang === 'sq' ? 'sq' : 'en',
    isAccessibleForFree: true,
    articleSection: 'Furniture Design',
    keywords: post.seo?.keywords || 'furniture design, interior design, custom furniture',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: lang === 'sq' ? 'Kryesore' : 'Home',
          item: baseUrl,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Blog',
          item: `${baseUrl}/blog`,
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

  return structuredData;
}

function sortByDateDesc(posts: BlogPost[], lang: Lang) {
  return [...posts].sort(
    (a, b) =>
      new Date(b.dates[lang]).getTime() - new Date(a.dates[lang]).getTime()
  );
}

async function getNextPosts(
  currentSlug: string,
  lang: Lang,
  count = 3
): Promise<BlogPost[]> {
  const posts = await getAllPosts();
  return sortByDateDesc(posts, lang)
    .filter(p => p.slug !== currentSlug)
    .slice(0, count);
}

/* -------------------------------------------------------------------------- */
/* Static params for SSG/ISR                                                  */
/* -------------------------------------------------------------------------- */
export async function generateStaticParams() {
  const posts = await getAllPosts();
  return (['en', 'sq'] as Lang[]).flatMap(lang =>
    posts.map(p => ({ slug: p.slug, lang }))
  );
}

/* -------------------------------------------------------------------------- */
/* Metadata                                                                   */
/* -------------------------------------------------------------------------- */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; lang: Lang }>;
}): Promise<Metadata> {
  const { slug, lang } = await params;
  const post = await getBlogPost(slug);
  if (!post) return {};

  const seo     = post.seo;
  const baseUrl = new URL('https://roal.design');

  const canonicalPath = `/blog/${slug}/${lang}`;
  const canonicalUrl  = seo?.canonicalUrl || `${baseUrl.origin}${canonicalPath}`;

  // Get the appropriate image URL for Open Graph
  const imageUrl = seo?.ogImage || post.imageUrl;
  const publicImageUrl = await getPublicImageUrl(imageUrl);

  // Enhanced title with brand name
  const title = seo?.metaTitle || `${post.titles[lang]} | RO-AL Mobileri`;
  const description = seo?.metaDescription || post.excerpts[lang];

  return {
    metadataBase: baseUrl,
    title,
    description,
    keywords: seo?.keywords?.split(',').map(k => k.trim()) || [
      'furniture design',
      'interior design',
      'custom furniture',
      'Albania furniture',
      'modern furniture',
      'home design',
      'furniture blog',
      lang === 'sq' ? 'mobilje shqiptare' : 'Albanian furniture'
    ],
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en-US': `/blog/${slug}/en`,
        'sq-AL': `/blog/${slug}/sq`,
      },
    },
    openGraph: {
      title: seo?.ogTitle || title,
      description: seo?.ogDescription || description,
      url: seo?.ogUrl || canonicalUrl,
      type: seo?.ogType || 'article',
      images: [
        {
          url: publicImageUrl,
          width: 1200,
          height: 630,
          alt: post.titles[lang],
        }
      ],
      locale: lang === 'sq' ? 'sq_AL' : 'en_US',
      siteName: 'RO-AL Mobileri',
      publishedTime: post.dates[lang],
      authors: [post.authors[lang]],
      tags: seo?.keywords?.split(',').map(k => k.trim()) || [],
    },
    twitter: {
      card: 'summary_large_image',
      title: seo?.ogTitle || title,
      description: seo?.ogDescription || description,
      images: [
        {
          url: publicImageUrl,
          alt: post.titles[lang],
        }
      ],
      creator: '@roaldesign',
      site: '@roaldesign',
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
      'article:tag': seo?.keywords?.split(',').map(k => k.trim()) || [],
    },
  };
}

/* -------------------------------------------------------------------------- */
/* ISR: revalidate every hour                                                 */
/* -------------------------------------------------------------------------- */
export const revalidate = 3600; // seconds

/* -------------------------------------------------------------------------- */
/* Page Component                                                             */
/* -------------------------------------------------------------------------- */
export default async function BlogPage({
  params,
}: {
  params: Promise<{ slug: string; lang: Lang }>;
}) {
  const { slug, lang } = await params;
  const post = await getBlogPost(slug);
  if (!post) return notFound();

  const suggestions = await getNextPosts(slug, lang);

  /* --------------------- Derive per-language fields ---------------------- */
  const { titles, authors, dates, content, imageUrl } = post;
  const title  = titles[lang];
  const author = authors[lang];
  const date   = dates[lang];
  const rawHtml = content[lang];
  const mins    = readingTime(rawHtml);

  /* strip any oaicite placeholders + convert `className` to `class` */
  const cleaned = rawHtml
    .replace(/\[oaicite:\d+][^]*?}/g, '')
    .replace(/className\s*=\s*"/g, 'class="');

  const shareUrl = `https://roal.design/blog/${slug}/${lang}`;
  const publicImageUrl = await getPublicImageUrl(imageUrl);
  const structuredData = generateStructuredData(post, lang, publicImageUrl);

  /* ------------------------ PAGE MARK-UP (server) ------------------------ */
  return (
    <>
      <Script
        id="structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      <article className="relative py-28">
      {/* ---------- Language Toggle ----------- */}
      <div className="absolute right-6 top-6 flex gap-2">
        {(['en', 'sq'] as Lang[]).map(lg => (
          <Link
            key={lg}
            href={`/blog/${slug}/${lg}`}
            className={`rounded-full px-3 py-1 text-sm font-medium transition-colors ${
              lang === lg
                ? 'bg-red-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {lg.toUpperCase()}
          </Link>
        ))}
      </div>

      {/* -------------- Wrapper -------------- */}
      <div className="mx-auto max-w-4xl space-y-10 px-6">
        {/* Breadcrumb Navigation */}
        <nav className="mb-8" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2 text-sm text-gray-600">
            <li>
              <Link href="/" className="hover:text-red-600 transition-colors">
                {lang === 'sq' ? 'Kryesore' : 'Home'}
              </Link>
            </li>
            <li>
              <span className="mx-2">/</span>
            </li>
            <li>
              <Link href={`/blog?lang=${lang}`} className="hover:text-red-600 transition-colors">
                {lang === 'sq' ? 'Blog' : 'Blog'}
              </Link>
            </li>
            <li>
              <span className="mx-2">/</span>
            </li>
            <li className="text-gray-900 font-medium" aria-current="page">
              {title}
            </li>
          </ol>
        </nav>

        {/* Header */}
        <header className="space-y-2 text-center">
          <h1 className="text-4xl font-extrabold md:text-5xl">{title}</h1>
          <p className="text-sm text-gray-500">
            <span className="font-medium">{author}</span>
            <span className="mx-1.5">•</span>
            <time dateTime={date}>{date}</time>
            <span className="mx-1.5">•</span>
            {mins} {lang === 'sq' ? 'min lexim' : 'min read'}
          </p>
        </header>

        {/* Hero Image */}
        <div className="aspect-video overflow-hidden rounded-lg shadow-md">
          {/* Use next/image if remotePatterns are set */}
          <img
            src={imageUrl}
            alt={title}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        </div>

        {/* Article Content */}
        <div className="prose prose-lg max-w-none dark:prose-invert">
          {parse(cleaned)}
        </div>

        {/* Suggested Posts */}
        {suggestions.length > 0 && (
          <section className="mx-auto mt-16 max-w-5xl">
            <h2 className="mb-8 text-center text-2xl font-bold">
              {lang === 'sq' ? 'Artikuj të tjerë' : 'You might also like'}
            </h2>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {suggestions.map(s => (
                <Link
                  key={s.slug}
                  href={`/blog/${s.slug}/${lang}`}
                  className="group relative block overflow-hidden rounded-xl shadow-lg transition-transform hover:scale-[1.03]"
                >
                  <img
                    src={s.imageUrl}
                    alt={s.titles[lang]}
                    className="h-56 w-full object-cover transition-transform group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/10 backdrop-blur-xs transition-opacity group-hover:bg-black/20" />
                  <div className="absolute inset-x-4 bottom-4 flex items-center justify-between text-white">
                    <div>
                      <p className="text-xs opacity-90">{s.authors[lang]}</p>
                      <h3 className="mt-1 text-base font-semibold line-clamp-2">
                        {s.titles[lang]}
                      </h3>
                    </div>
                    <ArrowRightIcon className="h-5 w-5 opacity-80 transition group-hover:translate-x-1" />
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Footer: back + share */}
        <footer className="mt-12 flex flex-col items-center gap-6 border-t pt-6 md:flex-row md:justify-between">
          <Link
            href={`/blog?lang=${lang}`}
            className="inline-flex items-center gap-2 font-medium text-red-600 hover:text-red-800"
          >
            <ArrowLeftIcon className="h-4 w-4" />
            {lang === 'sq' ? 'Kthehu te Blogu' : 'Back to Blog'}
          </Link>

          <div className="flex gap-4">
            <Link
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                shareUrl
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-gray-500 hover:text-gray-700"
            >
              <ShareIcon className="h-4 w-4" />
              Facebook
            </Link>
            <Link
              href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                shareUrl
              )}&text=${encodeURIComponent(title)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-gray-500 hover:text-gray-700"
            >
              <ShareIcon className="h-4 w-4" />
              X
            </Link>
          </div>
        </footer>
      </div>
    </article>
    </>
  );
}
