'use client';

import Link from 'next/link';
import { ArrowUpRight, Mail, MapPin, Phone } from 'lucide-react';
import { navLinks } from '../constants';
import { useLang, type Dict } from '@/lib/i18n';
import { STORE } from '@/lib/store';

const copy = {
  tagline: {
    sq: 'Interierë të menduar me kujdes, të realizuar për të zgjatur.',
    en: 'Bespoke furniture, built to last.',
  },
  explore: { sq: 'Eksploroni', en: 'Explore' },
  services: { sq: 'Shërbimet', en: 'Services' },
  legal: { sq: 'Informacion ligjor', en: 'Legal' },
  instagram: { sq: 'Na ndiqni në Instagram', en: 'Follow us on Instagram' },
} satisfies Record<string, Dict<string>>;

const SERVICE_LINKS: { label: Dict<string>; href: string }[] = [
  { label: { sq: 'Kuzhina', en: 'Kitchens' }, href: '/kuzhina' },
  { label: { sq: 'Udhëzuesi i kuzhinës', en: 'Kitchen catalogue' }, href: '/kuzhina/katalog' },
  { label: { sq: 'Garderoba', en: 'Wardrobes' }, href: '/garderoba' },
  { label: { sq: 'Udhëzuesi i garderobës', en: 'Wardrobe catalogue' }, href: '/garderoba/katalog' },
  { label: { sq: 'Dhoma gjumi', en: 'Bedrooms' }, href: '/dhoma-gjumi' },
  { label: { sq: 'Dhoma ndenjeje', en: 'Living rooms' }, href: '/dhoma-ndenje' },
  { label: { sq: 'Ambiente pune', en: 'Workspaces' }, href: '/ambiente-pune' },
  { label: { sq: 'Hotele & ambiente biznesi', en: 'Hospitality & retail' }, href: '/hoteleri-lokale' },
];

const LEGAL_LINKS: { label: Dict<string>; href: string }[] = [
  { label: { sq: 'Politika e privatësisë', en: 'Privacy policy' }, href: '/privacy-policy' },
  { label: { sq: 'Kushtet e shërbimit', en: 'Terms of service' }, href: '/terms-of-service' },
  { label: { sq: 'Fshirja e të dhënave', en: 'Data deletion' }, href: '/data-deletion' },
];

const colHeading =
  'mb-5 text-[0.65rem] font-medium uppercase tracking-[0.22em] text-paper/40';
const colLink =
  'block py-1.5 text-sm text-paper/65 transition-colors hover:text-sand';

const Footer = () => {
  const { lang } = useLang();

  return (
    <footer className="border-t border-paper/10 bg-ink text-paper">
      <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8 sm:py-20">
        <div className="grid gap-x-10 gap-y-12 md:grid-cols-12">
          {/* Brand */}
          <div className="md:col-span-5">
            <Link href="/" aria-label="ROAL Mobileri — kreu">
              <img
                src="/logo.svg"
                alt="ROAL Mobileri"
                className="h-9 w-auto"
                loading="lazy"
                decoding="async"
              />
            </Link>
            <p className="mt-5 max-w-xs font-serif text-xl italic leading-snug text-paper/80">
              {copy.tagline[lang]}
            </p>
            <ul className="mt-8 space-y-2.5 text-sm text-paper/60">
              <li className="flex items-center gap-3">
                <MapPin className="h-4 w-4 shrink-0 text-paper/40" aria-hidden="true" />
                {STORE.addressLine}
              </li>
              <li>
                <a
                  href={`tel:${STORE.phone}`}
                  className="flex items-center gap-3 transition-colors hover:text-sand"
                >
                  <Phone className="h-4 w-4 shrink-0 text-paper/40" aria-hidden="true" />
                  {STORE.phonePretty}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${STORE.email}`}
                  className="flex items-center gap-3 transition-colors hover:text-sand"
                >
                  <Mail className="h-4 w-4 shrink-0 text-paper/40" aria-hidden="true" />
                  {STORE.email}
                </a>
              </li>
            </ul>
            <a
              href="https://www.instagram.com/roal_mobileri/"
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-6 inline-flex items-center gap-2 text-[0.7rem] font-medium uppercase tracking-[0.18em] text-paper/60 transition-colors hover:text-sand"
            >
              {copy.instagram[lang]}
              <ArrowUpRight
                className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </a>
          </div>

          {/* Explore */}
          <nav aria-label={copy.explore[lang]} className="md:col-span-2">
            <h3 className={colHeading}>{copy.explore[lang]}</h3>
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className={colLink}>
                {link.label[lang]}
              </Link>
            ))}
          </nav>

          {/* Services */}
          <nav aria-label={copy.services[lang]} className="md:col-span-2">
            <h3 className={colHeading}>{copy.services[lang]}</h3>
            {SERVICE_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className={colLink}>
                {link.label[lang]}
              </Link>
            ))}
          </nav>

          {/* Legal */}
          <nav aria-label={copy.legal[lang]} className="md:col-span-3">
            <h3 className={colHeading}>{copy.legal[lang]}</h3>
            {LEGAL_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className={colLink}>
                {link.label[lang]}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      <div className="border-t border-paper/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-6 py-6 text-xs text-paper/45 sm:flex-row sm:px-8">
          <p>&copy; {new Date().getFullYear()} RO-AL SH.P.K</p>
          <p>Tiranë, Shqipëri</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
