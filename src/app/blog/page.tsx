import { Metadata } from 'next'
import { Suspense } from "react"
import BlogListContent from './BlogListContent'

export const metadata: Metadata = {
  title: 'Blog - Furniture Design & Interior Inspiration | RO-AL Mobileri',
  description: 'Discover the latest trends in furniture design, interior inspiration, and custom furniture solutions. Expert tips and insights from RO-AL Mobileri.',
  keywords: [
    'furniture design blog',
    'interior design inspiration',
    'custom furniture',
    'Albania furniture',
    'modern furniture trends',
    'home design tips',
    'furniture blog',
    'interior design blog'
  ],
  openGraph: {
    title: 'Blog - Furniture Design & Interior Inspiration | RO-AL Mobileri',
    description: 'Discover the latest trends in furniture design, interior inspiration, and custom furniture solutions.',
    url: 'https://roal.design/blog',
    type: 'website',
    siteName: 'RO-AL Mobileri',
    images: [
      {
        url: 'https://roal.design/images/cover.jpg',
        width: 1200,
        height: 630,
        alt: 'RO-AL Mobileri Blog',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog - Furniture Design & Interior Inspiration | RO-AL Mobileri',
    description: 'Discover the latest trends in furniture design, interior inspiration, and custom furniture solutions.',
    images: ['https://roal.design/images/cover.jpg'],
  },
  alternates: {
    canonical: 'https://roal.design/blog',
    languages: {
      'en-US': '/blog?lang=en',
      'sq-AL': '/blog?lang=sq',
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
}

export default function BlogListPage() {
  return (
    <Suspense fallback={<div className="pt-32 text-center">Loading …</div>}>
      <BlogListContent />
    </Suspense>
  )
}
