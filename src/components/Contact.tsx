'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import {
  Mail,
  Phone,
  MessageSquare,
  MapPin,
  Download,
  Copy,
  Check,
  ArrowRight,
} from 'lucide-react';
import { useLang, type Dict } from '@/lib/i18n';
import { STORE, useOpenStatus, formatHM, whatsappHref } from '@/lib/store';
import SectionHeading from './SectionHeading';
import { btnGhostOnDark, btnSolidOnDark, EASE } from './ui';

const copy = {
  eyebrow: { sq: 'Kontakt', en: 'Contact' },
  headingLead: { sq: 'Le ta nisim', en: 'Ready to' },
  headingAccent: { sq: 'projektin tuaj.', en: 'start?' },
  subhead: {
    sq: 'Na tregoni për hapësirën dhe idenë tuaj. Ekipi ynë ju udhëheq nga konsultimi i parë deri te instalimi përfundimtar.',
    en: 'One WhatsApp message is enough to get started. We guide you from the first sketch to the final install.',
  },
  openNow: { sq: 'Hapur tani', en: 'Open now' },
  closed: { sq: 'Mbyllur', en: 'Closed' },
  until: { sq: 'deri në', en: 'until' },
  opens: { sq: 'hapet', en: 'opens' },
  whatsappLabel: { sq: 'Na shkruani në WhatsApp', en: 'Message on WhatsApp' },
  emailLabel: { sq: 'Email', en: 'Email' },
  phoneRow: { sq: 'Telefon', en: 'Phone' },
  addressRow: { sq: 'Adresa', en: 'Address' },
  vcard: { sq: 'Ruani kontaktin', en: 'Save contact' },
  copyPhone: { sq: 'Kopjoni numrin', en: 'Copy number' },
  copyEmail: { sq: 'Kopjoni email-in', en: 'Copy email' },
  whatsappPreset: {
    sq: 'Përshëndetje ROAL, dua të flasim për një projekt interieri.',
    en: 'Hello ROAL, I\u2019d like to learn more about a made-to-measure project.',
  },
  mobileCall: { sq: 'Telefononi', en: 'Call' },
  mobileChat: { sq: 'Mesazh', en: 'Chat' },
  mobileEmail: { sq: 'Email', en: 'Email' },
} satisfies Record<string, Dict<string>>;

