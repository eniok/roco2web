import type { Metadata } from 'next';
import { Poppins, Fraunces } from 'next/font/google';
import './globals.css';
import MainLayout from '@/components/MainLayout';
import { FirebaseAnalytics } from '@/components/FirebaseAnalytics';
import { ALL_SERVICES } from '@/constants/services';
import { HOME_COPY } from '@/lib/seo';

/* ------------------------------------------------------------------ */
/* Fonts                                                              */
/* ------------------------------------------------------------------ */
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '300', '400', '500', '600'],
  variable: '--font-poppins',
});

const fraunces = Fraunces({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-fraunces',
});

/* ------------------------------------------------------------------ */
/* Global <head> metadata (used as defaults site-wide)                */
/* ------------------------------------------------------------------ */
export const metadata: Metadata = {
  title: {
    default: HOME_COPY.title.sq,
    template: '%s | ROAL Mobileri',
  },

  description:
    HOME_COPY.description.sq,

  metadataBase: new URL('https://roal.design'),

  keywords: [
    'interierë të personalizuar',
    'mobilje të personalizuara',
    'kuzhina të projektuara',
    'kuzhina me masë',
    'garderoba të integruara',
    'dhoma gjumi të personalizuara',
    'mobileri Tiranë',
    'mobileri Durrës',
    'mobileri Shqipëri',
    'mobilje Tiranë',
    'mobilje zyre Tiranë',
    'mobilje shtëpie',
    'mobilje cilësore',
    'ROAL Mobileri',
    'bespoke furniture Albania',
    'furniture store Tirana',
    'custom kitchens Tirana',
    'office furniture Tirana',
    'fitted wardrobes Tirana',
  ],

  openGraph: {
    title: HOME_COPY.title.sq,
    description:
      HOME_COPY.description.sq,
    url: 'https://roal.design/',
    type: 'website',
    siteName: 'ROAL Mobileri',
    locale: 'sq_AL',
    images: [
      {
        url: 'https://roal.design/images/cover.jpg',
        width: 1200,
        height: 630,
        alt: 'Interier i projektuar dhe realizuar nga ROAL Mobileri',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
  },

  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 },
  },

  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    other: process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION
      ? { 'msvalidate.01': process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION }
      : undefined,
  },
};

const LOCAL_BUSINESS_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'FurnitureStore',
  '@id': 'https://roal.design/#business',
  name: 'ROAL Mobileri',
  alternateName: 'RO-AL SH.P.K',
  // Bilingual description — English retrieval matters for AI assistants
  // answering "furniture in Tirana" queries asked in English.
  description: [
    {
      '@language': 'sq',
      '@value':
        'Mobilje dhe interierë të personalizuar në Tiranë. Kuzhina, garderoba, mobilje zyre dhe ambiente të plota, të projektuara për të zgjatur.',
    },
    {
      '@language': 'en',
      '@value':
        'Custom furniture workshop and showroom in Tirana, Albania. Bespoke kitchens, fitted wardrobes, office furniture and full home interiors — designed, built and installed by one team, with a 2-year warranty.',
    },
  ],
  slogan: 'Ideja juaj. Kujdesi ynë. Mobilje për të jetuar mirë.',
  url: 'https://roal.design/',
  image: 'https://roal.design/images/cover.jpg',
  logo: 'https://roal.design/logo.svg',
  telephone: '+355672029739',
  email: 'info@roalmobileri.com',
  currenciesAccepted: 'ALL, EUR',
  paymentAccepted: 'Cash, Bank transfer, Bank instalment plans',
  hasMap: 'https://www.google.com/maps/search/?api=1&query=41.367775,19.69557',
  knowsAbout: [
    'kuzhina të projektuara',
    'bespoke kitchens',
    'garderoba me përmasë',
    'fitted wardrobes',
    'dhoma gjumi të personalizuara',
    'bedroom furniture',
    'krevate të personalizuara',
    'custom beds',
    'mobilje zyre',
    'office furniture',
    'mobilje shtëpie',
    'home furniture',
    'walk-in closets',
    'media walls',
    'hotel and restaurant fit-out',
    'custom furniture Tirana',
  ],
  knowsLanguage: ['sq', 'en'],
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Km 8, Autostrada Tiranë–Durrës',
    addressLocality: 'Tiranë',
    postalCode: '1000',
    addressCountry: 'AL',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 41.367775,
    longitude: 19.69557,
  },
  areaServed: [
    { '@type': 'Country', name: 'Albania' },
    { '@type': 'City', name: 'Tiranë' },
    { '@type': 'City', name: 'Durrës' },
  ],
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '08:00',
      closes: '18:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: 'Sunday',
      opens: '08:00',
      closes: '16:00',
    },
  ],
  sameAs: ['https://www.instagram.com/roal_mobileri/'],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Shërbime ROAL Mobileri',
    itemListElement: ALL_SERVICES.map((service) => ({
      '@type': 'Offer',
      url: `https://roal.design/${service.slug}`,
      itemOffered: {
        '@type': 'Service',
        '@id': `https://roal.design/${service.slug}#service`,
        name: service.eyebrow.sq,
        alternateName: service.eyebrow.en,
        serviceType: service.serviceType,
        url: `https://roal.design/${service.slug}`,
        provider: { '@id': 'https://roal.design/#business' },
        areaServed: { '@type': 'Country', name: 'Albania' },
      },
    })),
  },
};

const WEBSITE_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': 'https://roal.design/#website',
  name: 'ROAL Mobileri',
  alternateName: 'ROAL — Mobilje dhe interierë të personalizuar në Tiranë',
  url: 'https://roal.design/',
  inLanguage: ['sq', 'en'],
  publisher: { '@id': 'https://roal.design/#business' },
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
    <html lang="sq" className={`${poppins.variable} ${fraunces.variable}`}>
      <body className="antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(LOCAL_BUSINESS_JSON_LD) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(WEBSITE_JSON_LD) }}
        />
        <MainLayout>
          {children}
          <FirebaseAnalytics />
        </MainLayout>
      </body>
    </html>
  );
}
