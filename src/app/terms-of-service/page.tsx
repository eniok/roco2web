import type { Metadata } from 'next';
import TermsOfServiceContent from '@/components/legal/TermsOfServiceContent';

const SITE_URL = 'https://roal.design';

export const metadata: Metadata = {
  title: 'Kushtet e Përdorimit',
  description: 'Kushtet e përdorimit të faqes roal.design nga RO-AL SH.P.K. (ROAL Mobileri).',
  alternates: {
    canonical: `${SITE_URL}/terms-of-service`,
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function Page() {
  return <TermsOfServiceContent />;
}
