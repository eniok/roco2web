'use client';

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from 'react';
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';
import { ArrowRight, ChevronDown, MapPin, MessageCircle } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useLang, type Dict } from '@/lib/i18n';
import { btnGhostOnDark, btnSolidOnDark, EASE } from './ui';

const WHATSAPP_NUMBER = '355672029739';
const WHATSAPP_PRESET = {
  sq: 'Përshëndetje ROAL, dua të flasim për një projekt interieri.',
  en: "Hello ROAL, I'd like to learn more about your made-to-measure furniture.",
} satisfies Dict<string>;

const copy = {
  eyebrow: {
    sq: 'Interierë të personalizuar · Tiranë',
    en: 'Custom furniture · Tirana',
  },
  titleLead: {
    sq: 'Mobilje të bukura.',
    en: 'Beautiful furniture.',
  },
  titleAccent: {
    sq: 'Të menduara bashkë.',
    en: 'Made together.',
  },
  subhead: {
    sq: 'Ju dëgjojmë dhe krijojmë bashkë kuzhina, garderoba e mobilje që zgjasin. Dizajn i kujdesshëm, pa një buxhet të jashtëzakonshëm.',
    en: 'We listen, plan around your budget and build kitchens, wardrobes and furniture to last. Thoughtful design doesn’t need an extraordinary budget.',
  },
  ctaPrimary: {
    sq: 'Ejani në showroom',
    en: 'Visit the showroom',
  },
  ctaSecondary: {
    sq: 'Na shkruani në WhatsApp',
    en: 'Message on WhatsApp',
  },
  closingLine: {
    sq: 'Nga një hapësirë bosh, në shtëpinë tuaj.',
    en: 'From an empty room to your home.',
  },
  trust: [
    { sq: 'Konsultim falas', en: 'Free consultation' },
    { sq: 'Projekt 3D falas', en: 'Free 3D design' },
    { sq: 'Garanci 2-vjeçare', en: '2-year warranty' },
  ] as const,
} satisfies Record<string, Dict<string> | readonly Dict<string>[]>;

// Scroll-scrubbed frame sequence: an empty room furnishes itself as you scroll.
const FRAME_COUNT = 120;
const LAST_FRAME = FRAME_COUNT - 1;
// Frames finish at 82% of the runway so the furnished room holds before release.
const SCRUB_END = 0.82;
const frameSrc = (i: number) => `/hero-frames/frame-${String(i).padStart(3, '0')}.webp`;

const subscribeHydration = () => () => {};
const clientSnapshot = () => true;
const serverSnapshot = () => false;

