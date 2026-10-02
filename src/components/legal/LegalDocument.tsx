'use client';

import Link from 'next/link';
import { useLang } from '@/lib/i18n';
import type { Dict } from '@/lib/i18n';

export type LegalSection = {
  heading: Dict<string>;
  body: Dict<React.ReactNode>;
};

type LegalDocumentProps = {
  title: Dict<string>;
  updated: Dict<string>;
  intro: Dict<React.ReactNode>;
  sections: LegalSection[];
};

const t = {
  home: { sq: 'Kreu', en: 'Home' },
  lastUpdated: { sq: 'Përditësuar më', en: 'Last updated' },
};

export default function LegalDocument({ title, updated, intro, sections }: LegalDocumentProps) {
  const { lang } = useLang();

  return (
    <main id="main-content" className="relative bg-[#FAF8F4] text-[#15130F]">
      <div className="mx-auto max-w-3xl px-6 pt-32 sm:px-8 sm:pt-40">
        <nav aria-label="Breadcrumb" className="mb-10">
          <ol className="flex flex-wrap items-center gap-x-2 text-xs uppercase tracking-[0.18em] text-[#15130F]/55">
            <li>
              <Link href="/" className="hover:text-[#8B4A2E] transition-colors">
                {t.home[lang]}
              </Link>
            </li>
            <li aria-hidden="true">·</li>
            <li className="text-[#8B4A2E] normal-case tracking-normal" aria-current="page">
              {title[lang]}
            </li>
          </ol>
        </nav>

        <header>
          <h1
            className="text-balance font-serif font-normal leading-[1.05] tracking-tight"
            style={{
              fontFamily: 'var(--font-fraunces), Georgia, serif',
              fontSize: 'clamp(2rem, 5vw, 3.2rem)',
            }}
          >
            {title[lang]}
          </h1>
          <p className="mt-4 text-xs uppercase tracking-[0.18em] text-[#15130F]/55">
            {t.lastUpdated[lang]}: {updated[lang]}
          </p>
        </header>
      </div>

      <div className="mx-auto mt-10 max-w-2xl px-6 pb-24 sm:px-8">
        <div
          className="prose prose-lg max-w-none
            prose-headings:font-serif prose-headings:font-normal prose-headings:tracking-tight
            prose-h2:text-[1.5rem] prose-h2:mt-12 prose-h3:text-lg
            prose-p:text-[#3A352C] prose-p:leading-relaxed
            prose-li:text-[#3A352C] prose-li:leading-relaxed
            prose-a:text-[#8B4A2E] prose-a:no-underline hover:prose-a:underline
            prose-strong:text-[#15130F]"
          style={{ ['--tw-prose-headings' as any]: '#15130F' }}
        >
          <p>{intro[lang]}</p>

          {sections.map((section, i) => (
            <section key={i}>
              <h2>{section.heading[lang]}</h2>
              {section.body[lang]}
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
