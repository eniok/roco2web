'use client';

import { MessageCircle } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useLang, type Dict } from '@/lib/i18n';
import { whatsappHref } from '@/lib/store';

const PRESET: Dict<string> = {
  sq: 'Përshëndetje ROAL, dua të flasim për një projekt interieri.',
  en: 'Hello ROAL, I\u2019d like to learn more about a made-to-measure project.',
};

const LABEL: Dict<string> = {
  sq: 'Na shkruani në WhatsApp',
  en: 'Message on WhatsApp',
};

export default function WhatsAppFAB() {
  const { lang } = useLang();
  const pathname = usePathname();

  // The catalogues have contextual WhatsApp actions in the hero and selection
  // summary; the floating shortcut would cover the swipeable choice cards.
  if (pathname === '/kuzhina/katalog' || pathname === '/garderoba/katalog') return null;

  return (
    <a
      href={whatsappHref(PRESET[lang])}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={LABEL[lang]}
      className="
        fixed bottom-24 right-4 z-40
        inline-flex h-14 w-14 items-center justify-center
        rounded-full bg-[#25D366] text-white shadow-lg
        transition-transform hover:scale-105
        focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60
        sm:bottom-6 sm:right-6
      "
    >
      <MessageCircle className="h-6 w-6" aria-hidden="true" />
    </a>
  );
}
