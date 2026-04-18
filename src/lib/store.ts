'use client';

import * as React from 'react';
import type { Lang } from './i18n';

export const STORE = {
  name: 'RO-AL Mobilieri',
  phone: '+355672029739',
  phonePretty: '+355 67 202 9739',
  email: 'info@roalmobileri.com',
  whatsapp: 'https://wa.me/355672029739',
  addressLine: 'Km 8, Autostrada Tiranë–Durrës, Tiranë 1000',
  googleMaps: 'https://maps.app.goo.gl/c9y8jRiAwvtSGaRaA',
  appleMaps:
    'https://maps.apple.com/?address=Autostrada%20Tiran%C3%AB%E2%80%93Durr%C3%ABs%2C%20Km%208%2C%20Tiran%C3%AB%201000,%20Albania&ll=41.3520,19.7690&q=RO-AL%20Mobilieri',
  mapsEmbed:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3898.815510747332!2d19.695570000000004!3d41.367774999999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x13502e909a5e14ef%3A0xaa02fd9bc40743d5!2sRO-AL%20Mobileri!5e1!3m2!1sen!2s!4v1755731243285!5m2!1sen!2s',
  hours: {
    0: [[8 * 60, 16 * 60]], // Sun 08:00–16:00
    1: [[8 * 60, 18 * 60]],
    2: [[8 * 60, 18 * 60]],
    3: [[8 * 60, 18 * 60]],
    4: [[8 * 60, 18 * 60]],
    5: [[8 * 60, 18 * 60]],
    6: [[8 * 60, 18 * 60]],
  } as Record<number, Array<[number, number]>>,
};

export function whatsappHref(message?: string) {
  return message
    ? `${STORE.whatsapp}?text=${encodeURIComponent(message)}`
    : STORE.whatsapp;
}

export function formatHM(m: number) {
  const h = Math.floor(m / 60).toString().padStart(2, '0');
  const mm = (m % 60).toString().padStart(2, '0');
  return `${h}:${mm}`;
}

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
  }).format(now);
  const weekdayIndex = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(weekdayShort);

  return { minutes: hh * 60 + mm, weekdayIndex };
}

function nextOpening(nowMinutes: number, weekdayIndex: number) {
  for (let i = 0; i < 7; i++) {
    const day = (weekdayIndex + i) % 7;
    const intervals = STORE.hours[day] || [];
    for (const [open] of intervals) {
      const candidate = i === 0 && nowMinutes <= open ? open : i > 0 ? open : null;
      if (candidate !== null) return { dayOffset: i, day, minutes: candidate };
    }
  }
  return null;
}

const DAY_LABELS: Record<Lang, [string, string[]]> = {
  // [todayLabel, weekdayShortArray Sun..Sat]
  sq: ['sot', ['Die', 'Hën', 'Mar', 'Mër', 'Enj', 'Pre', 'Sht']],
  en: ['today', ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']],
};

export function useOpenStatus(lang: Lang = 'sq') {
  const { minutes, weekdayIndex } = useTiraneNow();
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
      const [todayLabel, weekdays] = DAY_LABELS[lang];
      const label = next.dayOffset === 0 ? todayLabel : weekdays[next.day];
      nextOpenDisplay = `${label} ${formatHM(next.minutes)}`;
    }
  }

  return { openNow, closesAt, nextOpenDisplay, todayWindows: today };
}
