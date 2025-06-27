"use client";

import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import { blogPosts, Lang } from "@/constants/blogData";
import Image from "next/image";

/**
 * Blog list page optimised for portrait‑oriented cover images.
 * ------------------------------------------------------------------
 * Key layout tweaks:
 * 1. Replaced fixed‑height grid cells with a CSS masonry column layout
 *    (Tailwind `columns-*`) so cards flow naturally regardless of image
 *    height.
 * 2. Removed the forced `h-56` wrapper and let the image dictate its own
 *    height while preserving width; vertical images are now fully visible.
 * 3. Switched to `next/image` for automatic optimisation & responsive
 *    sizing.
 * 4. Added `break-inside-avoid` on cards to prevent column breaks.
 * ------------------------------------------------------------------
 */

export default function BlogListPage() {
  return (
    <Suspense fallback={<div>Loading …</div>}>
      <BlogListContent />
    </Suspense>
  );
}

function BlogListContent() {
  const router = useRouter();
  const params = useSearchParams();
  const initial = (params.get("lang") as Lang) || "sq";
  const [lang, setLang] = useState<Lang>(initial);

  // Sort posts by date descending (most recent first)
  const sortedPosts = [...blogPosts].sort((a, b) => {
    const dateA = new Date(a.dates[lang]).getTime();
    const dateB = new Date(b.dates[lang]).getTime();
    return dateB - dateA;
  });

  // On first mount, if no `?lang=` param, detect and patch the URL
  useEffect(() => {
    if (!params.get("lang")) {
      const browser = navigator.language.split("-")[0];
      const detected = browser === "en" ? "en" : "sq";
      setLang(detected);
      router.replace(`/blog?lang=${detected}`, { scroll: false });
    }
  }, [params, router]);

  const switchLang = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const nl = e.target.value as Lang;
    setLang(nl);
    router.push(`/blog?lang=${nl}`);
  };

  return (
    <div className="bg-gray-50 pt-32 pb-20">
      <div className="container mx-auto px-6">
        {/* Language selector */}
        <div className="flex justify-end mb-6">
          <select
            value={lang}
            onChange={switchLang}
            className="border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-400"
          >
            <option value="en">English</option>
            <option value="sq">Shqip</option>
          </select>
        </div>

        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-5xl font-extrabold mb-4">
            {lang === "en" ? "Our Blog" : "Blogu Ynë"}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {lang === "en"
          ? "Browse our blog for inspiring insights on interior design, expert craftsmanship, and sustainable living."
          : "Shfletoni blogun tonë për ide frymëzuese mbi dizajnin e brendshëm, mjeshtërinë artizanale dhe jetesën e qëndrueshme."}
          </p>
        </header>

        {/* Masonry column layout */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-x-8">
          {sortedPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}/${lang}`}
              className="group block mb-8 break-inside-avoid transform transition-transform hover:-translate-y-1"
            >
              <article className="bg-white rounded-2xl shadow-lg hover:shadow-2xl overflow-hidden">
                {/* Responsive portrait‑friendly image */}
                <Image
                  src={post.imageUrl}
                  alt={post.titles[lang]}
                  width={640}
                  height={960}
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="w-full h-auto object-cover"
                  loading="lazy"
                  placeholder="blur"
                  blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nMzAnIGhlaWdodD0nNDUnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Zyc+PGZpbHRlciBpZD0nYic+PGZlVHVyYnVsZW5jZSB0eXBlPSJ0dXJidWxlbmNlIiBiYXNlRnJlcXVlbmN5PScuNScgbnVtT2N0YXZlcz0nMycgbnVtSXRlcmF0aW9ucz0nMycvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPScxMDAlJyBoZWlnaHQ9JzEwMCUnIGZpbHRlcj0ndXJsKCNiKScgY2xpcC1wYXRoPSJ1cmwoI2EpIiBmaWxsPSIjZ2ZnZmZnIi8+PC9zdmc+"
                />

                <div className="p-6 flex flex-col">
                  <h2 className="text-2xl font-semibold mb-2 group-hover:text-red-600">
                    {post.titles[lang]}
                  </h2>
                  <p className="text-gray-500 text-sm mb-4">
                    {post.dates[lang]} &middot; {post.authors[lang]}
                  </p>
                  <p className="text-gray-700 flex-grow line-clamp-4">
                    {post.excerpts[lang]}
                  </p>
                  <span className="mt-6 inline-block font-medium text-red-600">
                    {lang === "en" ? "Read More →" : "Lexo Më Shumë →"}
                  </span>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
