import type { Lang } from './i18n';

// Only routes with a complete translated page belong here. Catalogues and the
// blog index retain their existing in-page language switch.
export const LOCALIZED_PATHS = [
  '/', '/kuzhina', '/garderoba', '/dhoma-gjumi',
  '/dhoma-ndenje', '/ambiente-pune', '/hoteleri-lokale',
] as const;

export function routeLanguage(pathname: string): Lang | undefined {
  const path = pathname.replace(/\/$/, '') || '/';
  if (path === '/en' || path.startsWith('/en/')) return 'en';
  if (LOCALIZED_PATHS.some((route) => route === path)) return 'sq';
  return path.match(/^\/blog\/[^/]+\/(sq|en)$/)?.[1] as Lang | undefined;
}

export function localizedHref(href: string, lang: Lang): string {
  const [, path = '', suffix = ''] = href.match(/^([^?#]*)(.*)$/) ?? [];
  const base = path.replace(/^\/en(?=\/|$)/, '').replace(/\/$/, '') || '/';
  if (!path.startsWith('/') || !LOCALIZED_PATHS.some((route) => route === base)) return href;
  return (lang === 'en' ? `/en${base === '/' ? '' : base}` : base) + suffix;
}

export function languageAlternates(path: string) {
  return {
    sq: `https://roal.design${localizedHref(path, 'sq')}`,
    en: `https://roal.design${localizedHref(path, 'en')}`,
    'x-default': `https://roal.design${localizedHref(path, 'sq')}`,
  };
}
