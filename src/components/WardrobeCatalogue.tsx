'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Check, MessageCircle } from 'lucide-react';
import { useLang, type Dict, type Lang } from '@/lib/i18n';
import { whatsappHref } from '@/lib/store';
import { btnGhostOnDark, btnSolidOnDark, EASE } from '@/components/ui';

const SHOWROOM_HREF = '/#showroom';

const t = (sq: string, en: string): Dict<string> => ({ sq, en });

const copy = {
  backWardrobes: t('Garderoba të integruara', 'Fitted wardrobes'),
  eyebrow: t('Udhëzuesi i garderobës ROAL', 'The ROAL wardrobe atlas'),
  headingLead: t('Përcaktoni garderobën tuaj', 'Build your wardrobe'),
  headingAccent: t('në 6 vendime.', 'in 6 decisions.'),
  subhead: t(
    'Nga forma e dhomës te hapja, frontet, xhami, organizimi dhe drita. Zgjidhni një drejtim në çdo hap; ne e përshtatim deri në milimetrin e fundit.',
    'From room layout to opening style, fronts, glass, organization and light. Choose one direction at each step; we tailor it down to the last millimetre.',
  ),
  visitCta: t('Vizitoni showroom-in', 'Visit the showroom'),
  whatsappCta: t('Na shkruani në WhatsApp', 'Message on WhatsApp'),
  heroImageAlt: t(
    'Garderobë e integruar me fronte mat, rimeso arre dhe vitrinë xhami bronz të ndriçuar',
    'Fitted wardrobe with matte fronts, walnut veneer and an illuminated bronze-glass display bay',
  ),
  heroImageNote: t('Një kompozim, gjashtë vendime', 'One composition, six decisions'),
  heroStats: {
    sq: ['6 vendime', '24 alternativa', '1 projekt i personalizuar'],
    en: ['6 decisions', '24 alternatives', '1 made-to-measure plan'],
  },
  stepLabel: t('Vendimi', 'Decision'),
  keyQuestion: t('Pyetja kryesore', 'The key question'),
  selectChoice: t('Zgjidhni këtë', 'Choose this'),
  selectedChoice: t('Zgjedhur', 'Selected'),
  multiHint: t('Mund të zgjidhni disa', 'You can select several'),
  swipeHint: t('Rrëshqitni për të krahasuar →', 'Swipe to compare →'),
  visualGuide: t(
    'Pamjet janë udhëzuese. Toni, transparenca dhe reflektimi i xhamit ndryshojnë me dritën; materialet reale i verifikojmë me mostra.',
    'Images are visual guides. Glass tone, transparency and reflection change with the light; we verify the real materials with samples.',
  ),
  selectionTitle: t('Përmbledhja juaj', 'Your selection'),
  selectionHeading: t('Gjashtë vendime, gati për t’u kthyer në plan.', 'Six decisions, ready to become a plan.'),
  selectionIntro: t(
    'Këto zgjedhje krijojnë një përmbledhje të qartë për matjen, projektin 3D dhe ofertën tuaj.',
    'This is not a final order. It is a clear brief for your measurement, 3D design and quotation.',
  ),
  notSelected: t('Ende pa zgjedhur', 'Not selected yet'),
  selectionCount: t('zgjedhje të bëra', 'choices made'),
  sendSelection: t('Dërgoni përzgjedhjen', 'Send my selection'),
  completeHint: t('Mund ta dërgoni edhe pa i plotësuar të gjitha.', 'You can send it before completing every step.'),
  summaryMessageIntro: t(
    'Përshëndetje ROAL, këto janë zgjedhjet e mia fillestare për projektin e garderobës:',
    'Hello ROAL, these are my initial fitted-wardrobe choices:',
  ),
  summaryMessageEnd: t(
    'Dua të caktoj matjen dhe projektin 3D falas.',
    'I would like to arrange the free measurement and 3D design.',
  ),
  standardTitle: t('Standard në çdo projekt', 'Standard in every project'),
  standardHeading: t('Garderoba nis nga dhoma juaj, jo nga një modul.', 'The wardrobe starts with your room, not a module.'),
  standardItems: {
    sq: [
      'Matje dhe projekt 3D falas para prodhimit',
      'Përshtatje me muret, tavanin dhe dyshemenë reale',
      'Ndarje e brendshme sipas rrobave dhe rutinës suaj',
      'Mekanizma të zgjedhur sipas hapjes, peshës dhe përdorimit',
      'Elemente xhami dhe pasqyre të integruara me mobilierinë',
      'Montim nga ekipi ynë dhe garanci 2 vjet',
    ],
    en: [
      'Free measurement and 3D design before production',
      'A precise fit to the real walls, ceiling and floor',
      'Interior zoning shaped around your clothes and routine',
      'Hardware selected for the opening, weight and use',
      'Glass and mirror elements integrated with the cabinetry',
      'Installation by our team and a 2-year warranty',
    ],
  },
  glassTitle: t('Atelier xhami', 'Glass atelier'),
  glassHeading: t('Xhami nuk fsheh. Kompozon.', 'Glass does not merely reveal. It composes.'),
  glassBody: t(
    'Realizojmë elemente xhami të integruara në mobilie — fronte të tymosura ose bronz, xham të kanaluar, pasqyra, vitrina dhe rafte ekspozimi. Korniza, drita dhe çfarë vendoset pas tyre projektohen si një e tërë.',
    'We create glass elements integrated into furniture—smoked or bronze fronts, reeded glass, mirrors, display cabinets and glass shelving. Frames, lighting and what sits behind them are designed as one composition.',
  ),
  glassChips: {
    sq: ['Pasqyrë e plotë', 'Xham i tymosur', 'Xham bronz', 'Xham i kanaluar', 'Rafte xhami', 'Vitrina me dritë'],
    en: ['Full mirror', 'Smoked glass', 'Bronze glass', 'Reeded glass', 'Glass shelving', 'Lit display bays'],
  },
  glassImageAlt: t(
    'Kënd garderobe me dyer xhami bronz, rafte xhami, pasqyrë dhe ndriçim të integruar',
    'Wardrobe corner with bronze-glass doors, glass shelves, mirror and integrated lighting',
  ),
  packagesTitle: t('Drejtimi i investimit', 'Investment direction'),
  packagesHeading: t('Tre pikënisje. Çdo projekt mbetet unik.', 'Three starting points. Every project remains made to measure.'),
  packagesNote: t(
    'Simbolet tregojnë vetëm nivelin relativ të materialeve dhe mekanizmave, jo çmim. Oferta e saktë vjen pas matjes, planit të brendshëm dhe zgjedhjes së xhamit.',
    'The symbols only indicate the relative level of materials and hardware, not a price. The exact quotation follows measurement, interior planning and glass selection.',
  ),
  recommended: t('Balanca më e kërkuar', 'Most requested balance'),
  ctaHeading: t('Pamja zgjedh drejtimin. Matja e bën garderobën tuajën.', 'The visuals set the direction. Measurement makes it yours.'),
  ctaSub: t(
    'Ejani të shihni mostrat e fronteve dhe xhamit, të provoni mekanizmat dhe të planifikojmë çdo zonë të brendshme. Matja dhe projekti 3D janë falas.',
    'Come see the front and glass samples, test the hardware and plan every interior zone. Measurement and 3D design are free.',
  ),
  genericWhatsAppMessage: t(
    'Përshëndetje ROAL, dua të diskutoj projektin e garderobës dhe alternativat e xhamit.',
    'Hello ROAL, I would like to discuss a fitted wardrobe and the glass options.',
  ),
};

