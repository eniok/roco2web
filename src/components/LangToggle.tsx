'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLang, type Lang } from '@/lib/i18n';
import { localizedHref, routeLanguage } from '@/lib/localizedRoutes';

const LANGS: { code: Lang; label: string }[] = [
  { code: 'sq', label: 'SQ' },
  { code: 'en', label: 'EN' },
];

// Home, services and individual blog posts have indexable language URLs.
// Keep the in-page toggle for routes without a translated URL.
const BLOG_POST_RE = /^\/blog\/([^/]+)\/(sq|en)\/?$/;

export default function LangToggle({ className = '' }: { className?: string }) {
  const { lang, setLang } = useLang();
  const pathname = usePathname();

  const match = pathname?.match(BLOG_POST_RE);
  const blogSlug = match?.[1] ?? null;
  const activeLang = routeLanguage(pathname) ?? lang;
  const hasLanguageRoute = Boolean(routeLanguage(pathname));

  return (
    <div
      className={`inline-flex items-center text-xs font-medium tracking-[0.15em] ${className}`}
      role="group"
      aria-label="Language"
    >
      {LANGS.map((l, i) => {
        const isActive = activeLang === l.code;
        const classes = isActive
          ? 'font-semibold'
          : 'opacity-55 hover:opacity-100 transition-opacity';

        return (
          <div key={l.code} className="inline-flex items-center">
            {i > 0 && <span className="mx-1.5 opacity-40">/</span>}
            {hasLanguageRoute ? (
              // SEO-compliant: a real link to the other-language URL.
              <Link
                href={blogSlug ? `/blog/${blogSlug}/${l.code}` : localizedHref(pathname, l.code)}
                onClick={() => setLang(l.code)}
                hrefLang={l.code}
                aria-current={isActive ? 'true' : undefined}
                className={classes}
              >
                {l.label}
              </Link>
            ) : (
              <button
                type="button"
                onClick={() => setLang(l.code)}
                aria-pressed={isActive}
                className={classes}
              >
                {l.label}
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
}
