// Shared class strings for the landing page "atelier" system.
// Buttons are square-edged with uppercase micro-labels — a joinery/catalogue feel.

const btnBase =
  'group inline-flex items-center justify-center gap-2.5 px-7 py-4 text-[0.7rem] font-medium uppercase tracking-[0.2em] transition-colors duration-300 focus:outline-none';

/** Solid paper button for dark sections. */
export const btnSolidOnDark = `${btnBase} bg-paper text-ink hover:bg-sand focus-visible:ring-2 focus-visible:ring-paper/60`;

/** Hairline ghost button for dark sections. */
export const btnGhostOnDark = `${btnBase} border border-white/25 text-paper hover:border-paper/70 hover:bg-white/5 focus-visible:ring-2 focus-visible:ring-paper/40`;

/** Solid ink button for light sections. */
export const btnSolidOnLight = `${btnBase} bg-ink text-paper hover:bg-clay focus-visible:ring-2 focus-visible:ring-ink/40`;

/** Hairline ghost button for light sections. */
export const btnGhostOnLight = `${btnBase} border border-ink/20 text-ink hover:border-ink/60 hover:bg-ink/[0.04] focus-visible:ring-2 focus-visible:ring-ink/30`;

/** Shared easing (ease-out-expo) for framer-motion transitions. */
export const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];
