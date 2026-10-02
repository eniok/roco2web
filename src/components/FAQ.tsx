'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight, Plus } from 'lucide-react';
import { useLang, type Dict } from '@/lib/i18n';
import { FAQ_ITEMS } from '@/constants/faq';
import { whatsappHref } from '@/lib/store';
import SectionHeading from './SectionHeading';
import { EASE } from './ui';

const copy = {
  eyebrow: { sq: 'Pyetje të shpeshta', en: 'Frequently asked' },
  headingLead: { sq: 'Përgjigje të qarta,', en: 'Everything you' },
  headingAccent: { sq: 'para se të filloni.', en: 'need to know.' },
  noAnswer: { sq: 'Nuk e gjeni përgjigjen?', en: "Can't find your answer?" },
  askUs: { sq: 'Na shkruani në WhatsApp', en: 'Message us on WhatsApp' },
  whatsappPreset: {
    sq: 'Përshëndetje ROAL, kam një pyetje rreth një projekti interieri.',
    en: 'Hello ROAL, I have a question about bespoke furniture.',
  },
} satisfies Record<string, Dict<string>>;

export default function FAQ() {
  const { lang } = useLang();

  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="relative bg-linen text-ink"
    >
      <div className="mx-auto max-w-7xl px-6 py-24 sm:px-8 sm:py-32">
        <div className="grid gap-x-16 gap-y-14 lg:grid-cols-12">
          {/* Sticky heading column */}
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <SectionHeading
                id="faq-heading"
                index="05"
                eyebrow={copy.eyebrow}
                lead={copy.headingLead}
                accent={copy.headingAccent}
              />
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="mt-8 text-sm text-body"
              >
                {copy.noAnswer[lang]}{' '}
                <a
                  href={whatsappHref(copy.whatsappPreset[lang])}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-1 font-medium text-clay underline-offset-4 hover:underline"
                >
                  {copy.askUs[lang]}
                  <ArrowUpRight
                    className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </a>
              </motion.p>
            </div>
          </div>

          {/* Accordion column */}
          <div className="lg:col-span-8">
            <div className="border-t border-ink/10">
              {FAQ_ITEMS.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ delay: i * 0.04, duration: 0.5, ease: EASE }}
                  className="border-b border-ink/10"
                >
                  <details className="group">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-left [&::-webkit-details-marker]:hidden">
                      <span className="grid flex-1 grid-cols-[1.75rem_1fr] items-baseline gap-x-4">
                        <span
                          aria-hidden="true"
                          className="font-serif text-sm italic text-clay/60"
                        >
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <h3 className="text-lg font-medium tracking-tight transition-colors duration-300 group-hover:text-clay sm:text-xl">
                          {item.q[lang]}
                        </h3>
                      </span>
                      <span
                        aria-hidden="true"
                        className="flex h-9 w-9 shrink-0 items-center justify-center border border-ink/15 text-ink transition-all duration-300 group-open:rotate-45 group-open:border-clay group-open:text-clay group-hover:border-clay/60"
                      >
                        <Plus className="h-4 w-4" />
                      </span>
                    </summary>
                    <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-500 ease-out group-open:grid-rows-[1fr]">
                      <div className="overflow-hidden">
                        <p className="pb-7 pl-11 pr-4 text-[15px] leading-relaxed text-body sm:pr-16 sm:text-base">
                          {item.a[lang]}
                        </p>
                      </div>
                    </div>
                  </details>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
