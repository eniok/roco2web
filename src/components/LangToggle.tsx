'use client';

import { useLang, type Lang } from '@/lib/i18n';

const LANGS: { code: Lang; label: string }[] = [
  { code: 'sq', label: 'SQ' },
  { code: 'en', label: 'EN' },
];

export default function LangToggle({ className = '' }: { className?: string }) {
  const { lang, setLang } = useLang();

  return (
    <div
      className={`inline-flex items-center text-xs font-medium tracking-[0.15em] ${className}`}
      role="group"
      aria-label="Language"
    >
      {LANGS.map((l, i) => (
        <div key={l.code} className="inline-flex items-center">
          {i > 0 && <span className="mx-1.5 opacity-40">/</span>}
          <button
            type="button"
            onClick={() => setLang(l.code)}
            aria-pressed={lang === l.code}
            className={
              lang === l.code
                ? 'font-semibold'
                : 'opacity-55 hover:opacity-100 transition-opacity'
            }
          >
            {l.label}
          </button>
        </div>
      ))}
    </div>
  );
}
