// src/constants/index.ts
import type { Dict } from "@/lib/i18n";

export type NavLink = { label: Dict<string>; href: string };

export const navLinks: NavLink[] = [
  { label: { sq: "Kreu", en: "Home" }, href: "/" },
  { label: { sq: "Si punojmë", en: "How we work" }, href: "/#process" },
  { label: { sq: "Projekte", en: "Projects" }, href: "/#projects" },
  { label: { sq: "Showroom", en: "Showroom" }, href: "/#showroom" },
  { label: { sq: "Blog", en: "Blog" }, href: "/blog" },
  { label: { sq: "Kontakt", en: "Contact" }, href: "/#contact" },
];
