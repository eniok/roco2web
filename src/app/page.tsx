import { homeMetadata } from '@/lib/seo';
import HomeContent from '@/components/HomeContent';

export const metadata = homeMetadata('sq');

export default function HomePage() {
  return <HomeContent lang="sq" />;
}
