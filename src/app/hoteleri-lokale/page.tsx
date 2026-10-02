import { serviceMetadata } from '@/lib/seo';
import ServicePage from '@/components/ServicePage';
import { SERVICES } from '@/constants/services';
import { buildServiceSchema } from '@/lib/serviceSchema';

const service = SERVICES['hoteleri-lokale'];
export const metadata = serviceMetadata(service);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildServiceSchema(service)) }}
      />
      <ServicePage service={service} />
    </>
  );
}
