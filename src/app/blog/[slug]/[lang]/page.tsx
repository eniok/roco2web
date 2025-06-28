// src/app/blog/[slug]/[lang]/page.tsx
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { blogPosts } from '@/constants/blogData';
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ShareIcon,
} from '@heroicons/react/24/solid';
import parse from 'html-react-parser';
import { Metadata } from 'next';
/* -------------------------------------------------------------------------- */
/* Types                                                                      */
/* -------------------------------------------------------------------------- */
type Lang = 'en' | 'sq';

/* -------------------------------------------------------------------------- */
/* SEO metadata (single source of truth)                                      */
/* -------------------------------------------------------------------------- */
export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }>}
): Promise<Metadata> {
  const { slug } = await params;
  const lang = 'sq'
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return {};

  const seo = post.seo;
  const baseUrl = new URL('https://roalmobileri.com'); // PROD domain

  // Per-language canonical URL
  const canonicalPath = `/blog/${slug}/${lang}`;
  const canonicalUrl = seo?.canonicalUrl || `${baseUrl.origin}${canonicalPath}`;

  return {
    /* For absolute URLs in <link rel="canonical">, OG images, etc. */
    metadataBase: baseUrl,

    /* <title> and <meta name="description"> */
    title: seo?.metaTitle || post.titles[lang],
    description: seo?.metaDescription || post.excerpts[lang],

    /* <meta name="keywords"> */
    keywords: seo?.keywords
      ? seo.keywords.split(',').map((k) => k.trim())
      : undefined,

    /* Canonical + hreflang alternates */
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en-US': `/blog/${slug}/en`,
        'sq-AL': `/blog/${slug}/sq`,
      },
    },

    /* Open Graph */
    openGraph: {
      title: seo?.ogTitle || post.titles[lang],
      description: seo?.ogDescription || post.excerpts[lang],
      url: seo?.ogUrl || canonicalUrl,
      type: seo?.ogType || 'article',
      images: [seo?.ogImage || post.imageUrl],
      locale: lang === 'sq' ? 'sq_AL' : 'en_US',
    },

    /* Twitter Card */
    twitter: {
      card: 'summary_large_image',
      title: seo?.ogTitle || post.titles[lang],
      description: seo?.ogDescription || post.excerpts[lang],
      images: [seo?.ogImage || post.imageUrl],
    },

    /* Robots */
    robots: { index: true, follow: true },
  };
}

