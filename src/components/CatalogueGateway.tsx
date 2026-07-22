'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useLang, type Dict } from '@/lib/i18n';
import { EASE } from './ui';

type Atlas = {
  href: string;
  image: string;
  title: Dict<string>;
  meta: Dict<string>;
  description: Dict<string>;
  alt: Dict<string>;
};

const ATLASES: Atlas[] = [
  {
    href: '/kuzhina/katalog',
    image: '/images/kitchen-catalogue/hero.webp',
    title: { sq: 'Kuzhina me porosi', en: 'Bespoke kitchens' },
    meta: { sq: '5 vendime · 20 alternativa', en: '5 decisions · 20 alternatives' },
    description: {
      sq: 'Materiale, syprina, hapje, mekanizma dhe ndriçim — të krahasuara me pamje të qarta.',
      en: 'Materials, worktops, opening details, mechanisms and lighting—compared through clear visuals.',
    },
    alt: {
      sq: 'Kuzhinë bashkëkohore me fronte mat dhe rimeso arre',
      en: 'Contemporary kitchen with matte fronts and walnut veneer',
    },
  },
  {
    href: '/garderoba/katalog',
    image: '/images/wardrobe-catalogue/hero.webp',
    title: { sq: 'Garderoba me përmasë', en: 'Fitted wardrobes' },
    meta: { sq: '6 vendime · 24 alternativa', en: '6 decisions · 24 alternatives' },
    description: {
      sq: 'Forma, hapja, frontet, xhami e pasqyra, organizimi dhe drita — deri te brief-i juaj.',
      en: 'Layout, opening, fronts, glass and mirror, organization and light—building your project brief.',
    },
    alt: {
      sq: 'Garderobë me masë me fronte mat dhe vitrinë xhami bronz',
      en: 'Fitted wardrobe with matte fronts and a bronze-glass display bay',
    },
  },
];

const copy = {
  eyebrow: { sq: 'Atlase të zgjedhjeve', en: 'Choice atlases' },
  headingLead: { sq: 'Shihni opsionet.', en: 'See the options.' },
  headingAccent: { sq: 'Ejani me një drejtim.', en: 'Arrive with a direction.' },
  intro: {
    sq: 'Krahasoni alternativat, zgjidhni ato që ju afrohen dhe dërgojeni përmbledhjen direkt në WhatsApp. Ne e kthejmë në matje, projekt 3D dhe ofertë.',
    en: 'Compare the alternatives, select what feels right and send the summary directly through WhatsApp. We turn it into a measurement, 3D design and quotation.',
  },
  openAtlas: { sq: 'Hap atlasin', en: 'Open the atlas' },
  note: {
    sq: 'Udhëzues vizual, jo katalog i ngurtë — çdo projekt vazhdon të ndërtohet me masë.',
    en: 'A visual guide, not a rigid catalogue—every project is still made to measure.',
  },
} satisfies Record<string, Dict<string>>;

export default function CatalogueGateway() {
  const { lang } = useLang();

  return (
    <section
      id="catalogues"
      aria-labelledby="catalogues-heading"
      className="scroll-mt-24 border-y border-ink/10 bg-paper"
    >
      <div className="mx-auto max-w-7xl px-6 py-20 sm:px-8 sm:py-28">
        <header className="grid gap-7 lg:grid-cols-12 lg:items-end lg:gap-8">
          <div className="lg:col-span-8">
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
              id="catalogues-heading"
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ delay: 0.07, duration: 0.7, ease: EASE }}
              className="mt-5 max-w-[18ch] text-balance font-serif text-[clamp(2.35rem,5vw,4.5rem)] font-normal leading-[1] tracking-[-0.035em]"
            >
              {copy.headingLead[lang]}{' '}
              <span className="italic text-clay">{copy.headingAccent[lang]}</span>
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ delay: 0.13, duration: 0.6, ease: EASE }}
            className="max-w-xl border-l border-clay/35 pl-5 text-base leading-[1.75] text-body lg:col-span-4"
          >
            {copy.intro[lang]}
          </motion.p>
        </header>

        <div className="mt-12 grid gap-px bg-ink/15 lg:mt-16 lg:grid-cols-2">
          {ATLASES.map((atlas, index) => (
            <motion.div
              key={atlas.href}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.18 }}
              transition={{ delay: index * 0.08, duration: 0.7, ease: EASE }}
              className="bg-paper"
            >
              <Link
                href={atlas.href}
                className="group block focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-clay"
              >
                <span className="relative block aspect-[4/3] overflow-hidden bg-ink sm:aspect-[16/10]">
                  <Image
                    src={atlas.image}
                    alt={atlas.alt[lang]}
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-[1.025]"
                  />
                  <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-ink/20" />
                  <span className="absolute left-5 top-5 font-serif text-sm italic text-paper/70 sm:left-7 sm:top-7">
                    0{index + 1}
                  </span>
                  <span className="absolute right-5 top-5 text-[0.62rem] font-medium uppercase tracking-[0.16em] text-paper/70 sm:right-7 sm:top-7">
                    {atlas.meta[lang]}
                  </span>
                  <span className="absolute inset-x-5 bottom-5 font-serif text-3xl leading-none tracking-[-0.025em] text-paper sm:inset-x-7 sm:bottom-7 sm:text-4xl">
                    {atlas.title[lang]}
                  </span>
                </span>
                <span className="grid min-h-36 grid-cols-[1fr_auto] items-center gap-6 border-x border-b border-ink/15 p-5 sm:p-7">
                  <span className="max-w-lg text-sm leading-[1.7] text-body sm:text-base">
                    {atlas.description[lang]}
                  </span>
                  <span className="inline-flex min-h-11 items-center gap-2 text-[0.64rem] font-medium uppercase tracking-[0.16em] text-clay">
                    {copy.openAtlas[lang]}
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
                  </span>
                </span>
              </Link>
            </motion.div>
          ))}
        </div>

        <p className="mt-5 text-xs leading-relaxed text-body/60">{copy.note[lang]}</p>
      </div>
    </section>
  );
}
