import { Metadata } from 'next';
import { Suspense } from 'react';
import BlogListContent from './BlogListContent';

export const metadata: Metadata = {
  title: 'Blog — Shënime nga punishtja | ROAL Mobileri',
  description:
    'Shënime mbi materialet, dizajnin dhe hapësirat që ndërtojmë. Ide dhe këshilla para se të filloni projektin tuaj me porosi.',
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
    title: 'Blog — Shënime nga punishtja | ROAL Mobileri',
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
    title: 'Blog — Shënime nga punishtja | ROAL Mobileri',
    description: 'Mendime mbi materialet, dizajnin dhe hapësirat që ndërtojmë.',
    images: ['https://roal.design/images/cover.jpg'],
  },
  alternates: {
    canonical: 'https://roal.design/blog',
    languages: {
      'sq-AL': '/blog?lang=sq',
      'en-AL': '/blog?lang=en',
    },
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

export default function BlogListPage() {
  return (
    <Suspense
      fallback={
        <div className="bg-[#FAF8F4] min-h-screen pt-32 text-center text-sm text-[#15130F]/50">
          Po ngarkohet…
        </div>
      }
    >
      <BlogListContent />
    </Suspense>
  );
}