type CatalogueOption = {
  id: string;
  name: Dict<string>;
  desc: Dict<string>;
  badge: Dict<string>;
  note: Dict<string>;
  image: string;
  imageAlt: Dict<string>;
};

type CatalogueStep = {
  id: string;
  navLabel: Dict<string>;
  title: Dict<string>;
  question: Dict<string>;
  intro: Dict<string>;
  options: CatalogueOption[];
  multi?: boolean;
};

const STEPS: CatalogueStep[] = [
  {
    id: 'forma',
    navLabel: t('Forma', 'Layout'),
    title: t('Forma në dhomë', 'The room layout'),
    question: t('Ku mund ta fitojmë kapacitetin më të madh?', 'Where can we gain the most useful capacity?'),
    intro: t(
      'Garderoba e mirë ndjek arkitekturën. Fillojmë me muret, këndet, kalimet dhe lartësinë — pastaj vendosim sa e mbyllur apo e hapur duhet të ndihet.',
      'A good wardrobe follows the architecture. We begin with walls, corners, circulation and height, then decide how enclosed or open it should feel.',
    ),
    options: [
      {
        id: 'wall-to-wall', name: t('Mur më mur', 'Wall to wall'), badge: t('Kapacitet', 'Capacity'), note: t('Lineare', 'Linear'),
        desc: t('Shfrytëzon një faqe të plotë me ritëm të qetë, pa boshllëqe anësore dhe me ndarje të pastra.', 'Uses one complete wall with a calm rhythm, no side gaps and clearly organized zones.'),
        image: '/images/wardrobe-catalogue/layouts/wall-to-wall.webp', imageAlt: t('Garderobë e mbyllur nga muri në mur', 'Closed wall-to-wall fitted wardrobe'),
      },
      {
        id: 'corner', name: t('Në kënd', 'Corner fit'), badge: t('Shfrytëzim', 'Space use'), note: t('Në formë L', 'L-shaped'),
        desc: t('Vazhdon në dy mure dhe e kthen këndin në ruajtje reale, pa e rënduar qendrën e dhomës.', 'Continues across two walls and turns the corner into real storage without crowding the centre of the room.'),
        image: '/images/wardrobe-catalogue/layouts/corner.webp', imageAlt: t('Garderobë e integruar në formë L', 'L-shaped fitted corner wardrobe'),
      },
      {
        id: 'walk-in', name: t('Walk-in', 'Walk-in'), badge: t('Përjetim', 'Experience'), note: t('Dhoma brenda', 'Room within'),
        desc: t('E organizon garderobën si hapësirë më vete, me zona në të dyja anët dhe kalim të kontrolluar.', 'Organizes the wardrobe as a room of its own, with zones on both sides and controlled circulation.'),
        image: '/images/wardrobe-catalogue/layouts/walk-in.webp', imageAlt: t('Garderobë walk-in me dollapë në të dyja anët', 'Walk-in wardrobe with cabinetry on both sides'),
      },
      {
        id: 'sloped-ceiling', name: t('Nën pjerrësi', 'Under a slope'), badge: t('Me milimetër', 'Precision fit'), note: t('Jo-standarde', 'Non-standard'),
        desc: t('Ndjek çatinë ose tavanin e pjerrët modul pas moduli, për të përdorur edhe lartësitë e vështira.', 'Follows a roofline or sloped ceiling module by module, making useful storage from difficult heights.'),
        image: '/images/wardrobe-catalogue/layouts/sloped-ceiling.webp', imageAlt: t('Garderobë e ndërtuar nën tavan të pjerrët', 'Fitted wardrobe built beneath a sloped ceiling'),
      },
    ],
  },
  {
    id: 'hapja',
    navLabel: t('Hapja', 'Opening'),
    title: t('Mënyra e hapjes', 'How it opens'),
    question: t('Sa hapësirë ka përpara garderobës?', 'How much clear space is there in front?'),
    intro: t(
      'Hapja ndryshon qasjen, pamjen dhe lëvizjen në dhomë. Zgjedhja nuk është vetëm estetike: varet nga distanca te krevati dhe sa brendësi doni të shihni njëherësh.',
      'Opening style changes access, appearance and movement through the room. It is not only aesthetic: it depends on bed clearance and how much of the interior you want to see at once.',
    ),
    options: [
      {
        id: 'hinged', name: t('Me mentesha', 'Hinged'), badge: t('Qasje e plotë', 'Full access'), note: t('Kërkon hapësirë', 'Needs clearance'),
        desc: t('Hap të gjithë modulin dhe lejon pasqyrë ose aksesorë në anën e brendshme të derës.', 'Opens the complete module and allows a mirror or accessories on the inside of the door.'),
        image: '/images/wardrobe-catalogue/doors/hinged.webp', imageAlt: t('Dyer garderobe me mentesha të hapura', 'Open hinged wardrobe doors'),
      },
      {
        id: 'sliding', name: t('Rrëshqitëse', 'Sliding'), badge: t('Pa rreze hapjeje', 'No swing zone'), note: t('Kompakte', 'Compact'),
        desc: t('Punon mirë pranë krevatit ose në kalime të ngushta; një pjesë e brendshme mbetet gjithmonë e mbuluar.', 'Works well near a bed or in tight circulation; one part of the interior always remains covered.'),
        image: '/images/wardrobe-catalogue/doors/sliding.webp', imageAlt: t('Dyer të mëdha garderobe që rrëshqasin', 'Large sliding wardrobe doors'),
      },
      {
        id: 'bi-fold', name: t('Me palosje', 'Bi-fold'), badge: t('Hapje e gjerë', 'Wide opening'), note: t('Fletë të palosura', 'Folding leaves'),
        desc: t('I mbledh fletët anash dhe hap një zonë të madhe pa kërkuar rrezen e një dere të plotë.', 'Folds the leaves to the side and reveals a broad zone without the swing radius of a full door.'),
        image: '/images/wardrobe-catalogue/doors/bi-fold.webp', imageAlt: t('Dyer garderobe me palosje anësore', 'Side-folding wardrobe doors'),
      },
      {
        id: 'open', name: t('E hapur', 'Open'), badge: t('E menjëhershme', 'Immediate'), note: t('Gjithmonë në pamje', 'Always visible'),
        desc: t('Heq barrierën e derës dhe e bën organizimin pjesë të interierit; kërkon ritëm të rregullt brenda.', 'Removes the door barrier and makes organization part of the interior; it rewards a disciplined internal rhythm.'),
        image: '/images/wardrobe-catalogue/doors/open.webp', imageAlt: t('Garderobë e hapur me rafte dhe varëse', 'Open wardrobe with shelves and hanging rail'),
      },
    ],
  },
  {
    id: 'frontet',
    navLabel: t('Panelet', 'Fronts'),
    title: t('Panelet e plota', 'Solid fronts'),
    question: t('Doni qetësi, ngjyrë apo damar natyral?', 'Do you want calm, colour or natural grain?'),
    intro: t(
      'Kur garderoba zë një mur të tërë, fronti bëhet arkitekturë. Krahasoni prekjen, reflektimin dhe vazhdimësinë e damarëve — jo vetëm ngjyrën në ekran.',
      'When a wardrobe occupies a whole wall, the front becomes architecture. Compare touch, reflection and grain continuity—not just colour on a screen.',
    ),
    options: [
      {
        id: 'melamine', name: t('Melaminë', 'Melamine'), badge: t('Praktike', 'Practical'), note: t('Shumë dekore', 'Many finishes'),
        desc: t('Zgjedhje e qëndrueshme për përdorim të përditshëm, me tone uni dhe dekore druri në një gamë të gjerë.', 'A durable everyday choice with a broad range of solid colours and woodgrain decors.'),
        image: '/images/wardrobe-catalogue/fronts/melamine.webp', imageAlt: t('Panele garderobe melamine në ton të ngrohtë', 'Warm-toned melamine wardrobe fronts'),
      },
      {
        id: 'pet-acrylic', name: t('PET / Akrilik', 'PET / Acrylic'), badge: t('Uniforme', 'Uniform'), note: t('Mat ose me shkëlqim', 'Matte or gloss'),
        desc: t('Sipërfaqe shumë e njëtrajtshme dhe e lëmuar, për një mur garderobe vizualisht të pastër.', 'A very even, smooth surface for a visually clean wall of wardrobe fronts.'),
        image: '/images/wardrobe-catalogue/fronts/pet-acrylic.webp', imageAlt: t('Panele garderobe të lëmuara në bezhë mat', 'Smooth matte-beige wardrobe fronts'),
      },
      {
        id: 'lacquered-mdf', name: t('MDF me lyerje', 'Lacquered MDF'), badge: t('Ngjyrë e personalizuar', 'Custom colour'), note: t('Pa bordurë të dukshme', 'Seamless edge'),
        desc: t('Lejon ton të personalizuar, kanale, frezime dhe forma më të buta pa bordurë të dukshme.', 'Allows custom colour, grooves, routed details and softer forms without visible edging.'),
        image: '/images/wardrobe-catalogue/fronts/lacquered-mdf.webp', imageAlt: t('Panele MDF me lyerje në ngjyrë fildishi', 'Ivory lacquered-MDF wardrobe fronts'),
      },
      {
        id: 'wood-veneer', name: t('Rimeso druri', 'Wood veneer'), badge: t('Dru i vërtetë', 'Real wood'), note: t('Damar unik', 'Unique grain'),
        desc: t('Sjell ngrohtësinë e drurit real; damarët mund të vazhdojnë nga një front te tjetri ose të kombinohen me kanale.', 'Brings the warmth of real wood; grain can continue across fronts or be paired with fluted detailing.'),
        image: '/images/wardrobe-catalogue/fronts/wood-veneer.webp', imageAlt: t('Panele garderobe me rimeso arre dhe kanale', 'Fluted walnut-veneer wardrobe fronts'),
      },
    ],
  },
  {
    id: 'xhami',
    navLabel: t('Xhami', 'Glass'),
    title: t('Xham dhe pasqyrë', 'Glass and mirror'),
    question: t('Çfarë duhet të zbulojë dhe çfarë duhet të zbusë?', 'What should it reveal, and what should it soften?'),
    intro: t(
      'Xhami mund të zmadhojë dhomën, të lërë garderobën të marrë frymë ose të kthejë një modul në vitrinë. Transparenca, korniza dhe drita duhen zgjedhur së bashku.',
      'Glass can enlarge the room, let the wardrobe breathe or turn one module into a display. Transparency, frame and light should be chosen together.',
    ),
    options: [
      {
        id: 'mirror', name: t('Pasqyrë e plotë', 'Full mirror'), badge: t('Dy funksione', 'Dual purpose'), note: t('Mbyll pamjen', 'Conceals inside'),
        desc: t('Jep pasqyrë trupore dhe shton ndjesinë e hapësirës, ndërsa brendësia mbetet plotësisht e fshehur.', 'Provides a full-length mirror and a greater sense of space while keeping the interior fully concealed.'),
        image: '/images/wardrobe-catalogue/glass/mirror.webp', imageAlt: t('Dyer garderobe me pasqyrë në kornizë të hollë', 'Mirrored wardrobe doors in slim frames'),
      },
      {
        id: 'smoked', name: t('Xham i tymosur', 'Smoked glass'), badge: t('Kontrast i butë', 'Soft contrast'), note: t('Gri transparent', 'Grey transparent'),
        desc: t('Tregon siluetat dhe ndarjet pa ekspozuar çdo detaj; lidhet bukur me kornizë të errët dhe arrë.', 'Shows silhouettes and zones without exposing every detail; it pairs naturally with dark frames and walnut.'),
        image: '/images/wardrobe-catalogue/glass/smoked.webp', imageAlt: t('Dyer garderobe me xham të tymosur gri', 'Wardrobe doors in smoked-grey glass'),
      },
      {
        id: 'bronze', name: t('Xham bronz', 'Bronze glass'), badge: t('Ngrohtësi', 'Warmth'), note: t('Tonalitet amber', 'Amber tone'),
        desc: t('I jep transparencës një ton më të ngrohtë dhe e bën garderobën të ndihet si mobilie ekspozimi.', 'Gives transparency a warmer tone and makes the wardrobe feel more like display furniture.'),
        image: '/images/wardrobe-catalogue/glass/bronze.webp', imageAlt: t('Dyer garderobe me xham bronz transparent', 'Transparent bronze-glass wardrobe doors'),
      },
      {
        id: 'fluted', name: t('Xham i kanaluar', 'Reeded glass'), badge: t('Teksturë', 'Texture'), note: t('Pamje e zbutur', 'Diffused view'),
        desc: t('Ritmi vertikal deformon butë çfarë ka pas dhe shton detaj, pa e bërë frontin krejt të mbyllur.', 'Vertical ribs softly distort what sits behind and add detail without making the front fully opaque.'),
        image: '/images/wardrobe-catalogue/glass/fluted.webp', imageAlt: t('Dyer garderobe me xham vertikal të kanaluar', 'Wardrobe doors in vertically reeded glass'),
      },
    ],
  },
  {
    id: 'brenda',
    multi: true,
    navLabel: t('Brenda', 'Interior'),
    title: t('Organizimi i brendshëm', 'Interior organization'),
    question: t('Çfarë përdorni çdo mëngjes dhe çfarë vetëm në sezon?', 'What do you use every morning, and what only seasonally?'),
    intro: t(
      'Brendësia duhet të ndjekë inventarin tuaj real. Matim gjatësinë e varjes, numrin e palosjeve, këpucët, çantat dhe zonën e lartë para se të ndajmë modulet.',
      'The interior should follow your real inventory. We assess hanging length, folded items, shoes, bags and high storage before dividing the modules.',
    ),
    options: [
      {
        id: 'double-hanging', name: t('Varje e dyfishtë', 'Double hanging'), badge: t('Kapacitet ditor', 'Daily capacity'), note: t('Këmisha + pantallona', 'Shirts + trousers'),
        desc: t('Dy nivele varëse dyfishojnë përdorimin e një moduli për rroba të shkurtra.', 'Two hanging levels double the use of one module for shorter garments.'),
        image: '/images/wardrobe-catalogue/interiors/double-hanging.webp', imageAlt: t('Modul garderobe me dy nivele varëse', 'Wardrobe module with two hanging levels'),
      },
      {
        id: 'drawers-accessories', name: t('Sirtarë dhe tabaka', 'Drawers and trays'), badge: t('Detaje të vogla', 'Small items'), note: t('Të ndara', 'Compartmented'),
        desc: t('Sirtarët fshehin palosjet; tabakaja e cekët organizon bizhuteri, ora, rripa dhe aksesorë.', 'Drawers conceal folded items; a shallow tray organizes jewellery, watches, belts and accessories.'),
        image: '/images/wardrobe-catalogue/interiors/drawers-accessories.webp', imageAlt: t('Kullë me sirtarë dhe tabaka aksesorësh', 'Drawer tower with an accessory tray'),
      },
      {
        id: 'shoes-bags', name: t('Këpucë dhe çanta', 'Shoes and bags'), badge: t('Qasje e shpejtë', 'Quick access'), note: t('Rafte me tërheqje', 'Pull-out storage'),
        desc: t('Rafte të dedikuara mbajnë këpucët në pamje dhe çantat pa u shtypur mes rrobave.', 'Dedicated shelves keep shoes visible and bags from being compressed between clothing.'),
        image: '/images/wardrobe-catalogue/interiors/shoes-bags.webp', imageAlt: t('Rafte me tërheqje për këpucë dhe ndarje për çanta', 'Pull-out shoe shelves and bag compartments'),
      },
      {
        id: 'wardrobe-lift', name: t('Lift garderobe', 'Wardrobe lift'), badge: t('Lartësia punon', 'Uses the height'), note: t('Varëse që zbret', 'Pull-down rail'),
        desc: t('E sjell varësen e lartë në nivel të arritshëm dhe liron zonën poshtë për sirtarë ose rafte.', 'Brings a high rail down within reach and frees the lower zone for drawers or shelving.'),
        image: '/images/wardrobe-catalogue/interiors/wardrobe-lift.webp', imageAlt: t('Mekanizëm lift që ul varësen e garderobës', 'Pull-down wardrobe rail mechanism'),
      },
    ],
  },
  {
    id: 'ndricimi',
    multi: true,
    navLabel: t('Drita', 'Lighting'),
    title: t('Drita dhe ekspozimi', 'Lighting and display'),
    question: t('Doni të shihni më mirë apo të krijoni atmosferë?', 'Do you want better visibility or more atmosphere?'),
    intro: t(
      'Drita e mirë nuk duhet të verbojë dhe as të tregojë pika LED. E fshehim në profil, e drejtojmë te rrobat ose xhami dhe e aktivizojmë aty ku ka kuptim.',
      'Good lighting should neither glare nor show LED dots. We conceal it in a profile, aim it at clothing or glass, and activate it where it makes sense.',
    ),
    options: [
      {
        id: 'vertical-led', name: t('LED vertikal', 'Vertical LED'), badge: t('Pamje e plotë', 'Full visibility'), note: t('Dritë anësore', 'Side lighting'),
        desc: t('Dy vija të fshehura ndriçojnë varësen nga lart-poshtë dhe reduktojnë hijet mes rrobave.', 'Two concealed lines light the hanging zone from top to bottom and reduce shadows between garments.'),
        image: '/images/wardrobe-catalogue/lighting/vertical-led.webp', imageAlt: t('Garderobë me profile LED vertikale', 'Wardrobe with vertical LED profiles'),
      },
      {
        id: 'shelf-display', name: t('Dritë nën rafte', 'Under-shelf light'), badge: t('Shtresë pas shtrese', 'Layer by layer'), note: t('Rafte xhami', 'Glass shelves'),
        desc: t('Ndriçon çdo nivel veçmas dhe i jep lehtësi rafteve të xhamit ose zonave të ekspozimit.', 'Lights each level separately and gives visual lightness to glass shelving or display zones.'),
        image: '/images/wardrobe-catalogue/lighting/shelf-display.webp', imageAlt: t('Rafte xhami me ndriçim linear poshtë', 'Glass shelves with concealed linear lighting'),
      },
      {
        id: 'drawer-sensor', name: t('Sensor në sirtar', 'Drawer sensor'), badge: t('Vetëm kur duhet', 'Only when needed'), note: t('Automatike', 'Automatic'),
        desc: t('Drita ndizet me hapjen dhe e bën të lexueshme gjithë tabakanë pa ndriçuar dhomën.', 'Light activates on opening and makes the whole tray readable without lighting the room.'),
        image: '/images/wardrobe-catalogue/lighting/drawer-sensor.webp', imageAlt: t('Sirtar garderobe i hapur me dritë sensori', 'Open wardrobe drawer with sensor lighting'),
      },
      {
        id: 'glass-display', name: t('Vitrinë e ndriçuar', 'Illuminated display'), badge: t('Pikë fokale', 'Focal point'), note: t('Xham + dritë', 'Glass + light'),
        desc: t('Një modul me xham, rafte dhe dritë të fshehur e thyen murin e mbyllur dhe ekspozon objektet e zgjedhura.', 'A glass, shelf and concealed-light module breaks up a closed wall and displays selected objects.'),
        image: '/images/wardrobe-catalogue/lighting/glass-display.webp', imageAlt: t('Vitrinë e integruar me rafte xhami dhe dritë', 'Integrated display bay with glass shelves and lighting'),
      },
    ],
  },
];

