import type { Metadata } from 'next';
import { Poppins, Fraunces } from 'next/font/google';
import './globals.css';
import MainLayout from '@/components/MainLayout';
import { FirebaseAnalytics } from '@/components/FirebaseAnalytics';

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
    default: 'ROAL Mobileri — Interierë të personalizuar në Tiranë',
    template: '%s | ROAL Mobileri',
  },

  description:
    'Kuzhina, garderoba dhe interierë të plotë, të projektuar për hapësirën dhe mënyrën tuaj të jetesës. Showroom në Km 8 të autostradës Tiranë–Durrës. Konsultim, matje dhe projektim 3D falas.',

  metadataBase: new URL('https://roal.design'),

  alternates: {
    canonical: 'https://roal.design/',
    types: {
      'text/plain': [
        { url: '/llms.txt', title: 'LLMs.txt — site summary for AI crawlers' },
      ],
    },
  },

  keywords: [
    'mobileri me porosi',
    'mobilje me porosi',
    'kuzhina me porosi',
    'kuzhina me masë',
    'garderoba me porosi',
    'dhoma gjumi me porosi',
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
    title: 'ROAL Mobileri — Interierë të personalizuar në Tiranë',
    description:
      'Kuzhina, garderoba dhe ambiente të plota të projektuara për t\u2019ju shërbyer për vite. Ju shoqërojmë në çdo hap.',
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
    site: '@roalmobileri',
  },

  robots: {
    index: true,
    follow: true,
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
        'Mobileri me porosi në Tiranë. Kuzhina, garderoba, mobilje zyre dhe ambiente të plota, të projektuara për të zgjatur.',
    },
    {
      '@language': 'en',
      '@value':
        'Custom furniture workshop and showroom in Tirana, Albania. Bespoke kitchens, fitted wardrobes, office furniture and full home interiors — designed, built and installed by one team, with a 2-year warranty.',
    },
  ],
  slogan: 'Interierë të menduar me kujdes, të realizuar për të zgjatur',
  url: 'https://roal.design/',
  image: 'https://roal.design/images/cover.jpg',
  logo: 'https://roal.design/logo.svg',
  telephone: '+355672029739',
  email: 'info@roalmobileri.com',
  priceRange: '$$$',
  currenciesAccepted: 'ALL, EUR',
  paymentAccepted: 'Cash, Bank transfer, Bank instalment plans',
  hasMap: 'https://www.google.com/maps/search/?api=1&query=41.367775,19.69557',
  knowsAbout: [
    'kuzhina me porosi',
    'bespoke kitchens',
    'garderoba me përmasë',
    'fitted wardrobes',
    'dhoma gjumi me porosi',
    'bedroom furniture',
    'krevate me porosi',
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
    name: 'Sherbime ROAL Mobileri',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Kuzhina me porosi',
          serviceType: 'Bespoke kitchens',
          description:
            'Kuzhina të projektuara dhe të punuara sipas përmasave të hapësirës suaj, me materiale të zgjedhura për të zgjatur vite.',
          areaServed: { '@type': 'Country', name: 'Albania' },
          provider: { '@id': 'https://roal.design/#business' },
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Garderoba me përmasë',
          serviceType: 'Fitted wardrobes',
          description:
            'Garderoba dhe dollapë me masë për çdo dhomë, përfshirë hapësira të parregullta dhe tavane të pjerrëta.',
          areaServed: { '@type': 'Country', name: 'Albania' },
          provider: { '@id': 'https://roal.design/#business' },
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Ambiente pune dhe mobilje zyre',
          alternateName: 'Office furniture and workspace fit-out',
          serviceType: 'Office furniture, home office and workspace fit-out',
          description:
            'Mobilje zyre me porosi — tavolina pune, rafte dhe ambiente të plota zyre për shtëpinë ose biznesin tuaj.',
          areaServed: { '@type': 'Country', name: 'Albania' },
          provider: { '@id': 'https://roal.design/#business' },
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Dhoma gjumi me porosi',
          serviceType: 'Bedroom furniture',
          description:
            'Dhoma gjumi të plota me masë — krevate, komodina, garderoba dhe koka krevati të punuara sipas hapësirës suaj.',
          areaServed: { '@type': 'Country', name: 'Albania' },
          provider: { '@id': 'https://roal.design/#business' },
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Dhoma ndenjeje',
          serviceType: 'Living-room cabinetry',
          description:
            'Mobilim i integruar për dhomën e ndenjes — vitrina, mure medie dhe depozitim i personalizuar.',
          areaServed: { '@type': 'Country', name: 'Albania' },
          provider: { '@id': 'https://roal.design/#business' },
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Hoteleri dhe lokale',
          serviceType: 'Hospitality and retail fit-out',
          description:
            'Projekte komerciale për hotele, restorante, bare dhe dyqane në gjithë Shqipërinë.',
          areaServed: { '@type': 'Country', name: 'Albania' },
          provider: { '@id': 'https://roal.design/#business' },
        },
      },
    ],
  },
};

const WEBSITE_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': 'https://roal.design/#website',
  name: 'ROAL Mobileri',
  alternateName: 'ROAL — Mobileri me porosi në Tiranë',
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
