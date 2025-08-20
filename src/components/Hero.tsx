"use client";

import * as React from "react";
import type { PointerEvent as ReactPointerEvent } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  useSpring,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";
import { ArrowRight, MoveDown, Ruler, Leaf, MapPin } from "lucide-react";
import Link from "next/link";
import { Inspiration } from "next/font/google";

interface HeroProps {
  /** A MotionValue controlling the hero height (e.g., from a scroll-linked animation) */
  heroHeight: MotionValue<string>;
}

/**
 * Ultra-premium furniture hero (mobile-friendly)
 * - Uses svh for iOS URL bar behavior + safe-area paddings
 * - Stacks CTAs and increases tap targets on small screens
 * - Lighter effects / disabled parallax on coarse pointers & reduced-motion
 * - Font sizes via clamp(), balanced wrapping, and tighter leading on mobile
 */
export default function Hero({ heroHeight }: HeroProps) {
  const prefersReduced = useReducedMotion();

  // Detect coarse pointer (touch) to disable tilt/parallax on phones/tablets
  const [isCoarsePointer, setIsCoarsePointer] = React.useState(false);
  React.useEffect(() => {
    if (typeof window !== "undefined" && "matchMedia" in window) {
      const mq = window.matchMedia("(pointer: coarse)");
      const update = () => setIsCoarsePointer(mq.matches);
      update();
      mq.addEventListener?.("change", update);
      return () => mq.removeEventListener?.("change", update);
    }
  }, []);

  const disable3D = prefersReduced || isCoarsePointer;

  // Pointer-driven parallax/tilt (softened on mobile/disabled if coarse)
  const px = useMotionValue(0);
  const py = useMotionValue(0);

  const rotateX = useTransform(py, [-0.5, 0.5], disable3D ? [0, 0] : [5, -5]);
  const rotateY = useTransform(px, [-0.5, 0.5], disable3D ? [0, 0] : [-5, 5]);
  const translateX = useTransform(px, [-0.5, 0.5], disable3D ? [0, 0] : [-6, 6]);
  const translateY = useTransform(py, [-0.5, 0.5], disable3D ? [0, 0] : [-5, 5]);

  const rX = useSpring(rotateX, { stiffness: 120, damping: 18, mass: 0.6 });
  const rY = useSpring(rotateY, { stiffness: 120, damping: 18, mass: 0.6 });
  const tX = useSpring(translateX, { stiffness: 160, damping: 18, mass: 0.6 });
  const tY = useSpring(translateY, { stiffness: 160, damping: 18, mass: 0.6 });

  function handlePointerMove(e: ReactPointerEvent<HTMLElement>) {
    if (disable3D) return;
    const el = e.currentTarget as HTMLElement;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5..0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5; // -0.5..0.5
    px.set(x);
    py.set(y);
  }

  function resetPointer() {
    px.set(0);
    py.set(0);
  }

  return (
    <motion.section
      id="hero"
      aria-label="Bespoke, made-to-measure furniture hero"
      className="relative isolate flex flex-col justify-center items-center text-center overflow-hidden [perspective:1200px] 
                 min-h-[70svh] sm:min-h-[80svh]"
      style={{ height: heroHeight }}
      onPointerMove={disable3D ? undefined : handlePointerMove}
      onPointerLeave={disable3D ? undefined : resetPointer}
    >
      {/* Background video */}
      <div className="absolute inset-0 -z-10">
        <video
          className="h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/images/cover.jpg"
          aria-hidden="true"
          draggable={false}
        >
          <source src="/videos/hero-loop.webm" type="video/webm" />
          <source src="/videos/hero-loop.mp4" type="video/mp4" />
        </video>

        {/* Gradient + vignette overlays for readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/35 to-black/10 sm:from-black/65 sm:via-black/30 sm:to-black/10" />
        <div className="pointer-events-none absolute inset-0 [background:radial-gradient(1100px_550px_at_50%_10%,transparent_0%,transparent_60%,rgba(0,0,0,0.5)_100%)]" />

        {/* Subtle grain for tactile feel */}
        <div
          className="absolute inset-0 opacity-[0.08] mix-blend-overlay"
          style={{ backgroundImage: "url('/images/noise.png')" }}
        />
      </div>

      {/* Main content block with depth */}
      <motion.div
        className="relative z-10 mx-auto w-full max-w-[92rem] px-4 sm:px-6 md:px-8"
        style={{
          rotateX: rX as any,
          rotateY: rY as any,
          translateX: tX as any,
          translateY: tY as any,
          transformStyle: "preserve-3d",
        }}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.h1
          className="mx-auto max-w-5xl font-extrabold leading-[0.95] tracking-tight text-white drop-shadow-xl 
                     [text-wrap:balance]"
          style={{ transform: "translateZ(40px)" }}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="block text-[clamp(2.1rem,9vw,4.8rem)] sm:text-[clamp(2.6rem,7.2vw,6rem)]">
            Elevate Your
          </span>
          <span className="relative inline-block whitespace-nowrap text-[clamp(2.3rem,10vw,5.2rem)] sm:text-[clamp(3rem,8vw,6.5rem)]">
            <span className="bg-gradient-to-r from-white via-white to-white/85 bg-clip-text text-red-500">
              Space
            </span>
          </span>
        </motion.h1>

        <motion.p
          className="mx-auto mt-4 max-w-[38rem] text-pretty text-base sm:text-xl md:text-2xl text-gray-100/90 leading-relaxed"
          style={{ transform: "translateZ(30px)" }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.6 }}
        >
          Bespoke furniture—crafted to fit your space, your rituals, your life.
        </motion.p>

        {/* CTA bar */}
        <motion.div
          className="mx-auto mt-6 sm:mt-8 w-full max-w-[28rem] 
                     flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3
                     rounded-2xl sm:rounded-full border border-white/10 
                     bg-white/10 px-2 py-2 backdrop-blur-sm sm:backdrop-blur-md shadow-2xl 
                     [transform:translateZ(24px)]"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.35, duration: 0.5 }}
        >
          <Link
            href="#products"
            className="group inline-flex w-full sm:w-auto items-center justify-center gap-2 
                       rounded-xl sm:rounded-full bg-white/95 px-5 sm:px-6 py-3 text-base font-semibold text-gray-900 
                       ring-1 ring-black/5 transition-all hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
            aria-label="Explore collections"
          >
            Explore Collections
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>

          <Link
            href="#services"
            className="group inline-flex w-full sm:w-auto items-center justify-center gap-2 
                       rounded-xl sm:rounded-full px-5 sm:px-6 py-3 text-base font-medium text-white/95 hover:text-white 
                       focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
            aria-label="Book a design consultation"
          >
            Explore services
          </Link>
        </motion.div>

        {/* Value props */}
        <motion.ul
          className="mx-auto mt-6 sm:mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4 
                     text-xs sm:text-sm text-white/80 max-w-[44rem]"
          initial="hidden"
          animate="show"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
          style={{ transform: "translateZ(18px)" }}
        >
          {[
            { icon: <Ruler className="h-4 w-4 shrink-0" />, label: "Made-to-measure" },
            { icon: <MapPin className="h-4 w-4 shrink-0" />, label: "Design consultation" },
            { icon: <Leaf className="h-4 w-4 shrink-0" />, label: "Premium materials" },
          ].map((item, i) => (
            <motion.li
              key={i}
              className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 ring-1 ring-white/10"
              variants={{ hidden: { opacity: 0, y: 6 }, show: { opacity: 1, y: 0 } }}
            >
              {item.icon}
              <span className="whitespace-nowrap">{item.label}</span>
            </motion.li>
          ))}
        </motion.ul>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        className="absolute inset-x-0 bottom-6 z-10 flex justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.9 }}
        transition={{ delay: 0.9, duration: 0.6 }}
      >
        <Link
          href="#about"
          className="group inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-2 
                     text-white/90 ring-1 ring-white/10 backdrop-blur-sm hover:bg-white/10 
                     focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
          aria-label="Scroll to about section"
        >
          <MoveDown className="h-4 w-4 animate-bounce" />
          <span className="text-sm">Scroll</span>
        </Link>
      </motion.div>

      {/* Safe-area padding for mobile notches */}
      <div
        className="pointer-events-none absolute top-0 w-full"
        style={{ paddingTop: "env(safe-area-inset-top)" }}
      />
      <div
        className="pointer-events-none absolute bottom-0 w-full"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      />
    </motion.section>
  );
}
