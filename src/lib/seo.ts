import type { Metadata } from 'next';
import type { Lang } from './i18n';
import type { ServiceConfig } from '@/constants/services';
import { languageAlternates, localizedHref } from './localizedRoutes';

export const SITE_URL = 'https://roal.design';

export const HOME_COPY = {
  title: {
    sq: 'Mobilje dhe interierë në Tiranë — të menduara për ju | ROAL Mobileri',
    en: 'Custom Furniture in Tirana — Designed Around You | ROAL Mobileri',
  },
  description: {
    sq: 'Kuzhina, garderoba dhe interierë të personalizuar në Tiranë. Dëgjojmë idetë tuaja dhe planifikojmë sipas buxhetit. Konsultim e projekt 3D falas, garanci 2-vjeçare.',
    en: 'Custom kitchens, wardrobes and furniture in Tirana, Albania. Designed with you, around your budget. Free consultation and 3D design. 2-year warranty.',
  },
};

export function pageMetadata({ path, lang, title, description, image, imageAlt }: {
  path: string; lang: Lang; title: string; description: string; image: string; imageAlt: string;
}): Metadata {
  const url = `${SITE_URL}${localizedHref(path, lang)}`;
  return {
    title: { absolute: title.includes('ROAL Mobileri') ? title : `${title} | ROAL Mobileri` },
    description,
    alternates: { canonical: url, languages: languageAlternates(path) },
    openGraph: {
      title, description, url, type: 'website', siteName: 'ROAL Mobileri',
      locale: lang === 'sq' ? 'sq_AL' : 'en_GB',
      alternateLocale: lang === 'sq' ? ['en_GB'] : ['sq_AL'],
      images: [{ url: `${SITE_URL}${image}`, alt: imageAlt }],
    },
    twitter: { card: 'summary_large_image', title, description, images: [`${SITE_URL}${image}`] },
  };
}

export function homeMetadata(lang: Lang): Metadata {
  return pageMetadata({
    path: '/', lang, title: HOME_COPY.title[lang], description: HOME_COPY.description[lang],
    image: '/images/cover.jpg', imageAlt: 'ROAL Mobileri',
  });
}

export function serviceMetadata(service: ServiceConfig, lang: Lang = 'sq'): Metadata {
  return pageMetadata({
    path: `/${service.slug}`, lang, title: service.metaTitle[lang],
    description: service.metaDescription[lang], image: service.image, imageAlt: service.imageAlt[lang],
  });
}
