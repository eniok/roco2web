import type { ServiceConfig } from '@/constants/services';
import type { Lang } from './i18n';
import { localizedHref } from './localizedRoutes';
import { SITE_URL } from './seo';

export function buildServiceSchema(service: ServiceConfig, lang: Lang = 'sq') {
  const url = `${SITE_URL}${localizedHref(`/${service.slug}`, lang)}`;
  const serviceId = `${SITE_URL}/${service.slug}#service`;
  // Entity IDs stay stable across translations; each page has its own URL,
  // language and FAQ matching the content rendered for visitors.
  const graph: Record<string, unknown>[] = [
    {
      '@type': 'WebPage',
      '@id': `${url}#webpage`,
      url,
      name: service.metaTitle[lang],
      description: service.metaDescription[lang],
      inLanguage: lang,
      isPartOf: { '@id': `${SITE_URL}/#website` },
      mainEntity: { '@id': serviceId },
      breadcrumb: { '@id': `${url}#breadcrumb` },
    },
    {
      '@type': 'Service',
      '@id': serviceId,
      name: service.eyebrow[lang],
      alternateName: service.eyebrow[lang === 'sq' ? 'en' : 'sq'],
      serviceType: service.serviceType,
      description: service.metaDescription[lang],
      url,
      image: `${SITE_URL}${service.image}`,
      provider: { '@id': `${SITE_URL}/#business` },
      areaServed: { '@type': 'Country', name: 'Albania' },
      mainEntityOfPage: { '@id': `${url}#webpage` },
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${url}#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: lang === 'sq' ? 'Kreu' : 'Home', item: `${SITE_URL}${localizedHref('/', lang)}` },
        { '@type': 'ListItem', position: 2, name: service.eyebrow[lang], item: url },
      ],
    },
  ];

  if (service.faqs.length > 0) {
    graph.push({
      '@type': 'FAQPage',
      '@id': `${url}#faq`,
      inLanguage: lang,
      isPartOf: { '@id': `${url}#webpage` },
      mainEntity: service.faqs.map((f) => ({
        '@type': 'Question', name: f.q[lang],
        acceptedAnswer: { '@type': 'Answer', text: f.a[lang] },
      })),
    });
  }
  return { '@context': 'https://schema.org', '@graph': graph };
}
