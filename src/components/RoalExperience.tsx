'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { useLang, type Dict } from '@/lib/i18n';
import { whatsappHref } from '@/lib/store';
import { btnGhostOnLight, btnSolidOnLight, EASE } from './ui';

const copy = {
  eyebrow: { sq: 'Përvoja ROAL', en: 'The ROAL experience' },
  headingLead: { sq: 'Mobiljet e duhura nisin', en: 'Great furniture starts' },
  headingAccent: { sq: 'duke ju dëgjuar.', en: 'with listening.' },
  intro: {
    sq: 'Na tregoni idetë, përditshmërinë dhe buxhetin tuaj. Ne sjellim përvojën, mostrat dhe zgjidhjet; ju vendosni çfarë ju përshtatet. Nga një garderobë te mobilimi i plotë, e mendojmë bashkë çdo detaj përpara prodhimit.',
    en: 'Bring your ideas, your everyday needs and your budget. We bring the experience, material samples and options; you choose what feels right. From a single wardrobe to a whole home, we work through the details together before production.',
  },
  consultationAlt: {
    sq: 'Klientë duke diskutuar mostrat e materialeve gjatë një konsultimi interieri',
    en: 'Clients discussing material samples during an interior design consultation',
  },
  consultationCaption: { sq: 'Ju flisni. Ne dëgjojmë.', en: 'You talk. We listen.' },
  consultationNote: {
    sq: 'Pa prezantime të gatshme dhe pa presion. Biseda nis nga mënyra si jetoni ju.',
    en: 'No rehearsed pitch and no pressure. The conversation begins with how you live.',
  },
  materialsAlt: {
    sq: 'Duart e klientit dhe dizajnerit duke krahasuar rimeso arre, tekstile dhe përfundime mat',
    en: 'Client and designer hands comparing walnut veneer, textiles and matte finishes',
  },
  materialsCaption: {
    sq: 'Prekni. Provoni. Krahasoni.',
    en: 'Touch. Test. Compare.',
  },
  promise: {
    sq: 'Buxheti orienton zgjedhjet, jo kujdesin që ju kushtojmë.',
    en: 'Budget guides the choices. It never changes the attention you receive.',
  },
  promiseNote: {
    sq: 'Krahasojmë materialet, shpjegojmë çfarë ndryshon në çmim dhe përgatisim një ofertë të detajuar. Konsultimi, matja dhe projekti 3D janë falas.',
    en: 'We compare materials, explain what changes the price and prepare a detailed quote. Consultation, measurement and 3D design are free.',
  },
  primaryCta: { sq: 'Na tregoni idenë tuaj', en: 'Tell us your idea' },
  secondaryCta: { sq: 'Vizitoni showroom-in', en: 'Visit the showroom' },
  whatsappPreset: {
    sq: 'Përshëndetje ROAL, dua t’ju tregoj idenë time për një hapësirë.',
    en: "Hello ROAL, I'd like to tell you about an idea for my space.",
  },
} satisfies Record<string, Dict<string>>;

export default function RoalExperience() {
  const { lang } = useLang();

  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="relative overflow-hidden border-y border-ink/10 bg-linen text-ink"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 top-28 h-72 w-72 rounded-full border border-clay/10 sm:h-96 sm:w-96"
      />

      <div className="relative mx-auto max-w-7xl px-6 py-24 sm:px-8 sm:py-32">
        <header className="grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-8">
          <div className="lg:col-span-7">
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, ease: EASE }}
              className="flex items-center gap-4 text-[0.68rem] font-medium uppercase tracking-[0.22em] text-clay"
            >
              <span aria-hidden="true" className="h-px w-10 bg-clay/60" />
              {copy.eyebrow[lang]}
            </motion.p>

            <motion.h2
              id="experience-heading"
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ delay: 0.07, duration: 0.75, ease: EASE }}
              className="mt-6 max-w-[16ch] text-balance font-serif text-[clamp(2.65rem,6vw,5.6rem)] font-normal leading-[0.98] tracking-[-0.04em]"
            >
              {copy.headingLead[lang]}{' '}
              <span className="italic text-clay">{copy.headingAccent[lang]}</span>
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ delay: 0.14, duration: 0.65, ease: EASE }}
            className="max-w-xl border-l border-clay/35 pl-5 text-base leading-[1.8] text-body sm:text-lg lg:col-span-5 lg:mb-1"
          >
            {copy.intro[lang]}
          </motion.p>
        </header>

        <div className="mt-16 grid gap-10 sm:mt-20 lg:grid-cols-12 lg:items-end lg:gap-8">
          <motion.figure
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.85, ease: EASE }}
            className="lg:col-span-8"
          >
            <div className="relative aspect-[3/2] overflow-hidden bg-ink/5 ring-1 ring-ink/10">
              <Image
                src="/images/experience/consultation.webp"
                alt={copy.consultationAlt[lang]}
                fill
                sizes="(min-width: 1024px) 66vw, 100vw"
                className="object-cover"
              />
            </div>
            <figcaption className="mt-5 grid gap-3 border-t border-ink/12 pt-4 sm:grid-cols-[auto_1fr] sm:items-baseline sm:gap-8">
              <p className="font-serif text-2xl tracking-tight sm:text-3xl">
                {copy.consultationCaption[lang]}
              </p>
              <p className="max-w-lg text-sm leading-relaxed text-body sm:justify-self-end sm:text-right">
                {copy.consultationNote[lang]}
              </p>
            </figcaption>
          </motion.figure>

          <motion.figure
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ delay: 0.1, duration: 0.85, ease: EASE }}
            className="ml-auto w-[82%] sm:w-[56%] lg:col-span-4 lg:w-full lg:pb-2"
          >
            <div className="relative aspect-[4/5] overflow-hidden bg-ink/5 ring-1 ring-ink/10">
              <Image
                src="/images/experience/materials.webp"
                alt={copy.materialsAlt[lang]}
                fill
                sizes="(min-width: 1024px) 30vw, (min-width: 640px) 56vw, 82vw"
                className="object-cover"
              />
            </div>
            <figcaption className="mt-4 border-t border-ink/12 pt-3 font-serif text-xl italic tracking-tight text-clay sm:text-2xl">
              {copy.materialsCaption[lang]}
            </figcaption>
          </motion.figure>
        </div>

        <div className="mt-16 flex flex-col gap-8 border-t border-ink/12 pt-10 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="max-w-3xl text-balance font-serif text-[clamp(1.75rem,3vw,2.7rem)] leading-[1.12] tracking-tight">
              {copy.promise[lang]}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-body/70">
              {copy.promiseNote[lang]}
            </p>
          </div>

          <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
            <a
              href={whatsappHref(copy.whatsappPreset[lang])}
              target="_blank"
              rel="noopener noreferrer"
              className={btnSolidOnLight}
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              <span>{copy.primaryCta[lang]}</span>
              <ArrowRight
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </a>
            <a href="#showroom" className={btnGhostOnLight}>
              <span>{copy.secondaryCta[lang]}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
