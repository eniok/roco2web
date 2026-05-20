import type { Metadata } from 'next';
import ServicePage from '@/components/ServicePage';
import { SERVICES } from '@/constants/services';
import { buildServiceSchema } from '@/lib/serviceSchema';

const service = SERVICES['dhoma-ndenje'];
const SITE_URL = 'https://roal.design';

export const metadata: Metadata = {
  title: service.metaTitle.sq,
  description: service.metaDescription.sq,
  alternates: {
    canonical: `${SITE_URL}/${service.slug}`,
    languages: {
      'sq-AL': `/${service.slug}?lang=sq`,
      'en-AL': `/${service.slug}?lang=en`,
    },
  },
  openGraph: {
    title: service.metaTitle.sq,
    description: service.metaDescription.sq,
    url: `${SITE_URL}/${service.slug}`,
    type: 'website',
    locale: 'sq_AL',
    siteName: 'ROAL Mobileri',
    images: [{ url: `${SITE_URL}${service.image}`, width: 1200, height: 900, alt: service.imageAlt.sq }],
  },
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildServiceSchema(service)) }}
      />
      <ServicePage service={service} />
    </>
  );
}
