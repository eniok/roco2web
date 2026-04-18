'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useLang, type Dict } from '@/lib/i18n';

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
    src: '/images/10.jpg',
    href: '/garderoba',
    label: { sq: 'Garderoba', en: 'Wardrobes' },
    alt: { sq: 'Garderobë me masë', en: 'Fitted wardrobe' },
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
  headingLead: { sq: 'Pak kategori,', en: 'Few categories,' },
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
      className="relative bg-[#15130F] text-[#FAF8F4]"
    >
      <div className="mx-auto max-w-6xl px-6 pt-24 pb-16 sm:px-8 sm:pt-32 sm:pb-20">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5 }}
          className="text-[0.7rem] uppercase tracking-[0.22em] text-[#E8B894] mb-5"
        >
          {copy.eyebrow[lang]}
        </motion.p>

        <motion.h2
          id="categories-heading"
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
          <span className="italic text-[#E8B894]">{copy.headingAccent[lang]}</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="mt-5 max-w-2xl text-base leading-relaxed text-[#FAF8F4]/80 sm:text-lg"
        >
          {copy.subhead[lang]}
        </motion.p>
      </div>

      {/* Full-bleed horizontal strip; scroll on mobile, grid on desktop */}
      <div className="relative pb-24 sm:pb-32">
        <ul
          role="list"
          className="
            flex snap-x snap-mandatory gap-3 overflow-x-auto px-6 pb-2 sm:px-8
            [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden
            md:grid md:grid-cols-3 md:overflow-visible md:px-8
            lg:grid-cols-5
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
                  className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"
                />
                <span
                  className="absolute inset-x-0 bottom-0 p-5 text-lg font-medium tracking-tight text-white sm:text-xl"
                  style={{ fontFamily: 'var(--font-fraunces), Georgia, serif' }}
                >
                  {c.label[lang]}
                </span>
              </>
            );

            return (
              <motion.li
                key={c.src}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  delay: i * 0.05,
                  duration: 0.7,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="
                  group relative shrink-0 snap-start overflow-hidden bg-[#3A352C]
                  w-[78%] sm:w-[55%] md:w-auto
                  aspect-[3/4]
                "
              >
                {c.href ? (
                  <Link href={c.href} className="block h-full w-full">
                    {tile}
                  </Link>
                ) : (
                  tile
                )}
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
