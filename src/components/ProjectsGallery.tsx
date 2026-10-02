'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useLang, type Dict } from '@/lib/i18n';
import SectionHeading from './SectionHeading';
import { EASE } from './ui';

type Project = {
  src: string;
  alt: Dict<string>;
  caption: Dict<string>;
};

// TODO: swap/re-order these with the real project photos you want to feature.
// Captions are intentionally neutral ("Projekt · vit") to stay honest until you
// confirm which room each photo shows.
const PROJECTS: Project[] = [
  {
    src: '/images/1.jpg',
    alt: {
      sq: 'Kuzhinë bashkëkohore e projektuar dhe realizuar nga ROAL Mobileri në Tiranë',
      en: 'Modern bespoke kitchen in Tirana — project by ROAL Mobileri',
    },
    caption: { sq: 'Kuzhinë · Tiranë', en: 'Bespoke kitchen · Tirana' },
  },
  {
    src: '/images/2.jpg',
    alt: {
      sq: 'Garderobë e integruar, e realizuar nga ROAL Mobileri në Tiranë',
      en: 'Fitted wardrobe in Tirana — bespoke furniture by ROAL Mobileri',
    },
    caption: { sq: 'Garderobë e integruar · Tiranë', en: 'Fitted wardrobe · Tirana' },
  },
  {
    src: '/images/3.jpg',
    alt: {
      sq: 'Dhomë ndenjeje me mobilieri të integruar nga ROAL Mobileri, 2024',
      en: 'Living room with integrated cabinetry by ROAL Mobileri, 2024',
    },
    caption: { sq: 'Dhomë ndenjeje · 2024', en: 'Living room · 2024' },
  },
  {
    src: '/images/4.jpg',
    alt: {
      sq: 'Ambient pune i projektuar dhe realizuar nga ROAL Mobileri, 2024',
      en: 'Custom workspace by ROAL Mobileri, 2024',
    },
    caption: { sq: 'Ambient pune · 2024', en: 'Workspace · 2024' },
  },
  {
    src: '/images/5.jpg',
    alt: {
      sq: 'Kuzhinë e hapur me dhomë ndenjeje — interier nga ROAL Mobileri',
      en: 'Open-plan kitchen and living — bespoke furniture by ROAL Mobileri',
    },
    caption: { sq: 'Kuzhinë dhe ndenjë', en: 'Kitchen & living' },
  },
  {
    src: '/images/6.jpg',
    alt: {
      sq: 'Dhomë gjumi me garderobë të integruar nga ROAL Mobileri',
      en: 'Bedroom with integrated wardrobe by ROAL Mobileri',
    },
    caption: { sq: 'Dhomë gjumi', en: 'Bedroom' },
  },
  {
    src: '/images/7.jpg',
    alt: {
      sq: 'Detaj realizimi — përpunim sipërfaqeje nga ROAL Mobileri',
      en: 'Craft detail — furniture finish by ROAL Mobileri',
    },
    caption: { sq: 'Detaj realizimi', en: 'Craft detail' },
  },
  {
    src: '/images/8.jpg',
    alt: {
      sq: 'Interier i personalizuar — projekt nga ROAL Mobileri, 2024',
      en: 'Bespoke interior — furniture designed by ROAL Mobileri, 2024',
    },
    caption: { sq: 'Interier i personalizuar · 2024', en: 'Bespoke interior · 2024' },
  },
];

const copy = {
  eyebrow: { sq: 'Projektet tona', en: 'Our work' },
  headingLead: { sq: 'Realizime,', en: 'Proof' },
  headingAccent: { sq: 'jo vetëm ide.', en: 'not promises.' },
  subhead: {
    sq: 'Një përzgjedhje interierësh të realizuar dhe instaluar nga ekipi ynë në Shqipëri.',
    en: 'Finished projects installed in real homes across Albania.',
  },
  ctaLabel: { sq: 'Shihni më shumë në Instagram', en: 'See more on Instagram' },
} satisfies Record<string, Dict<string>>;

export default function ProjectsGallery() {
  const { lang } = useLang();

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="relative bg-linen text-ink"
    >
      <div className="mx-auto max-w-7xl px-6 py-24 sm:px-8 sm:py-32">
        <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-6">
          <SectionHeading
            id="projects-heading"
            index="02"
            eyebrow={copy.eyebrow}
            lead={copy.headingLead}
            accent={copy.headingAccent}
            sub={copy.subhead}
            className="max-w-3xl flex-1 basis-[32rem]"
          />
          <motion.a
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            href="https://www.instagram.com/roal_mobileri/"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 pb-1 text-[0.72rem] font-medium uppercase tracking-[0.18em] text-ink/60 transition-colors hover:text-clay"
          >
            {copy.ctaLabel[lang]}
            <ArrowUpRight
              className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </motion.a>
        </div>

        <ul
          role="list"
          className="mt-14 grid grid-cols-1 gap-x-6 gap-y-12 sm:mt-20 sm:grid-cols-2 lg:grid-cols-3"
        >
          {PROJECTS.map((p, i) => (
            <motion.li
              key={p.src}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ delay: (i % 3) * 0.07, duration: 0.7, ease: EASE }}
            >
              <figure className="group">
                <div className="overflow-hidden bg-ink/5 ring-1 ring-ink/10">
                  <img
                    src={p.src}
                    alt={p.alt[lang]}
                    loading="lazy"
                    decoding="async"
                    draggable={false}
                    className="aspect-[4/5] w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
                  />
                </div>
                <figcaption className="mt-4 flex items-baseline justify-between gap-4 border-t border-ink/10 pt-3">
                  <span className="text-[0.7rem] uppercase tracking-[0.16em] text-ink/70 transition-colors duration-300 group-hover:text-ink">
                    {p.caption[lang]}
                  </span>
                  <span
                    aria-hidden="true"
                    className="font-serif text-sm italic text-clay/70"
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </figcaption>
              </figure>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
