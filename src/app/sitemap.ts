import type { MetadataRoute } from 'next';
import { getAllBlogPosts } from '@/lib/firebase/firestore';
import { ALL_SERVICES } from '@/constants/services';

const SITE_URL = 'https://roal.design';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const serviceRoutes: MetadataRoute.Sitemap = ALL_SERVICES.map((s) => ({
    url: `${SITE_URL}/${s.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }));

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1,
    },
    ...serviceRoutes,
    {
      url: `${SITE_URL}/kuzhina/katalog`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/garderoba/katalog`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
  ];

  const posts = await getAllBlogPosts().catch(() => [] as Array<{ slug: string; publishedAt?: string | number | Date }>);

  const blogRoutes: MetadataRoute.Sitemap = posts.flatMap((post) => {
    const lastModified = post.publishedAt ? new Date(post.publishedAt) : now;
    return (['sq', 'en'] as const).map((lang) => ({
      url: `${SITE_URL}/blog/${post.slug}/${lang}`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.5,
      alternates: {
        languages: {
          sq: `${SITE_URL}/blog/${post.slug}/sq`,
          en: `${SITE_URL}/blog/${post.slug}/en`,
        },
      },
    }));
  });

  return [...staticRoutes, ...blogRoutes];
}
