"use client";

import * as React from "react";
import { motion, type MotionValue } from "framer-motion";
import { ArrowRight, MapPin, MessageCircle } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useLang, type Dict } from "@/lib/i18n";

const WHATSAPP_NUMBER = "355672029739";
const WHATSAPP_PRESET = {
  sq: "Përshëndetje ROAL, dua të mësoj më shumë për mobiljet me porosi.",
  en: "Hello ROAL, I'd like to learn more about your made-to-measure furniture.",
} satisfies Dict<string>;

const copy = {
  eyebrow: {
    sq: "Mobileri me porosi · Tiranë",
    en: "Bespoke furniture · Tirana",
  },
  titleLead: {
    sq: "Mobilje të projektuara",
    en: "Furniture designed",
  },
  titleAccent: {
    sq: "për hapësirën tuaj.",
    en: "for your space.",
  },
  subhead: {
    sq: "Kuzhina, garderoba dhe ambiente të plota — të projektuara për t'ju shërbyer për vite. Ne ju shoqërojmë në çdo hap, nga skica e parë deri te instalimi.",
    en: "Kitchens, wardrobes and full interiors — built to last for years. We stay with you every step, from the first sketch to the final install.",
  },
  ctaPrimary: {
    sq: "Vizito showroom-in",
    en: "Visit the showroom",
  },
  ctaSecondary: {
    sq: "Shkruaj në WhatsApp",
    en: "Message on WhatsApp",
  },
  trust: [
    { sq: "Vite përvojë", en: "Years of experience" },
    { sq: "Cilësi e qëndrueshme", en: "Built to last" },
    { sq: "Me ju në çdo hap", en: "With you every step" },
  ] as const,
} satisfies Record<string, Dict<string> | readonly Dict<string>[]>;

interface HeroProps {
  heroHeight: MotionValue<string>;
}

export default function Hero({ heroHeight }: HeroProps) {
  const { lang } = useLang();

  const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    WHATSAPP_PRESET[lang]
  )}`;

  return (
    <motion.section
      id="hero"
      aria-label="ROAL Mobileri"
      className="relative isolate flex flex-col overflow-hidden bg-[#15130F] text-[#FAF8F4] min-h-[88svh]"
      style={{ height: heroHeight }}
    >
      {/* Background image */}
      <div className="absolute inset-0 -z-10">
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
        <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/45 to-black/75" />
        <div
          className="absolute inset-0 opacity-[0.08] mix-blend-overlay pointer-events-none"
          style={{ backgroundImage: "url('/images/noise.png')" }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto flex h-full w-full max-w-6xl flex-col justify-end px-6 pb-16 pt-32 sm:px-8 sm:pb-24 sm:pt-40">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-6 text-[0.7rem] uppercase tracking-[0.22em] text-[#E8E3DB]/70 sm:mb-8 sm:text-xs"
        >
          {copy.eyebrow[lang]}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-4xl text-balance font-serif font-normal leading-[1.02] tracking-tight text-white"
          style={{
            fontFamily: "var(--font-fraunces), Georgia, serif",
            fontSize: "clamp(2.4rem, 7vw, 5.4rem)",
          }}
        >
          {copy.titleLead[lang]}{" "}
          <span className="italic text-[#E8B894]">{copy.titleAccent[lang]}</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-[#FAF8F4]/85 sm:text-lg"
        >
          {copy.subhead[lang]}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mt-8 flex flex-col items-stretch gap-3 sm:mt-10 sm:flex-row sm:items-center sm:gap-4"
        >
          <Link
            href="#showroom"
            className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#FAF8F4] px-6 py-3.5 text-base font-medium text-[#15130F] transition-colors hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
          >
            <MapPin className="h-4 w-4" aria-hidden="true" />
            <span>{copy.ctaPrimary[lang]}</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </Link>

          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 px-6 py-3.5 text-base font-medium text-white transition-colors hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
          >
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
            <span>{copy.ctaSecondary[lang]}</span>
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-10 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-[#FAF8F4]/70 sm:mt-14"
        >
          {copy.trust.map((item, i) => (
            <React.Fragment key={i}>
              {i > 0 && <span aria-hidden="true" className="text-white/25">·</span>}
              <span>{item[lang]}</span>
            </React.Fragment>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
