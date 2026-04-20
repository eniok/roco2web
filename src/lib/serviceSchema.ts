import type { ServiceConfig } from '@/constants/services';

const SITE_URL = 'https://roal.design';

export function buildServiceSchema(service: ServiceConfig) {
  const url = `${SITE_URL}/${service.slug}`;

  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${url}#service`,
    name: service.eyebrow.sq,
    alternateName: service.eyebrow.en,
    serviceType: service.serviceType,
    description: service.metaDescription.sq,
    url,
    image: `${SITE_URL}${service.image}`,
    provider: { '@id': `${SITE_URL}/#business` },
    areaServed: { '@type': 'Country', name: 'Albania' },
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      priceCurrency: 'ALL',
      priceSpecification: {
        '@type': 'PriceSpecification',
        description: 'Kuota sipas projektit — konsultimi dhe matja janë falas.',
      },
    },
    mainEntityOfPage: {
      '@type': 'FAQPage',
      mainEntity: service.faqs.map((f) => ({
        '@type': 'Question',
        name: f.q.sq,
        acceptedAnswer: { '@type': 'Answer', text: f.a.sq },
      })),
    },
  };
}
