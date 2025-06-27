// src/app/sitemap.xml/route.ts
import { NextResponse } from 'next/server';
import { blogPosts } from '@/constants/blogData';

const BASE_URL = 'https://roalmobileri.com';

/** Escape characters that break XML (<, >, &, ") */
function escapeXml(str: string) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

/** Build <url>…</url> blocks with sensible defaults */
function buildUrlNode(loc: string, changefreq = 'weekly', priority = '0.8') {
  return `
  <url>
    <loc>${escapeXml(loc)}</loc>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
}

export async function GET() {
  /* ---------- 1. Assemble paths ---------------------------------- */
  const staticPaths = ['', 'about', 'services', 'instagram', 'contact'];

  const blogPaths = blogPosts.flatMap((post) => [
    `blog/${post.slug}/en`,
    `blog/${post.slug}/sq`,
  ]);

  const paths = [...staticPaths, ...blogPaths];

  /* ---------- 2. Generate XML ------------------------------------ */
  const urlNodes = paths
    .map((p) =>
      buildUrlNode(
        `${BASE_URL}/${p}`,
        p === '' ? 'daily' : 'weekly',
        p === '' ? '1.0' : p.startsWith('blog') ? '0.7' : '0.9',
      ),
    )
    .join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlNodes}
</urlset>`;

  /* ---------- 3. Return the response ----------------------------- */
  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
      // Cache for 24 h, allow stale while revalidating for 60 s
      'Cache-Control': 'public, max-age=86400, stale-while-revalidate=60',
    },
  });
}