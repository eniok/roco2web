import type { Metadata } from 'next';
import KitchenCatalogue from '@/components/KitchenCatalogue';

const SITE_URL = 'https://roal.design';
const PAGE_URL = `${SITE_URL}/kuzhina/katalog`;

const title = 'Katalogu i kuzhinave me porosi — materiale, syprina, doreza, Blum';
const description =
  'Ndërto kuzhinën tënde në 5 zgjedhje: materiali i dyerve, syprina, dorezat, aksesorët Blum dhe ndriçimi i fshehur. Të gjitha me mbyllje me vakum, me çmime orientuese për metër linear.';

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: PAGE_URL,
  },
  openGraph: {
    title,
    description,
    url: PAGE_URL,
    type: 'website',
    locale: 'sq_AL',
    siteName: 'ROAL Mobileri',
    images: [
      {
        url: `${SITE_URL}/images/kitchen-catalogue/hero.webp`,
        width: 1536,
        height: 1024,
        alt: 'Kuzhinë moderne me front mat, vener arre dhe ishull të rrumbullakosur',
      },
    ],
  },
};

const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
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
        { '@type': 'ListItem', position: 2, name: 'Kuzhina me porosi', item: `${SITE_URL}/kuzhina` },
        { '@type': 'ListItem', position: 3, name: 'Katalogu i kuzhinave', item: PAGE_URL },
      ],
    },
    {
      '@type': 'ItemList',
      name: 'Zgjedhjet e katalogut të kuzhinave',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Materiali i dyerve', url: `${PAGE_URL}#materiali` },
        { '@type': 'ListItem', position: 2, name: 'Syprina e punës', url: `${PAGE_URL}#syprina` },
        { '@type': 'ListItem', position: 3, name: 'Dorezat', url: `${PAGE_URL}#dorezat` },
        { '@type': 'ListItem', position: 4, name: 'Aksesorët Blum', url: `${PAGE_URL}#blum` },
        { '@type': 'ListItem', position: 5, name: 'Ndriçimi i fshehur', url: `${PAGE_URL}#ndricimi` },
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
      <KitchenCatalogue />
    </>
  );
}
