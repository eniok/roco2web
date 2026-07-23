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
import SectionHeading from './SectionHeading';
import { btnGhostOnLight, btnSolidOnLight, EASE } from './ui';

const copy = {
  eyebrow: { sq: 'Showroom', en: 'Showroom' },
  headingLead: { sq: 'Eja të prekësh', en: 'Come touch' },
  headingAccent: { sq: 'materialet.', en: 'the materials.' },
  subhead: {
    sq: 'Showroom-i ynë është te Km 8, autostrada Tiranë–Durrës. 5 minuta me makinë nga Qendra Tregtare City Park.',
    en: 'Our showroom sits at Km 8 on the Tirana–Durrës highway. 5 minutes by car from City Park shopping centre.',
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
      className="relative bg-paper text-ink"
    >
      <div className="mx-auto max-w-7xl px-6 py-24 sm:px-8 sm:py-32">
        <SectionHeading
          id="showroom-heading"
          index="04"
          eyebrow={copy.eyebrow}
          lead={copy.headingLead}
          accent={copy.headingAccent}
          sub={copy.subhead}
        />

        <div className="mt-14 grid grid-cols-1 gap-12 sm:mt-20 lg:grid-cols-5 lg:gap-16">
          {/* Info column */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="lg:col-span-2"
          >
            {/* Live status */}
            <p className="inline-flex items-center gap-2.5 border border-ink/15 px-4 py-2 text-[0.72rem] font-medium uppercase tracking-[0.16em]">
              <span
                aria-hidden="true"
                className={`inline-flex h-1.5 w-1.5 rounded-full ${openNow ? 'bg-moss' : 'bg-clay/70'
                  }`}
              />
              {openNow ? (
                <>
                  <span className="text-clay">{copy.openNow[lang]}</span>
                  {typeof closesAt === 'number' && (
                    <span className="text-ink/50 normal-case tracking-normal">
                      {copy.until[lang]} {formatHM(closesAt)}
                    </span>
                  )}
                </>
              ) : (
                <>
                  <span>{copy.closed[lang]}</span>
                  {nextOpenDisplay && (
                    <span className="text-ink/50 normal-case tracking-normal">
                      {copy.opens[lang]} {nextOpenDisplay}
                    </span>
                  )}
                </>
              )}
            </p>

            {/* Details ledger */}
            <dl className="mt-10">
              <div className="border-t border-ink/10 py-6">
                <dt className="flex items-center gap-4 text-[0.65rem] uppercase tracking-[0.2em] text-ink/50">
                  <MapPin className="h-4 w-4 shrink-0 text-clay" aria-hidden="true" />
                  {copy.addressLabel[lang]}
                </dt>
                <dd className="mt-1.5 pl-8 text-base text-ink">{STORE.addressLine}</dd>
              </div>
              <div className="border-t border-ink/10 py-6">
                <dt className="flex items-center gap-4 text-[0.65rem] uppercase tracking-[0.2em] text-ink/50">
                  <Clock className="h-4 w-4 shrink-0 text-clay" aria-hidden="true" />
                  {copy.hoursLabel[lang]}
                </dt>
                <dd className="mt-1.5 pl-8 text-base text-ink">{copy.hoursLineWeekdays[lang]}</dd>
                <dd className="pl-8 text-base text-ink">{copy.hoursLineSunday[lang]}</dd>
              </div>
            </dl>
            <p className="flex items-center gap-4 border-y border-ink/10 py-6 text-base text-ink">
              <Car className="h-4 w-4 shrink-0 text-clay" aria-hidden="true" />
              {copy.parkingLabel[lang]}
            </p>

            {/* Actions */}
            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a
                href={STORE.googleMaps}
                target="_blank"
                rel="noopener noreferrer"
                className={btnSolidOnLight}
              >
                <MapPin className="h-4 w-4" aria-hidden="true" />
                <span>{copy.googleMapsLabel[lang]}</span>
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </a>
              <a
                href={whatsappHref(copy.whatsappPreset[lang])}
                target="_blank"
                rel="noopener noreferrer"
                className={btnGhostOnLight}
              >
                <MessageSquare className="h-4 w-4" aria-hidden="true" />
                <span>{copy.whatsappLabel[lang]}</span>
              </a>
              <a href={`tel:${STORE.phone}`} className={btnGhostOnLight}>
                <Phone className="h-4 w-4" aria-hidden="true" />
                <span>{STORE.phonePretty}</span>
              </a>
            </div>

            <p className="mt-5 text-sm">
              <a
                href={STORE.appleMaps}
                target="_blank"
                rel="noopener noreferrer"
                className="text-clay underline-offset-4 transition-colors hover:text-ink hover:underline"
              >
                {copy.appleMapsLabel[lang]}
              </a>
            </p>
          </motion.div>

          {/* Map column */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: 0.1, duration: 0.6, ease: EASE }}
            className="lg:col-span-3"
          >
            <div className="relative h-full min-h-[380px] overflow-hidden ring-1 ring-ink/15">
              <iframe
                title={copy.addressLabel[lang] + ' — ' + STORE.name}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src={STORE.mapsEmbed}
                allowFullScreen
                className="absolute inset-0 h-full w-full grayscale contrast-110"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-ink/10"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
