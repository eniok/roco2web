import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';
import MainLayout from '@/components/MainLayout';
import { FirebaseAnalytics } from '@/components/FirebaseAnalytics';

/* ------------------------------------------------------------------ */
/* Font                                                               */
/* ------------------------------------------------------------------ */
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '300', '400', '500', '600'],
  variable: '--font-poppins',
});

/* ------------------------------------------------------------------ */
/* Global <head> metadata (used as defaults site-wide)                */
/* ------------------------------------------------------------------ */
export const metadata: Metadata = {
  /** <title> → “Page Title | RO-AL Mobileri” */
  title: {
    default: 'Home & Commercial Furniture Albania | RO-AL Mobileri',
    template: '%s | RO-AL Mobileri',
  },

  /** <meta name="description"> */
  description:
    'Bespoke kitchens, wardrobes and interior solutions crafted in Tirana. Premium materials, precision cutting, delivery and mounting across Albania.',

  /** Canonical domain for absolute URL generation */
  metadataBase: new URL('https://roalmobileri.com'),

  /** Canonical & language-specific alternates */
  alternates: {
    canonical: 'https://roalmobileri.com/',
    languages: {
      'sq-AL': '/?lang=sq',
      'en-AL': '/?lang=en',
    },
  },

  keywords: [
    'custom furniture',
    'bespoke furniture',
    'fitted wardrobes',
    'kitchens Albania',
    'RO-AL Mobileri',
    'furniture Tirana',
    'interior design',
  ],

  openGraph: {
    title: 'RO-AL Mobileri',
    description:
      'Premium bespoke furniture crafted in Albania—discover our latest designs.',
    url: 'https://roalmobileri.com/',
    type: 'website',
    images: [
      {
        url: '/cover.jpg', // 1200×630 px, ≤ 200 KB
        width: 1200,
        height: 630,
        alt: 'Hero image of RO-AL Mobileri showroom',
      },
    ],
  },

  /** Twitter / X Card */
  twitter: {
    card: 'summary_large_image',
    site: '@roalmobileri', // update if you have a handle
  },

  /** Indexing & snippet rules */
  robots: {
    index: true,
    follow: true,
  },
};

/* ------------------------------------------------------------------ */
/* Root layout                                                        */
/* ------------------------------------------------------------------ */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={poppins.variable}>
      <body className="antialiased">
        <MainLayout>
          {children}
          <FirebaseAnalytics />
        </MainLayout>
      </body>
    </html>
  );
}
