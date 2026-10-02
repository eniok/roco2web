import type { MetadataRoute } from 'next';
import { getAllBlogPosts } from '@/lib/firebase/firestore';
import { ALL_SERVICES } from '@/constants/services';
import { languageAlternates, localizedHref } from '@/lib/localizedRoutes';

const SITE_URL = 'https://roal.design';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Omit dates for static pages: a request/build time is not a content edit.
  const localizedRoutes: MetadataRoute.Sitemap = ['/', ...ALL_SERVICES.map((s) => `/${s.slug}`)]
    .flatMap((path) => (['sq', 'en'] as const).map((lang) => ({
      url: `${SITE_URL}${localizedHref(path, lang)}`,
      changeFrequency: path === '/' ? 'weekly' as const : 'monthly' as const,
      priority: path === '/' ? 1 : 0.9,
      alternates: { languages: languageAlternates(path) },
    })));

  const staticRoutes: MetadataRoute.Sitemap = [
    ...localizedRoutes,
    {
      url: `${SITE_URL}/kuzhina/katalog`,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/garderoba/katalog`,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/blog`,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
  ];

  const posts = await getAllBlogPosts().catch(() => [] as Array<{ slug: string; publishedAt?: string | number | Date }>);

  const blogRoutes: MetadataRoute.Sitemap = posts.flatMap((post) => {
    const published = post.publishedAt ? new Date(post.publishedAt) : undefined;
    const lastModified = published && !Number.isNaN(published.getTime()) ? published : undefined;
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
