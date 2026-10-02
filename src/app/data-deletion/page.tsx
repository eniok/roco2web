import type { Metadata } from 'next';
import DataDeletionContent from '@/components/legal/DataDeletionContent';

const SITE_URL = 'https://roal.design';

export const metadata: Metadata = {
  title: 'Udhëzime për Fshirjen e të Dhënave',
  description:
    'Si të kërkoni fshirjen e të dhënave tuaja personale nga RO-AL SH.P.K. (ROAL Mobileri).',
  alternates: {
    canonical: `${SITE_URL}/data-deletion`,
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function Page() {
  return <DataDeletionContent />;
}
