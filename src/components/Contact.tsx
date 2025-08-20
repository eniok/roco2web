'use client';

import * as React from 'react';
import { motion, useMotionValue, useSpring, useMotionTemplate } from 'framer-motion';
import {
  Mail,
  Phone,
  MessageSquare,
  MapPin,
  Clock,
  ArrowRight,
  Download,
  Copy,
  Check,
  ExternalLink,
} from 'lucide-react';

/**
 * Contact — ultra‑polished contact section (LIGHT THEME, red accents only)
 * - Bright, clean layout with subtle red tints (no orange/yellow)
 * - Glassy white cards with gentle borders/shadows
 * - Live "Open now" status for Europe/Tirane store hours
 * - One‑tap actions (Call / WhatsApp / Email) + copy‑to‑clipboard micro‑interactions
 * - vCard download (adds to Contacts in iOS/macOS/Android)
 * - Embeddable map + dual Directions (Apple/Google)
 * - Mobile quick actions bar (sticky)
 * - Accessible, keyboard friendly, reduced‑motion aware
 */

const STORE = {
  name: 'RO-AL Mobilieri',
  phone: '+355672029739',
  phonePretty: '+355 67 202 9739',
  email: 'info@roalmobileri.com',
  whatsapp: 'https://wa.me/355672029739',
  addressLine: 'Km 8, Autostrada Tiranë–Durrës, Tiranë 1000',
  googleMaps: 'https://maps.app.goo.gl/c9y8jRiAwvtSGaRaA',
  appleMaps:
    'https://maps.apple.com/?address=Autostrada%20Tiran%C3%AB%E2%80%93Durr%C3%ABs%2C%20Km%208%2C%20Tiran%C3%AB%201000,%20Albania&ll=41.3520,19.7690&q=RO-AL%20Mobilieri',
  // Weekly hours (minutes from midnight, local Europe/Tirane)
  hours: {
    0: [[8 * 60, 16 * 60]], // Sun 08:00–16:00
    1: [[8 * 60, 18 * 60]], // Mon 08:00–18:00
    2: [[8 * 60, 18 * 60]],
    3: [[8 * 60, 18 * 60]],
    4: [[8 * 60, 18 * 60]],
    5: [[8 * 60, 18 * 60]],
    6: [[8 * 60, 18 * 60]], // Sat 08:00–18:00
  } as Record<number, Array<[number, number]>>,
};

function useTiraneNow() {
  const tz = 'Europe/Tirane';
  const [now, setNow] = React.useState(() => new Date());

  React.useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 30_000);
    return () => clearInterval(id);
  }, []);

  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: tz,
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).formatToParts(now);

  const hh = Number(parts.find((p) => p.type === 'hour')?.value || '0');
  const mm = Number(parts.find((p) => p.type === 'minute')?.value || '0');

  const weekdayShort = new Intl.DateTimeFormat('en-GB', {
    timeZone: tz,
    weekday: 'short',
  }).format(now); // Mon, Tue, ...

  const weekdayIndex = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(
    weekdayShort
  );

  return { minutes: hh * 60 + mm, weekdayIndex, tz };
}

function nextOpening(nowMinutes: number, weekdayIndex: number) {
  // Look up to 7 days ahead for the next opening interval
  for (let i = 0; i < 7; i++) {
    const day = (weekdayIndex + i) % 7;
    const intervals = STORE.hours[day] || [];
    for (const [open,] of intervals) {
      const candidateMinutes = i === 0 && nowMinutes <= open ? open : i > 0 ? open : null;
      if (candidateMinutes !== null) {
        return { dayOffset: i, day, minutes: candidateMinutes };
      }
    }
  }
  return null;
}

function formatHM(m: number) {
  const h = Math.floor(m / 60)
    .toString()
    .padStart(2, '0');
  const mm = (m % 60).toString().padStart(2, '0');
  return `${h}:${mm}`;
}

