'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useLang, type Dict } from '@/lib/i18n';
import SectionHeading from './SectionHeading';
import { EASE } from './ui';

type Category = {
  src: string;
  href?: string;
  label: Dict<string>;
  alt: Dict<string>;
};

const CATEGORIES: Category[] = [
  {
    src: '/images/9.jpg',
    href: '/kuzhina',
    label: { sq: 'Kuzhina', en: 'Kitchens' },
    alt: { sq: 'Kuzhinë e punuar me porosi', en: 'Bespoke kitchen' },
  },
  {
    src: '/images/wardrobe.jpg',
    href: '/garderoba',
    label: { sq: 'Garderoba', en: 'Wardrobes' },
    alt: { sq: 'Garderobë me masë', en: 'Fitted wardrobe' },
  },
  {
    src: '/images/bedroom.jpg',
    href: '/dhoma-gjumi',
    label: { sq: 'Dhoma gjumi', en: 'Bedrooms' },
    alt: { sq: 'Dhomë gjumi e punuar me porosi', en: 'Bespoke bedroom' },
  },
  {
    src: '/images/11.jpg',
    href: '/dhoma-ndenje',
    label: { sq: 'Dhoma ndenje', en: 'Living rooms' },
    alt: { sq: 'Dhomë ndenje e punuar me porosi', en: 'Bespoke living room' },
  },
  {
    src: '/images/homeoffice.jpg',
    href: '/ambiente-pune',
    label: { sq: 'Ambiente pune', en: 'Workspaces' },
    alt: { sq: 'Ambient pune i punuar me porosi', en: 'Bespoke workspace' },
  },
  {
    src: '/images/contract.jpg',
    href: '/hoteleri-lokale',
    label: { sq: 'Hoteleri dhe lokale', en: 'Hospitality & retail' },
    alt: { sq: 'Punim për hoteleri dhe lokale', en: 'Hospitality & retail fit-out' },
  },
];

const copy = {
  eyebrow: { sq: 'Çfarë prodhojmë', en: 'What we make' },
  headingLead: { sq: 'Shumë kategori,', en: 'Few categories,' },
  headingAccent: { sq: 'shumë mundësi.', en: 'endless options.' },
  subhead: {
    sq: 'Çdo copë projektohet për hapësirën dhe mënyrën tuaj të jetesës. Pa katalog të ngurtë.',
    en: 'Every piece is designed for your space and your way of living. No rigid catalogue.',
  },
} satisfies Record<string, Dict<string>>;

export default function CategoriesStrip() {
  const { lang } = useLang();

  return (
    <section
      id="categories"
      aria-labelledby="categories-heading"
      className="relative bg-ink text-paper"
    >
      <div className="mx-auto max-w-7xl px-6 pt-24 sm:px-8 sm:pt-32">
        <SectionHeading
          id="categories-heading"
          index="03"
          eyebrow={copy.eyebrow}
          lead={copy.headingLead}
          accent={copy.headingAccent}
          sub={copy.subhead}
          tone="dark"
        />
      </div>

      {/* Full-bleed strip: horizontal scroll on mobile, hairline grid on desktop */}
      <div className="mt-14 sm:mt-20">
        <ul
          role="list"
          className="
            flex snap-x snap-mandatory gap-px overflow-x-auto bg-paper/10 px-6 sm:px-8
            [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden
            md:grid md:grid-cols-3 md:overflow-visible md:px-0
          "
        >
          {CATEGORIES.map((c, i) => {
            const tile = (
              <>
                <img
                  src={c.src}
                  alt={c.alt[lang]}
                  loading="lazy"
                  decoding="async"
                  draggable={false}
                  className="h-full w-full object-cover opacity-90 transition duration-[900ms] ease-out group-hover:scale-[1.05] group-hover:opacity-100"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/20 to-ink/10"
                />
                <span
                  aria-hidden="true"
                  className="absolute left-5 top-5 font-serif text-sm italic text-paper/60 sm:left-6 sm:top-6"
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5 sm:p-6">
                  <span className="font-serif text-xl tracking-tight text-paper sm:text-2xl">
                    {c.label[lang]}
                  </span>
                  <ArrowUpRight
                    aria-hidden="true"
                    className="h-5 w-5 -translate-x-1 translate-y-1 text-sand opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100"
                  />
                </span>
              </>
            );

            const tileClasses =
              'group relative block aspect-[3/4] overflow-hidden bg-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-sand';

            return (
              <motion.li
                key={c.src}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: i * 0.06, duration: 0.7, ease: EASE }}
                className="w-[78%] shrink-0 snap-start bg-ink first:snap-align-none sm:w-[55%] md:w-auto"
              >
                {c.href ? (
                  <Link href={c.href} className={tileClasses}>
                    {tile}
                  </Link>
                ) : (
                  <div className={tileClasses}>{tile}</div>
                )}
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
