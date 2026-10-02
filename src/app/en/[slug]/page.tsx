import { notFound } from 'next/navigation';
import { ALL_SERVICES } from '@/constants/services';
import ServicePage from '@/components/ServicePage';
import { serviceMetadata } from '@/lib/seo';
import { buildServiceSchema } from '@/lib/serviceSchema';

export const dynamicParams = false;

export function generateStaticParams() {
  return ALL_SERVICES.map(({ slug }) => ({ slug }));
}

type Props = { params: Promise<{ slug: string }> };

async function getService(params: Props['params']) {
  const { slug } = await params;
  const service = ALL_SERVICES.find((item) => item.slug === slug);
  if (!service) notFound();
  return service;
}

export async function generateMetadata({ params }: Props) {
  return serviceMetadata(await getService(params), 'en');
}

export default async function EnglishServicePage({ params }: Props) {
  const service = await getService(params);
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildServiceSchema(service, 'en')).replace(/</g, '\\u003c') }}
      />
      <ServicePage service={service} />
    </>
  );
}