function useOpenStatus() {
  const { minutes, weekdayIndex, tz } = useTiraneNow();
  const today = STORE.hours[weekdayIndex] || [];
  let openNow = false;
  let closesAt: number | null = null;

  for (const [open, close] of today) {
    if (minutes >= open && minutes < close) {
      openNow = true;
      closesAt = close;
      break;
    }
  }

  let nextOpenDisplay: string | null = null;
  if (!openNow) {
    const next = nextOpening(minutes, weekdayIndex);
    if (next) {
      const label =
        next.dayOffset === 0
          ? 'today'
          : ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][next.day];
      nextOpenDisplay = `${label} ${formatHM(next.minutes)}`;
    }
  }

  return {
    tz,
    openNow,
    closesAt,
    nextOpenDisplay,
    todayWindows: today,
  };
}

export default function Contact() {
  const { openNow, closesAt, nextOpenDisplay } = useOpenStatus();

  // Animated spotlight controls (subtle on light background)
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const sx = useSpring(rx, { stiffness: 120, damping: 20, mass: 0.3 });
  const sy = useSpring(ry, { stiffness: 120, damping: 20, mass: 0.3 });
  const gradient = useMotionTemplate`radial-gradient(600px 200px at ${sx}% ${sy}%, rgba(239,68,68,0.06), rgba(255,255,255,0))`;

  const [copied, setCopied] = React.useState<'phone' | 'email' | null>(null);
  const [gradientString, setGradientString] = React.useState('');

  React.useEffect(() => {
    const unsubscribe = gradient.on('change', setGradientString);
    return unsubscribe;
  }, [gradient]);

  function copy(text: string, target: 'phone' | 'email') {
    navigator.clipboard?.writeText(text).then(() => {
      setCopied(target);
      setTimeout(() => setCopied(null), 1500);
    });
  }

  function downloadVCard() {
    const vcf = `BEGIN:VCARD\nVERSION:3.0\nN:;${STORE.name};;;\nFN:${STORE.name}\nORG:${STORE.name}\nTEL;TYPE=CELL,VOICE:${STORE.phone}\nEMAIL;TYPE=INTERNET:${STORE.email}\nADR;TYPE=WORK:;;${STORE.addressLine.replace(
      /,\s?/g,
      '\\, '
    )};;;;\nURL:${STORE.googleMaps}\nEND:VCARD`;
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
      className="relative overflow-hidden bg-white text-neutral-900"
      onMouseMove={(e) => {
        const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
        const x = ((e.clientX - r.left) / r.width) * 100;
        const y = ((e.clientY - r.top) / r.height) * 100;
        rx.set(x);
        ry.set(y);
      }}
    >
      {/* Ambient backdrop */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(60%_50%_at_50%_30%,black,transparent)]"
        style={{ background: gradientString }}
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(80rem_40rem_at_10%_-10%,#ef444433,transparent),radial-gradient(60rem_30rem_at_120%_10%,#ef44441a,transparent)]"
      />
      <div
        aria-hidden
        className="absolute inset-0 opacity-15"
        style={{
          backgroundImage:
            'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR4nGNgYAAAAAMAASsJTYQAAAAASUVORK5CYII=")',
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 container mx-auto px-6 md:px-10 py-20"
      >
        {/* Heading */}
        <div className="mx-auto max-w-3xl text-center mb-12">
          <h2 id="contact-heading" className="text-balance text-4xl md:text-5xl font-semibold tracking-tight">
            Let’s design a space you’ll{' '}
            <span className="inline-block bg-gradient-to-r from-red-600 via-red-500 to-red-400 bg-clip-text text-transparent">
              love to live in
            </span>
          </h2>
          <p className="mt-4 text-lg text-neutral-600">
            Visit our studio, call, or message us on WhatsApp. We’ll guide you from idea to installation.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Contact Card */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="relative"
          >
            <div className="relative p-0.5 rounded-3xl bg-gradient-to-br from-red-500/10 via-red-500/5 to-transparent">
              <div className="rounded-[calc(theme(borderRadius.3xl)-2px)] bg-white/80 backdrop-blur-xl ring-1 ring-black/5 shadow-sm">
                {/* Top */}
                <div className="p-6 md:p-8">
                  <div className="flex items-center gap-3 text-sm text-neutral-600">
                    <Clock className={'h-4 w-4 shrink-0'} />
                    {openNow ? (
                      <span>
                        <span className="font-medium text-red-600">Open now</span>
                        {typeof closesAt === 'number' && (
                          <span className="text-neutral-500"> · until {formatHM(closesAt)}</span>
                        )}
                      </span>
                    ) : (
                      <span>
                        <span className="font-medium text-neutral-700">Closed</span>
                        {nextOpenDisplay && (
                          <span className="text-neutral-500"> · opens {nextOpenDisplay}</span>
                        )}
                      </span>
                    )}
                  </div>

                  <h3 className="mt-4 text-2xl font-semibold">{STORE.name}</h3>

                  {/* Actions */}
                  <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <a
                      href={STORE.whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center justify-center gap-2 rounded-2xl border border-neutral-200 bg-white px-4 py-3 hover:bg-neutral-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-300"
                    >
                      <MessageSquare className="h-4 w-4" />
                      <span>WhatsApp</span>
                      <ArrowRight className="h-4 w-4 opacity-0 -translate-x-1 transition-all group-hover:opacity-100 group-hover:translate-x-0" />
                    </a>
                    <a
                      href={`tel:${STORE.phone}`}
                      className="inline-flex items-center justify-center gap-2 rounded-2xl border border-neutral-200 bg-white px-4 py-3 hover:bg-neutral-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-300"
                    >
                      <Phone className="h-4 w-4" />
                      <span>Call</span>
                    </a>
                    <a
                      href={`mailto:${STORE.email}`}
                      className="inline-flex items-center justify-center gap-2 rounded-2xl border border-neutral-200 bg-white px-4 py-3 hover:bg-neutral-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-300"
                    >
                      <Mail className="h-4 w-4" />
                      <span>Email</span>
                    </a>
                  </div>

                  {/* Lines */}
                  <dl className="mt-6 space-y-4 text-sm">
                    <div className="flex items-center justify-between gap-3">
                      <dt className="flex items-center gap-2 text-neutral-600">
                        <Phone className="h-4 w-4" /> Phone
                      </dt>
                      <dd className="flex items-center gap-2">
                        <a href={`tel:${STORE.phone}`} className="font-medium hover:underline">
                          {STORE.phonePretty}
                        </a>
                        <button
                          onClick={() => copy(STORE.phone, 'phone')}
                          aria-label="Copy phone"
                          className="rounded-full p-1.5 hover:bg-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-300"
                        >
                          {copied === 'phone' ? <Check className="h-4 w-4 text-red-600" /> : <Copy className="h-4 w-4" />}
                        </button>
                      </dd>
                    </div>
                    <div className="flex items-center justify-between gap-3">
                      <dt className="flex items-center gap-2 text-neutral-600">
                        <Mail className="h-4 w-4" /> Email
                      </dt>
                      <dd className="flex items-center gap-2">
                        <a href={`mailto:${STORE.email}`} className="font-medium hover:underline">
                          {STORE.email}
                        </a>
                        <button
                          onClick={() => copy(STORE.email, 'email')}
                          aria-label="Copy email"
                          className="rounded-full p-1.5 hover:bg-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-300"
                        >
                          {copied === 'email' ? <Check className="h-4 w-4 text-red-600" /> : <Copy className="h-4 w-4" />}
                        </button>
                      </dd>
                    </div>
                    <div className="flex items-center justify-between gap-3">
                      <dt className="flex items-center gap-2 text-neutral-600">
                        <MapPin className="h-4 w-4" /> Address
                      </dt>
                      <dd className="flex items-center gap-2">
                        <a
                          href={STORE.googleMaps}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-medium hover:underline inline-flex items-center gap-1"
                        >
                          {STORE.addressLine}
                          <ExternalLink className="h-3.5 w-3.5" />
                        </a>
                      </dd>
                    </div>
                  </dl>

                  {/* Tools */}
                  <div className="mt-6 flex flex-wrap items-center gap-3">
                    <button
                      onClick={downloadVCard}
                      className="inline-flex items-center gap-2 rounded-xl border border-neutral-200 bg-white px-3 py-2 text-sm hover:bg-neutral-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-300"
                    >
                      <Download className="h-4 w-4" /> Add to Contacts
                    </button>
                    <a
                      href={STORE.appleMaps}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-xl border border-neutral-200 bg-white px-3 py-2 text-sm hover:bg-neutral-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-300"
                    >
                      Apple Maps
                    </a>
                    <a
                      href={STORE.googleMaps}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-xl border border-neutral-200 bg-white px-3 py-2 text-sm hover:bg-neutral-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-300"
                    >
                      Google Maps
                    </a>
                  </div>
                </div>

                {/* Map embed */}
                <div className="relative overflow-hidden rounded-b-[inherit]">
                  <iframe
                    title="Map"
                    loading="lazy"
                    className="h-64 w-full grayscale-[15%] contrast-110"
                    referrerPolicy="no-referrer-when-downgrade"
                    src={
                      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3898.815510747332!2d19.695570000000004!3d41.367774999999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x13502e909a5e14ef%3A0xaa02fd9bc40743d5!2sRO-AL%20Mobileri!5e1!3m2!1sen!2s!4v1755731243285!5m2!1sen!2s'
                    }
                    allowFullScreen
                  />
                  <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-black/5" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Inquiry Form (client-side, opens WhatsApp with prefilled message) */}
          <motion.form
            onSubmit={(e) => {
              e.preventDefault();
              const f = e.currentTarget as HTMLFormElement;
              const data = new FormData(f);
              const name = (data.get('name') as string) || '';
              const phone = (data.get('phone') as string) || '';
              const email = (data.get('email') as string) || '';
              const project = (data.get('project') as string) || '';
              const message = (data.get('message') as string) || '';
              const text = `Hello RO-AL, I'm ${name}. Project: ${project}. Phone: ${phone}. Email: ${email}.\n\n${message}`;
              const url = `${STORE.whatsapp}?text=${encodeURIComponent(text)}`;
              window.open(url, '_blank');
            }}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="relative"
            aria-label="Start your project"
          >
            <div className="relative p-0.5 rounded-3xl bg-gradient-to-br from-red-500/10 via-red-500/5 to-transparent">
              <div className="rounded-[calc(theme(borderRadius.3xl)-2px)] bg-white/80 backdrop-blur-xl ring-1 ring-black/5 p-6 md:p-8 shadow-sm">
                <div className="flex items-center gap-3 text-sm text-neutral-600">
                  <span className="inline-flex h-2 w-2 rounded-full bg-red-500" />
                  <span>Typically responds quickly</span>
                </div>
                <h3 className="mt-4 text-2xl font-semibold">Start your project</h3>
                <p className="mt-2 text-neutral-600 text-sm">
                  Tell us a bit about your space. We’ll get back with a sketch & quote.
                </p>

                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <label className="group block">
                    <span className="mb-1 block text-sm text-neutral-700">Name</span>
                    <input
                      required
                      name="name"
                      placeholder="Your full name"
                      className="w-full rounded-2xl border border-neutral-300 bg-white px-4 py-3 text-neutral-900 placeholder:text-neutral-400 outline-none focus:border-red-300 focus:ring-2 focus:ring-red-200"
                    />
                  </label>

                  <label className="group block">
                    <span className="mb-1 block text-sm text-neutral-700">Phone</span>
                    <input
                      required
                      name="phone"
                      inputMode="tel"
                      placeholder="e.g. +355 67 202 9739"
                      className="w-full rounded-2xl border border-neutral-300 bg-white px-4 py-3 text-neutral-900 placeholder:text-neutral-400 outline-none focus:border-red-300 focus:ring-2 focus:ring-red-200"
                    />
                  </label>

                  <label className="group block sm:col-span-2">
                    <span className="mb-1 block text-sm text-neutral-700">Email (optional)</span>
                    <input
                      name="email"
                      type="email"
                      placeholder="you@example.com"
                      className="w-full rounded-2xl border border-neutral-300 bg-white px-4 py-3 text-neutral-900 placeholder:text-neutral-400 outline-none focus:border-red-300 focus:ring-2 focus:ring-red-200"
                    />
                  </label>

                  <label className="group block sm:col-span-2">
                    <span className="mb-1 block text-sm text-neutral-700">Project type</span>
                    <select
                      name="project"
                      className="w-full rounded-2xl border border-neutral-300 bg-white px-4 py-3 text-neutral-900 outline-none focus:border-red-300 focus:ring-2 focus:ring-red-200"
                      defaultValue="Kitchen / Wardrobe"
                    >
                      <option>Kitchen / Wardrobe</option>
                      <option>Living room / Sofa</option>
                      <option>Bedroom</option>
                      <option>Office / Commercial</option>
                      <option>Other</option>
                    </select>
                  </label>

                  <label className="group block sm:col-span-2">
                    <span className="mb-1 block text-sm text-neutral-700">Message</span>
                    <textarea
                      required
                      name="message"
                      rows={5}
                      placeholder="Room size, style, timeline…"
                      className="w-full resize-y rounded-2xl border border-neutral-300 bg-white px-4 py-3 text-neutral-900 placeholder:text-neutral-400 outline-none focus:border-red-300 focus:ring-2 focus:ring-red-200"
                    />
                  </label>
                </div>

                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 rounded-2xl bg-red-600 text-white px-5 py-3 font-medium shadow-sm hover:bg-red-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-300"
                  >
                    Send via WhatsApp <ArrowRight className="h-4 w-4" />
                  </button>
                  <a
                    href={`mailto:${STORE.email}`}
                    className="inline-flex items-center gap-2 rounded-2xl border border-neutral-200 bg-white px-4 py-3 text-sm hover:bg-neutral-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-300"
                  >
                    Or email us
                  </a>
                </div>

                {/* Little badges */}
                <div className="mt-6 flex flex-wrap gap-2 text-xs">
                  <span className="rounded-full border border-red-100 bg-red-50 text-red-700 px-3 py-1">Custom made</span>
                  <span className="rounded-full border border-red-100 bg-red-50 text-red-700 px-3 py-1">3D project preview</span>
                  <span className="rounded-full border border-red-100 bg-red-50 text-red-700 px-3 py-1">Delivery across Albania</span>
                </div>
              </div>
            </div>
          </motion.form>
        </div>

        {/* Mobile quick actions */}
        <div className="fixed inset-x-4 bottom-4 z-20 sm:hidden">
          <div className="mx-auto max-w-md rounded-2xl bg-white/90 backdrop-blur-xl ring-1 ring-black/10 p-2 shadow-lg">
            <div className="grid grid-cols-3 gap-2">
              <a
                href={`tel:${STORE.phone}`}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-neutral-100 px-3 py-3 text-sm font-medium hover:bg-neutral-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-300"
              >
                <Phone className="h-4 w-4" /> Call
              </a>
              <a
                href={STORE.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-neutral-100 px-3 py-3 text-sm font-medium hover:bg-neutral-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-300"
              >
                <MessageSquare className="h-4 w-4" /> Chat
              </a>
              <a
                href={`mailto:${STORE.email}`}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-neutral-100 px-3 py-3 text-sm font-medium hover:bg-neutral-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-300"
              >
                <Mail className="h-4 w-4" /> Email
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
