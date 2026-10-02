import type { Metadata } from 'next';
import PrivacyPolicyContent from '@/components/legal/PrivacyPolicyContent';

const SITE_URL = 'https://roal.design';

export const metadata: Metadata = {
  title: 'Politika e Privatësisë',
  description: 'Si RO-AL SH.P.K. (ROAL Mobileri) mbledh, përdor dhe mbron të dhënat tuaja personale.',
  alternates: {
    canonical: `${SITE_URL}/privacy-policy`,
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function Page() {
  return <PrivacyPolicyContent />;
}
