'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ChevronDown, MapPin, MessageCircle } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useLang, type Dict } from '@/lib/i18n';
import { btnGhostOnDark, btnSolidOnDark, EASE } from './ui';

const WHATSAPP_NUMBER = '355672029739';
const WHATSAPP_PRESET = {
  sq: 'Përshëndetje ROAL, dua të mësoj më shumë për mobiljet me porosi.',
  en: "Hello ROAL, I'd like to learn more about your made-to-measure furniture.",
} satisfies Dict<string>;

const copy = {
  eyebrow: {
    sq: 'Mobileri me porosi · Tiranë',
    en: 'Bespoke furniture · Tirana',
  },
  titleLead: {
    sq: 'Mobilje të projektuara',
    en: 'Furniture designed',
  },
  titleAccent: {
    sq: 'për hapësirën tuaj.',
    en: 'for your space.',
  },
  subhead: {
    sq: "Kuzhina, garderoba dhe ambiente të plota — të projektuara për t'ju shërbyer për vite. Ne ju shoqërojmë në çdo hap, nga skica e parë deri te instalimi.",
    en: 'Kitchens, wardrobes and full interiors — built to last for years. We stay with you every step, from the first sketch to the final install.',
  },
  ctaPrimary: {
    sq: 'Vizito showroom-in',
    en: 'Visit the showroom',
  },
  ctaSecondary: {
    sq: 'Shkruaj në WhatsApp',
    en: 'Message on WhatsApp',
  },
  trust: [
    { sq: 'Vite përvojë', en: 'Years of experience' },
    { sq: 'Cilësi e qëndrueshme', en: 'Built to last' },
    { sq: 'Me ju në çdo hap', en: 'With you every step' },
  ] as const,
} satisfies Record<string, Dict<string> | readonly Dict<string>[]>;

export default function Hero() {
  const { lang } = useLang();
  const ref = useRef<HTMLElement>(null);

  // Transform-only parallax — no layout animation, nothing below shifts.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);

  const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    WHATSAPP_PRESET[lang]
  )}`;

  return (
    <section
      ref={ref}
      id="hero"
      aria-label="ROAL Mobileri"
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-ink text-paper"
    >
      {/* Background image with slow parallax drift */}
      <motion.div aria-hidden="true" className="absolute inset-0 -z-10" style={{ y: bgY, scale: 1.12 }}>
        <Image
          src="/images/cover.jpg"
          alt={
            lang === 'sq'
              ? 'Interier me mobilje me porosi nga ROAL Mobileri — kuzhina, garderoba dhe ambiente të plota në Tiranë'
              : 'Interior with bespoke furniture by ROAL Mobileri — kitchens, wardrobes and full interiors in Tirana'
          }
          fill
          priority
          sizes="100vw"
          className="object-cover"
          draggable={false}
        />
      </motion.div>
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-ink/35" />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/25 to-ink/40"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.07] mix-blend-overlay"
        style={{ backgroundImage: "url('/images/noise.png')" }}
      />

      {/* Content */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-end px-6 pb-10 pt-32 sm:px-8"
      >
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mb-6 flex items-center gap-3 text-[0.7rem] uppercase tracking-[0.24em] text-paper/70 sm:mb-8 sm:text-xs"
        >
          <span aria-hidden="true" className="h-2 w-2 bg-sand" />
          {copy.eyebrow[lang]}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.85, ease: EASE }}
          className="max-w-4xl text-balance font-serif text-[clamp(2.6rem,7vw,5.5rem)] font-normal leading-[1.02] tracking-tight"
        >
          {copy.titleLead[lang]}{' '}
          <span className="italic text-sand">{copy.titleAccent[lang]}</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.22, duration: 0.7, ease: EASE }}
          className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-paper/85 sm:text-lg"
        >
          {copy.subhead[lang]}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.34, duration: 0.6, ease: EASE }}
          className="mt-8 flex flex-col items-stretch gap-3 sm:mt-10 sm:flex-row sm:items-center"
        >
          <Link href="#showroom" className={btnSolidOnDark}>
            <MapPin className="h-4 w-4" aria-hidden="true" />
            <span>{copy.ctaPrimary[lang]}</span>
            <ArrowRight
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
              aria-hidden="true"
            />
          </Link>

          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className={btnGhostOnDark}
          >
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
            <span>{copy.ctaSecondary[lang]}</span>
          </a>
        </motion.div>

        {/* Trust strip — spec-sheet row along the bottom edge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.55, duration: 0.7 }}
          className="mt-14 flex items-center justify-between gap-6 border-t border-paper/15 pt-6 sm:mt-20"
        >
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[0.7rem] uppercase tracking-[0.18em] text-paper/60 sm:text-xs">
            {copy.trust.map((item, i) => (
              <li key={i} className="flex items-center gap-6">
                {i > 0 && (
                  <span aria-hidden="true" className="h-3 w-px bg-paper/20" />
                )}
                <span>{item[lang]}</span>
              </li>
            ))}
          </ul>
          <motion.span
            aria-hidden="true"
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
            className="hidden text-paper/50 sm:block"
          >
            <ChevronDown className="h-4 w-4" />
          </motion.span>
        </motion.div>
      </motion.div>
    </section>
  );
}