type Package = {
  name: Dict<string>;
  level: string;
  tagline: Dict<string>;
  image: string;
  imageAlt: Dict<string>;
  highlighted?: boolean;
  features: { sq: string[]; en: string[] };
};

const PACKAGES: Package[] = [
  {
    name: t('Essential', 'Essential'),
    level: '€',
    tagline: t('Qartësi, kapacitet, materiale praktike', 'Clarity, capacity and practical materials'),
    image: '/images/wardrobe-catalogue/fronts/melamine.webp',
    imageAlt: t('Garderobë e qetë me fronte melamine', 'Calm wardrobe with melamine fronts'),
    features: {
      sq: ['Kompozim mur më mur', 'Fronte melamine', 'Hapje me mentesha ose rrëshqitje', 'Rafte dhe varëse sipas inventarit'],
      en: ['Wall-to-wall composition', 'Melamine fronts', 'Hinged or sliding opening', 'Shelves and rails based on inventory'],
    },
  },
  {
    name: t('Signature', 'Signature'),
    level: '€€',
    tagline: t('Më shumë material, organizim dhe dritë', 'More material, organization and light'),
    image: '/images/wardrobe-catalogue/interiors/drawers-accessories.webp',
    imageAlt: t('Brendësi garderobe me sirtarë dhe tabaka të personalizuara', 'Wardrobe interior with tailored drawers and trays'),
    highlighted: true,
    features: {
      sq: ['MDF me lyerje ose theks rimeso', 'Sirtarë dhe aksesorë të personalizuar', 'Mekanizma sipas mënyrës së hapjes', 'Ndriçim LED me sensor'],
      en: ['Lacquered MDF or veneer accent', 'Tailored drawers and accessories', 'Hardware matched to the opening style', 'Sensor-controlled LED lighting'],
    },
  },
  {
    name: t('Glass atelier', 'Glass atelier'),
    level: '€€€',
    tagline: t('Transparencë, reflektim dhe ekspozim', 'Transparency, reflection and display'),
    image: '/images/wardrobe-catalogue/glass/bronze.webp',
    imageAlt: t('Garderobë me fronte xhami bronz', 'Wardrobe with bronze-glass fronts'),
    features: {
      sq: ['Fronte xhami me kornizë alumini', 'Xham bronz, i tymosur ose i kanaluar', 'Pasqyrë ose vitrinë e integruar', 'Rafte xhami dhe plan i plotë ndriçimi'],
      en: ['Aluminium-framed glass fronts', 'Bronze, smoked or reeded glass', 'Integrated mirror or display bay', 'Glass shelving and a complete lighting plan'],
    },
  },
];

