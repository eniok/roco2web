import { FAQ_ITEMS } from '@/constants/faq';

const FAQ_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ_ITEMS.map((item) => ({
    '@type': 'Question',
    name: item.q.sq,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.a.sq,
    },
  })),
};

export default function HomeSchema() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }}
    />
  );
}
