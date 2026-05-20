'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import {
  Mail,
  Phone,
  MessageSquare,
  MapPin,
  Clock,
  Download,
  Copy,
  Check,
  ArrowRight,
} from 'lucide-react';
import { useLang, type Dict } from '@/lib/i18n';
import { STORE, useOpenStatus, formatHM, whatsappHref } from '@/lib/store';

const copy = {
  eyebrow: { sq: 'Kontakt', en: 'Contact' },
  headingLead: { sq: 'Gati të', en: 'Ready to' },
  headingAccent: { sq: 'fillojmë?', en: 'start?' },
  subhead: {
    sq: 'Një mesazh në WhatsApp mjafton për të nisur. Ne ju shoqërojmë nga skica e parë deri te instalimi përfundimtar.',
    en: 'One WhatsApp message is enough to get started. We guide you from the first sketch to the final install.',
  },
  openNow: { sq: 'Hapur tani', en: 'Open now' },
  closed: { sq: 'Mbyllur', en: 'Closed' },
  until: { sq: 'deri në', en: 'until' },
  opens: { sq: 'hapet', en: 'opens' },
  whatsappLabel: { sq: 'Shkruaj në WhatsApp', en: 'Message on WhatsApp' },
  callLabel: { sq: 'Telefono', en: 'Call' },
  emailLabel: { sq: 'Email', en: 'Email' },
  phoneRow: { sq: 'Telefon', en: 'Phone' },
  addressRow: { sq: 'Adresa', en: 'Address' },
  vcard: { sq: 'Ruaj kontaktin', en: 'Save contact' },
  copyPhone: { sq: 'Kopjo numrin', en: 'Copy number' },
  copyEmail: { sq: 'Kopjo email-in', en: 'Copy email' },
  whatsappPreset: {
    sq: 'Përshëndetje ROAL, dua të mësoj më shumë për një projekt me porosi.',
    en: 'Hello ROAL, I\u2019d like to learn more about a made-to-measure project.',
  },
  mobileCall: { sq: 'Telefono', en: 'Call' },
  mobileChat: { sq: 'Chat', en: 'Chat' },
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
          id="contact-heading"
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

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="mt-5 max-w-2xl text-base leading-relaxed text-[#3A352C] sm:text-lg"
        >
          {copy.subhead[lang]}
        </motion.p>

        {/* Live status */}
        <div className="mt-10 inline-flex items-center gap-2 text-sm">
          <span
            aria-hidden="true"
            className={
              'inline-flex h-2 w-2 rounded-full ' +
              (openNow ? 'bg-[#5E8B66]' : 'bg-[#8B4A2E]/70')
            }
          />
          <Clock className="h-4 w-4 text-[#15130F]/60" aria-hidden="true" />
          {openNow ? (
            <span>
              <span className="font-medium text-[#8B4A2E]">{copy.openNow[lang]}</span>
              {typeof closesAt === 'number' && (
                <span className="text-[#15130F]/60">
                  {' · '}
                  {copy.until[lang]} {formatHM(closesAt)}
                </span>
              )}
            </span>
          ) : (
            <span>
              <span className="font-medium">{copy.closed[lang]}</span>
              {nextOpenDisplay && (
                <span className="text-[#15130F]/60">
                  {' · '}
                  {copy.opens[lang]} {nextOpenDisplay}
                </span>
              )}
            </span>
          )}
        </div>

        {/* Primary actions */}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <a
            href={whatsappHref(copy.whatsappPreset[lang])}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#15130F] px-5 py-3 text-sm font-medium text-[#FAF8F4] transition-colors hover:bg-black focus:outline-none focus-visible:ring-2 focus-visible:ring-[#15130F]/40"
          >
            <MessageSquare className="h-4 w-4" aria-hidden="true" />
            <span>{copy.whatsappLabel[lang]}</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </a>
          <a
            href={`tel:${STORE.phone}`}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-[#15130F]/20 px-5 py-3 text-sm font-medium text-[#15130F] transition-colors hover:bg-[#15130F]/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#15130F]/30"
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
            <span>{STORE.phonePretty}</span>
          </a>
          <a
            href={`mailto:${STORE.email}`}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-[#15130F]/20 px-5 py-3 text-sm font-medium text-[#15130F] transition-colors hover:bg-[#15130F]/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#15130F]/30"
          >
            <Mail className="h-4 w-4" aria-hidden="true" />
            <span>{copy.emailLabel[lang]}</span>
          </a>
        </div>

        {/* Detail rows */}
        <dl className="mt-12 border-t border-[#15130F]/15">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#15130F]/15 py-5">
            <dt className="flex items-center gap-2 text-sm text-[#3A352C]">
              <Phone className="h-4 w-4 text-[#15130F]/60" aria-hidden="true" />
              {copy.phoneRow[lang]}
            </dt>
            <dd className="flex items-center gap-2">
              <a href={`tel:${STORE.phone}`} className="text-[15px] font-medium hover:underline underline-offset-4">
                {STORE.phonePretty}
              </a>
              <button
                onClick={() => copyToClipboard(STORE.phone, 'phone')}
                aria-label={copy.copyPhone[lang]}
                className="rounded-full p-1.5 text-[#15130F]/60 hover:bg-[#15130F]/5 hover:text-[#15130F] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#15130F]/30"
              >
                {copied === 'phone' ? <Check className="h-4 w-4 text-[#5E8B66]" /> : <Copy className="h-4 w-4" />}
              </button>
            </dd>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#15130F]/15 py-5">
            <dt className="flex items-center gap-2 text-sm text-[#3A352C]">
              <Mail className="h-4 w-4 text-[#15130F]/60" aria-hidden="true" />
              {copy.emailLabel[lang]}
            </dt>
            <dd className="flex items-center gap-2">
              <a href={`mailto:${STORE.email}`} className="text-[15px] font-medium hover:underline underline-offset-4">
                {STORE.email}
              </a>
              <button
                onClick={() => copyToClipboard(STORE.email, 'email')}
                aria-label={copy.copyEmail[lang]}
                className="rounded-full p-1.5 text-[#15130F]/60 hover:bg-[#15130F]/5 hover:text-[#15130F] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#15130F]/30"
              >
                {copied === 'email' ? <Check className="h-4 w-4 text-[#5E8B66]" /> : <Copy className="h-4 w-4" />}
              </button>
            </dd>
          </div>

          <div className="flex flex-wrap items-start justify-between gap-3 border-b border-[#15130F]/15 py-5">
            <dt className="flex items-center gap-2 text-sm text-[#3A352C]">
              <MapPin className="h-4 w-4 text-[#15130F]/60" aria-hidden="true" />
              {copy.addressRow[lang]}
            </dt>
            <dd>
              <a
                href={STORE.googleMaps}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[15px] font-medium hover:underline underline-offset-4"
              >
                {STORE.addressLine}
              </a>
            </dd>
          </div>
        </dl>

        <div className="mt-8">
          <button
            onClick={downloadVCard}
            className="inline-flex items-center gap-2 rounded-full border border-[#15130F]/20 px-4 py-2 text-sm text-[#15130F] transition-colors hover:bg-[#15130F]/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#15130F]/30"
          >
            <Download className="h-4 w-4" aria-hidden="true" />
            {copy.vcard[lang]}
          </button>
        </div>
      </div>

      {/* Mobile sticky quick actions */}
      <div className="pointer-events-none fixed inset-x-4 bottom-4 z-30 sm:hidden">
        <div className="pointer-events-auto mx-auto max-w-md rounded-2xl bg-[#15130F] text-[#FAF8F4] shadow-lg ring-1 ring-white/10">
          <div className="grid grid-cols-3 gap-1 p-1">
            <a
              href={`tel:${STORE.phone}`}
              className="inline-flex items-center justify-center gap-2 rounded-xl px-3 py-3 text-sm font-medium hover:bg-white/5"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              {copy.mobileCall[lang]}
            </a>
            <a
              href={whatsappHref(copy.whatsappPreset[lang])}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl px-3 py-3 text-sm font-medium hover:bg-white/5"
            >
              <MessageSquare className="h-4 w-4" aria-hidden="true" />
              {copy.mobileChat[lang]}
            </a>
            <a
              href={`mailto:${STORE.email}`}
              className="inline-flex items-center justify-center gap-2 rounded-xl px-3 py-3 text-sm font-medium hover:bg-white/5"
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
