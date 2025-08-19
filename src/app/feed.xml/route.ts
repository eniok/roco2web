import { getAllBlogPosts } from '@/lib/firebase/firestore';
import { NextResponse } from 'next/server';

const BASE_URL = 'https://roal.design';

function escapeXml(str: string) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toUTCString();
}

export async function GET() {
  try {
    const posts = await getAllBlogPosts();
    
    // Sort posts by date (newest first)
    const sortedPosts = posts.sort((a, b) => {
      const dateA = new Date(a.dates.en || a.dates.sq).getTime();
      const dateB = new Date(b.dates.en || b.dates.sq).getTime();
      return dateB - dateA;
    });

    // Take the latest 20 posts
    const recentPosts = sortedPosts.slice(0, 20);

    const rssItems = recentPosts.map(post => {
      const title = post.titles.en || post.titles.sq;
      const description = post.excerpts.en || post.excerpts.sq;
      const author = post.authors.en || post.authors.sq;
      const date = post.dates.en || post.dates.sq;
      const imageUrl = post.imageUrl.startsWith('http') 
        ? post.imageUrl 
        : `${BASE_URL}${post.imageUrl.startsWith('/') ? post.imageUrl : `/${post.imageUrl}`}`;

      return `
  <item>
    <title>${escapeXml(title)}</title>
    <link>${BASE_URL}/blog/${post.slug}/en</link>
    <guid>${BASE_URL}/blog/${post.slug}/en</guid>
    <description><![CDATA[
      <img src="${imageUrl}" alt="${escapeXml(title)}" style="max-width: 100%; height: auto; margin-bottom: 1rem;" />
      <p>${escapeXml(description)}</p>
    ]]></description>
    <author>${escapeXml(author)}</author>
    <pubDate>${formatDate(date)}</pubDate>
    <category>Furniture Design</category>
    <category>Interior Design</category>
  </item>`;
    }).join('');

    const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:wfw="http://wellformedweb.org/CommentAPI/" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:sy="http://purl.org/rss/1.0/modules/syndication/" xmlns:slash="http://purl.org/rss/1.0/modules/slash/">
  <channel>
    <title>RO-AL Mobileri Blog</title>
    <atom:link href="${BASE_URL}/feed.xml" rel="self" type="application/rss+xml" />
    <link>${BASE_URL}/blog</link>
    <description>Latest insights on furniture design, interior inspiration, and custom furniture solutions from RO-AL Mobileri.</description>
    <lastBuildDate>${formatDate(new Date().toISOString())}</lastBuildDate>
    <language>en-US</language>
    <sy:updatePeriod>daily</sy:updatePeriod>
    <sy:updateFrequency>1</sy:updateFrequency>
    <image>
      <url>${BASE_URL}/logo.png</url>
      <title>RO-AL Mobileri Blog</title>
      <link>${BASE_URL}/blog</link>
    </image>${rssItems}
  </channel>
</rss>`;

    return new NextResponse(rss, {
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, max-age=3600, stale-while-revalidate=300',
      },
    });
  } catch (error) {
    console.error('Error generating RSS feed:', error);
    
    // Return a basic RSS feed if there's an error
    const fallbackRss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>RO-AL Mobileri Blog</title>
    <link>${BASE_URL}/blog</link>
    <description>Latest insights on furniture design and interior inspiration.</description>
    <language>en-US</language>
  </channel>
</rss>`;

    return new NextResponse(fallbackRss, {
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, max-age=3600, stale-while-revalidate=300',
      },
    });
  }
}
