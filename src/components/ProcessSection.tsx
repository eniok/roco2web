'use client';

import { motion } from 'framer-motion';
import { Ruler, Box, Hammer, ShieldCheck } from 'lucide-react';
import { useLang, type Dict } from '@/lib/i18n';
import SectionHeading from './SectionHeading';
import { EASE } from './ui';

type Step = {
  icon: React.ComponentType<{ className?: string }>;
  title: Dict<string>;
  body: Dict<string>;
};

const STEPS: Step[] = [
  {
    icon: Ruler,
    title: { sq: 'Konsultim dhe matje', en: 'Meeting & measuring' },
    body: {
      sq: 'Ju takojmë në showroom ose në ambientin tuaj. Kuptojmë nevojat dhe masim hapësirën me saktësi.',
      en: 'We come to you, or you come to us. We measure the space and listen to your idea.',
    },
  },
  {
    icon: Box,
    title: { sq: 'Projektim 3D', en: '3D design' },
    body: {
      sq: 'E shihni projektin të plotë, me materiale dhe përmasa, përpara se të nisë prodhimi.',
      en: 'We show you the space furnished — before production begins.',
    },
  },
  {
    icon: Hammer,
    title: { sq: 'Materiale të përzgjedhura', en: 'Materials built to last' },
    body: {
      sq: 'Çdo material zgjidhet për pamjen, ndjesinë dhe qëndrueshmërinë në përdorim të përditshëm.',
      en: 'Every piece is built with carefully chosen materials, meant to serve you for years.',
    },
  },
  {
    icon: ShieldCheck,
    title: { sq: 'Instalim dhe garanci', en: 'Installation & warranty' },
    body: {
      sq: 'Ekipi ynë kujdeset për montimin përfundimtar. Çdo realizim mbulohet nga një garanci 2-vjeçare.',
      en: 'We install it ourselves. 2-year warranty on every build — no hassle.',
    },
  },
];

const copy = {
  eyebrow: { sq: 'Si punojmë', en: 'How we work' },
  headingLead: { sq: 'Nga ideja', en: 'From your idea' },
  headingAccent: { sq: 'te realizimi.', en: 'to your home.' },
  subhead: {
    sq: 'Një proces i qartë, i udhëhequr nga i njëjti ekip: koncept, matje, projektim, prodhim dhe instalim.',
    en: 'Years of experience in bespoke furniture. We stay with you from the first sketch to the final install — never dropped halfway.',
  },
  figuresCaption: { sq: 'Matje dhe projektim 3D', en: 'Measuring & 3D design' },
  altMeasuring: {
    sq: 'Matje e saktë e hapësirës nga ekipi i ROAL Mobileri',
    en: 'Measuring the space for bespoke furniture by ROAL Mobileri',
  },
  altRender: {
    sq: 'Projekt 3D i mobiljeve para prodhimit — ROAL Mobileri',
    en: '3D furniture design before production — ROAL Mobileri',
  },
} satisfies Record<string, Dict<string>>;

export default function ProcessSection() {
  const { lang } = useLang();

  return (
    <section
      id="process"
      aria-labelledby="process-heading"
      className="relative bg-paper text-ink"
    >
      <div className="mx-auto max-w-7xl px-6 py-24 sm:px-8 sm:py-32">
        <div className="grid gap-x-16 gap-y-16 lg:grid-cols-12">
          {/* Left: heading + atelier collage */}
          <div className="lg:col-span-5">
            <SectionHeading
              id="process-heading"
              index="01"
              eyebrow={copy.eyebrow}
              lead={copy.headingLead}
              accent={copy.headingAccent}
              sub={copy.subhead}
            />

            <motion.figure
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ delay: 0.15, duration: 0.8, ease: EASE }}
              className="relative mt-14 mb-12 max-w-sm"
            >
              <div className="overflow-hidden ring-1 ring-ink/10">
                <img
                  src="/images/measuring.png"
                  alt={copy.altMeasuring[lang]}
                  loading="lazy"
                  decoding="async"
                  draggable={false}
                  className="aspect-[4/5] w-full object-cover"
                />
              </div>
              <div className="absolute -bottom-10 -right-4 w-40 border-[6px] border-paper shadow-[0_16px_40px_-16px_rgba(21,19,15,0.45)] sm:-right-10 sm:w-52">
                <img
                  src="/images/renders.jpg"
                  alt={copy.altRender[lang]}
                  loading="lazy"
                  decoding="async"
                  draggable={false}
                  className="aspect-[4/3] w-full object-cover"
                />
              </div>
              <figcaption className="absolute -bottom-9 left-0 text-[0.65rem] uppercase tracking-[0.2em] text-ink/50">
                {copy.figuresCaption[lang]}
              </figcaption>
            </motion.figure>
          </div>

          {/* Right: numbered ledger rows */}
          <div className="lg:col-span-7 lg:pt-24">
            <ol className="border-b border-ink/10">
              {STEPS.map((step, i) => {
                const Icon = step.icon;
                return (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ delay: 0.06 * i, duration: 0.6, ease: EASE }}
                    className="group grid grid-cols-[auto_1fr] gap-x-6 border-t border-ink/10 py-8 sm:gap-x-10 sm:py-10"
                  >
                    <span
                      aria-hidden="true"
                      className="font-serif text-3xl leading-none text-clay/80 transition-colors duration-300 group-hover:text-clay sm:text-4xl"
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <div className="flex items-center justify-between gap-4">
                        <h3 className="text-xl font-medium tracking-tight transition-colors duration-300 group-hover:text-clay sm:text-2xl">
                          {step.title[lang]}
                        </h3>
                        <Icon
                          className="h-5 w-5 shrink-0 text-ink/25 transition-colors duration-300 group-hover:text-clay/60"
                          aria-hidden="true"
                        />
                      </div>
                      <p className="mt-3 max-w-md text-[15px] leading-relaxed text-body">
                        {step.body[lang]}
                      </p>
                    </div>
                  </motion.li>
                );
              })}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
