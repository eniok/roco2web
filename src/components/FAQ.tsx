'use client';

import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { useLang, type Dict } from '@/lib/i18n';
import { FAQ_ITEMS } from '@/constants/faq';

const copy = {
  eyebrow: { sq: 'Pyetje të shpeshta', en: 'Frequently asked' },
  headingLead: { sq: 'Gjithçka që', en: 'Everything you' },
  headingAccent: { sq: 'duhet ta dini.', en: 'need to know.' },
} satisfies Record<string, Dict<string>>;

export default function FAQ() {
  const { lang } = useLang();

  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="relative bg-[#FAF8F4] text-[#15130F]"
    >
      <div className="mx-auto max-w-4xl px-6 py-24 sm:px-8 sm:py-32">
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
          id="faq-heading"
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

        <dl className="mt-12 border-t border-[#15130F]/15 sm:mt-16">
          {FAQ_ITEMS.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: i * 0.05, duration: 0.5 }}
              className="border-b border-[#15130F]/15"
            >
              <details className="group">
                <summary
                  className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-left sm:py-6 [&::-webkit-details-marker]:hidden"
                >
                  <dt className="text-lg font-medium tracking-tight sm:text-xl">
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
            </motion.div>
          ))}
        </dl>
      </div>
    </section>
  );
}
