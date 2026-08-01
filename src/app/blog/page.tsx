import { Metadata } from 'next';
import type { BlogPost } from '@/constants/blogData';
import { getAllBlogPosts } from '@/lib/firebase/firestore';
import BlogListContent from './BlogListContent';

export const metadata: Metadata = {
  title: 'Blog — Shënime nga studioja ROAL',
  description:
    'Shënime mbi materialet, projektimin dhe interierët që realizojmë. Ide dhe këshilla përpara se të nisni projektin tuaj.',
  keywords: [
    'blog mobilje',
    'dizajn interieri Shqipëri',
    'mobilje me porosi',
    'kuzhina me masë',
    'këshilla dizajni',
    'ROAL Mobileri',
    'bespoke furniture blog',
  ],
  openGraph: {
    title: 'Blog — Shënime nga studioja | ROAL Mobileri',
    description:
      'Mendime mbi materialet, dizajnin dhe hapësirat që ndërtojmë — ide për projektin tuaj të ardhshëm.',
    url: 'https://roal.design/blog',
    type: 'website',
    siteName: 'ROAL Mobileri',
    locale: 'sq_AL',
    images: [
      {
        url: 'https://roal.design/images/cover.jpg',
        width: 1200,
        height: 630,
        alt: 'ROAL Mobileri — Blog',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog — Shënime nga studioja | ROAL Mobileri',
    description: 'Mendime mbi materialet, dizajnin dhe hapësirat që ndërtojmë.',
    images: ['https://roal.design/images/cover.jpg'],
  },
  alternates: {
    canonical: 'https://roal.design/blog',
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
};

// Revalidate hourly so the post list is served from cached HTML (ISR), not refetched per request.
export const revalidate = 3600;

export default async function BlogListPage() {
  const posts = (await getAllBlogPosts().catch(() => [])) as BlogPost[];
  return <BlogListContent posts={posts} />;
}
