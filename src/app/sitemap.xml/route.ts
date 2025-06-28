// src/app/sitemap.xml/route.ts
import { getAllBlogPosts } from '@/lib/firebase/firestore'
import { NextResponse } from 'next/server'

const BASE_URL = 'https://roalmobileri.com'

/* -------------------------------------------------------------------------- */
/* Helpers                                                                    */
/* -------------------------------------------------------------------------- */
function escapeXml(str: string) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

function buildUrlNode(
  loc: string,
  changefreq: 'daily' | 'weekly' = 'weekly',
  priority = '0.8',
) {
  return `
  <url>
    <loc>${escapeXml(loc)}</loc>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`
}

/* -------------------------------------------------------------------------- */
/* GET /sitemap.xml → XML response                                             */
/* -------------------------------------------------------------------------- */
export async function GET() {
  /* 1️⃣  Static routes */
  const staticPaths = ['', 'about', 'services', 'instagram', 'contact']

  /* 2️⃣  Dynamic blog routes pulled from Firestore */
  let blogPaths: string[] = []
  try {
    const posts = await getAllBlogPosts() 
    blogPaths = posts.flatMap(p => [
      `blog/${p.slug}/en`,
      `blog/${p.slug}/sq`,
    ])
  } catch (err) {
    console.error('Sitemap: could not fetch Firestore posts', err)
    // Fallback: sitemap without blog URLs so the route still succeeds
  }

  const paths = [...staticPaths, ...blogPaths]

  /* 3️⃣  Build XML <urlset> */
  const urlNodes = paths
    .map(p =>
      buildUrlNode(
        `${BASE_URL}/${p}`,
        p === '' ? 'daily' : 'weekly',
        p === ''
          ? '1.0'
          : p.startsWith('blog')
          ? '0.7'
          : '0.9',
      ),
    )
    .join('')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlNodes}
</urlset>`

  /* 4️⃣  Response */
  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      // Cache for 24 h, allow stale for 60 s while re-validating
      'Cache-Control':
        'public, max-age=86400, stale-while-revalidate=60',
    },
  })
}
