'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { useLang, type Lang } from '@/lib/i18n';

const LANGS: { code: Lang; label: string }[] = [
  { code: 'sq', label: 'SQ' },
  { code: 'en', label: 'EN' },
];

// The only language-keyed (SEO) routes are individual blog posts:
// /blog/<slug>/<lang>. On those, language switching must navigate between real
// URLs so each language stays separately indexable; everywhere else the toggle
// just flips the client-side display language.
const BLOG_POST_RE = /^\/blog\/([^/]+)\/(sq|en)\/?$/;

export default function LangToggle({ className = '' }: { className?: string }) {
  const { lang, setLang } = useLang();
  const pathname = usePathname();

  const match = pathname?.match(BLOG_POST_RE);
  const blogSlug = match?.[1] ?? null;
  const urlLang = (match?.[2] as Lang | undefined) ?? null;

  // On a language-keyed blog post the URL is the source of truth — sync the
  // global context so the chrome (nav labels, etc.) matches. This is a transient
  // sync (persist: false): landing on an EN post from search must NOT overwrite
  // an Albanian-primary visitor's explicitly-chosen language in localStorage.
  useEffect(() => {
    if (urlLang && urlLang !== lang) setLang(urlLang, false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [urlLang]);

  const activeLang = urlLang ?? lang;

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
            {blogSlug ? (
              // SEO-compliant: a real link to the other-language URL.
              <Link
                href={`/blog/${blogSlug}/${l.code}`}
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
