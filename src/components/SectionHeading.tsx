'use client';

import { motion } from 'framer-motion';
import { useLang, type Dict } from '@/lib/i18n';
import { EASE } from './ui';

interface SectionHeadingProps {
  /** id applied to the <h2> so the section can use aria-labelledby */
  id: string;
  /** Catalogue number, e.g. '01' */
  index: string;
  eyebrow: Dict<string>;
  lead: Dict<string>;
  accent: Dict<string>;
  sub?: Dict<string>;
  /** light = ink text on paper, dark = paper text on ink */
  tone?: 'light' | 'dark';
  className?: string;
}

/**
 * The numbered-catalogue heading shared by all landing sections:
 * "№ 01 · Eyebrow ———" rule, serif title with italic accent, optional sub.
 */
export default function SectionHeading({
  id,
  index,
  eyebrow,
  lead,
  accent,
  sub,
  tone = 'light',
  className = '',
}: SectionHeadingProps) {
  const { lang } = useLang();
  const dark = tone === 'dark';

  return (
    <div className={className}>
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.5, ease: EASE }}
        className={`flex items-baseline gap-4 text-[0.7rem] uppercase tracking-[0.22em] ${
          dark ? 'text-sand' : 'text-clay'
        }`}
      >
        <span
          aria-hidden="true"
          className="font-serif text-base italic tracking-normal"
        >
          №&thinsp;{index}
        </span>
        <span className="whitespace-nowrap">{eyebrow[lang]}</span>
        <span
          aria-hidden="true"
          className={`h-px flex-1 self-center ${
            dark ? 'bg-paper/15' : 'bg-ink/10'
          }`}
        />
      </motion.p>

      <motion.h2
        id={id}
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ delay: 0.08, duration: 0.7, ease: EASE }}
        className="mt-6 max-w-3xl text-balance font-serif text-[clamp(2.1rem,4.5vw,3.5rem)] font-normal leading-[1.05] tracking-tight"
      >
        {lead[lang]}{' '}
        <span className={`italic ${dark ? 'text-sand' : 'text-clay'}`}>
          {accent[lang]}
        </span>
      </motion.h2>

      {sub && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ delay: 0.16, duration: 0.6, ease: EASE }}
          className={`mt-5 max-w-2xl text-base leading-relaxed sm:text-lg ${
            dark ? 'text-paper/75' : 'text-body'
          }`}
        >
          {sub[lang]}
        </motion.p>
      )}
    </div>
  );
}
