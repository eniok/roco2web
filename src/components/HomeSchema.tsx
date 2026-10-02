import { FAQ_ITEMS } from '@/constants/faq';
import type { Lang } from '@/lib/i18n';
import { HOME_COPY, SITE_URL } from '@/lib/seo';
import { localizedHref } from '@/lib/localizedRoutes';

export default function HomeSchema({ lang = 'sq' }: { lang?: Lang }) {
  const url = `${SITE_URL}${localizedHref('/', lang)}`;
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${url}#webpage`,
        url,
        name: HOME_COPY.title[lang],
        description: HOME_COPY.description[lang],
        inLanguage: lang,
        isPartOf: { '@id': `${SITE_URL}/#website` },
        about: { '@id': `${SITE_URL}/#business` },
        mainEntity: { '@id': `${SITE_URL}/#business` },
        hasPart: { '@id': `${url}#faq` },
      },
      {
        '@type': 'FAQPage',
        '@id': `${url}#faq`,
        inLanguage: lang,
        isPartOf: { '@id': `${url}#webpage` },
        mainEntity: FAQ_ITEMS.map((item) => ({
          '@type': 'Question',
          name: item.q[lang],
          acceptedAnswer: { '@type': 'Answer', text: item.a[lang] },
        })),
      },
    ],
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }}
    />
  );
}