export default function Contact() {
  const { lang } = useLang();
  const { openNow, closesAt, nextOpenDisplay } = useOpenStatus(lang);
  const [copied, setCopied] = React.useState<'phone' | 'email' | null>(null);

  function copyToClipboard(text: string, target: 'phone' | 'email') {
    navigator.clipboard?.writeText(text).then(() => {
      setCopied(target);
      setTimeout(() => setCopied(null), 1500);
    });
  }

  function downloadVCard() {
    const vcf = `BEGIN:VCARD\nVERSION:3.0\nN:;${STORE.name};;;\nFN:${STORE.name}\nORG:${STORE.name}\nTEL;TYPE=CELL,VOICE:${STORE.phone}\nEMAIL;TYPE=INTERNET:${STORE.email}\nADR;TYPE=WORK:;;${STORE.addressLine.replace(/,\s?/g, '\\, ')};;;;\nURL:${STORE.googleMaps}\nEND:VCARD`;
    const blob = new Blob([vcf], { type: 'text/vcard;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${STORE.name.replace(/\s+/g, '-')}.vcf`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="relative bg-ink text-paper"
    >
      <div className="mx-auto max-w-7xl px-6 py-24 sm:px-8 sm:py-32">
        <div className="grid gap-x-16 gap-y-14 lg:grid-cols-12">
          {/* Left: heading + primary actions */}
          <div className="lg:col-span-7">
            <SectionHeading
              id="contact-heading"
              index="07"
              eyebrow={copy.eyebrow}
              lead={copy.headingLead}
              accent={copy.headingAccent}
              sub={copy.subhead}
              tone="dark"
            />

            {/* Live status */}
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="mt-10 inline-flex items-center gap-2.5 border border-paper/20 px-4 py-2 text-[0.72rem] font-medium uppercase tracking-[0.16em]"
            >
              <span
                aria-hidden="true"
                className={`inline-flex h-1.5 w-1.5 rounded-full ${
                  openNow ? 'bg-moss' : 'bg-sand/60'
                }`}
              />
              {openNow ? (
                <>
                  <span className="text-sand">{copy.openNow[lang]}</span>
                  {typeof closesAt === 'number' && (
                    <span className="text-paper/50 normal-case tracking-normal">
                      {copy.until[lang]} {formatHM(closesAt)}
                    </span>
                  )}
                </>
              ) : (
                <>
                  <span>{copy.closed[lang]}</span>
                  {nextOpenDisplay && (
                    <span className="text-paper/50 normal-case tracking-normal">
                      {copy.opens[lang]} {nextOpenDisplay}
                    </span>
                  )}
                </>
              )}
            </motion.p>

            {/* Primary actions */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: 0.25, duration: 0.6, ease: EASE }}
              className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap"
            >
              <a
                href={whatsappHref(copy.whatsappPreset[lang])}
                target="_blank"
                rel="noopener noreferrer"
                className={btnSolidOnDark}
              >
                <MessageSquare className="h-4 w-4" aria-hidden="true" />
                <span>{copy.whatsappLabel[lang]}</span>
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </a>
              <a href={`tel:${STORE.phone}`} className={btnGhostOnDark}>
                <Phone className="h-4 w-4" aria-hidden="true" />
                <span>{STORE.phonePretty}</span>
              </a>
              <a href={`mailto:${STORE.email}`} className={btnGhostOnDark}>
                <Mail className="h-4 w-4" aria-hidden="true" />
                <span>{copy.emailLabel[lang]}</span>
              </a>
            </motion.div>
          </div>

          {/* Right: detail ledger */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: 0.15, duration: 0.6, ease: EASE }}
            className="lg:col-span-5 lg:pt-24"
          >
            <dl>
              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-paper/12 py-5">
                <dt className="flex items-center gap-3 text-[0.7rem] uppercase tracking-[0.18em] text-paper/50">
                  <Phone className="h-4 w-4" aria-hidden="true" />
                  {copy.phoneRow[lang]}
                </dt>
                <dd className="flex items-center gap-1">
                  <a
                    href={`tel:${STORE.phone}`}
                    className="text-[15px] font-medium underline-offset-4 hover:text-sand hover:underline"
                  >
                    {STORE.phonePretty}
                  </a>
                  <button
                    onClick={() => copyToClipboard(STORE.phone, 'phone')}
                    aria-label={copy.copyPhone[lang]}
                    className="p-2 text-paper/50 transition-colors hover:text-paper focus:outline-none focus-visible:ring-2 focus-visible:ring-paper/40"
                  >
                    {copied === 'phone' ? (
                      <Check className="h-4 w-4 text-sand" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </button>
                </dd>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-paper/12 py-5">
                <dt className="flex items-center gap-3 text-[0.7rem] uppercase tracking-[0.18em] text-paper/50">
                  <Mail className="h-4 w-4" aria-hidden="true" />
                  {copy.emailLabel[lang]}
                </dt>
                <dd className="flex items-center gap-1">
                  <a
                    href={`mailto:${STORE.email}`}
                    className="text-[15px] font-medium underline-offset-4 hover:text-sand hover:underline"
                  >
                    {STORE.email}
                  </a>
                  <button
                    onClick={() => copyToClipboard(STORE.email, 'email')}
                    aria-label={copy.copyEmail[lang]}
                    className="p-2 text-paper/50 transition-colors hover:text-paper focus:outline-none focus-visible:ring-2 focus-visible:ring-paper/40"
                  >
                    {copied === 'email' ? (
                      <Check className="h-4 w-4 text-sand" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </button>
                </dd>
              </div>

              <div className="flex flex-wrap items-start justify-between gap-3 border-y border-paper/12 py-5">
                <dt className="flex items-center gap-3 text-[0.7rem] uppercase tracking-[0.18em] text-paper/50">
                  <MapPin className="h-4 w-4" aria-hidden="true" />
                  {copy.addressRow[lang]}
                </dt>
                <dd className="text-right">
                  <a
                    href={STORE.googleMaps}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[15px] font-medium underline-offset-4 hover:text-sand hover:underline"
                  >
                    {STORE.addressLine}
                  </a>
                </dd>
              </div>
            </dl>

            <div className="mt-8">
              <button onClick={downloadVCard} className={btnGhostOnDark}>
                <Download className="h-4 w-4" aria-hidden="true" />
                {copy.vcard[lang]}
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Mobile sticky quick actions */}
      <div className="pointer-events-none fixed inset-x-4 bottom-4 z-30 sm:hidden">
        <div className="pointer-events-auto mx-auto max-w-md bg-ink shadow-[0_20px_50px_-12px_rgba(0,0,0,0.6)] ring-1 ring-paper/15">
          <div className="grid grid-cols-3 divide-x divide-paper/10">
            <a
              href={`tel:${STORE.phone}`}
              className="inline-flex items-center justify-center gap-2 px-3 py-4 text-[0.68rem] font-medium uppercase tracking-[0.14em] transition-colors hover:bg-paper/5"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              {copy.mobileCall[lang]}
            </a>
            <a
              href={whatsappHref(copy.whatsappPreset[lang])}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-3 py-4 text-[0.68rem] font-medium uppercase tracking-[0.14em] text-sand transition-colors hover:bg-paper/5"
            >
              <MessageSquare className="h-4 w-4" aria-hidden="true" />
              {copy.mobileChat[lang]}
            </a>
            <a
              href={`mailto:${STORE.email}`}
              className="inline-flex items-center justify-center gap-2 px-3 py-4 text-[0.68rem] font-medium uppercase tracking-[0.14em] transition-colors hover:bg-paper/5"
            >
              <Mail className="h-4 w-4" aria-hidden="true" />
              {copy.mobileEmail[lang]}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
