import type { Dict } from '@/lib/i18n';
import type { FaqItem } from '@/constants/faq';

export type ServiceSlug =
  | 'kuzhina'
  | 'garderoba'
  | 'dhoma-gjumi'
  | 'dhoma-ndenje'
  | 'ambiente-pune'
  | 'hoteleri-lokale';

export type ServiceConfig = {
  slug: ServiceSlug;
  serviceType: string;
  image: string;
  imageAlt: Dict<string>;
  metaTitle: Dict<string>;
  metaDescription: Dict<string>;
  eyebrow: Dict<string>;
  headingLead: Dict<string>;
  headingAccent: Dict<string>;
  subhead: Dict<string>;
  intro: Dict<string>;
  includesTitle: Dict<string>;
  includesHeading: Dict<string>;
  includes: Dict<string[]>;
  materialsTitle: Dict<string>;
  materialsBody: Dict<string>;
  faqs: FaqItem[];
};

export const SERVICES: Record<ServiceSlug, ServiceConfig> = {
  kuzhina: {
    slug: 'kuzhina',
    serviceType: 'Bespoke kitchens',
    image: '/images/9.jpg',
    imageAlt: {
      sq: 'Kuzhinë bashkëkohore e projektuar dhe realizuar nga ROAL Mobileri',
      en: 'Modern bespoke kitchen by ROAL Mobileri',
    },
    metaTitle: {
      sq: 'Kuzhina të projektuara në Tiranë',
      en: 'Bespoke kitchens in Tirana',
    },
    metaDescription: {
      sq: 'Kuzhina të projektuara posaçërisht për hapësirën tuaj. Projektim 3D, materiale të përzgjedhura, instalim nga ekipi ynë dhe garanci 2-vjeçare.',
      en: 'Kitchens designed and built to the exact dimensions of your home. 3D design, durable materials, installation and 2-year warranty.',
    },
    eyebrow: { sq: 'Kuzhina të projektuara', en: 'Bespoke kitchens' },
    headingLead: { sq: 'Kuzhina që ndjekin', en: 'Kitchens built' },
    headingAccent: { sq: 'ritmin tuaj.', en: 'for your space.' },
    subhead: {
      sq: 'Nga matja e parë te instalimi përfundimtar, çdo detaj formësohet rreth mënyrës si gatuani, mikpritni dhe jetoni.',
      en: 'From the first measurement to final installation — a kitchen shaped around how you cook, entertain and live.',
    },
    intro: {
      sq: 'Çdo kuzhinë nis me hapësirën dhe nevojat tuaja, jo me një model standard. Në projektin 3D shihni kompozimin, materialet dhe funksionet përpara prodhimit. Më pas, ekipi ynë kujdeset për realizimin dhe instalimin, deri në detajin e fundit.',
      en: 'We don\u2019t work from a rigid catalogue. Every kitchen starts with a meeting and the exact measurements of your space, continues through a 3D design where you see the full result before work begins, and ends with installation by our own team. The goal is simple: a kitchen that works every day and holds up for years.',
    },
    includesTitle: { sq: 'Nga projekti te instalimi', en: 'What\u2019s included' },
    includesHeading: { sq: 'Gjithçka, e menduar si një e tërë', en: 'Everything for a complete kitchen' },
    includes: {
      sq: [
        'Konsultim dhe matje falas në ambientin tuaj ose në showroom',
        'Projektim 3D me materialet, ngjyrat dhe pajisjet e përzgjedhura',
        'Strukturë dhe fronte të prodhuara sipas përmasave të sakta',
        'Syprina pune në granit, kuarc, porcelan ose laminat',
        'Integrim i pajisjeve dhe koordinim i lidhjeve hidraulike e elektrike',
        'Instalim i plotë nga ekipi ynë dhe garanci 2-vjeçare',
      ],
      en: [
        'Free measurement at your home or at the showroom',
        '3D design with materials, colours and appliances',
        'Cabinets and doors built to exact dimensions',
        'Worktops in granite, quartz or laminate',
        'Built-in appliance integration and plumbing/electrical hook-ups',
        'Full installation by our team + 2-year warranty',
      ],
    },
    materialsTitle: { sq: 'Materiale për përdorim të përditshëm', en: 'Materials we choose' },
    materialsBody: {
      sq: 'Përzgjedhim materiale që ruajnë pamjen dhe funksionin për vite: MDF rezistent ndaj lagështirës ose melaminë cilësore për strukturën; lak mat, PET, akrilik apo rimeso natyrale për frontet; mekanizma me mbyllje të butë për përdorim të qetë. Çdo mostër mund ta shihni dhe ta prekni në showroom përpara se të vendosni.',
      en: 'We use materials built for years of daily use — not for the showroom window. Carcases in moisture-resistant MDF or high-grade melamine, doors in matt lacquer, PVC or real veneer, soft-close hinges and runners. You see and touch every material sample in the showroom before you choose.',
    },
    faqs: [
      {
        q: { sq: 'Sa zgjat realizimi i një kuzhine?', en: 'How long does a kitchen take?' },
        a: {
          sq: 'Zakonisht 3–6 javë nga miratimi i projektit 3D deri te instalimi. Afatin e saktë e konfirmojmë pasi të jenë zgjedhur materialet dhe pajisjet.',
          en: 'Typically 3 to 6 weeks from signing off the 3D design to installation. We confirm the exact timeline once materials and appliances are chosen.',
        },
      },
      {
        q: { sq: 'A përfshihen pajisjet elektroshtëpiake në çmim?', en: 'Are appliances included in the price?' },
        a: {
          sq: 'Pajisjet mund t’i siguroni përmes nesh ose t’i zgjidhni vetë. Në të dyja rastet, projekti përshtatet saktësisht me modelet dhe përmasat e tyre.',
          en: 'Appliances can be supplied by us or bought by you. Either way, we build the kitchen to fit them exactly.',
        },
      },
      {
        q: { sq: 'Punoni edhe kuzhina të vogla apo vetëm të mëdha?', en: 'Do you also make small kitchens or only large ones?' },
        a: {
          sq: 'Po. Projektojmë nga kuzhina lineare për apartamente kompakte deri te ambiente të hapura me ishull. Nuk kërkojmë një përmasë minimale projekti.',
          en: 'We work with any size — from one-wall apartment kitchens to large open-plan kitchens with islands. No minimum project.',
        },
      },
      {
        q: { sq: 'Sa kushton një kuzhinë e projektuar për hapësirën time?', en: 'How much does a bespoke kitchen cost?' },
        a: {
          sq: 'Çmimi varet nga metrat linearë, materialet e fronteve dhe të syprinës, si edhe nga mekanizmat e pajisjet që zgjidhni. Matja, projekti 3D dhe oferta e detajuar janë falas dhe pa detyrim.',
          en: 'The price depends on the linear metres, the door and worktop materials, and the appliances you choose. The home measurement and the 3D design with a full quote are free and without obligation — so you can compare our offer against any alternative.',
        },
      },
    ],
  },

  garderoba: {
    slug: 'garderoba',
    serviceType: 'Fitted wardrobes',
    image: '/images/wardrobe-catalogue/hero.webp',
    imageAlt: {
      sq: 'Garderobë e integruar me fronte mat, rimeso arre dhe vitrinë xhami bronz',
      en: 'Fitted wardrobe with matte fronts, walnut veneer and a bronze-glass display bay',
    },
    metaTitle: {
      sq: 'Garderoba të integruara në Tiranë — matje dhe projektim 3D falas',
      en: 'Fitted wardrobes in Tirana — free measurement & 3D design',
    },
    metaDescription: {
      sq: 'Garderoba të integruara dhe ambiente walk-in për çdo hapësirë, me fronte melamine, MDF, pasqyrë ose xham. Matje falas, projektim 3D dhe garanci 2-vjeçare.',
      en: 'Fitted wardrobes and walk-in closets for any space, with melamine, MDF, mirror or glass fronts. Free measurement, 3D design and 2-year warranty.',
    },
    eyebrow: { sq: 'Garderoba të integruara', en: 'Fitted wardrobes' },
    headingLead: { sq: 'Çdo centimetër', en: 'Wardrobes that' },
    headingAccent: { sq: 'gjen funksion.', en: 'fill every corner.' },
    subhead: {
      sq: 'Nga muri në mur dhe nga dyshemeja në tavan, garderoba projektohet për ta përdorur hapësirën me inteligjencë.',
      en: 'Wall to wall, floor to ceiling — wardrobes that use every centimetre of your space.',
    },
    intro: {
      sq: 'Një garderobë e menduar mirë nuk është thjesht një dollap, por një sistem që e bën përditshmërinë më të rregullt. Ndarjet, sirtarët, varëset dhe aksesorët planifikohen sipas asaj që ruani dhe mënyrës si e përdorni, ndërsa forma ndjek me saktësi arkitekturën e dhomës.',
      en: 'A good wardrobe isn\u2019t just a cupboard — it\u2019s a system that helps you stay organised every day. We design it around what you actually own: clothes, accessories, boots, boxes — and how you want to use them. Then we build it for your exact space.',
    },
    includesTitle: { sq: 'Nga jashtë dhe brenda', en: 'What\u2019s included' },
    includesHeading: { sq: 'Një garderobë e menduar në çdo detaj', en: 'Inside every fitted wardrobe' },
    includes: {
      sq: [
        'Konsultim dhe matje falas në ambientin tuaj',
        'Projektim 3D i kompozimit dhe organizimit të brendshëm',
        'Dyer rrëshqitëse, me mentesha ose konfigurim i hapur walk-in',
        'Fronte pasqyre, xhami të tymosur, bronz ose të kanaluar',
        'Vitrina dhe rafte xhami me ndriçim të integruar',
        'Sirtarë me mbyllje të butë, ndarëse, tuba, ndriçim LED',
        'Përshtatje për tavane të pjerrëta, kënde të ngushta, kolona',
        'Instalim nga ekipi ynë dhe garanci 2-vjeçare',
      ],
      en: [
        'Free measurement and consultation on how you\u2019ll use it',
        '3D design showing internal layout, drawers and accessories',
        'Sliding, hinged or open (walk-in) configurations',
        'Mirror, smoked, bronze or reeded-glass fronts',
        'Display bays and glass shelving with integrated lighting',
        'Soft-close drawers, dividers, hanging rails, LED lighting',
        'Solutions for sloped ceilings, tight corners and columns',
        'Installation by our team + 2-year warranty',
      ],
    },
    materialsTitle: { sq: 'Si i ndërtojmë', en: 'How we build them' },
    materialsBody: {
      sq: 'Struktura dhe ndarjet dimensionohen sipas hapësirës, gjatësisë së rafteve dhe peshës që do të mbajnë. Frontet mund të realizohen në melaminë, MDF të lyer, rimeso, pasqyrë ose xham të tymosur, bronz apo të kanaluar. Vitrinat, raftet e xhamit, kornizat, mekanizmat dhe ndriçimi projektohen si pjesë e të njëjtit kompozim.',
      en: 'Carcases and divisions are sized around the space, shelf spans and what they need to carry. Fronts can be melamine, lacquered MDF, veneer, mirror, or smoked, bronze and reeded glass. We also create integrated display bays and glass shelving; frames, hardware and lighting are specified as part of the same design.',
    },
    faqs: [
      {
        q: { sq: 'A mund të shkojë garderoba deri në tavan?', en: 'Do you make wardrobes that go up to the ceiling?' },
        a: {
          sq: 'Po. Garderobat me lartësi të plotë shfrytëzojnë më mirë hapësirën dhe mund të përshtaten edhe me tavane të pjerrëta apo mansarda.',
          en: 'Yes. Full-height wardrobes are the best way to use the space — including for sloped ceilings and attics.',
        },
      },
      {
        q: { sq: 'Dyer rrëshqitëse apo me mentesha?', en: 'Sliding doors or hinged?' },
        a: {
          sq: 'Varet nga hapësira dhe mënyra si doni ta përdorni. Dyert rrëshqitëse kursejnë vend përpara; ato me mentesha japin qasje të plotë në brendësi. Në showroom mund t’i provoni të dyja.',
          en: 'It depends on the room. Sliding for tight spaces, hinged for a classic look. At the showroom we show you both and help you choose.',
        },
      },
      {
        q: { sq: 'Projektoni edhe garderoba walk-in?', en: 'Do you also make walk-in closets?' },
        a: {
          sq: 'Po. Projektojmë ambiente të plota walk-in me ishull, ndriçim të integruar, ndarje për çanta, pasqyra dhe aksesorë.',
          en: 'Yes. Full walk-in closet rooms with islands, lighting, bag compartments, mirrors and accessories.',
        },
      },
      {
        q: { sq: 'Realizoni edhe elemente xhami dhe pasqyre?', en: 'Do you also make glass and mirror elements?' },
        a: {
          sq: 'Po. Projektojmë fronte me pasqyrë, xham të tymosur, bronz ose të kanaluar, si edhe vitrina e rafte xhami të integruara me mobilierinë dhe ndriçimin.',
          en: 'Yes. We design mirrored, smoked, bronze or reeded-glass fronts, as well as display bays and glass shelves integrated with the cabinetry and lighting.',
        },
      },
    ],
  },

  'dhoma-gjumi': {
    slug: 'dhoma-gjumi',
    serviceType: 'Bedroom furniture',
    image: '/images/bedroom.jpg',
    imageAlt: {
      sq: 'Dhomë gjumi e projektuar dhe realizuar nga ROAL Mobileri',
      en: 'Bespoke bedroom by ROAL Mobileri',
    },
    metaTitle: {
      sq: 'Dhoma gjumi të projektuara në Tiranë',
      en: 'Bespoke bedrooms in Tirana',
    },
    metaDescription: {
      sq: 'Interierë të plotë gjumi me krevate, komodina, garderoba dhe koka krevati të projektuara si një kompozim i vetëm. Projektim 3D falas dhe garanci 2-vjeçare.',
      en: 'Complete bespoke bedrooms — beds, nightstands, wardrobes and headboards built to measure. Free 3D design, installation and 2-year warranty.',
    },
    eyebrow: { sq: 'Dhoma gjumi të projektuara', en: 'Bedrooms' },
    headingLead: { sq: 'Dhoma gjumi ku', en: 'Bedrooms where' },
    headingAccent: { sq: 'pushoni vërtet.', en: 'you truly rest.' },
    subhead: {
      sq: 'Krevati, garderoba, komodinat dhe ndriçimi projektohen si një kompozim i vetëm, i qetë dhe koherent.',
      en: 'Bed, wardrobe, nightstands and lighting — designed as one whole, not as pieces bought separately.',
    },
    intro: {
      sq: 'Dhoma e gjumit kërkon më shumë se elemente që përputhen në ngjyrë. Ne e trajtojmë si një ambient të plotë: krevati dimensionohet për dyshekun tuaj, koka e krevatit integron dritën dhe prizat aty ku duhen, ndërsa garderoba shfrytëzon murin deri në tavan. Çdo element lidhet me tjetrin në formë, material dhe funksion.',
      en: 'The bedroom is where you spend a third of your life, yet it is often furnished last, with pieces that don’t speak to each other. We design it as one environment: a bed sized exactly for your mattress, a headboard with lighting and sockets where you want them, a wardrobe that uses the wall from floor to ceiling. Everything made to measure, for your exact space.',
    },
    includesTitle: { sq: 'Çfarë projektojmë', en: 'What we can build' },
    includesHeading: { sq: 'Një ambient i plotë dhe koherent', en: 'A complete bedroom, made to measure' },
    includes: {
      sq: [
        'Krevate të dimensionuara për dyshekun dhe hapësirën tuaj',
        'Krevate me ngritje dhe depozitim poshtë dyshekut',
        'Komodina dhe tavolina tualeti me pasqyrë, të projektuara si pjesë e ambientit',
        'Garderoba të integruara dhe dollapë mbi krevat',
        'Dhoma gjumi për fëmijë — krevate teke, marina dhe zona studimi',
        'Instalim nga ekipi ynë dhe garanci 2-vjeçare',
      ],
      en: [
        'Custom beds — upholstered, wooden or with integrated lighting',
        'Lift-up beds with storage under the mattress',
        'Made-to-measure nightstands and dressing tables with mirrors',
        'Integrated wardrobes and over-bed cabinets',
        'Children’s bedrooms — single beds, bunk beds and study corners',
        'Installation by our team + 2-year warranty',
      ],
    },
    materialsTitle: { sq: 'Materialet dhe rehatia', en: 'Materials and comfort' },
    materialsBody: {
      sq: 'Për dhomat e gjumit përzgjedhim materiale dhe tonalitete të qeta: dru natyral, rimeso, tekstile të buta dhe lak mat. Mekanizmat e ngritjes, sirtarët dhe dyert punojnë me lëvizje të butë e të heshtur. Mostrat e ngjyrave, tekstileve dhe ndriçimit mund t’i vlerësoni në showroom përpara vendimit.',
      en: 'For bedrooms we choose materials that calm — natural wood, veneer, soft upholstery for headboards and glare-free matt lacquer. Lift mechanisms and drawers are soft-close, so not even a cabinet door disturbs the night. You try colours and lighting in the showroom before you decide.',
    },
    faqs: [
      {
        q: { sq: 'A punoni krevate për çdo përmasë dysheku?', en: 'Do you make beds for any mattress size?' },
        a: {
          sq: 'Po. Punojmë krevate për dyshekë standardë (90, 120, 160, 180 cm) dhe për përmasa jo standarde — krevati bëhet sipas dyshekut, jo e kundërta.',
          en: 'Yes. We build beds for standard mattresses (90, 120, 160, 180 cm) and for non-standard sizes — the bed is made to fit the mattress, not the other way round.',
        },
      },
      {
        q: { sq: 'A mund të kombinohet dhoma e gjumit me garderobë të integruar?', en: 'Can the bedroom include an integrated wardrobe?' },
        a: {
          sq: 'Po. Është zgjidhja që rekomandojmë më shpesh: krevati, komodinat dhe garderoba projektohen bashkë, me një gjuhë të përbashkët materialesh dhe përpunimesh.',
          en: 'Yes — it’s the solution we recommend most often. The bed, nightstands and wardrobe are designed together, with the same materials and finishes.',
        },
      },
      {
        q: { sq: 'Sa kushton një projekt i plotë për dhomën e gjumit?', en: 'How much does a bespoke bedroom cost?' },
        a: {
          sq: 'Varet nga përmasat, materialet dhe elementet që përfshin projekti. Matja, projekti 3D dhe oferta e detajuar janë falas. Mund të na vizitoni në showroom-in në Km 8 të autostradës Tiranë–Durrës ose të na shkruani në WhatsApp.',
          en: 'It depends on dimensions, materials and the elements you choose. Measurement and the 3D design with a full price are free — visit the showroom at Km 8 of the Tirana–Durrës highway or message us on WhatsApp.',
        },
      },
    ],
  },

  'dhoma-ndenje': {
    slug: 'dhoma-ndenje',
    serviceType: 'Living-room cabinetry',
    image: '/images/11.jpg',
    imageAlt: {
      sq: 'Dhomë ndenjeje me mobilieri të integruar nga ROAL Mobileri',
      en: 'Bespoke living room by ROAL Mobileri',
    },
    metaTitle: {
      sq: 'Ambiente ndenjeje të personalizuara në Tiranë',
      en: 'Living-room cabinetry in Tirana',
    },
    metaDescription: {
      sq: 'Mure medie, vitrina, rafte dhe hapësira ruajtjeje të integruara për dhomën e ndenjes. Projektim 3D, instalim dhe garanci 2-vjeçare.',
      en: 'Media walls, display cabinets, shelving and integrated storage for your living room. 3D design, durable materials, installation and 2-year warranty.',
    },
    eyebrow: { sq: 'Ambiente ndenjeje', en: 'Living rooms' },
    headingLead: { sq: 'Dhoma ndenjeje që', en: 'Living rooms that' },
    headingAccent: { sq: 'marrin frymë.', en: 'aren\u2019t crowded with furniture.' },
    subhead: {
      sq: 'Mure medie, vitrina dhe hapësira ruajtjeje të integruara, për një ambient të rregullt, të hapur dhe vizualisht të qetë.',
      en: 'Media walls, display cabinets and integrated storage — so your room stays tidy and open, not crowded with separate pieces.',
    },
    intro: {
      sq: 'Dhoma e ndenjes është ambienti ku ndërthuren jeta e përditshme dhe mikpritja. E trajtojmë të gjithë murin si një kompozim të vetëm: fshehim kabllot dhe pajisjet, organizojmë librat e objektet dhe ruajmë hapësirën e lirë. Rezultati është funksional pa u ndier i rënduar.',
      en: 'The living room is where you spend the most time. Good furniture here isn\u2019t a showpiece — it\u2019s a system that hides cables, holds books and decor, and lets the room breathe. We design the whole wall as one unit, not pieces that collide.',
    },
    includesTitle: { sq: 'Çfarë projektojmë', en: 'What we can build' },
    includesHeading: { sq: 'Mobilim i integruar për dhomën tuaj', en: 'Integrated furniture for your room' },
    includes: {
      sq: [
        'Mure medie për TV, me kalim kabllosh dhe ndriçim',
        'Vitrina dhe rafte për libra, dekor dhe objekte të çmuara',
        'Depozitim i fshehur — dollapë pa doreza, hapje me shtytje',
        'Kënde leximi, karrige të personalizuara dhe tavolina mbështetëse',
        'Mbulim i kolonave, radiatorëve dhe kabllove në mur',
        'Instalim nga ekipi ynë dhe garanci 2-vjeçare',
      ],
      en: [
        'Media walls for TV with cable management and lighting',
        'Display cabinets and shelving for books, decor and collectibles',
        'Hidden storage — handleless cabinets, push-to-open',
        'Reading nooks, custom seating and side tables',
        'Concealment of columns, radiators and wall cabling',
        'Installation by our team + 2-year warranty',
      ],
    },
    materialsTitle: { sq: 'Materialet dhe përpunimet', en: 'Materials and finishes' },
    materialsBody: {
      sq: 'Për ambientet e ndenjes zgjedhim sipërfaqe që ruajnë pamjen në përdorim të përditshëm: lak mat, rimeso natyrale dhe melaminë me teksturë. Ndriçimi LED i integruar dhe kalimet e fshehura të kabllove përfshihen që në projekt, që çdo detaj të duket i qëllimshëm.',
      en: 'For living rooms we choose finishes that resist scratches and stains — matt lacquer, real veneer, textured melamine. Integrated LED lighting and concealed cabling make small details feel planned, not improvised.',
    },
    faqs: [
      {
        q: { sq: 'A mund të integroni një TV ekzistues?', en: 'Can you integrate an existing TV?' },
        a: {
          sq: 'Po. Na duhen përmasat dhe mënyra e montimit, në mur ose mbi bazament. Kompozimi i murit të medias projektohet më pas rreth pajisjes suaj.',
          en: 'Yes. We just need the dimensions and mounting type (wall or shelf) and we build the media wall around it.',
        },
      },
      {
        q: { sq: 'A i fshehni kabllot dhe pajisjet?', en: 'Do you hide cables and devices?' },
        a: {
          sq: 'Po. Kalimet e kabllove, marrësit, konzollat dhe pajisjet e tjera i fshehim brenda mobiljes me ventilim të mjaftueshëm.',
          en: 'Yes. Cable runs, receivers, consoles and other devices are concealed inside the furniture with adequate ventilation.',
        },
      },
    ],
  },

  'ambiente-pune': {
    slug: 'ambiente-pune',
    serviceType: 'Office furniture, home office and workspace fit-out',
    image: '/images/homeoffice.jpg',
    imageAlt: {
      sq: 'Ambient pune i projektuar dhe realizuar nga ROAL Mobileri',
      en: 'Custom workspace by ROAL Mobileri',
    },
    metaTitle: {
      sq: 'Interierë zyrash dhe ambiente pune në Tiranë',
      en: 'Office furniture & custom workspaces in Tirana',
    },
    metaDescription: {
      sq: 'Tavolina, rafte dhe ambiente të plota pune për shtëpi e biznese. Projektim 3D, materiale të përzgjedhura, instalim dhe garanci 2-vjeçare.',
      en: 'Custom office furniture in Tirana — desks, shelving and full office fit-outs for homes and businesses. 3D design, durable materials, installation and 2-year warranty.',
    },
    eyebrow: { sq: 'Ambiente pune', en: 'Workspaces' },
    headingLead: { sq: 'Hapësira ku', en: 'Spaces where' },
    headingAccent: { sq: 'puna ecën.', en: 'work flows.' },
    subhead: {
      sq: 'Zyra në shtëpi, studio dhe hapësira pune të plota — të projektuara rreth mënyrës si punoni.',
      en: 'Home offices, studios and full workspaces — designed around how you actually work.',
    },
    intro: {
      sq: 'Një hapësirë pune e mirë nis me pyetje praktike: çfarë duhet të keni pranë, si organizohen dokumentet dhe pajisjet, sa privatësi kërkohet dhe si zhvillohen takimet. Përgjigjet përcaktojnë ergonominë, organizimin dhe karakterin e projektit.',
      en: 'A good workspace starts with practical questions: how long you sit, what you need within reach, how many documents you keep, whether you need room for meetings or just for yourself. The answers shape the design. Then we build it.',
    },
    includesTitle: { sq: 'Çfarë projektojmë', en: 'What we can build' },
    includesHeading: { sq: 'Ambiente pune të formësuara rreth jush', en: 'Bespoke workspaces, built to fit' },
    includes: {
      sq: [
        'Tavolina pune lineare, në kënd ose në formë U, sipas hapësirës',
        'Rafte, dollapë dosjesh dhe depozitim i integruar',
        'Zyra të plota për shtëpi ose studio',
        'Hapësira bashkëpunimi për biznese të vogla',
        'Kalime kabllosh, ndriçim pune dhe zgjidhje ergonomike',
        'Instalim nga ekipi ynë dhe garanci 2-vjeçare',
      ],
      en: [
        'Custom desks — straight, L-shaped or U-shaped',
        'Shelving, filing cabinets and integrated storage',
        'Full home offices and studios',
        'Collaboration spaces for small businesses',
        'Cable management, task lighting and ergonomic solutions',
        'Installation by our team + 2-year warranty',
      ],
    },
    materialsTitle: { sq: 'Materialet dhe detajet', en: 'Materials and details' },
    materialsBody: {
      sq: 'Syprinat e tavolinave realizohen në laminat rezistent ose dru masiv, të përzgjedhura për përdorim intensiv. Ndarjet për dokumentet, kabllot dhe pajisjet integrohen në strukturë. Për ambiente të plota, ngjyrat dhe materialet harmonizohen me identitetin vizual të biznesit.',
      en: 'Desk tops in hard-wearing laminate or solid wood, chosen to take daily use without damage. Cabinets with built-in compartments for documents, cables and equipment. For full offices, we match colours and finishes to your brand identity.',
    },
    faqs: [
      {
        q: { sq: 'Punoni edhe për apartamente të vogla?', en: 'Do you work on small apartments too?' },
        a: {
          sq: 'Po. Një kënd pune funksional mund të krijohet edhe në një hapësirë 1,5 metra, me tavolinë të palosshme, rafte të integruara dhe organizim vertikal.',
          en: 'Yes. A good work nook can fit in a 1.5-metre corner — with a fold-down desk, integrated shelving and vertical storage.',
        },
      },
      {
        q: { sq: 'A bëni zyra të plota për biznese?', en: 'Do you fit out full offices for businesses?' },
        a: {
          sq: 'Po. Kemi kryer zyra të plota dhe hapësira bashkëpunimi në Tiranë dhe jashtë saj. Flisni me ne për një vizitë në terren.',
          en: 'Yes. We\u2019ve delivered complete offices and collaboration spaces in Tirana and beyond. Talk to us for a site visit.',
        },
      },
    ],
  },

  'hoteleri-lokale': {
    slug: 'hoteleri-lokale',
    serviceType: 'Hospitality and retail fit-out',
    image: '/images/contract.jpg',
    imageAlt: {
      sq: 'Interier i realizuar nga ROAL për hoteleri dhe ambiente biznesi',
      en: 'Hospitality and retail fit-out by ROAL Mobileri',
    },
    metaTitle: {
      sq: 'Interierë për hotele, restorante dhe dyqane',
      en: 'Hospitality & retail fit-out',
    },
    metaDescription: {
      sq: 'Interierë për hotele, restorante, bare, kafene dhe dyqane në gjithë Shqipërinë. Projektim, prodhim dhe instalim nga një ekip i vetëm.',
      en: 'Bespoke commercial projects for hotels, restaurants, bars, cafés and shops across Albania. Design, production and installation from a single team.',
    },
    eyebrow: { sq: 'Interierë biznesi', en: 'Hospitality & retail' },
    headingLead: { sq: 'Hapësira që', en: 'Spaces that' },
    headingAccent: { sq: 'lënë përshtypje.', en: 'welcome guests.' },
    subhead: {
      sq: 'Hotele, restorante, kafene dhe dyqane të projektuara për përvojën e klientit dhe ritmin intensiv të përditshmërisë.',
      en: 'Restaurants, hotels, cafés, bars and shops — designed to hold up under daily traffic.',
    },
    intro: {
      sq: 'Një interier biznesi duhet të përballojë orët e pikut, të mirëmbahet lehtë dhe të ruajë identitetin e markës. Projektojmë duke mbajtur njëkohësisht në vëmendje përvojën e klientit, punën e stafit dhe qëndrueshmërinë e investimit.',
      en: 'Commercial furniture plays by different rules than home furniture. It has to handle peak hours, clean quickly and still look new after a full season. We\u2019ve worked with hotels, restaurants and shops in Tirana and beyond, keeping in mind both the guest\u2019s experience and the owner\u2019s return on investment.',
    },
    includesTitle: { sq: 'Çfarë realizojmë', en: 'What we\u2019ve delivered' },
    includesHeading: { sq: 'Interierë të menduar për përdorim intensiv', en: 'Commercial projects that last' },
    includes: {
      sq: [
        'Banakë për bare dhe restorante, me sipërfaqe rezistente',
        'Dhoma hoteli — mobilim i plotë dhe i përsëritshëm',
        'Dyqane — vitrina, rafte dhe mobilim i brendshëm',
        'Kafene dhe lokale — ulëse, tavolina, zona shërbimi',
        'Projektim, prodhim dhe instalim të koordinuar nga një ekip',
        'Afate të qarta dhe garanci e shkruar',
      ],
      en: [
        'Bar and restaurant counters with hard-wearing finishes',
        'Hotel rooms — full, repeatable fit-outs',
        'Retail shops — display windows, shelving and interior fit-out',
        'Cafés and bars — seating, tables, service areas',
        'Logistics: design, production and installation from one team',
        'Clear timelines and a written warranty',
      ],
    },
    materialsTitle: { sq: 'Si punojmë me biznese', en: 'How we work with businesses' },
    materialsBody: {
      sq: 'Për çdo projekt biznesi bëjmë një vizitë në ambient, analizojmë lëvizjen e klientëve dhe stafit, si edhe kufizimet teknike të hapësirës. Pas projektit 3D paraqesim ofertën e plotë. Bashkëpunojmë drejtpërdrejt me pronarin ose me arkitektin e tij, me afate dhe kushte të përcaktuara në kontratë.',
      en: 'For commercial projects we visit on-site, understand customer flow and space constraints, and send you a full quote after the 3D design. We can work directly with owners or alongside your architect. Timelines and terms are written into the contract before work begins.',
    },
    faqs: [
      {
        q: { sq: 'A punoni me arkitektë ose vetëm direkt me pronarin?', en: 'Do you work with architects or only directly with owners?' },
        a: {
          sq: 'Të dyja. Mund ta realizojmë projektin e përgatitur nga arkitekti juaj ose të marrim përsipër projektimin nga fillimi, sipas mënyrës që i përshtatet më mirë procesit.',
          en: 'Both. We can work from your architect\u2019s drawings or design the project ourselves from scratch. Whichever suits you.',
        },
      },
      {
        q: { sq: 'A punoni jashtë Tiranës?', en: 'Do you work outside Tirana?' },
        a: {
          sq: 'Po. Kemi mbaruar projekte në gjithë Shqipërinë. Transporti dhe instalimi organizohen nga ekipi ynë.',
          en: 'Yes. We\u2019ve delivered projects across Albania. Transport and installation are handled by our team.',
        },
      },
    ],
  },
};

export const ALL_SERVICES: ServiceConfig[] = Object.values(SERVICES);
