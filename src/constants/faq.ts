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
  {
    q: { sq: 'A bëni mobilje zyre për biznese?', en: 'Do you make office furniture for businesses?' },
    a: {
      sq: 'Po. Punojmë mobilje zyre me porosi — tavolina pune, rafte, dollapë dosjesh dhe zyra të plota për biznese në Tiranë dhe në gjithë Shqipërinë, me projekt 3D dhe instalim nga ekipi ynë.',
      en: 'Yes. We build custom office furniture — desks, shelving, filing cabinets and complete office fit-outs for businesses in Tirana and across Albania, with 3D design and installation by our own team.',
    },
  },
  {
    q: {
      sq: 'Si krahasoheni me mobiljet e importit për raportin çmim–cilësi?',
      en: 'How do you compare with imported furniture on price vs quality?',
    },
    a: {
      sq: 'Prodhojmë vetë në punishten tonë në Tiranë, pa ndërmjetës importi — kështu çmimi shkon te materialet dhe puna, jo te marzhet e shpërndarjes. Materialet zgjidhen për vite përdorimi, dhe çdo projekt vjen me instalim dhe garanci 2-vjeçare nga i njëjti ekip.',
      en: 'We manufacture in our own workshop in Tirana, with no import middlemen — so the price goes into materials and craftsmanship, not distribution margins. Materials are chosen to last years of daily use, and every project includes installation and a 2-year warranty from the same team.',
    },
  },
  {
    q: { sq: 'Ku ndodhet showroom-i juaj?', en: 'Where is your showroom?' },
    a: {
      sq: 'Në Km 8 të Autostradës Tiranë–Durrës, rreth 5 minuta me makinë nga qendra tregtare TEG. Parkimi është falas dhe jemi të hapur çdo ditë — e hënë deri të shtunën 08:00–18:00, të dielën 08:00–16:00.',
      en: 'At Km 8 on the Tirana–Durrës highway, about 5 minutes by car from the TEG shopping centre. Parking is free and we are open every day — Monday to Saturday 08:00–18:00, Sunday 08:00–16:00.',
    },
  },
];
