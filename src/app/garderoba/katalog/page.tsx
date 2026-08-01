import type { Metadata } from 'next';
import WardrobeCatalogue from '@/components/WardrobeCatalogue';

const SITE_URL = 'https://roal.design';
const PAGE_URL = `${SITE_URL}/garderoba/katalog`;

const title = 'Udhëzuesi i garderobës ROAL — fronte, xham dhe organizim';
const description =
  'Përcaktoni garderobën tuaj në 6 vendime: forma, hapja, frontet, xhami ose pasqyra, organizimi i brendshëm dhe ndriçimi. Matja dhe projektimi 3D janë falas.';

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title,
    description,
    url: PAGE_URL,
    type: 'website',
    locale: 'sq_AL',
    siteName: 'ROAL Mobileri',
    images: [
      {
        url: `${SITE_URL}/images/wardrobe-catalogue/hero.webp`,
        width: 1536,
        height: 1024,
        alt: 'Garderobë e integruar me fronte mat, rimeso arre dhe vitrinë xhami bronz',
      },
    ],
  },
};

const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': ['WebPage', 'CollectionPage'],
      '@id': `${PAGE_URL}#webpage`,
      url: PAGE_URL,
      name: title,
      description,
      inLanguage: 'sq',
      isPartOf: { '@id': `${SITE_URL}/#website` },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Kreu', item: `${SITE_URL}/` },
        { '@type': 'ListItem', position: 2, name: 'Garderoba të integruara', item: `${SITE_URL}/garderoba` },
        { '@type': 'ListItem', position: 3, name: 'Udhëzuesi i garderobës', item: PAGE_URL },
      ],
    },
    {
      '@type': 'ItemList',
      name: 'Zgjedhjet e udhëzuesit të garderobës',
      numberOfItems: 6,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Forma në dhomë', url: `${PAGE_URL}#forma` },
        { '@type': 'ListItem', position: 2, name: 'Mënyra e hapjes', url: `${PAGE_URL}#hapja` },
        { '@type': 'ListItem', position: 3, name: 'Frontet e plota', url: `${PAGE_URL}#frontet` },
        { '@type': 'ListItem', position: 4, name: 'Xham dhe pasqyrë', url: `${PAGE_URL}#xhami` },
        { '@type': 'ListItem', position: 5, name: 'Organizimi i brendshëm', url: `${PAGE_URL}#brenda` },
        { '@type': 'ListItem', position: 6, name: 'Drita dhe ekspozimi', url: `${PAGE_URL}#ndricimi` },
      ],
    },
  ],
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <WardrobeCatalogue />
    </>
  );
}
