import type { ServiceConfig } from '@/constants/services';

const SITE_URL = 'https://roal.design';

export function buildServiceSchema(service: ServiceConfig) {
  const url = `${SITE_URL}/${service.slug}`;

  // Each node is emitted as a top-level entity in @graph so Google parses them
  // independently — FAQPage as a standalone node is eligible for FAQ rich results
  // (it was previously buried inside Service.mainEntityOfPage and ignored), and
  // the BreadcrumbList drives the breadcrumb trail in search results.
  const graph: Record<string, unknown>[] = [
    {
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
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${url}#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Kreu', item: `${SITE_URL}/` },
        { '@type': 'ListItem', position: 2, name: service.eyebrow.sq, item: url },
      ],
    },
  ];

  if (service.faqs.length > 0) {
    graph.push({
      '@type': 'FAQPage',
      '@id': `${url}#faq`,
      mainEntity: service.faqs.map((f) => ({
        '@type': 'Question',
        name: f.q.sq,
        acceptedAnswer: { '@type': 'Answer', text: f.a.sq },
      })),
    });
  }

  return {
    '@context': 'https://schema.org',
    '@graph': graph,
  };
}
