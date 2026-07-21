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
      sq: 'Kuzhinë moderne e punuar me porosi nga ROAL Mobileri',
      en: 'Modern bespoke kitchen by ROAL Mobileri',
    },
    metaTitle: {
      sq: 'Kuzhina me porosi në Tiranë',
      en: 'Bespoke kitchens in Tirana',
    },
    metaDescription: {
      sq: 'Kuzhina të projektuara dhe të punuara sipas përmasave të shtëpisë suaj. Projekt 3D, materiale të qëndrueshme, instalim dhe garanci 2 vjet.',
      en: 'Kitchens designed and built to the exact dimensions of your home. 3D design, durable materials, installation and 2-year warranty.',
    },
    eyebrow: { sq: 'Kuzhina me porosi', en: 'Bespoke kitchens' },
    headingLead: { sq: 'Kuzhina të bëra', en: 'Kitchens built' },
    headingAccent: { sq: 'për hapësirën tuaj.', en: 'for your space.' },
    subhead: {
      sq: 'Nga matja e parë deri te instalimi përfundimtar — një kuzhinë e menduar për mënyrën si gatuani, pritni miq dhe jetoni.',
      en: 'From the first measurement to final installation — a kitchen shaped around how you cook, entertain and live.',
    },
    intro: {
      sq: 'Nuk punojmë me katalog të ngurtë. Çdo kuzhinë fillon me takimin dhe përmasat e hapësirës suaj, vazhdon me projektin 3D ku ju shihni gjithçka para se të fillojë puna, dhe mbyllet me një instalim të punuar nga ekipi ynë. Qëllimi është i thjeshtë: një kuzhinë që funksionon përditë dhe që qëndron në formë për vite.',
      en: 'We don\u2019t work from a rigid catalogue. Every kitchen starts with a meeting and the exact measurements of your space, continues through a 3D design where you see the full result before work begins, and ends with installation by our own team. The goal is simple: a kitchen that works every day and holds up for years.',
    },
    includesTitle: { sq: 'Çfarë përfshin', en: 'What\u2019s included' },
    includesHeading: { sq: 'Gjithçka për një kuzhinë të plotë', en: 'Everything for a complete kitchen' },
    includes: {
      sq: [
        'Matje falas në shtëpinë tuaj ose në showroom',
        'Projekt 3D me materiale, ngjyra dhe pajisje',
        'Trupa dhe dyer të punuara sipas përmasave të sakta',
        'Sipërfaqe pune në granit, kuarc ose lamineo',
        'Montimi i pajisjeve të brendshme dhe lidhjet hidraulike-elektrike',
        'Instalimi i plotë nga ekipi ynë + garanci 2 vjet',
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
    materialsTitle: { sq: 'Materialet që zgjedhim', en: 'Materials we choose' },
    materialsBody: {
      sq: 'Përdorim materiale që janë menduar për vite përdorimi të përditshëm — jo për vitrinë. Trupat në MDF hidrofug ose melaminë me cilësi të lartë, dyer në lak mat, PVC ose vener natyrale, menteshat dhe rrëshqitësit me mbyllje të butë. Para se të zgjidhni, ju tregojmë mostrat realisht në showroom.',
      en: 'We use materials built for years of daily use — not for the showroom window. Carcases in moisture-resistant MDF or high-grade melamine, doors in matt lacquer, PVC or real veneer, soft-close hinges and runners. You see and touch every material sample in the showroom before you choose.',
    },
    faqs: [
      {
        q: { sq: 'Sa zgjat porositja e një kuzhine?', en: 'How long does a kitchen take?' },
        a: {
          sq: 'Zakonisht 3 deri 6 javë nga konfirmimi i projektit 3D deri në instalim. Afati i saktë jepet pasi të dakordohemi për materialet dhe pajisjet.',
          en: 'Typically 3 to 6 weeks from signing off the 3D design to installation. We confirm the exact timeline once materials and appliances are chosen.',
        },
      },
      {
        q: { sq: 'A përfshihen pajisjet elektroshtëpiake në çmim?', en: 'Are appliances included in the price?' },
        a: {
          sq: 'Pajisjet mund të ofrohen nga ne ose mund t\u2019i blini vetë. Në të dyja rastet, ne e bëjmë kuzhinën t\u2019u përshtatet saktësisht.',
          en: 'Appliances can be supplied by us or bought by you. Either way, we build the kitchen to fit them exactly.',
        },
      },
      {
        q: { sq: 'Punoni edhe kuzhina të vogla apo vetëm të mëdha?', en: 'Do you also make small kitchens or only large ones?' },
        a: {
          sq: 'Punojmë me çdo përmasë — nga kuzhina apartamenti me një mur, deri te kuzhina të hapura me ishull. Pa minimum projekti.',
          en: 'We work with any size — from one-wall apartment kitchens to large open-plan kitchens with islands. No minimum project.',
        },
      },
      {
        q: { sq: 'Sa kushton një kuzhinë me porosi?', en: 'How much does a bespoke kitchen cost?' },
        a: {
          sq: 'Çmimi varet nga metrat linearë, materialet e dyerve dhe sipërfaqes së punës, dhe pajisjet që zgjidhni. Matja në shtëpi dhe projekti 3D me çmimin e plotë janë falas dhe pa detyrim — kështu e krahasoni ofertën tonë me çdo alternativë.',
          en: 'The price depends on the linear metres, the door and worktop materials, and the appliances you choose. The home measurement and the 3D design with a full quote are free and without obligation — so you can compare our offer against any alternative.',
        },
      },
    ],
  },

  garderoba: {
    slug: 'garderoba',
    serviceType: 'Fitted wardrobes',
    image: '/images/10.jpg',
    imageAlt: {
      sq: 'Garderobë me masë e punuar me porosi nga ROAL Mobileri',
      en: 'Fitted wardrobe by ROAL Mobileri',
    },
    metaTitle: {
      sq: 'Garderoba me porosi në Tiranë — matje dhe projekt 3D falas',
      en: 'Fitted wardrobes in Tirana — free measurement & 3D design',
    },
    metaDescription: {
      sq: 'Garderoba me masë, dollapë dhe walk-in closet për çdo hapësirë — edhe kënde të vështira e tavane të pjerrëta. Matje falas, projekt 3D dhe garanci 2 vjet.',
      en: 'Fitted wardrobes, cupboards and walk-in closets for any space — including awkward corners and sloped ceilings. Free measurement, 3D design and 2-year warranty.',
    },
    eyebrow: { sq: 'Garderoba me masë', en: 'Fitted wardrobes' },
    headingLead: { sq: 'Garderoba që', en: 'Wardrobes that' },
    headingAccent: { sq: 'mbushin çdo cep.', en: 'fill every corner.' },
    subhead: {
      sq: 'Nga muri në mur, nga dyshemeja në tavan — garderoba që përdorin çdo centimetër të hapësirës suaj.',
      en: 'Wall to wall, floor to ceiling — wardrobes that use every centimetre of your space.',
    },
    intro: {
      sq: 'Një garderobë e mirë nuk është thjesht një dollap — është një sistem që ju ndihmon të mbani rendin çdo ditë. Ne e projektojmë atë sipas asaj që keni: rrobat, aksesorët, çizmet, kutitë — dhe sipas mënyrës si doni t\u2019i përdorni. Pastaj e ndërtojmë për hapësirën tuaj të saktë.',
      en: 'A good wardrobe isn\u2019t just a cupboard — it\u2019s a system that helps you stay organised every day. We design it around what you actually own: clothes, accessories, boots, boxes — and how you want to use them. Then we build it for your exact space.',
    },
    includesTitle: { sq: 'Çfarë përfshin', en: 'What\u2019s included' },
    includesHeading: { sq: 'Brenda çdo garderobe me masë', en: 'Inside every fitted wardrobe' },
    includes: {
      sq: [
        'Matje falas dhe konsultim mbi përdorimin',
        'Projekt 3D me ndarjet, sirtarët dhe aksesorët',
        'Dyer rrëshqitëse, me mentesha ose pa dyer (walk-in)',
        'Sirtarë me mbyllje të butë, ndarëse, tuba, ndriçim LED',
        'Përshtatje për tavane të pjerrëta, kënde të ngushta, kolona',
        'Instalim nga ekipi ynë + garanci 2 vjet',
      ],
      en: [
        'Free measurement and consultation on how you\u2019ll use it',
        '3D design showing internal layout, drawers and accessories',
        'Sliding, hinged or open (walk-in) configurations',
        'Soft-close drawers, dividers, hanging rails, LED lighting',
        'Solutions for sloped ceilings, tight corners and columns',
        'Installation by our team + 2-year warranty',
      ],
    },
    materialsTitle: { sq: 'Si i ndërtojmë', en: 'How we build them' },
    materialsBody: {
      sq: 'Trupat e garderobës punohen me melaminë cilësore rezistente ndaj njomjes, në trashësi që nuk lakohen me peshën e rrobave. Dyert zgjidhen sipas stilit — të lyer mat, me vener natyrale, me pasqyrë ose në xham. Të gjithë menteshat dhe rrëshqitësit kanë mbyllje të butë që zgjasin vite.',
      en: 'Wardrobe carcases use high-grade moisture-resistant melamine in a thickness that won\u2019t sag under clothing weight. Doors match your style — matt lacquer, real veneer, mirrored or glass. All hinges and runners are soft-close and built to last.',
    },
    faqs: [
      {
        q: { sq: 'A punoni garderoba që shkojnë deri në tavan?', en: 'Do you make wardrobes that go up to the ceiling?' },
        a: {
          sq: 'Po. Garderobat deri në tavan janë zgjidhja më e mirë për të shfrytëzuar hapësirën — edhe për tavane të pjerrëta dhe mansarda.',
          en: 'Yes. Full-height wardrobes are the best way to use the space — including for sloped ceilings and attics.',
        },
      },
      {
        q: { sq: 'Dyer rrëshqitëse apo me mentesha?', en: 'Sliding doors or hinged?' },
        a: {
          sq: 'Varet nga hapësira. Rrëshqitëse për dhoma të ngushta, me mentesha për pamje klasike. Në showroom ju tregojmë të dyja dhe ju ndihmojmë të zgjidhni.',
          en: 'It depends on the room. Sliding for tight spaces, hinged for a classic look. At the showroom we show you both and help you choose.',
        },
      },
      {
        q: { sq: 'Bëni edhe walk-in closet?', en: 'Do you also make walk-in closets?' },
        a: {
          sq: 'Po. Dhoma të plota walk-in closet, me ishull, ndriçim, ndarje për çanta, pasqyra dhe aksesorë.',
          en: 'Yes. Full walk-in closet rooms with islands, lighting, bag compartments, mirrors and accessories.',
        },
      },
    ],
  },

  'dhoma-gjumi': {
    slug: 'dhoma-gjumi',
    serviceType: 'Bedroom furniture',
    image: '/images/bedroom.jpg',
    imageAlt: {
      sq: 'Dhomë gjumi e punuar me porosi nga ROAL Mobileri',
      en: 'Bespoke bedroom by ROAL Mobileri',
    },
    metaTitle: {
      sq: 'Dhoma gjumi me porosi në Tiranë',
      en: 'Bespoke bedrooms in Tirana',
    },
    metaDescription: {
      sq: 'Dhoma gjumi të plota me porosi — krevate, komodina, garderoba dhe koka krevati të punuara me masë. Projekt 3D falas, instalim dhe garanci 2 vjet.',
      en: 'Complete bespoke bedrooms — beds, nightstands, wardrobes and headboards built to measure. Free 3D design, installation and 2-year warranty.',
    },
    eyebrow: { sq: 'Dhoma gjumi', en: 'Bedrooms' },
    headingLead: { sq: 'Dhoma gjumi ku', en: 'Bedrooms where' },
    headingAccent: { sq: 'pushoni vërtet.', en: 'you truly rest.' },
    subhead: {
      sq: 'Krevat, garderobë, komodina dhe ndriçim — të projektuara si një e tërë, jo si copa të blera veç e veç.',
      en: 'Bed, wardrobe, nightstands and lighting — designed as one whole, not as pieces bought separately.',
    },
    intro: {
      sq: 'Dhoma e gjumit është dhoma ku kaloni një të tretën e jetës, por shpesh mobilohet e fundit dhe me copa që nuk flasin me njëra-tjetrën. Ne e projektojmë të gjithën si një ambient: krevati me përmasat që i duhen dyshekut tuaj, koka e krevatit me ndriçim dhe priza aty ku i doni, garderoba që shfrytëzon murin nga dyshemeja në tavan. Gjithçka me masë, për hapësirën tuaj të saktë.',
      en: 'The bedroom is where you spend a third of your life, yet it is often furnished last, with pieces that don’t speak to each other. We design it as one environment: a bed sized exactly for your mattress, a headboard with lighting and sockets where you want them, a wardrobe that uses the wall from floor to ceiling. Everything made to measure, for your exact space.',
    },
    includesTitle: { sq: 'Çfarë mund të punojmë', en: 'What we can build' },
    includesHeading: { sq: 'Një dhomë gjumi e plotë, me masë', en: 'A complete bedroom, made to measure' },
    includes: {
      sq: [
        'Krevate me porosi — me kokë të veshur, dru ose me ndriçim të integruar',
        'Krevate me ngritje dhe depozitim poshtë dyshekut',
        'Komodina dhe tualete me pasqyrë, me masë',
        'Garderoba të integruara dhe dollapë mbi krevat',
        'Dhoma gjumi për fëmijë — krevate teke, marina dhe zona studimi',
        'Instalim nga ekipi ynë + garanci 2 vjet',
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
      sq: 'Për dhomat e gjumit zgjedhim materiale që qetësojnë — dru natyral, vener, tekstile të buta për kokat e krevatit dhe lak mat pa shkëlqim. Mekanizmat e ngritjes dhe sirtarët janë me mbyllje të butë, që as nata të mos prishet nga një zhurmë dere. Ngjyrat dhe ndriçimin i provoni në showroom para se të vendosni.',
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
          sq: 'Po, është edhe zgjidhja që rekomandojmë më shpesh — krevati, komodinat dhe garderoba projektohen bashkë, me të njëjtat materiale dhe finitura.',
          en: 'Yes — it’s the solution we recommend most often. The bed, nightstands and wardrobe are designed together, with the same materials and finishes.',
        },
      },
      {
        q: { sq: 'Sa kushton një dhomë gjumi me porosi?', en: 'How much does a bespoke bedroom cost?' },
        a: {
          sq: 'Varet nga përmasat, materialet dhe elementët që zgjidhni. Matja dhe projekti 3D me çmimin e plotë janë falas — vizitoni showroom-in në Km 8 të autostradës Tiranë–Durrës ose na shkruani në WhatsApp.',
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
      sq: 'Dhomë ndenje e punuar me porosi nga ROAL Mobileri',
      en: 'Bespoke living room by ROAL Mobileri',
    },
    metaTitle: {
      sq: 'Dhoma ndenje me porosi në Tiranë',
      en: 'Living-room cabinetry in Tirana',
    },
    metaDescription: {
      sq: 'Mure medie, vitrina, rafte dhe depozitim i integruar për dhomën tuaj të ndenjes. Projekt 3D, materiale të qëndrueshme, instalim dhe garanci 2 vjet.',
      en: 'Media walls, display cabinets, shelving and integrated storage for your living room. 3D design, durable materials, installation and 2-year warranty.',
    },
    eyebrow: { sq: 'Dhoma ndenje', en: 'Living rooms' },
    headingLead: { sq: 'Dhoma ndenje që', en: 'Living rooms that' },
    headingAccent: { sq: 'nuk mbushen me mobilje.', en: 'aren\u2019t crowded with furniture.' },
    subhead: {
      sq: 'Mure medie, vitrina dhe depozitim i integruar — që dhoma juaj të jetë e rregullt dhe e hapur, jo plot me copë të veçanta.',
      en: 'Media walls, display cabinets and integrated storage — so your room stays tidy and open, not crowded with separate pieces.',
    },
    intro: {
      sq: 'Dhoma e ndenjes është hapësira ku qëndroni më shumë. Një mobilje e mirë këtu nuk është vetrinë — është një sistem që fsheh kabllot, mban librat dhe dekorin, dhe e lë dhomën të marrë frymë. E projektojmë të gjithë murin si një të vetëm, jo copa që mbivendosen.',
      en: 'The living room is where you spend the most time. Good furniture here isn\u2019t a showpiece — it\u2019s a system that hides cables, holds books and decor, and lets the room breathe. We design the whole wall as one unit, not pieces that collide.',
    },
    includesTitle: { sq: 'Çfarë mund të punojmë', en: 'What we can build' },
    includesHeading: { sq: 'Mobilim i integruar për dhomën tuaj', en: 'Integrated furniture for your room' },
    includes: {
      sq: [
        'Mure medie për TV, me kalim kabllosh dhe ndriçim',
        'Vitrina dhe rafte për libra, dekor dhe objekte të çmuara',
        'Depozitim i fshehur — dollapë pa doreza, hapje me shtytje',
        'Kënde leximi, karrige të personalizuara dhe tavolina mbështetëse',
        'Mbulim i kolonave, radiatorëve dhe kabllove në mur',
        'Instalim nga ekipi ynë + garanci 2 vjet',
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
    materialsTitle: { sq: 'Materialet dhe finiturat', en: 'Materials and finishes' },
    materialsBody: {
      sq: 'Për dhomat e ndenjes zgjedhim finitura që rezistojnë ndaj gërvishtjeve dhe njollave — lak mat, vener natyrale, melaminë me tekstura. Ndriçimi LED i integruar dhe kablot e fshehura i bëjnë detajet e vogla të duken si të planifikuara, jo të improvizuara.',
      en: 'For living rooms we choose finishes that resist scratches and stains — matt lacquer, real veneer, textured melamine. Integrated LED lighting and concealed cabling make small details feel planned, not improvised.',
    },
    faqs: [
      {
        q: { sq: 'A mund të integroni një TV ekzistues?', en: 'Can you integrate an existing TV?' },
        a: {
          sq: 'Po. Duam të dimë vetëm përmasat dhe llojin e montimit (mur ose raft) dhe e punojmë murin e medias përreth tij.',
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
      sq: 'Ambient pune i punuar me porosi nga ROAL Mobileri',
      en: 'Custom workspace by ROAL Mobileri',
    },
    metaTitle: {
      sq: 'Mobilje zyre dhe ambiente pune me porosi në Tiranë',
      en: 'Office furniture & custom workspaces in Tirana',
    },
    metaDescription: {
      sq: 'Mobilje zyre me porosi në Tiranë — tavolina pune, rafte dhe zyra të plota për shtëpi e biznese. Projekt 3D, materiale të qëndrueshme, instalim dhe garanci 2 vjet.',
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
      sq: 'Një hapësirë pune e mirë fillon me pyetje praktike: sa kohë qëndroni ulur, çfarë ju duhet pranë dorës, sa dokumente mbani, a ju duhet hapësirë për takime ose vetëm për veten. Përgjigjet e atyre pyetjeve vendosin projektin. Pastaj bëhet mobilja.',
      en: 'A good workspace starts with practical questions: how long you sit, what you need within reach, how many documents you keep, whether you need room for meetings or just for yourself. The answers shape the design. Then we build it.',
    },
    includesTitle: { sq: 'Çfarë mund të punojmë', en: 'What we can build' },
    includesHeading: { sq: 'Hapësira pune të punuara me porosi', en: 'Bespoke workspaces, built to fit' },
    includes: {
      sq: [
        'Tavolina pune me masë — të drejta, në kënd ose në formë U',
        'Rafte, dollapë dosjesh dhe depozitim i integruar',
        'Zyra të plota për shtëpi ose studio',
        'Hapësira bashkëpunimi për biznese të vogla',
        'Kalime kabllosh, ndriçim pune dhe zgjidhje ergonomike',
        'Instalim nga ekipi ynë + garanci 2 vjet',
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
      sq: 'Sipërfaqet e tavolinave në lamineo të fortë ose dru masiv, të zgjedhura për t\u2019u përdorur çdo ditë pa u dëmtuar. Trupat me ndarëse të integruara për dokumente, kabllo dhe pajisje. Për zyrat e plota, i përshtatim ngjyrat dhe finiturat me identitetin vizual të biznesit.',
      en: 'Desk tops in hard-wearing laminate or solid wood, chosen to take daily use without damage. Cabinets with built-in compartments for documents, cables and equipment. For full offices, we match colours and finishes to your brand identity.',
    },
    faqs: [
      {
        q: { sq: 'Punoni edhe për apartamente të vogla?', en: 'Do you work on small apartments too?' },
        a: {
          sq: 'Po. Një këndin pune të mirë mund ta krijojmë edhe në një cep 1.5 metra — me tavolinë të palosshme, rafte të integruara dhe depozitim vertikal.',
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
      sq: 'Punim për hoteleri dhe lokale nga ROAL Mobileri',
      en: 'Hospitality and retail fit-out by ROAL Mobileri',
    },
    metaTitle: {
      sq: 'Hoteleri dhe lokale me porosi',
      en: 'Hospitality & retail fit-out',
    },
    metaDescription: {
      sq: 'Projekte komerciale me porosi për hotele, restorante, bare, kafene dhe dyqane në gjithë Shqipërinë. Projektim, prodhim dhe instalim nga një ekip i vetëm.',
      en: 'Bespoke commercial projects for hotels, restaurants, bars, cafés and shops across Albania. Design, production and installation from a single team.',
    },
    eyebrow: { sq: 'Hoteleri dhe lokale', en: 'Hospitality & retail' },
    headingLead: { sq: 'Hapësira që', en: 'Spaces that' },
    headingAccent: { sq: 'presin klientë.', en: 'welcome guests.' },
    subhead: {
      sq: 'Restorante, hotele, kafene, bare dhe dyqane — të projektuara për të zgjatur në trafikun e përditshëm.',
      en: 'Restaurants, hotels, cafés, bars and shops — designed to hold up under daily traffic.',
    },
    intro: {
      sq: 'Mobilja komerciale ka rregulla të ndryshme nga ajo e shtëpisë. Duhet të mbajë orët e pikut, të pastrohet shpejt, të mbetet si e re pas një sezoni. Ne kemi punuar me hotele, restorante dhe dyqane në Tiranë dhe jashtë saj, duke mbajtur në mendje si pamjen për klientin ashtu dhe jetëgjatësinë për pronarin.',
      en: 'Commercial furniture plays by different rules than home furniture. It has to handle peak hours, clean quickly and still look new after a full season. We\u2019ve worked with hotels, restaurants and shops in Tirana and beyond, keeping in mind both the guest\u2019s experience and the owner\u2019s return on investment.',
    },
    includesTitle: { sq: 'Çfarë kemi punuar', en: 'What we\u2019ve delivered' },
    includesHeading: { sq: 'Projekte komerciale që zgjasin', en: 'Commercial projects that last' },
    includes: {
      sq: [
        'Banakë baresh dhe restorantesh, me finitura rezistente',
        'Dhoma hoteli — mobilim i plotë dhe i përsëritshëm',
        'Dyqane retail — vitrina, rafte dhe arredim i brendshëm',
        'Kafene dhe lokale — ulëse, tavolina, zona shërbimi',
        'Logjistikë: projekt, prodhim dhe instalim nga një ekip',
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
      sq: 'Për projekte komerciale vijmë në vend, kuptojmë flukset e klientëve dhe kufizimet e hapësirës, dhe ju dërgojmë një ofertë të plotë pas projektit 3D. Mund të punojmë si drejtpërdrejt me pronarin, ashtu edhe me arkitektin tuaj. Afatet dhe kushtet shkruhen në kontratë para se të fillojë puna.',
      en: 'For commercial projects we visit on-site, understand customer flow and space constraints, and send you a full quote after the 3D design. We can work directly with owners or alongside your architect. Timelines and terms are written into the contract before work begins.',
    },
    faqs: [
      {
        q: { sq: 'A punoni me arkitektë ose vetëm direkt me pronarin?', en: 'Do you work with architects or only directly with owners?' },
        a: {
          sq: 'Të dyja. Mund të punojmë nga projekti i arkitektit tuaj, ose mund ta projektojmë ne nga e para. Çfarë ju përshtatet.',
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