export default function WardrobeCatalogue() {
  const { lang } = useLang();
  const [selections, setSelections] = useState<Record<string, string[]>>({});
  const [activeSection, setActiveSection] = useState(STEPS[0].id);

  useEffect(() => {
    const sections = [...STEPS.map((step) => step.id), 'drejtimet']
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveSection(visible.target.id);
      },
      { rootMargin: '-22% 0px -66% 0px', threshold: [0, 0.1] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const selectedCount = Object.keys(selections).length;

  const selectionWhatsAppHref = useMemo(() => {
    const lines = STEPS.map((step, index) => {
      const selectedIds = selections[step.id] ?? [];
      const value = selectedIds.length
        ? step.options
            .filter((item) => selectedIds.includes(item.id))
            .map((item) => item.name[lang])
            .join(', ')
        : copy.notSelected[lang];
      return `${index + 1}. ${step.navLabel[lang]}: ${value}`;
    });
    return whatsappHref(`${copy.summaryMessageIntro[lang]}\n\n${lines.join('\n')}\n\n${copy.summaryMessageEnd[lang]}`);
  }, [lang, selections]);

  const genericWhatsAppHref = whatsappHref(copy.genericWhatsAppMessage[lang]);

  const selectOption = (stepId: string, optionId: string) => {
    const multi = STEPS.find((step) => step.id === stepId)?.multi ?? false;
    setSelections((current) => {
      const currentIds = current[stepId] ?? [];
      const nextIds = currentIds.includes(optionId)
        ? currentIds.filter((id) => id !== optionId)
        : multi
          ? [...currentIds, optionId]
          : [optionId];

      const next = { ...current };
      if (nextIds.length === 0) {
        delete next[stepId];
      } else {
        next[stepId] = nextIds;
      }
      return next;
    });
  };

  return (
    <main id="main-content" className="bg-paper text-ink">
      <section className="relative overflow-hidden bg-ink text-paper">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 pb-16 pt-28 sm:px-8 sm:pb-20 sm:pt-32 lg:min-h-[46rem] lg:grid-cols-12 lg:items-center lg:gap-10 lg:pb-24">
          <div className="relative z-10 lg:col-span-5 lg:pr-4">
            <Link href="/garderoba" className="group inline-flex min-h-11 items-center gap-2 text-[0.68rem] font-medium uppercase tracking-[0.2em] text-paper/60 transition-colors hover:text-sand">
              <span aria-hidden="true" className="transition-transform duration-300 group-hover:-translate-x-1">←</span>
              {copy.backWardrobes[lang]}
            </Link>
            <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: EASE }} className="mt-8 text-[0.68rem] font-medium uppercase tracking-[0.22em] text-sand">
              {copy.eyebrow[lang]}
            </motion.p>
            <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: EASE }} className="mt-5 max-w-[11ch] text-balance font-serif text-[clamp(2.8rem,6.4vw,5.5rem)] font-normal leading-[0.96] tracking-[-0.035em]">
              {copy.headingLead[lang]} <span className="italic text-sand">{copy.headingAccent[lang]}</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08, duration: 0.65, ease: EASE }} className="mt-7 max-w-xl text-base leading-[1.75] text-paper/72 sm:text-lg">
              {copy.subhead[lang]}
            </motion.p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link href={SHOWROOM_HREF} className={btnSolidOnDark}>
                {copy.visitCta[lang]}<ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
              </Link>
              <a href={genericWhatsAppHref} target="_blank" rel="noopener noreferrer" className={btnGhostOnDark}>
                <MessageCircle className="h-4 w-4" aria-hidden="true" />{copy.whatsappCta[lang]}
              </a>
            </div>
            <ul className="mt-10 grid grid-cols-3 border-y border-paper/15" aria-label={lang === 'sq' ? 'Përmbledhje e katalogut' : 'Catalogue summary'}>
              {copy.heroStats[lang].map((stat, index) => (
                <li key={stat} className={`py-4 text-[0.62rem] font-medium uppercase leading-relaxed tracking-[0.16em] text-paper/55 ${index > 0 ? 'border-l border-paper/15 pl-4' : 'pr-4'}`}>{stat}</li>
              ))}
            </ul>
          </div>

          <motion.figure initial={{ opacity: 0, scale: 0.985 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.9, ease: EASE }} className="relative min-h-[24rem] overflow-hidden bg-ink-2 sm:min-h-[34rem] lg:col-span-7 lg:min-h-[39rem]">
            <Image src="/images/wardrobe-catalogue/hero.webp" alt={copy.heroImageAlt[lang]} fill priority sizes="(min-width: 1024px) 58vw, 100vw" className="object-cover" />
            <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-5 bg-gradient-to-t from-ink/85 via-ink/20 to-transparent px-5 pb-5 pt-20 text-paper sm:px-7 sm:pb-7">
              <span className="max-w-[20rem] text-[0.65rem] uppercase leading-relaxed tracking-[0.18em] text-paper/72">{copy.heroImageNote[lang]}</span>
              <span aria-hidden="true" className="font-serif text-4xl italic text-sand sm:text-5xl">01—06</span>
            </figcaption>
          </motion.figure>
        </div>
      </section>

      <nav aria-label={lang === 'sq' ? 'Gjashtë vendimet e katalogut' : 'The six catalogue decisions'} className="sticky top-[4.5rem] z-30 border-b border-ink/10 bg-paper/95 backdrop-blur-md md:top-[4.125rem]">
        <div className="mx-auto flex max-w-7xl overflow-x-auto px-3 py-2 sm:px-8 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {STEPS.map((step, index) => {
            const active = activeSection === step.id;
            return (
              <a key={step.id} href={`#${step.id}`} aria-current={active ? 'step' : undefined} className={`flex min-h-11 shrink-0 items-center gap-2.5 border-r border-ink/10 px-4 text-[0.68rem] font-medium uppercase tracking-[0.14em] transition-colors first:border-l ${active ? 'bg-ink text-paper' : 'text-body hover:bg-linen hover:text-ink'}`}>
                <span className={active ? 'text-sand' : 'text-clay'}>0{index + 1}</span>{step.navLabel[lang]}
              </a>
            );
          })}
          <a href="#drejtimet" aria-current={activeSection === 'drejtimet' ? 'step' : undefined} className={`flex min-h-11 shrink-0 items-center gap-2.5 border-r border-ink/10 px-4 text-[0.68rem] font-medium uppercase tracking-[0.14em] transition-colors ${activeSection === 'drejtimet' ? 'bg-ink text-paper' : 'text-body hover:bg-linen hover:text-ink'}`}>
            <span className={activeSection === 'drejtimet' ? 'text-sand' : 'text-clay'}>€</span>{copy.packagesTitle[lang]}
          </a>
        </div>
      </nav>

      {STEPS.map((step, index) => (
        <StepSection key={step.id} step={step} index={index} lang={lang} selectedIds={selections[step.id] ?? []} onSelect={(optionId) => selectOption(step.id, optionId)} />
      ))}

      <section className="bg-ink text-paper">
        <div className="mx-auto grid max-w-7xl lg:grid-cols-2">
          <div className="border-b border-paper/15 px-6 py-20 sm:px-8 sm:py-24 lg:border-b-0 lg:border-r lg:px-12 xl:px-16">
            <div className="flex items-center justify-between gap-6">
              <p className="text-[0.68rem] font-medium uppercase tracking-[0.22em] text-sand">{copy.selectionTitle[lang]}</p>
              <p className="text-xs text-paper/50"><span className="font-serif text-2xl text-paper">{selectedCount}</span>/6 {copy.selectionCount[lang]}</p>
            </div>
            <h2 className="mt-5 max-w-[14ch] text-balance font-serif text-[clamp(2rem,4vw,3.2rem)] font-normal leading-[1.04] tracking-[-0.025em]">{copy.selectionHeading[lang]}</h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-paper/65">{copy.selectionIntro[lang]}</p>
            <ol className="mt-9 border-t border-paper/15">
              {STEPS.map((step, index) => {
                const selectedIds = selections[step.id] ?? [];
                const selectedNames = step.options
                  .filter((option) => selectedIds.includes(option.id))
                  .map((option) => option.name[lang]);
                return (
                  <li key={step.id} className="border-b border-paper/15">
                    <a href={`#${step.id}`} className="group grid min-h-14 grid-cols-[2rem_1fr_auto] items-center gap-3 py-3">
                      <span className="text-[0.65rem] text-sand">0{index + 1}</span>
                      <span className="text-xs uppercase tracking-[0.14em] text-paper/45">{step.navLabel[lang]}</span>
                      <span className={`text-right text-sm transition-colors group-hover:text-sand ${selectedNames.length ? 'text-paper' : 'italic text-paper/35'}`}>{selectedNames.length ? selectedNames.join(', ') : copy.notSelected[lang]}</span>
                    </a>
                  </li>
                );
              })}
            </ol>
            <a href={selectionWhatsAppHref} target="_blank" rel="noopener noreferrer" className={`${btnSolidOnDark} mt-9 w-full sm:w-auto`}>
              <MessageCircle className="h-4 w-4" aria-hidden="true" />{copy.sendSelection[lang]}
            </a>
            <p className="mt-3 text-xs leading-relaxed text-paper/40">{copy.completeHint[lang]}</p>
          </div>

          <div className="bg-ink-2 px-6 py-20 sm:px-8 sm:py-24 lg:px-12 xl:px-16">
            <p className="text-[0.68rem] font-medium uppercase tracking-[0.22em] text-sand">{copy.standardTitle[lang]}</p>
            <h2 className="mt-5 max-w-[14ch] text-balance font-serif text-[clamp(2rem,4vw,3.2rem)] font-normal leading-[1.04] tracking-[-0.025em]">{copy.standardHeading[lang]}</h2>
            <ul className="mt-9 border-t border-paper/15">
              {copy.standardItems[lang].map((item, index) => (
                <motion.li key={item} initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.4 }} transition={{ delay: index * 0.05, duration: 0.45, ease: EASE }} className="flex min-h-16 items-center gap-4 border-b border-paper/15 py-3 text-sm leading-relaxed text-paper/80 sm:text-base">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center border border-sand/40 text-sand"><Check className="h-3.5 w-3.5" aria-hidden="true" /></span>{item}
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-linen">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 sm:px-8 sm:py-28 lg:grid-cols-12 lg:items-center lg:gap-16">
          <div className="lg:order-2 lg:col-span-5">
            <p className="text-[0.68rem] font-medium uppercase tracking-[0.22em] text-clay">{copy.glassTitle[lang]}</p>
            <h2 className="mt-5 max-w-[12ch] text-balance font-serif text-[clamp(2.2rem,4.5vw,3.8rem)] font-normal leading-[1.02] tracking-[-0.03em]">{copy.glassHeading[lang]}</h2>
            <p className="mt-6 max-w-xl text-base leading-[1.8] text-body sm:text-lg">{copy.glassBody[lang]}</p>
            <ul className="mt-9 grid grid-cols-2 border-l border-t border-ink/15">
              {copy.glassChips[lang].map((chip, index) => (
                <li key={chip} className="flex min-h-16 items-center gap-3 border-b border-r border-ink/15 px-3 py-3 text-xs uppercase leading-relaxed tracking-[0.12em] text-body"><span className="text-[0.62rem] text-clay">0{index + 1}</span>{chip}</li>
              ))}
            </ul>
          </div>
          <motion.figure initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.7, ease: EASE }} className="lg:order-1 lg:col-span-7">
            <div className="relative aspect-[4/5] overflow-hidden bg-ink/5 sm:aspect-[3/4] lg:aspect-[4/5]">
              <Image src="/images/wardrobe-catalogue/glass-atelier.webp" alt={copy.glassImageAlt[lang]} fill sizes="(min-width: 1024px) 58vw, 100vw" className="object-cover" />
            </div>
            <figcaption className="mt-3 max-w-lg text-xs leading-relaxed text-body/60">{copy.visualGuide[lang]}</figcaption>
          </motion.figure>
        </div>
      </section>

      <section id="drejtimet" className="scroll-mt-32 border-t border-ink/10 bg-paper">
        <div className="mx-auto max-w-7xl px-6 py-20 sm:px-8 sm:py-28">
          <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <p className="text-[0.68rem] font-medium uppercase tracking-[0.22em] text-clay">{copy.packagesTitle[lang]}</p>
              <h2 className="mt-5 max-w-[17ch] text-balance font-serif text-[clamp(2.2rem,4.5vw,3.8rem)] font-normal leading-[1.02] tracking-[-0.03em]">{copy.packagesHeading[lang]}</h2>
            </div>
            <p className="max-w-lg text-sm leading-relaxed text-body/70 lg:col-span-4 lg:text-right">{copy.packagesNote[lang]}</p>
          </div>

          <div className="mt-12 grid gap-px bg-ink/15 lg:grid-cols-3">
            {PACKAGES.map((item, index) => (
              <motion.article key={item.name.en} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ delay: index * 0.08, duration: 0.55, ease: EASE }} className={`relative flex flex-col ${item.highlighted ? 'bg-ink text-paper' : 'bg-paper text-ink'}`}>
                <div className="relative aspect-[16/9] overflow-hidden bg-linen">
                  <Image src={item.image} alt={item.imageAlt[lang]} fill sizes="(min-width: 1024px) 33vw, 100vw" className="object-cover transition-transform duration-700 ease-[var(--ease-out-expo)] hover:scale-[1.025]" />
                  {item.highlighted && <span className="absolute left-0 top-0 bg-sand px-4 py-2 text-[0.62rem] font-medium uppercase tracking-[0.16em] text-ink">{copy.recommended[lang]}</span>}
                </div>
                <div className="flex flex-1 flex-col p-6 sm:p-8">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="font-serif text-3xl font-normal">{item.name[lang]}</h3>
                    <span className={`font-serif text-2xl tracking-[0.08em] ${item.highlighted ? 'text-sand' : 'text-clay'}`}>{item.level}</span>
                  </div>
                  <p className={`mt-5 text-sm leading-relaxed ${item.highlighted ? 'text-sand' : 'text-clay'}`}>{item.tagline[lang]}</p>
                  <ul className={`mt-7 border-t ${item.highlighted ? 'border-paper/15' : 'border-ink/15'}`}>
                    {item.features[lang].map((feature) => (
                      <li key={feature} className={`flex gap-3 border-b py-3 text-sm leading-relaxed ${item.highlighted ? 'border-paper/15 text-paper/78' : 'border-ink/15 text-body'}`}>
                        <Check className={`mt-0.5 h-4 w-4 shrink-0 ${item.highlighted ? 'text-sand' : 'text-clay'}`} aria-hidden="true" />{feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-clay text-paper">
        <div aria-hidden="true" className="absolute -right-12 top-1/2 font-serif text-[18rem] leading-none text-paper/[0.055] sm:text-[28rem]">R</div>
        <div className="relative mx-auto grid max-w-7xl gap-10 px-6 py-20 sm:px-8 sm:py-28 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <h2 className="max-w-[18ch] text-balance font-serif text-[clamp(2.3rem,5vw,4.5rem)] font-normal leading-[1] tracking-[-0.035em]">{copy.ctaHeading[lang]}</h2>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-paper/75 sm:text-lg">{copy.ctaSub[lang]}</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:col-span-4 lg:flex-col xl:flex-row">
            <Link href={SHOWROOM_HREF} className={btnSolidOnDark}>{copy.visitCta[lang]}<ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" /></Link>
            <a href={genericWhatsAppHref} target="_blank" rel="noopener noreferrer" className={btnGhostOnDark}><MessageCircle className="h-4 w-4" aria-hidden="true" />{copy.whatsappCta[lang]}</a>
          </div>
        </div>
      </section>
    </main>
  );
}

function StepSection({ step, index, lang, selectedIds, onSelect }: { step: CatalogueStep; index: number; lang: Lang; selectedIds: string[]; onSelect: (optionId: string) => void }) {
  const onLinen = index % 2 === 1;

  return (
    <section id={step.id} className={`scroll-mt-32 border-b border-ink/10 ${onLinen ? 'bg-linen' : 'bg-paper'}`}>
      <div className="mx-auto max-w-7xl px-6 py-20 sm:px-8 sm:py-28">
        <header className="grid gap-6 lg:grid-cols-12 lg:items-start lg:gap-8">
          <div className="flex items-baseline gap-3 lg:col-span-2 lg:block">
            <p className="text-[0.65rem] font-medium uppercase tracking-[0.2em] text-clay">{copy.stepLabel[lang]}</p>
            <p aria-hidden="true" className="mt-2 font-serif text-6xl italic leading-none text-clay/70 sm:text-7xl">0{index + 1}</p>
          </div>
          <div className="lg:col-span-6">
            <h2 className="max-w-[15ch] text-balance font-serif text-[clamp(2.2rem,4.2vw,3.6rem)] font-normal leading-[1.02] tracking-[-0.03em]">{step.title[lang]}</h2>
            <p className="mt-5 max-w-2xl text-base leading-[1.75] text-body sm:text-lg">{step.intro[lang]}</p>
            {step.multi && (
              <p className="mt-5 inline-flex items-center gap-2 border border-clay/40 px-3 py-1.5 text-[0.62rem] font-medium uppercase tracking-[0.16em] text-clay">
                {copy.multiHint[lang]}
              </p>
            )}
          </div>
          <aside className="border-l border-clay/35 pl-5 lg:col-span-4 lg:mt-2">
            <p className="text-[0.65rem] font-medium uppercase tracking-[0.18em] text-clay">{copy.keyQuestion[lang]}</p>
            <p className="mt-3 max-w-[24ch] font-serif text-xl italic leading-snug text-ink sm:text-2xl">{step.question[lang]}</p>
          </aside>
        </header>

        <p className="mt-10 text-[0.62rem] font-medium uppercase tracking-[0.16em] text-body/55 sm:hidden">{copy.swipeHint[lang]}</p>
        <div className="-mx-6 mt-5 grid snap-x snap-mandatory auto-cols-[84vw] grid-flow-col gap-4 overflow-x-auto px-6 pb-3 sm:mx-0 sm:mt-12 sm:grid-flow-row sm:grid-cols-2 sm:auto-cols-auto sm:gap-5 sm:overflow-visible sm:px-0 sm:pb-0 xl:grid-cols-4">
          {step.options.map((option, optionIndex) => {
            const selected = selectedIds.includes(option.id);
            return (
              <motion.button key={option.id} type="button" aria-pressed={selected} aria-label={`${selected ? copy.selectedChoice[lang] : copy.selectChoice[lang]}: ${option.name[lang]}`} onClick={() => onSelect(option.id)} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ delay: optionIndex * 0.06, duration: 0.55, ease: EASE }} className={`group snap-start text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-clay focus-visible:ring-offset-4 focus-visible:ring-offset-paper ${selected ? 'bg-ink text-paper' : onLinen ? 'bg-paper text-ink' : 'bg-linen text-ink'}`}>
                <span className="relative block aspect-[4/3] overflow-hidden bg-ink/5">
                  <Image src={option.image} alt={option.imageAlt[lang]} fill sizes="(min-width: 1280px) 24vw, (min-width: 640px) 48vw, 84vw" className="object-cover transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-[1.025]" />
                  <span className="absolute left-0 top-0 bg-paper px-3 py-2 text-[0.62rem] font-medium tracking-[0.14em] text-ink">0{optionIndex + 1}</span>
                  {selected && <span className="absolute right-0 top-0 flex h-10 w-10 items-center justify-center bg-clay text-paper"><Check className="h-4 w-4" aria-hidden="true" /></span>}
                </span>
                <span className={`flex min-h-[16.5rem] flex-col border p-5 sm:min-h-[17.5rem] ${selected ? 'border-ink' : 'border-ink/12'}`}>
                  <span className="flex items-center justify-between gap-4 text-[0.62rem] font-medium uppercase tracking-[0.16em]">
                    <span className={selected ? 'text-sand' : 'text-clay'}>{option.badge[lang]}</span>
                    <span className={selected ? 'text-paper/55' : 'text-body/55'}>{option.note[lang]}</span>
                  </span>
                  <span className="mt-4 font-serif text-[1.65rem] leading-tight tracking-[-0.02em]">{option.name[lang]}</span>
                  <span className={`mt-3 text-sm leading-[1.65] ${selected ? 'text-paper/68' : 'text-body'}`}>{option.desc[lang]}</span>
                  <span className={`mt-auto flex items-center justify-between border-t pt-4 text-[0.64rem] font-medium uppercase tracking-[0.16em] ${selected ? 'border-paper/15 text-sand' : 'border-ink/12 text-clay'}`}>
                    {selected ? copy.selectedChoice[lang] : copy.selectChoice[lang]}
                    {selected ? <Check className="h-4 w-4" aria-hidden="true" /> : <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />}
                  </span>
                </span>
              </motion.button>
            );
          })}
        </div>
        <p className="mt-5 max-w-2xl text-xs leading-relaxed text-body/55">{copy.visualGuide[lang]}</p>
      </div>
    </section>
  );
}
