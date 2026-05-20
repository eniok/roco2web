'use client';

import { motion } from 'framer-motion';
import { Ruler, Box, Hammer, ShieldCheck } from 'lucide-react';
import { useLang, type Dict } from '@/lib/i18n';

type Step = {
  icon: React.ComponentType<{ className?: string }>;
  title: Dict<string>;
  body: Dict<string>;
};

const STEPS: Step[] = [
  {
    icon: Ruler,
    title: { sq: 'Takim dhe matje', en: 'Meeting & measuring' },
    body: {
      sq: 'Vijmë te ju ose ju vini te ne. Matim hapësirën dhe dëgjojmë idenë tuaj.',
      en: 'We come to you, or you come to us. We measure the space and listen to your idea.',
    },
  },
  {
    icon: Box,
    title: { sq: 'Projekt 3D', en: '3D design' },
    body: {
      sq: 'Ju tregojmë hapësirën tuaj të mobiluar — para se të fillojë prodhimi.',
      en: 'We show you the space furnished — before production begins.',
    },
  },
  {
    icon: Hammer,
    title: { sq: 'Materiale të qëndrueshme', en: 'Materials built to last' },
    body: {
      sq: 'Çdo pjesë punohet me materiale të zgjedhura me kujdes, të menduara për t\u2019ju shërbyer për vite.',
      en: 'Every piece is built with carefully chosen materials, meant to serve you for years.',
    },
  },
  {
    icon: ShieldCheck,
    title: { sq: 'Instalim dhe garanci', en: 'Installation & warranty' },
    body: {
      sq: 'Ne e montojmë. Garanci 2 vjet mbi çdo punim — pa komplikime.',
      en: 'We install it ourselves. 2-year warranty on every build — no hassle.',
    },
  },
];

const copy = {
  eyebrow: { sq: 'Si punojmë', en: 'How we work' },
  headingLead: { sq: 'Nga ideja', en: 'From your idea' },
  headingAccent: { sq: 'deri te shtëpia juaj.', en: 'to your home.' },
  subhead: {
    sq: 'Vite përvojë në mobilje me porosi. Ju shoqërojmë nga skica e parë deri te instalimi — pa ju lënë në mes.',
    en: 'Years of experience in bespoke furniture. We stay with you from the first sketch to the final install — never dropped halfway.',
  },
} satisfies Record<string, Dict<string>>;

export default function ProcessSection() {
  const { lang } = useLang();

  return (
    <section
      id="process"
      aria-labelledby="process-heading"
      className="relative bg-[#FAF8F4] text-[#15130F]"
    >
      <div className="mx-auto max-w-6xl px-6 py-24 sm:px-8 sm:py-32">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5 }}
          className="text-[0.7rem] uppercase tracking-[0.22em] text-[#8B4A2E] mb-5"
        >
          {copy.eyebrow[lang]}
        </motion.p>

        <motion.h2
          id="process-heading"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl text-balance font-serif font-normal leading-[1.05] tracking-tight"
          style={{
            fontFamily: 'var(--font-fraunces), Georgia, serif',
            fontSize: 'clamp(2rem, 5vw, 3.6rem)',
          }}
        >
          {copy.headingLead[lang]}{' '}
          <span className="italic text-[#8B4A2E]">{copy.headingAccent[lang]}</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="mt-5 max-w-2xl text-base leading-relaxed text-[#3A352C] sm:text-lg"
        >
          {copy.subhead[lang]}
        </motion.p>

        <ol className="mt-14 grid grid-cols-1 gap-x-10 gap-y-12 sm:mt-16 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-8">
          {STEPS.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.li
                key={i}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: 0.08 * i, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="relative"
              >
                <div className="flex items-baseline gap-3 border-t border-[#15130F]/15 pt-5">
                  <span
                    className="font-serif text-2xl text-[#8B4A2E]"
                    style={{ fontFamily: 'var(--font-fraunces), Georgia, serif' }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <Icon className="h-5 w-5 text-[#15130F]/70" aria-hidden="true" />
                </div>
                <h3 className="mt-4 text-lg font-medium tracking-tight">
                  {step.title[lang]}
                </h3>
                <p className="mt-2 text-[15px] leading-relaxed text-[#3A352C]">
                  {step.body[lang]}
                </p>
              </motion.li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
