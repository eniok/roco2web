import type { Dict } from '@/lib/i18n';

export type FaqItem = {
  q: Dict<string>;
  a: Dict<string>;
};

export const FAQ_ITEMS: FaqItem[] = [
  {
    q: { sq: 'A punoni me masë?', en: 'Do you make furniture to measure?' },
    a: {
      sq: 'Po. Çdo projekt punohet sipas përmasave të hapësirës suaj. Nuk kemi katalog të ngurtë — ju vendosni hapësirën, ne e bëjmë mobiljen të përshtatet.',
      en: 'Yes. Every project is built to the exact dimensions of your space. We don\u2019t work from a rigid catalogue — you set the space, we make the furniture fit.',
    },
  },
  {
    q: { sq: 'Sa kushton një kuzhinë ose garderobë?', en: 'How much does a kitchen or wardrobe cost?' },
    a: {
      sq: 'Çmimi varet nga materialet, përmasat dhe sasia e punës. Konsultimi në showroom dhe matja në shtëpinë tuaj janë falas. Pas matjes ju dërgojmë projektin 3D me çmimin e plotë.',
      en: 'Pricing depends on materials, dimensions and the amount of work involved. The showroom consultation and the on-site measurement are free. After measuring we send you the full 3D design with the price.',
    },
  },
  {
    q: { sq: 'Sa kohë zgjat projekti?', en: 'How long does a project take?' },
    a: {
      sq: 'Zakonisht 3 deri 6 javë nga konfirmimi i projektit 3D deri në instalimin përfundimtar. Afati i saktë jepet pasi të dakordohemi për materialet.',
      en: 'Typically 3 to 6 weeks from signing off the 3D design to final installation. We confirm the exact timeline once materials are chosen.',
    },
  },
  {
    q: { sq: 'A mund të paguaj me këste?', en: 'Can I pay in instalments?' },
    a: {
      sq: 'Po. Flisni me ne në WhatsApp ose në showroom për opsionet e pagesës — përfshirë kësteve bankare me partnerët tanë.',
      en: 'Yes. Talk to us on WhatsApp or at the showroom for payment options — including bank instalment plans with our partners.',
    },
  },
];
