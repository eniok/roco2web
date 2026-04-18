'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useLang, type Dict } from '@/lib/i18n';

type Project = {
  src: string;
  alt: Dict<string>;
  caption: Dict<string>;
  /** Optional aspect ratio, controls how tall the tile is. Defaults to 4/5. */
  ratio?: string;
};

// TODO: swap/re-order these with the real project photos you want to feature.
// Captions are intentionally neutral ("Projekt · vit") to stay honest until you
// confirm which room each photo shows.
const PROJECTS: Project[] = [
  {
    src: '/images/1.jpg',
    alt: {
      sq: 'Kuzhinë moderne me porosi në Tiranë — projekt nga ROAL Mobileri',
      en: 'Modern bespoke kitchen in Tirana — project by ROAL Mobileri',
    },
    caption: { sq: 'Kuzhinë me porosi · Tiranë', en: 'Bespoke kitchen · Tirana' },
    ratio: '4 / 5',
  },
  {
    src: '/images/2.jpg',
    alt: {
      sq: 'Garderobë me masë në Tiranë — mobilje me porosi nga ROAL Mobileri',
      en: 'Fitted wardrobe in Tirana — bespoke furniture by ROAL Mobileri',
    },
    caption: { sq: 'Garderobë me masë · Tiranë', en: 'Fitted wardrobe · Tirana' },
    ratio: '1 / 1',
  },
  {
    src: '/images/3.jpg',
    alt: {
      sq: 'Dhomë ndenje me mobilje të integruara nga ROAL Mobileri, 2024',
      en: 'Living room with integrated cabinetry by ROAL Mobileri, 2024',
    },
    caption: { sq: 'Dhomë ndenje · 2024', en: 'Living room · 2024' },
    ratio: '4 / 5',
  },
  {
    src: '/images/4.jpg',
    alt: {
      sq: 'Ambient pune i punuar me porosi nga ROAL Mobileri, 2024',
      en: 'Custom workspace by ROAL Mobileri, 2024',
    },
    caption: { sq: 'Ambient pune · 2024', en: 'Workspace · 2024' },
    ratio: '1 / 1',
  },
  {
    src: '/images/5.jpg',
    alt: {
      sq: 'Kuzhinë e hapur me dhomë ndenje — mobileri me porosi nga ROAL Mobileri',
      en: 'Open-plan kitchen and living — bespoke furniture by ROAL Mobileri',
    },
    caption: { sq: 'Kuzhinë dhe ndenjë', en: 'Kitchen & living' },
    ratio: '4 / 5',
  },
  {
    src: '/images/6.jpg',
    alt: {
      sq: 'Dhomë gjumi me garderobë të integruar nga ROAL Mobileri',
      en: 'Bedroom with integrated wardrobe by ROAL Mobileri',
    },
    caption: { sq: 'Dhomë gjumi', en: 'Bedroom' },
    ratio: '1 / 1',
  },
  {
    src: '/images/7.jpg',
    alt: {
      sq: 'Detaj punimi — finiturë mobilje nga ROAL Mobileri',
      en: 'Craft detail — furniture finish by ROAL Mobileri',
    },
    caption: { sq: 'Detaj punimi', en: 'Craft detail' },
    ratio: '4 / 5',
  },
  {
    src: '/images/8.jpg',
    alt: {
      sq: 'Interier me porosi — mobilje të projektuara nga ROAL Mobileri, 2024',
      en: 'Bespoke interior — furniture designed by ROAL Mobileri, 2024',
    },
    caption: { sq: 'Interier me porosi · 2024', en: 'Bespoke interior · 2024' },
    ratio: '1 / 1',
  },
];

const copy = {
  eyebrow: { sq: 'Punët tona', en: 'Our work' },
  headingLead: { sq: 'Prova', en: 'Proof' },
  headingAccent: { sq: 'jo premtime.', en: 'not promises.' },
  subhead: {
    sq: 'Projekte të mbaruara dhe të instaluara në shtëpi reale në të gjithë Shqipërinë.',
    en: 'Finished projects installed in real homes across Albania.',
  },
  ctaLabel: { sq: 'Shiko më shumë në Instagram', en: 'See more on Instagram' },
} satisfies Record<string, Dict<string>>;

export default function ProjectsGallery() {
  const { lang } = useLang();

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
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
          id="projects-heading"
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

        <ul
          role="list"
          className="mt-12 grid grid-cols-1 gap-4 sm:mt-16 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6"
        >
          {PROJECTS.map((p, i) => (
            <motion.li
              key={p.src}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                delay: (i % 6) * 0.05,
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group relative overflow-hidden bg-[#E8E3DB]"
              style={{ aspectRatio: p.ratio ?? '4 / 5' }}
            >
              <img
                src={p.src}
                alt={p.alt[lang]}
                loading="lazy"
                decoding="async"
                draggable={false}
                className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.03]"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/55 via-black/10 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-100"
              />
              <figcaption className="absolute inset-x-0 bottom-0 p-4 text-sm text-white sm:p-5">
                {p.caption[lang]}
              </figcaption>
            </motion.li>
          ))}
        </ul>

        <div className="mt-12 flex justify-center sm:mt-16">
          <a
            href="https://www.instagram.com/roal_mobileri/"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 text-[15px] font-medium text-[#15130F] underline-offset-[6px] hover:underline"
          >
            {copy.ctaLabel[lang]}
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
