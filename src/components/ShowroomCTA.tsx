'use client';

import { motion } from 'framer-motion';
import {
  MapPin,
  Phone,
  MessageSquare,
  Clock,
  Car,
  ArrowRight,
} from 'lucide-react';
import { useLang, type Dict } from '@/lib/i18n';
import { STORE, useOpenStatus, formatHM, whatsappHref } from '@/lib/store';

const copy = {
  eyebrow: { sq: 'Showroom', en: 'Showroom' },
  headingLead: { sq: 'Eja të prekësh', en: 'Come touch' },
  headingAccent: { sq: 'materialet.', en: 'the materials.' },
  subhead: {
    sq: 'Showroom-i ynë është te Km 8, autostrada Tiranë–Durrës. 5 minuta me makinë nga Qendra Tregtare TEG.',
    en: 'Our showroom sits at Km 8 on the Tirana–Durrës highway. 5 minutes by car from TEG shopping centre.',
  },
  addressLabel: { sq: 'Adresa', en: 'Address' },
  hoursLabel: { sq: 'Orari', en: 'Hours' },
  parkingLabel: { sq: 'Parkim falas', en: 'Free parking' },
  openNow: { sq: 'Hapur tani', en: 'Open now' },
  closed: { sq: 'Mbyllur', en: 'Closed' },
  until: { sq: 'deri në', en: 'until' },
  opens: { sq: 'hapet', en: 'opens' },
  hoursLineWeekdays: {
    sq: 'E hënë – E shtunë  ·  08:00 – 18:00',
    en: 'Mon – Sat  ·  08:00 – 18:00',
  },
  hoursLineSunday: {
    sq: 'E diel  ·  08:00 – 16:00',
    en: 'Sun  ·  08:00 – 16:00',
  },
  callLabel: { sq: 'Telefono', en: 'Call' },
  whatsappLabel: { sq: 'Shkruaj në WhatsApp', en: 'Message on WhatsApp' },
  googleMapsLabel: { sq: 'Hap në Google Maps', en: 'Open in Google Maps' },
  appleMapsLabel: { sq: 'Hap në Apple Maps', en: 'Open in Apple Maps' },
  whatsappPreset: {
    sq: 'Përshëndetje ROAL, dua të vij në showroom. A jeni të lirë sot?',
    en: 'Hello ROAL, I would like to visit the showroom. Are you available today?',
  },
} satisfies Record<string, Dict<string>>;

export default function ShowroomCTA() {
  const { lang } = useLang();
  const { openNow, closesAt, nextOpenDisplay } = useOpenStatus(lang);

  return (
    <section
      id="showroom"
      aria-labelledby="showroom-heading"
      className="relative bg-[#15130F] text-[#FAF8F4]"
    >
      <div className="mx-auto max-w-6xl px-6 py-24 sm:px-8 sm:py-32">
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
          id="showroom-heading"
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

        <div className="mt-12 grid grid-cols-1 gap-8 lg:mt-16 lg:grid-cols-5 lg:gap-10">
          {/* Info column */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2"
          >
            {/* Live status */}
            <div className="inline-flex items-center gap-2 text-sm">
              <span
                aria-hidden="true"
                className={
                  'inline-flex h-2 w-2 rounded-full ' +
                  (openNow ? 'bg-[#7FB98A]' : 'bg-[#E8B894]/60')
                }
              />
              <Clock className="h-4 w-4 text-[#FAF8F4]/60" aria-hidden="true" />
              {openNow ? (
                <span className="text-[#FAF8F4]/90">
                  <span className="font-medium text-[#E8B894]">{copy.openNow[lang]}</span>
                  {typeof closesAt === 'number' && (
                    <span className="text-[#FAF8F4]/60">
                      {' · '}
                      {copy.until[lang]} {formatHM(closesAt)}
                    </span>
                  )}
                </span>
              ) : (
                <span className="text-[#FAF8F4]/90">
                  <span className="font-medium">{copy.closed[lang]}</span>
                  {nextOpenDisplay && (
                    <span className="text-[#FAF8F4]/60">
                      {' · '}
                      {copy.opens[lang]} {nextOpenDisplay}
                    </span>
                  )}
                </span>
              )}
            </div>

            {/* Address */}
            <div className="mt-8 border-t border-white/12 pt-6">
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 text-[#FAF8F4]/60" aria-hidden="true" />
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-[#FAF8F4]/55">
                    {copy.addressLabel[lang]}
                  </p>
                  <p className="mt-1 text-base text-[#FAF8F4]">
                    {STORE.addressLine}
                  </p>
                </div>
              </div>
            </div>

            {/* Hours */}
            <div className="mt-6 border-t border-white/12 pt-6">
              <div className="flex items-start gap-3">
                <Clock className="mt-0.5 h-4 w-4 text-[#FAF8F4]/60" aria-hidden="true" />
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-[#FAF8F4]/55">
                    {copy.hoursLabel[lang]}
                  </p>
                  <p className="mt-1 text-base text-[#FAF8F4]">{copy.hoursLineWeekdays[lang]}</p>
                  <p className="text-base text-[#FAF8F4]">{copy.hoursLineSunday[lang]}</p>
                </div>
              </div>
            </div>

            {/* Parking */}
            <div className="mt-6 border-t border-white/12 pt-6">
              <div className="flex items-center gap-3">
                <Car className="h-4 w-4 text-[#FAF8F4]/60" aria-hidden="true" />
                <p className="text-base text-[#FAF8F4]">{copy.parkingLabel[lang]}</p>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a
                href={STORE.googleMaps}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#FAF8F4] px-5 py-3 text-sm font-medium text-[#15130F] transition-colors hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
              >
                <MapPin className="h-4 w-4" aria-hidden="true" />
                <span>{copy.googleMapsLabel[lang]}</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              </a>
              <a
                href={whatsappHref(copy.whatsappPreset[lang])}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
              >
                <MessageSquare className="h-4 w-4" aria-hidden="true" />
                <span>{copy.whatsappLabel[lang]}</span>
              </a>
              <a
                href={`tel:${STORE.phone}`}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                <span>{STORE.phonePretty}</span>
              </a>
            </div>

            {/* Apple Maps (small secondary link) */}
            <div className="mt-4 text-sm">
              <a
                href={STORE.appleMaps}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#E8B894] underline-offset-4 hover:underline"
              >
                {copy.appleMapsLabel[lang]}
              </a>
            </div>
          </motion.div>

          {/* Map column */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="lg:col-span-3"
          >
            <div className="relative overflow-hidden rounded-sm ring-1 ring-white/10">
              <iframe
                title={copy.addressLabel[lang] + ' — ' + STORE.name}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src={STORE.mapsEmbed}
                allowFullScreen
                className="h-[380px] w-full grayscale contrast-110 sm:h-[460px] lg:h-[560px]"
              />
              <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
