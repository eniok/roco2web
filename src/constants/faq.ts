import type { Dict } from '@/lib/i18n';

export type FaqItem = {
  q: Dict<string>;
  a: Dict<string>;
};

export const FAQ_ITEMS: FaqItem[] = [
  {
    q: { sq: 'A përshtatet çdo projekt me hapësirën?', en: 'Do you make furniture to measure?' },
    a: {
      sq: 'Po. Çdo projekt nis nga përmasat, arkitektura dhe mënyra si do ta përdorni ambientin. Nuk përshtatim hapësirën me një modul standard; projektojmë zgjidhjen posaçërisht për të.',
      en: 'Yes. Every project is built to the exact dimensions of your space. We don\u2019t work from a rigid catalogue — you set the space, we make the furniture fit.',
    },
  },
  {
    q: { sq: 'Si përcaktohet investimi për një kuzhinë ose garderobë?', en: 'How much does a kitchen or wardrobe cost?' },
    a: {
      sq: 'Investimi përcaktohet nga përmasat, materialet dhe kompleksiteti i realizimit. Konsultimi në showroom dhe matja në ambientin tuaj janë pjesë e fazës fillestare. Më pas merrni projektin 3D dhe një ofertë të detajuar.',
      en: 'Pricing depends on materials, dimensions and the amount of work involved. The showroom consultation and the on-site measurement are free. After measuring we send you the full 3D design with the price.',
    },
  },
  {
    q: { sq: 'Sa kohë zgjat projekti?', en: 'How long does a project take?' },
    a: {
      sq: 'Zakonisht 3–6 javë nga miratimi i projektit 3D deri te instalimi përfundimtar. Afatin e saktë e konfirmojmë pasi të jenë zgjedhur materialet.',
      en: 'Typically 3 to 6 weeks from signing off the 3D design to final installation. We confirm the exact timeline once materials are chosen.',
    },
  },
  {
    q: { sq: 'A mund të paguaj me këste?', en: 'Can I pay in instalments?' },
    a: {
      sq: 'Po. Na kontaktoni në WhatsApp ose në showroom për alternativat e pagesës, përfshirë pagesën me këste bankare përmes partnerëve tanë.',
      en: 'Yes. Talk to us on WhatsApp or at the showroom for payment options — including bank instalment plans with our partners.',
    },
  },
  {
    q: { sq: 'A realizoni ambiente pune për biznese?', en: 'Do you make office furniture for businesses?' },
    a: {
      sq: 'Po. Projektojmë tavolina, rafte, arkivim dhe ambiente të plota pune për biznese në Tiranë dhe në gjithë Shqipërinë. Projektimi 3D, prodhimi dhe instalimi menaxhohen nga ekipi ynë.',
      en: 'Yes. We build custom office furniture — desks, shelving, filing cabinets and complete office fit-outs for businesses in Tirana and across Albania, with 3D design and installation by our own team.',
    },
  },
  {
    q: {
      sq: 'Çfarë e dallon një projekt ROAL?',
      en: 'How do you compare with imported furniture on price vs quality?',
    },
    a: {
      sq: 'Çdo interier e trajtojmë si një investim afatgjatë. Proporcionet, materialet, mekanizmat dhe çdo detaj teknik studiohen për të arritur një rezultat të plotë, preciz dhe të qëndrueshëm. Projekti ndiqet me të njëjtin standard nga koncepti deri në instalimin përfundimtar dhe mbulohet nga një garanci 2-vjeçare.',
      en: 'We manufacture in our own workshop in Tirana, with no import middlemen — so the price goes into materials and craftsmanship, not distribution margins. Materials are chosen to last years of daily use, and every project includes installation and a 2-year warranty from the same team.',
    },
  },
  {
    q: { sq: 'Ku ndodhet showroom-i juaj?', en: 'Where is your showroom?' },
    a: {
      sq: 'Në Km 8 të Autostradës Tiranë–Durrës, rreth 5 minuta me makinë nga qendra tregtare City Park. Parkimi është falas dhe jemi të hapur çdo ditë — e hënë deri të shtunën 08:00–18:00, të dielën 08:00–16:00.',
      en: 'At Km 8 on the Tirana–Durrës highway, about 5 minutes by car from the City Park shopping centre. Parking is free and we are open every day — Monday to Saturday 08:00–18:00, Sunday 08:00–16:00.',
    },
  },
];