/* -------------------------------------------------------------------------- */
/* Helpers                                                                    */
/* -------------------------------------------------------------------------- */
/** Estimate reading time in minutes (≈ 200 WPM). */
function readingTime(html: string): number {
  const text = html.replace(/<[^>]*>/g, '');
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

/** Get the next *n* posts, excluding the current one. */
function getNextPosts(currentSlug: string, lang: Lang, count = 3) {
  return [...blogPosts]
    .sort(
      (a, b) =>
        new Date(b.dates[lang]).getTime() - new Date(a.dates[lang]).getTime()
    )
    .filter((p) => p.slug !== currentSlug)
    .slice(0, count);
}

/* -------------------------------------------------------------------------- */
/* Static Params → /blog/[slug]/[lang]                                        */
/* -------------------------------------------------------------------------- */
export const generateStaticParams = () =>
  (['en', 'sq'] as Lang[]).flatMap((lang) =>
    blogPosts.map((post) => ({ slug: post.slug, lang }))
  );

/* -------------------------------------------------------------------------- */
/* Page Component (Server)                                                    */
/* -------------------------------------------------------------------------- */

// Page Component (Server)
export default async function Localized(
{ params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const lang = 'sq'
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return notFound();

  const suggestions = getNextPosts(slug, lang);

  const title = post.titles[lang];
  const author = post.authors[lang];
  const date = post.dates[lang];
  const rawHtml = post.content[lang];
  const mins = readingTime(rawHtml);

  // Clean out any cite markers and convert JSX className to plain class
  const cleaned = rawHtml
    .replace(/\[oaicite:\d+\]\{[^}]*}/g, '')
    .replace(/className\s*=\s*"/g, 'class="');

  const shareUrl = `https://roalmobileri.com/blog/${slug}/${lang}`;

  return (
    <article className="relative py-28">
      {/* ------------------- Language Switcher -------------------- */}
      <div className="absolute right-6 top-6 flex gap-2">
        {(['en', 'sq'] as Lang[]).map((lg) => (
          <Link
            key={lg}
            href={`/blog/${slug}/${lg}`}
            className={`rounded-full px-3 py-1 text-sm font-medium transition-colors duration-150 ${
              lang === lg
                ? 'bg-red-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            aria-label={lg === 'en' ? 'Read in English' : 'Lexo në Shqip'}
          >
            {lg.toUpperCase()}
          </Link>
        ))}
      </div>

      {/* ------------------------- Wrapper ------------------------ */}
      <div className="mx-auto max-w-4xl space-y-10 px-6">
        {/* Header */}
        <header className="space-y-2 text-center">
          <h1 className="text-4xl font-extrabold leading-tight md:text-5xl">
            {title}
          </h1>
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
          <img
            src={post.imageUrl}
            alt={title}
            className="h-full w-full object-cover object-center"
            loading='lazy'
          />
        </div>

        {/* Article Content */}
        <div className="prose prose-lg mx-auto max-w-none dark:prose-invert prose-headings:scroll-mt-24 prose-img:rounded-lg prose-p:leading-relaxed">
          {parse(cleaned)}
        </div>

        {/* ------------------ Suggested Articles ------------------ */}
        {suggestions.length > 0 && (
          <section className="mx-auto mt-16 max-w-5xl">
            <h2 className="mb-8 text-center text-2xl font-bold tracking-tight">
              {lang === 'sq'
                ? 'Artikuj të tjerë'
                : 'You might also like'}
            </h2>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {suggestions.map((s) => (
                <Link
                  key={s.slug}
                  href={`/blog/${s.slug}/${lang}`}
                  className="group relative block overflow-hidden rounded-xl shadow-lg transition-transform duration-300 hover:scale-[1.03]"
                  aria-label={s.titles[lang]}
                >
                  <img
                    src={s.imageUrl}
                    alt={s.titles[lang]}
                    className="h-56 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading='lazy'
                  />
                  <div className="absolute inset-0 bg-black/10 backdrop-blur-xs transition-opacity duration-300 group-hover:bg-black/20" />
                  <div className="absolute inset-x-4 bottom-4 flex items-center justify-between text-white">
                    <div className="text-left">
                      <p className="text-xs opacity-90">{s.authors[lang]}</p>
                      <h3 className="mt-1 text-base font-semibold leading-snug line-clamp-2">
                        {s.titles[lang]}
                      </h3>
                    </div>
                    <ArrowRightIcon className="h-5 w-5 shrink-0 opacity-80 transition group-hover:translate-x-1" />
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* --------------------- Share + Back ---------------------- */}
        <footer className="mt-12 flex flex-col items-center gap-6 border-t pt-6 md:flex-row md:justify-between">
          {/* Back to blog */}
          <Link
            href={`/blog?lang=${lang}`}
            className="inline-flex items-center gap-2 font-medium text-red-600 hover:text-red-800"
            aria-label={lang === 'sq' ? 'Kthehu te Blogu' : 'Back to Blog'}
          >
            <ArrowLeftIcon className="h-4 w-4" />
            {lang === 'sq' ? 'Kthehu te Blogu' : 'Back to Blog'}
          </Link>

          {/* Social share */}
          <div className="flex gap-4">
            <Link
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                shareUrl
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-gray-500 hover:text-gray-700"
              aria-label={lang === 'sq' ? 'Ndaj në Facebook' : 'Share on Facebook'}
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
              aria-label={lang === 'sq' ? 'Ndaj në X' : 'Share on X'}
            >
              <ShareIcon className="h-4 w-4" />
              X
            </Link>
          </div>
        </footer>
      </div>
    </article>
  );
}
