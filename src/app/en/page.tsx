import HomeContent from '@/components/HomeContent';
import { homeMetadata } from '@/lib/seo';

export const metadata = homeMetadata('en');

export default function EnglishHomePage() {
  return <HomeContent lang="en" />;
}
