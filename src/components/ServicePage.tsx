'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Check, MessageCircle, Plus } from 'lucide-react';
import { useLang, type Dict } from '@/lib/i18n';
import type { ServiceConfig } from '@/constants/services';

const copy = {
  visitCta: { sq: 'Vizito showroom-in', en: 'Visit the showroom' },
  whatsappCta: { sq: 'Shkruaj në WhatsApp', en: 'Message on WhatsApp' },
  backHome: { sq: '← Kreu', en: '← Home' },
  ctaHeading: { sq: 'Le të fillojmë.', en: 'Let\u2019s start.' },
  ctaSub: {
    sq: 'Konsultimi dhe matja janë falas. Eja në showroom ose na shkruaj për të caktuar një takim.',
    en: 'The consultation and measurement are free. Visit the showroom or message us to book a meeting.',
  },
  faqHeading: { sq: 'Pyetje të shpeshta', en: 'Frequently asked' },
} satisfies Record<string, Dict<string>>;

const WHATSAPP_HREF = 'https://wa.me/355672029739';
const SHOWROOM_HREF = '/#showroom';

export default function ServicePage({ service }: { service: ServiceConfig }) {
  const { lang } = useLang();

  return (
    <main className="bg-[#FAF8F4] text-[#15130F]">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 pb-16 pt-28 sm:px-8 sm:pb-24 sm:pt-32 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div>
            <Link
              href="/"
              className="text-[0.7rem] uppercase tracking-[0.22em] text-[#8B4A2E] hover:underline"
            >
              {copy.backHome[lang]}
            </Link>

            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mt-6 text-[0.7rem] uppercase tracking-[0.22em] text-[#8B4A2E]"
            >
              {service.eyebrow[lang]}
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="mt-4 text-balance font-serif font-normal leading-[1.05] tracking-tight"
              style={{
                fontFamily: 'var(--font-fraunces), Georgia, serif',
                fontSize: 'clamp(2.4rem, 5.5vw, 4.2rem)',
              }}
            >
              {service.headingLead[lang]}{' '}
              <span className="italic text-[#8B4A2E]">{service.headingAccent[lang]}</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="mt-6 max-w-xl text-lg leading-relaxed text-[#3A352C]"
            >
              {service.subhead[lang]}
            </motion.p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href={SHOWROOM_HREF}
                className="inline-flex items-center gap-2 rounded-full bg-[#15130F] px-6 py-3 text-sm font-medium text-[#FAF8F4] transition hover:bg-[#8B4A2E]"
              >
                {copy.visitCta[lang]}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href={WHATSAPP_HREF}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-[#15130F]/20 px-6 py-3 text-sm font-medium text-[#15130F] transition hover:border-[#8B4A2E] hover:text-[#8B4A2E]"
              >
                <MessageCircle className="h-4 w-4" />
                {copy.whatsappCta[lang]}
              </a>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative aspect-[4/5] overflow-hidden bg-[#E8E3DB] lg:aspect-[3/4]"
          >
            <img
              src={service.image}
              alt={service.imageAlt[lang]}
              className="h-full w-full object-cover"
              loading="eager"
              decoding="async"
            />
          </motion.div>
        </div>
      </section>

      {/* Intro */}
      <section className="border-t border-[#15130F]/10">
        <div className="mx-auto max-w-3xl px-6 py-20 sm:px-8 sm:py-28">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6 }}
            className="text-balance text-xl leading-relaxed text-[#15130F] sm:text-2xl"
            style={{ fontFamily: 'var(--font-fraunces), Georgia, serif' }}
          >
            {service.intro[lang]}
          </motion.p>
        </div>
      </section>

      {/* Includes */}
      <section className="bg-[#15130F] text-[#FAF8F4]">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 py-24 sm:px-8 sm:py-32 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div>
            <p className="text-[0.7rem] uppercase tracking-[0.22em] text-[#E8B894]">
              {service.includesTitle[lang]}
            </p>
            <h2
              className="mt-5 text-balance font-serif font-normal leading-[1.1]"
              style={{
                fontFamily: 'var(--font-fraunces), Georgia, serif',
                fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)',
              }}
            >
              {service.headingLead[lang]}{' '}
              <span className="italic text-[#E8B894]">{service.headingAccent[lang]}</span>
            </h2>
          </div>

          <ul role="list" className="grid gap-4 sm:grid-cols-2">
            {service.includes[lang].map((item, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: i * 0.05, duration: 0.5 }}
                className="flex items-start gap-3 border-t border-[#FAF8F4]/15 pt-4 text-[15px] leading-relaxed text-[#FAF8F4]/90 sm:text-base"
              >
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#E8B894]" />
                <span>{item}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </section>

      {/* Materials */}
      <section>
        <div className="mx-auto max-w-4xl px-6 py-24 sm:px-8 sm:py-32">
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5 }}
            className="text-[0.7rem] uppercase tracking-[0.22em] text-[#8B4A2E]"
          >
            {service.materialsTitle[lang]}
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="mt-6 text-lg leading-relaxed text-[#3A352C] sm:text-xl"
          >
            {service.materialsBody[lang]}
          </motion.p>
        </div>
      </section>

      {/* FAQ */}
      {service.faqs.length > 0 && (
        <section className="border-t border-[#15130F]/10 bg-[#FAF8F4]">
          <div className="mx-auto max-w-3xl px-6 py-24 sm:px-8 sm:py-32">
            <p className="text-[0.7rem] uppercase tracking-[0.22em] text-[#8B4A2E]">
              {copy.faqHeading[lang]}
            </p>
            <dl className="mt-10 border-t border-[#15130F]/15">
              {service.faqs.map((item, i) => (
                <div key={i} className="border-b border-[#15130F]/15">
                  <details className="group">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-left [&::-webkit-details-marker]:hidden sm:py-6">
                      <dt className="text-base font-medium tracking-tight sm:text-lg">
                        {item.q[lang]}
                      </dt>
                      <span
                        aria-hidden="true"
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#15130F]/20 text-[#15130F] transition-transform duration-300 group-open:rotate-45"
                      >
                        <Plus className="h-4 w-4" />
                      </span>
                    </summary>
                    <dd className="pb-6 pr-12 text-[15px] leading-relaxed text-[#3A352C] sm:text-base">
                      {item.a[lang]}
                    </dd>
                  </details>
                </div>
              ))}
            </dl>
          </div>
        </section>
      )}

      {/* Bottom CTA */}
      <section className="bg-[#15130F] text-[#FAF8F4]">
        <div className="mx-auto max-w-4xl px-6 py-24 text-center sm:px-8 sm:py-32">
          <h2
            className="text-balance font-serif font-normal leading-[1.05]"
            style={{
              fontFamily: 'var(--font-fraunces), Georgia, serif',
              fontSize: 'clamp(2rem, 4.5vw, 3.2rem)',
            }}
          >
            {copy.ctaHeading[lang]}
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-[#FAF8F4]/80 sm:text-lg">
            {copy.ctaSub[lang]}
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href={SHOWROOM_HREF}
              className="inline-flex items-center gap-2 rounded-full bg-[#FAF8F4] px-6 py-3 text-sm font-medium text-[#15130F] transition hover:bg-[#E8B894]"
            >
              {copy.visitCta[lang]}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href={WHATSAPP_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-[#FAF8F4]/30 px-6 py-3 text-sm font-medium text-[#FAF8F4] transition hover:border-[#E8B894] hover:text-[#E8B894]"
            >
              <MessageCircle className="h-4 w-4" />
              {copy.whatsappCta[lang]}
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