export default function Hero() {
  const { lang } = useLang();
  const prefersReducedMotion = useReducedMotion();
  const hydrated = useSyncExternalStore(subscribeHydration, clientSnapshot, serverSnapshot);
  // Keep the server and first client tree identical, then apply the visitor's
  // motion preference without replacing the server-rendered page on hydration.
  const reducedMotion = hydrated && prefersReducedMotion;
  const ref = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const imagesRef = useRef<(HTMLImageElement | null)[]>([]);
  const targetFrameRef = useRef(0);
  const drawnFrameRef = useRef(-1);
  const rafRef = useRef(0);

  // Frame-download progress for the loading bar (motion value: no re-renders).
  const [framesLoading, setFramesLoading] = useState(false);
  const [framesReady, setFramesReady] = useState(false);
  const loadProgress = useMotionValue(0);
  const loadBarScale = useSpring(loadProgress, { stiffness: 120, damping: 28 });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });

  const contentOpacity = useTransform(scrollYProgress, [0.02, 0.28], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.3], ['0%', '-12%']);
  const contentPointer = useTransform(scrollYProgress, (v) =>
    v > 0.25 ? ('none' as const) : ('auto' as const)
  );
  const closingOpacity = useTransform(scrollYProgress, [0.68, 0.86], [0, 1]);
  const closingY = useTransform(scrollYProgress, [0.68, 0.86], ['14%', '0%']);
  const closingPointer = useTransform(scrollYProgress, (v) =>
    v > 0.7 ? ('auto' as const) : ('none' as const)
  );
  // Dark veil keeps text readable; it lifts mid-scrub so the room shows clean,
  // then returns for the closing line.
  const veilOpacity = useTransform(scrollYProgress, [0, 0.3, 0.6, 0.85], [1, 0.3, 0.3, 0.8]);

  const drawFrame = useCallback(() => {
    rafRef.current = 0;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    // Nearest already-loaded frame, so scrubbing degrades gracefully mid-load.
    const target = targetFrameRef.current;
    const images = imagesRef.current;
    let img: HTMLImageElement | null = null;
    let frame = -1;
    for (let d = 0; d < FRAME_COUNT; d++) {
      const lo = target - d;
      const hi = target + d;
      if (lo >= 0 && images[lo]) {
        img = images[lo];
        frame = lo;
        break;
      }
      if (hi <= LAST_FRAME && images[hi]) {
        img = images[hi];
        frame = hi;
        break;
      }
    }
    if (!img || frame === drawnFrameRef.current) return;
    drawnFrameRef.current = frame;

    const { width: cw, height: ch } = canvas;
    const scale = Math.max(cw / img.naturalWidth, ch / img.naturalHeight);
    const dw = img.naturalWidth * scale;
    const dh = img.naturalHeight * scale;
    ctx.drawImage(img, (cw - dw) / 2, (ch - dh) / 2, dw, dh);
  }, []);

  const scheduleDraw = useCallback(() => {
    if (!rafRef.current) rafRef.current = requestAnimationFrame(drawFrame);
  }, [drawFrame]);

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    targetFrameRef.current = Math.min(
      LAST_FRAME,
      Math.max(0, Math.round((v / SCRUB_END) * LAST_FRAME))
    );
    scheduleDraw();
  });

  useEffect(() => {
    if (reducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(canvas.clientWidth * dpr);
      canvas.height = Math.round(canvas.clientHeight * dpr);
      drawnFrameRef.current = -1;
      scheduleDraw();
    };
    resize();
    window.addEventListener('resize', resize);

    // Coarse-to-fine load order: every 8th frame first, then fill the gaps,
    // so a fast scroll lands near the right moment even before all 120 arrive.
    const order: number[] = [];
    const queued = new Set<number>();
    for (const stride of [8, 4, 2, 1]) {
      for (let i = 0; i < FRAME_COUNT; i += stride) {
        if (!queued.has(i)) {
          queued.add(i);
          order.push(i);
        }
      }
    }

    imagesRef.current = new Array(FRAME_COUNT).fill(null);
    let cancelled = false;
    let cursor = 0;
    let settled = 0;
    const onSettled = () => {
      settled++;
      loadProgress.set(settled / FRAME_COUNT);
      if (settled === FRAME_COUNT) setFramesReady(true);
    };
    const loadNext = () => {
      if (cancelled || cursor >= order.length) return;
      const index = order[cursor++];
      const img = new window.Image();
      img.onload = () => {
        if (cancelled) return;
        imagesRef.current[index] = img;
        drawnFrameRef.current = -1;
        scheduleDraw();
        onSettled();
        loadNext();
      };
      img.onerror = () => {
        if (cancelled) return;
        onSettled();
        loadNext();
      };
      img.src = frameSrc(index);
    };
    // The sequence is ~8 MB. Large screens fetch it straight away; phones and
    // Save-Data visitors wait for the first scroll or touch, so someone who
    // reads the hero and taps a button doesn't download the animation.
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    const eager = !connection?.saveData && window.matchMedia('(min-width: 1024px)').matches;
    const intentEvents = ['scroll', 'wheel', 'touchstart', 'keydown'] as const;
    let started = false;
    const start = () => {
      if (started) return;
      started = true;
      intentEvents.forEach((type) => window.removeEventListener(type, start));
      setFramesLoading(true);
      // Modest concurrency so frames don't starve the rest of the page.
      for (let i = 0; i < 4; i++) loadNext();
    };
    if (eager || window.scrollY > 0) start();
    else intentEvents.forEach((type) => window.addEventListener(type, start, { passive: true }));

    return () => {
      cancelled = true;
      intentEvents.forEach((type) => window.removeEventListener(type, start));
      window.removeEventListener('resize', resize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = 0;
    };
  }, [reducedMotion, scheduleDraw, loadProgress]);

  const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    WHATSAPP_PRESET[lang]
  )}`;

  const posterAlt =
    lang === 'sq'
      ? 'Interier bashkëkohor i projektuar dhe realizuar nga ROAL Mobileri në Tiranë'
      : 'Interior with bespoke furniture by ROAL Mobileri — kitchens, wardrobes and full interiors in Tirana';

  return (
    <section
      ref={ref}
      id="hero"
      aria-label="ROAL Mobileri"
      className={
        reducedMotion
          ? 'relative isolate bg-ink text-paper'
          : 'relative isolate h-[300vh] bg-ink text-paper'
      }
    >
      <div className="sticky top-0 flex min-h-[100svh] flex-col overflow-hidden sm:h-[100svh]">
        {/* Frame 0 as poster: instant LCP, seamless under the canvas scrub. */}
        <div className="absolute inset-0 -z-20">
          <Image
            src={reducedMotion ? frameSrc(LAST_FRAME) : frameSrc(0)}
            alt={posterAlt}
            fill
            priority
            sizes="100vw"
            className="object-cover"
            draggable={false}
          />
        </div>
        {!reducedMotion && (
          <canvas
            ref={canvasRef}
            aria-hidden="true"
            className="absolute inset-0 -z-10 h-full w-full"
          />
        )}
        <motion.div
          aria-hidden="true"
          style={reducedMotion ? undefined : { opacity: veilOpacity }}
          className="absolute inset-0 -z-10"
        >
          <div className="absolute inset-0 bg-ink/25" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/15 to-ink/35" />
        </motion.div>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 opacity-[0.07] mix-blend-overlay"
          style={{ backgroundImage: "url('/images/noise.png')" }}
        />

        {/* Opening content — fades away as the room begins to furnish itself */}
        <motion.div
          style={
            reducedMotion
              ? undefined
              : { y: contentY, opacity: contentOpacity, pointerEvents: contentPointer }
          }
          className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-end px-6 pb-28 pt-24 sm:px-8 sm:pb-10 sm:pt-32"
        >
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="mb-6 flex items-center gap-3 text-[0.7rem] uppercase tracking-[0.24em] text-paper/70 sm:mb-8 sm:text-xs"
          >
            <span aria-hidden="true" className="h-2 w-2 bg-sand" />
            {copy.eyebrow[lang]}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.85, ease: EASE }}
            className="max-w-4xl text-balance font-serif text-[clamp(2.6rem,7vw,5.5rem)] font-normal leading-[1.02] tracking-tight"
          >
            {copy.titleLead[lang]}{' '}
            <span className="italic text-sand">{copy.titleAccent[lang]}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.22, duration: 0.7, ease: EASE }}
            className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-paper/85 sm:text-lg"
          >
            {copy.subhead[lang]}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.34, duration: 0.6, ease: EASE }}
            className="mt-8 flex flex-col items-stretch gap-3 sm:mt-10 sm:flex-row sm:items-center"
          >
            <Link href="#showroom" className={btnSolidOnDark}>
              <MapPin className="h-4 w-4" aria-hidden="true" />
              <span>{copy.ctaPrimary[lang]}</span>
              <ArrowRight
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Link>

            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className={btnGhostOnDark}
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              <span>{copy.ctaSecondary[lang]}</span>
            </a>
          </motion.div>

          {/* Trust strip — spec-sheet row along the bottom edge */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.55, duration: 0.7 }}
            className="mt-8 flex items-center justify-between gap-6 border-t border-paper/15 pt-4 sm:mt-20 sm:pt-6"
          >
            <ul className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[0.7rem] uppercase tracking-[0.18em] text-paper/60 sm:text-xs">
              {copy.trust.map((item, i) => (
                <li key={i} className="flex items-center gap-6">
                  {i > 0 && (
                    <span aria-hidden="true" className="h-3 w-px bg-paper/20" />
                  )}
                  <span>{item[lang]}</span>
                </li>
              ))}
            </ul>
            <motion.span
              aria-hidden="true"
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
              className="hidden text-paper/50 sm:block"
            >
              <ChevronDown className="h-4 w-4" />
            </motion.span>
          </motion.div>
        </motion.div>

        {/* Frame-download progress — hairline along the bottom edge, gone once loaded */}
        <AnimatePresence>
          {!reducedMotion && framesLoading && !framesReady && (
            <motion.div
              aria-hidden="true"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { delay: 0.5, duration: 0.7 } }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-[2px] bg-paper/10"
            >
              <motion.div
                className="h-full w-full origin-left bg-sand/80"
                style={{ scaleX: loadBarScale }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Closing line — appears once the room is fully furnished */}
        {!reducedMotion && (
          <motion.div
            style={{ opacity: closingOpacity, y: closingY, pointerEvents: closingPointer }}
            className="absolute inset-0 z-10 mx-auto flex w-full max-w-7xl flex-col justify-end px-6 pb-14 sm:px-8"
          >
            <p className="max-w-3xl text-balance font-serif text-[clamp(1.9rem,4.5vw,3.4rem)] leading-[1.08] tracking-tight">
              {copy.closingLine[lang]}
            </p>
            <div className="mt-7 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
              <Link href="#showroom" className={btnSolidOnDark}>
                <MapPin className="h-4 w-4" aria-hidden="true" />
                <span>{copy.ctaPrimary[lang]}</span>
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Link>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className={btnGhostOnDark}
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                <span>{copy.ctaSecondary[lang]}</span>
              </a>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
