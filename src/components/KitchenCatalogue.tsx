'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Check, MessageCircle } from 'lucide-react';
import { useLang, type Dict, type Lang } from '@/lib/i18n';
import { whatsappHref } from '@/lib/store';
import {
  btnGhostOnDark,
  btnSolidOnDark,
  EASE,
} from '@/components/ui';

const SHOWROOM_HREF = '/#showroom';

const copy = {
  backKitchens: { sq: 'Kuzhina të projektuara', en: 'Bespoke kitchens' },
  eyebrow: { sq: 'Udhëzuesi i kuzhinës ROAL', en: 'The ROAL choice atlas' },
  headingLead: { sq: 'Përcaktoni kuzhinën tuaj', en: 'Build your kitchen' },
  headingAccent: { sq: 'në 5 vendime.', en: 'in 5 decisions.' },
  subhead: {
    sq: 'Shihni nga afër ndryshimin mes materialeve, syprinave, mënyrave të hapjes, mekanizmave dhe ndriçimit. Zgjidhni një drejtim në çdo hap; ne e zhvillojmë në një projekt të personalizuar.',
    en: 'See the difference between materials, worktops, opening styles, mechanisms and lighting up close. Pick one direction at each step; we turn it into a made-to-measure design.',
  },
  visitCta: { sq: 'Vizitoni showroom-in', en: 'Visit the showroom' },
  whatsappCta: { sq: 'Na shkruani në WhatsApp', en: 'Message on WhatsApp' },
  heroImageAlt: {
    sq: 'Kuzhinë bashkëkohore me fronte mat, rimeso arre, ishull të rrumbullakosur dhe dritë të fshehur',
    en: 'Contemporary kitchen with matte fronts, walnut veneer, a rounded island and concealed lighting',
  },
  heroImageNote: {
    sq: 'Një kompozim, pesë vendime',
    en: 'One composition, five decisions',
  },
  heroStats: {
    sq: ['5 vendime', '20 alternativa', '1 projekt i personalizuar'],
    en: ['5 decisions', '20 alternatives', '1 made-to-measure plan'],
  },
  stepLabel: { sq: 'Vendimi', en: 'Decision' },
  selectChoice: { sq: 'Zgjidhni këtë', en: 'Choose this' },
  selectedChoice: { sq: 'Zgjedhur', en: 'Selected' },
  multiHint: { sq: 'Mund të zgjidhni disa', en: 'You can select several' },
  swipeHint: { sq: 'Rrëshqitni për të krahasuar →', en: 'Swipe to compare →' },
  visualGuide: {
    sq: 'Pamjet janë udhëzuese. Ngjyrën, teksturën dhe mekanizmin real i provoni në showroom.',
    en: 'Images are visual guides. See and test the real colour, texture and mechanism in our showroom.',
  },
  selectionTitle: { sq: 'Përmbledhja juaj', en: 'Your selection' },
  selectionHeading: {
    sq: 'Pesë vendime, gati për t’i diskutuar.',
    en: 'Five decisions, ready to discuss.',
  },
  selectionIntro: {
    sq: 'Këto zgjedhje përcaktojnë drejtimin fillestar. Pas matjes, ne i zhvillojmë në projektin 3D dhe ofertën tuaj të detajuar.',
    en: 'These choices are not a final order. They give us the right direction for your measurement, 3D design and quotation.',
  },
  notSelected: { sq: 'Ende pa zgjedhur', en: 'Not selected yet' },
  selectionCount: { sq: 'zgjedhje të bëra', en: 'choices made' },
  sendSelection: { sq: 'Dërgoni përzgjedhjen', en: 'Send my selection' },
  completeHint: {
    sq: 'Mund ta dërgoni edhe pa i plotësuar të gjitha.',
    en: 'You can send it even before completing every step.',
  },
  summaryMessageIntro: {
    sq: 'Përshëndetje ROAL, këto janë zgjedhjet e mia fillestare për kuzhinën:',
    en: 'Hello ROAL, these are my initial kitchen choices:',
  },
  summaryMessageEnd: {
    sq: 'Dua të caktoj një konsultim për matjen dhe projektin 3D.',
    en: 'I would like to arrange the free measurement and 3D design.',
  },
  standardTitle: { sq: 'Standard në çdo kuzhinë', en: 'Standard in every kitchen' },
  standardHeading: {
    sq: 'Këto nuk janë shtesa. Janë mënyra si punojmë.',
    en: 'These are not extras. They are how we build.',
  },
  standardItems: {
    sq: [
      'Mentesha dhe rrëshqitës me mbyllje të butë',
      'Sirtarë me nxjerrje të plotë',
      'Strukturë sipas përmasave të sakta dhe bordurë ABS rezistente',
      'Matje e saktë dhe projektim 3D para prodhimit',
      'Instalim nga ekipi ynë dhe garanci 2 vjet',
    ],
    en: [
      'Soft-close hinges and runners',
      'Full-extension drawers',
      'Made-to-measure carcasses with durable ABS edging',
      'Free measurement and 3D design before production',
      'Installation by our team and a 2-year warranty',
    ],
  },
  trendsTitle: { sq: 'Drejtimi 2026', en: 'The 2026 direction' },
  trendsHeading: { sq: 'Më i butë në formë. Më i ngrohtë në ton.', en: 'Softer in shape. Warmer in tone.' },
  trendsBody: {
    sq: 'Kuzhina po largohet nga e bardha e ftohtë dhe vijat e forta. Tonet minerale, jeshilja mat, arra e errët dhe skajet e rrumbullakosura krijojnë një hapësirë më të qetë — ndërsa drita e integruar bën punën pa u dukur vetë.',
    en: 'Kitchens are moving away from cold white and hard lines. Mineral tones, matte green, dark walnut and rounded edges create a calmer room, while integrated light does its job without calling attention to itself.',
  },
  trendChips: {
    sq: [
      'Neutrale minerale',
      'Arrë dhe lis i errët',
      'Jeshile mat',
      'Forma të rrumbullakosura',
      'Fronte të kanaluara',
      'Dritë e integruar',
    ],
    en: [
      'Mineral neutrals',
      'Dark walnut and oak',
      'Matte green',
      'Rounded forms',
      'Fluted fronts',
      'Integrated light',
    ],
  },
  trendsImageAlt: {
    sq: 'Kuzhinë në jeshile mat me ishull guri të rrumbullakosur dhe panel të kanaluar arre',
    en: 'Matte green kitchen with a rounded stone island and fluted walnut end panel',
  },
  pricesTitle: { sq: 'Nivelet e investimit', en: 'Indicative budget' },
  pricesHeading: { sq: 'Tre nivele materialesh. Një standard realizimi.', en: 'Three starting points. The same care in every build.' },
  pricesNote: {
    sq: 'Vlerat janë orientuese, për metër linear dhe pa pajisje elektroshtëpiake. Dollapët e lartë, ishulli, mekanizmat dhe materialet përcaktojnë investimin përfundimtar. Pas matjes paraqesim projektin 3D dhe ofertën e detajuar.',
    en: 'Prices are indicative, per linear metre and exclude appliances. Tall units, islands, mechanisms and materials change the total. After measurement, you receive the detailed 3D design and quotation free of charge.',
  },
  perMeter: { sq: '/ metër linear', en: '/ linear metre' },
  from: { sq: 'nga', en: 'from' },
  popular: { sq: 'Më e kërkuara', en: 'Most requested' },
  ctaHeading: { sq: 'Ekrani ju jep drejtimin. Mostrat japin sigurinë.', en: 'The screen gives direction. The samples give certainty.' },
  ctaSub: {
    sq: 'Ejani t’i prekni materialet, të provoni mekanizmat dhe ta analizojmë hapësirën tuaj bashkë. Matja dhe projektimi 3D janë pjesë e procesit tonë.',
    en: 'Come touch the materials, test the mechanisms and let us look at your space together. Measurement and 3D design are free.',
  },
  genericWhatsAppMessage: {
    sq: 'Përshëndetje ROAL, dua të diskutoj zgjedhjet për projektin e kuzhinës sime.',
    en: 'Hello ROAL, I would like to discuss the choices for a bespoke kitchen.',
  },
} satisfies Record<string, Dict<string> | Dict<string[]>>;

type CatalogueOption = {
  id: string;
  name: Dict<string>;
  desc: Dict<string>;
  badge: Dict<string>;
  tier: string;
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
    id: 'materiali',
    navLabel: { sq: 'Materiali', en: 'Material' },
    title: { sq: 'Materiali i paneleve', en: 'Door material' },
    question: { sq: 'Çfarë doni të ndjeni çdo ditë?', en: 'What do you want to feel every day?' },
    intro: {
      sq: 'Panelet japin tonin e gjithë kuzhinës. Krahasoni jo vetëm ngjyrën, por edhe prekjen, mënyrën si kap dritën dhe sa liri forme ju jep materiali.',
      en: 'The fronts set the tone for the whole kitchen. Compare not only colour, but also touch, how the surface catches light and how much design freedom the material allows.',
    },
    options: [
      {
        id: 'melamine',
        name: { sq: 'Melaminë', en: 'Melamine' },
        badge: { sq: 'Praktike', en: 'Practical' },
        desc: {
          sq: 'Rezistente ndaj përdorimit të përditshëm, me një gamë të gjerë dekorësh druri dhe ngjyrash të plota. Një zgjedhje e ekuilibruar për funksion dhe qëndrueshmëri.',
          en: 'Durable for everyday use, with a wide range of woodgrains and solid colours. The strongest value for budget.',
        },
        tier: '€',
        image: '/images/kitchen-catalogue/materials/melamine.webp',
        imageAlt: { sq: 'Front melamine me dekor lisi dhe bordurë të pastër', en: 'Oak-look melamine front with a clean edge' },
      },
      {
        id: 'pet-acrylic',
        name: { sq: 'PET / Akrilik', en: 'PET / Acrylic' },
        badge: { sq: 'Uniforme', en: 'Uniform' },
        desc: {
          sq: 'Sipërfaqe e lëmuar, mat ose me shkëlqim, me ngjyrë shumë të njëtrajtshme dhe pastrim të lehtë.',
          en: 'A smooth matte or gloss surface with very even colour and straightforward cleaning.',
        },
        tier: '€€',
        image: '/images/kitchen-catalogue/materials/pet-acrylic.webp',
        imageAlt: { sq: 'Front PET mat në jeshile të butë', en: 'Matte PET front in a soft green tone' },
      },
      {
        id: 'lacquered-mdf',
        name: { sq: 'MDF me lyerje', en: 'Lacquered MDF' },
        badge: { sq: 'E personalizuar', en: 'Custom' },
        desc: {
          sq: 'Ngjyra RAL, mat ose me shkëlqim, pa bordurë të dukshme. Lejon J-pull, kanale dhe forma të lakuara.',
          en: 'RAL colours, matte or gloss, with no visible edging. Allows J-pulls, fluting and curved forms.',
        },
        tier: '€€€',
        image: '/images/kitchen-catalogue/materials/lacquered-mdf.webp',
        imageAlt: { sq: 'Front MDF i lyer në ngjyrë të ngrohtë me J-pull', en: 'Warm lacquered MDF front with an integrated J-pull' },
      },
      {
        id: 'wood-veneer',
        name: { sq: 'Rimeso druri', en: 'Wood veneer' },
        badge: { sq: 'Natyrale', en: 'Natural' },
        desc: {
          sq: 'Dru i vërtetë në sipërfaqe; çdo derë ka damar unik. Zgjedhja më e ngrohtë dhe më materiale.',
          en: 'Real wood on the surface; every front has a unique grain. The warmest and most tactile choice.',
        },
        tier: '€€€',
        image: '/images/kitchen-catalogue/materials/wood-veneer.webp',
        imageAlt: { sq: 'Front kuzhine me rimeso natyral arre', en: 'Kitchen front in natural walnut veneer' },
      },
    ],
  },
  {
    id: 'syprina',
    navLabel: { sq: 'Syprina', en: 'Worktop' },
    title: { sq: 'Syprina e punës', en: 'The worktop' },
    question: { sq: 'Sa fort duhet të punojë?', en: 'How hard does it need to work?' },
    intro: {
      sq: 'Këtu takohen pamja, mirëmbajtja dhe performanca. Vlerësoni trashësinë e profilit, përpunimin e skajit dhe mënyrën si materiali lidhet me frontin poshtë.',
      en: 'This is where appearance, maintenance and budget meet. Look closely at the profile thickness, edge treatment and how the material meets the front below.',
    },
    options: [
      {
        id: 'laminate',
        name: { sq: 'Laminat / postforming', en: 'Laminate / postforming' },
        badge: { sq: 'Praktike', en: 'Economical' },
        desc: {
          sq: 'Sipërfaqe funksionale dhe e qëndrueshme, me dekore guri bindëse dhe skaj të rrumbullakosur.',
          en: 'A quick, practical solution with convincing stone decors and a softly rounded front edge.',
        },
        tier: '€',
        image: '/images/kitchen-catalogue/worktops/laminate-postforming.webp',
        imageAlt: { sq: 'Syprinë laminat me dekor guri dhe skaj postforming', en: 'Stone-look laminate worktop with a postformed edge' },
      },
      {
        id: 'compact-hpl',
        name: { sq: 'Kompakt HPL 12 mm', en: 'Compact HPL 12 mm' },
        badge: { sq: 'Profil i hollë', en: 'Slim profile' },
        desc: {
          sq: 'Bërthamë e dendur, profil shumë i hollë dhe rezistencë e lartë ndaj lagështirës e përdorimit.',
          en: 'A dense core, very slim profile and strong resistance to moisture and daily wear.',
        },
        tier: '€€',
        image: '/images/kitchen-catalogue/worktops/compact-hpl.webp',
        imageAlt: { sq: 'Syprinë kompakt HPL 18 mm në ngjyrë grafiti', en: 'Graphite compact HPL worktop with a 18 mm profile' },
      },
      {
        id: 'quartz',
        name: { sq: 'Kuarc', en: 'Quartz' },
        badge: { sq: 'Mirëmbajtje e ulët', en: 'Low maintenance' },
        desc: {
          sq: 'Sipërfaqe jo-poroze, shumë rezistente ndaj njollave dhe e qëndrueshme në përdorim të përditshëm.',
          en: 'A non-porous surface with strong stain resistance and dependable everyday performance.',
        },
        tier: '€€€',
        image: '/images/kitchen-catalogue/worktops/quartz.webp',
        imageAlt: { sq: 'Syprinë kuarci e çelët me vena delikate', en: 'Pale quartz worktop with restrained veining' },
      },
      {
        id: 'granite-porcelain',
        name: { sq: 'Granit / Mermer', en: 'Granite / Marble' },
        badge: { sq: 'Minerale', en: 'Mineral' },
        desc: {
          sq: 'Granit natyral me karakter unik, ose mermer me profil të hollë dhe rezistencë të lartë.',
          en: 'Natural granite with unique character, or marble with a slim profile and high resistance.',
        },
        tier: '€€€€',
        image: '/images/kitchen-catalogue/worktops/granite-porcelain.webp',
        imageAlt: { sq: 'Syprinë e errët graniti ose mermeri me damar natyral', en: 'Dark granite or marble worktop with natural veining' },
      },
    ],
  },
  {
    id: 'dorezat',
    navLabel: { sq: 'Hapja', en: 'Opening' },
    title: { sq: 'Mënyra e hapjes', en: 'How it opens' },
    question: { sq: 'Dëshironi ta shihni dorezën?', en: 'Do you want to see the handle?' },
    intro: {
      sq: 'Ky detaj ndryshon ritmin e gjithë fasadës. Nga doreza e dukshme te fronti krejt i pastër, secila zgjidhje ka ndjesi dhe kosto të ndryshme.',
      en: 'This detail changes the rhythm of the entire elevation. From a visible handle to a completely clean front, each solution has a different feel and cost.',
    },
    options: [
      {
        id: 'bar-handle',
        name: { sq: 'Dorezë shirit', en: 'Bar handle' },
        badge: { sq: 'Klasike', en: 'Classic' },
        desc: {
          sq: 'Kapje e qartë dhe praktike, në të zezë mat, inox, bronz ose ngjyra të tjera sipas frontit.',
          en: 'A clear, practical grip in matte black, steel, bronze or other finishes to suit the front.',
        },
        tier: '€',
        image: '/images/kitchen-catalogue/handles/bar-handle.webp',
        imageAlt: { sq: 'Dorezë shirit e zezë mbi front të çelët', en: 'Slim black bar handle on a pale cabinet front' },
      },
      {
        id: 'gola-profile',
        name: { sq: 'Profil Gola', en: 'Gola profile' },
        badge: { sq: 'Minimaliste', en: 'Minimal' },
        desc: {
          sq: 'Kanal alumini mes fronteve; ruan vijën e pastër dhe mund të integrojë edhe ndriçimin.',
          en: 'An aluminium channel between fronts; it keeps the elevation clean and can also integrate lighting.',
        },
        tier: '€€',
        image: '/images/kitchen-catalogue/handles/gola-profile.webp',
        imageAlt: { sq: 'Profil Gola në alumin shampanjë mes sirtarëve', en: 'Champagne aluminium Gola profile between drawers' },
      },
      {
        id: 'j-pull',
        name: { sq: 'J-pull i integruar', en: 'Integrated J-pull' },
        badge: { sq: 'E frezuar', en: 'Routed' },
        desc: {
          sq: 'Kapja frezohet direkt në MDF të lyer: i njëjti material, pa element metalik të dukshëm.',
          en: 'The grip is routed directly into lacquered MDF: one continuous material with no visible metal part.',
        },
        tier: '€€',
        image: '/images/kitchen-catalogue/handles/j-pull.webp',
        imageAlt: { sq: 'Dorezë J-pull e frezuar në front MDF të lyer', en: 'Routed J-pull in a lacquered MDF drawer front' },
      },
      {
        id: 'push-to-open',
        name: { sq: 'Push-to-open', en: 'Push-to-open' },
        badge: { sq: 'Pa dorezë', en: 'Handleless' },
        desc: {
          sq: 'Front i sheshtë që hapet me prekje, me mekanizëm TIP-ON ose asistencë elektrike SERVO-DRIVE.',
          en: 'A flat front that opens at a touch, with a TIP-ON mechanism or SERVO-DRIVE electrical assistance.',
        },
        tier: '€€€',
        image: '/images/kitchen-catalogue/handles/push-to-open.webp',
        imageAlt: { sq: 'Fronte të pastra pa dorezë për hapje me prekje', en: 'Clean handleless fronts designed for touch opening' },
      },
    ],
  },
  {
    id: 'blum',
    multi: true,
    navLabel: { sq: 'Mekanizmat', en: 'Mechanisms' },
    title: { sq: 'Mekanizmat Blum', en: 'Blum mechanisms' },
    question: { sq: 'Si duhet të lëvizë kuzhina?', en: 'How should the kitchen move?' },
    intro: {
      sq: 'Cilësia ndihet në hapje, jo vetëm në pamje. Këto sisteme organizojnë peshën, aksesin dhe lëvizjen e përditshme të dollapëve.',
      en: 'Quality is felt in motion, not only seen. These systems manage weight, access and the everyday movement of your cabinetry.',
    },
    options: [
      {
        id: 'legrabox-tandembox',
        name: { sq: 'LEGRABOX / TANDEMBOX', en: 'LEGRABOX / TANDEMBOX' },
        badge: { sq: 'Sirtar', en: 'Drawer' },
        desc: {
          sq: 'Sirtar metalik me nxjerrje të plotë, lëvizje të qetë dhe konfigurime mbajtëse deri në 70 kg.',
          en: 'A full-extension metal drawer with smooth movement and load configurations of up to 70 kg.',
        },
        tier: '€€',
        image: '/images/kitchen-catalogue/mechanisms/legrabox-tandembox.webp',
        imageAlt: { sq: 'Sirtar metalik me nxjerrje të plotë dhe organizim të brendshëm', en: 'Full-extension metal drawer with internal organisation' },
      },
      {
        id: 'aventos',
        name: { sq: 'AVENTOS', en: 'AVENTOS' },
        badge: { sq: 'Lart', en: 'Lift-up' },
        desc: {
          sq: 'Fronti i dollapit të sipërm ngrihet mbi zonën e punës dhe qëndron në pozicionin ku e lini.',
          en: 'The wall-unit front lifts above the work area and stays in the position where you leave it.',
        },
        tier: '€€',
        image: '/images/kitchen-catalogue/mechanisms/aventos.webp',
        imageAlt: { sq: 'Front dollapi i ngritur me mekanizëm AVENTOS', en: 'Wall-cabinet front lifted with an AVENTOS mechanism' },
      },
      {
        id: 'space-tower',
        name: { sq: 'SPACE TOWER', en: 'SPACE TOWER' },
        badge: { sq: 'Qilar', en: 'Pantry' },
        desc: {
          sq: 'Sirtarë të brendshëm që hapen veçmas; shihni dhe arrini rezervat nga përpara dhe nga anët.',
          en: 'Internal pull-outs that open individually, letting you see and reach provisions from the front and sides.',
        },
        tier: '€€€',
        image: '/images/kitchen-catalogue/mechanisms/space-tower.webp',
        imageAlt: { sq: 'Dollap qilar me pesë sirtarë të brendshëm të hapur', en: 'Tall pantry cabinet with five open internal pull-outs' },
      },
      {
        id: 'tip-on-servo',
        name: { sq: 'TIP-ON / SERVO-DRIVE', en: 'TIP-ON / SERVO-DRIVE' },
        badge: { sq: 'Me prekje', en: 'Touch-open' },
        desc: {
          sq: 'Hapje mekanike ose elektrike për fronte pa doreza, përfshirë sirtarin e mbeturinave.',
          en: 'Mechanical or electric opening for handleless fronts, including the waste-bin drawer.',
        },
        tier: '€€€',
        image: '/images/kitchen-catalogue/mechanisms/tip-on-servo-drive.webp',
        imageAlt: { sq: 'Sirtar mbeturinash pa dorezë i hapur me prekje', en: 'Handleless waste-bin drawer opened by touch' },
      },
    ],
  },
  {
    id: 'ndricimi',
    multi: true,
    navLabel: { sq: 'Drita', en: 'Lighting' },
    title: { sq: 'Ndriçimi i integruar', en: 'Integrated lighting' },
    question: { sq: 'Çfarë pune duhet të bëjë drita?', en: 'What job should the light do?' },
    intro: {
      sq: 'Drita e mirë nuk është vetëm atmosferë. Ajo heq hijet nga syprina, tregon çfarë ka në sirtar dhe e bën kuzhinën të lehtë për t’u përdorur natën.',
      en: 'Good lighting is more than atmosphere. It removes shadows from the worktop, reveals what is inside a drawer and makes the kitchen easier to use at night.',
    },
    options: [
      {
        id: 'under-cabinet',
        name: { sq: 'LED nën dollapë', en: 'Under-cabinet LED' },
        badge: { sq: 'Dritë pune', en: 'Task light' },
        desc: {
          sq: 'Vijë e vazhduar me difuzor që ndriçon njëtrajtshëm zonën ku prisni dhe gatuani.',
          en: 'A continuous diffused line that evenly lights the area where you chop and cook.',
        },
        tier: '€',
        image: '/images/kitchen-catalogue/lighting/under-cabinet.webp',
        imageAlt: { sq: 'Dritë e vazhduar LED nën dollapët e sipërm', en: 'Continuous LED task light below wall cabinets' },
      },
      {
        id: 'gola-led',
        name: { sq: 'LED në profil Gola', en: 'LED in the Gola profile' },
        badge: { sq: 'Dritë detaji', en: 'Detail light' },
        desc: {
          sq: 'Drita fshihet brenda kanalit të dorezës dhe vizaton një vijë të hollë mes fronteve.',
          en: 'The light hides inside the handle channel and draws a fine line between the fronts.',
        },
        tier: '€€',
        image: '/images/kitchen-catalogue/lighting/gola-led.webp',
        imageAlt: { sq: 'Vijë LED e integruar në profilin Gola', en: 'LED line integrated inside a Gola profile' },
      },
      {
        id: 'sensor-light',
        name: { sq: 'Dritë me sensor', en: 'Sensor lighting' },
        badge: { sq: 'Brenda', en: 'Inside' },
        desc: {
          sq: 'Ndizet automatikisht kur hapni sirtarin, qilarin ose dollapin e thellë.',
          en: 'Switches on automatically when you open a drawer, pantry or deep cabinet.',
        },
        tier: '€€',
        image: '/images/kitchen-catalogue/lighting/sensor-drawer.webp',
        imageAlt: { sq: 'Sirtar i hapur me ndriçim të fshehur me sensor', en: 'Open drawer with concealed sensor lighting' },
      },
      {
        id: 'plinth-light',
        name: { sq: 'LED te bazamenti', en: 'Plinth LED' },
        badge: { sq: 'Dritë nate', en: 'Night light' },
        desc: {
          sq: 'Dritë e ulët dhe e butë që orienton natën dhe i jep mobiljes ndjesinë sikur qëndron pezull.',
          en: 'A low, soft light for night-time orientation that makes the cabinetry appear to float.',
        },
        tier: '€€',
        image: '/images/kitchen-catalogue/lighting/plinth-led.webp',
        imageAlt: { sq: 'Ndriçim i fshehur LED përgjatë bazamentit të kuzhinës', en: 'Concealed LED lighting along the kitchen plinth' },
      },
    ],
  },
];

type PriceTier = {
  name: Dict<string>;
  price: string;
  total: Dict<string>;
  features: Dict<string[]>;
  image: string;
  imageAlt: Dict<string>;
  highlighted?: boolean;
};

const PRICE_TIERS: PriceTier[] = [
  {
    name: { sq: 'Klasike', en: 'Essential' },
    price: '€250',
    total: { sq: 'Investim orientues për 5 m: €1.250 – €1.750', en: 'Typical 5 m kitchen: €1,250 – €1,750' },
    image: '/images/kitchen-catalogue/materials/melamine.webp',
    imageAlt: { sq: 'Front melamine me dekor lisi', en: 'Oak-look melamine cabinet front' },
    features: {
      sq: [
        'Fronte melamine, dekor druri ose uni',
        'Syprinë laminat',
        'Mentesha dhe sirtarë me mbyllje të butë',
        'Doreza shirit sipas zgjedhjes',
      ],
      en: [
        'Melamine fronts, woodgrain or solid colour',
        'Laminate worktop',
        'Soft-close hinges and drawers',
        'Bar handles of your choice',
      ],
    },
  },
  {
    name: { sq: 'E përzgjedhur', en: 'Signature' },
    price: '€400',
    total: { sq: 'Investim orientues për 5 m: €2.000 – €2.750', en: 'Typical 5 m kitchen: €2,000 – €2,750' },
    image: '/images/kitchen-catalogue/handles/gola-profile.webp',
    imageAlt: { sq: 'Profil Gola i integruar mes fronteve', en: 'Integrated Gola profile between fronts' },
    highlighted: true,
    features: {
      sq: [
        'Fronte PET, akrilik ose MDF me lyerje',
        'Syprinë laminat ose kompakt HPL',
        'Profil Gola ose J-pull',
        'Sirtarë Blum TANDEMBOX',
        'LED nën dollapë',
      ],
      en: [
        'PET, acrylic or lacquered MDF fronts',
        'Laminate or compact HPL worktop',
        'Gola profile or J-pull',
        'Blum TANDEMBOX drawers',
        'Under-cabinet LED',
      ],
    },
  },
  {
    name: { sq: 'Premium', en: 'Premium' },
    price: '€600',
    total: { sq: 'Investim orientues për 5 m: €3.000 – €4.500+', en: 'Typical 5 m kitchen: €3,000 – €4,500+' },
    image: '/images/kitchen-catalogue/worktops/quartz.webp',
    imageAlt: { sq: 'Syprinë premium kuarci me vena delikate', en: 'Premium quartz worktop with restrained veining' },
    features: {
      sq: [
        'MDF me lyerje, rimeso ose panele të kanaluara',
        'Syprinë kuarc, granit ose porcelan',
        'TIP-ON ose SERVO-DRIVE',
        'LEGRABOX, AVENTOS dhe SPACE TOWER',
        'Plan i plotë ndriçimi të integruar',
      ],
      en: [
        'Lacquered MDF, veneer or fluted fronts',
        'Quartz, granite or porcelain worktop',
        'TIP-ON or SERVO-DRIVE',
        'LEGRABOX, AVENTOS and SPACE TOWER',
        'A complete integrated lighting plan',
      ],
    },
  },
];

export default function KitchenCatalogue() {
  const { lang } = useLang();
  const [selections, setSelections] = useState<Record<string, string[]>>({});
  const [activeSection, setActiveSection] = useState(STEPS[0].id);

  useEffect(() => {
    const ids = [...STEPS.map((step) => step.id), 'cmimet'];
    const sections = ids
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

    return whatsappHref(
      `${copy.summaryMessageIntro[lang]}\n\n${lines.join('\n')}\n\n${copy.summaryMessageEnd[lang]}`,
    );
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
            <Link
              href="/kuzhina"
              className="group inline-flex min-h-11 items-center gap-2 text-[0.68rem] font-medium uppercase tracking-[0.2em] text-paper/60 transition-colors hover:text-sand"
            >
              <span aria-hidden="true" className="transition-transform duration-300 group-hover:-translate-x-1">←</span>
              {copy.backKitchens[lang]}
            </Link>

            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASE }}
              className="mt-8 text-[0.68rem] font-medium uppercase tracking-[0.22em] text-sand"
            >
              {copy.eyebrow[lang]}
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE }}
              className="mt-5 max-w-[11ch] text-balance font-serif text-[clamp(2.8rem,6.4vw,5.5rem)] font-normal leading-[0.96] tracking-[-0.035em]"
            >
              {copy.headingLead[lang]}{' '}
              <span className="italic text-sand">{copy.headingAccent[lang]}</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08, duration: 0.65, ease: EASE }}
              className="mt-7 max-w-xl text-base leading-[1.75] text-paper/72 sm:text-lg"
            >
              {copy.subhead[lang]}
            </motion.p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link href={SHOWROOM_HREF} className={btnSolidOnDark}>
                {copy.visitCta[lang]}
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
              </Link>
              <a
                href={genericWhatsAppHref}
                target="_blank"
                rel="noopener noreferrer"
                className={btnGhostOnDark}
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                {copy.whatsappCta[lang]}
              </a>
            </div>

            <ul className="mt-10 grid grid-cols-3 border-y border-paper/15" aria-label={lang === 'sq' ? 'Përmbledhje e katalogut' : 'Catalogue summary'}>
              {copy.heroStats[lang].map((stat, index) => (
                <li
                  key={stat}
                  className={`py-4 text-[0.62rem] font-medium uppercase leading-relaxed tracking-[0.16em] text-paper/55 ${index > 0 ? 'border-l border-paper/15 pl-4' : 'pr-4'}`}
                >
                  {stat}
                </li>
              ))}
            </ul>
          </div>

          <motion.figure
            initial={{ opacity: 0, scale: 0.985 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: EASE }}
            className="relative min-h-[24rem] overflow-hidden bg-ink-2 sm:min-h-[34rem] lg:col-span-7 lg:min-h-[39rem]"
          >
            <Image
              src="/images/kitchen-catalogue/hero.webp"
              alt={copy.heroImageAlt[lang]}
              fill
              priority
              sizes="(min-width: 1024px) 58vw, 100vw"
              className="object-cover"
            />
            <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-5 bg-gradient-to-t from-ink/85 via-ink/20 to-transparent px-5 pb-5 pt-20 text-paper sm:px-7 sm:pb-7">
              <span className="max-w-[20rem] text-[0.65rem] uppercase leading-relaxed tracking-[0.18em] text-paper/72">
                {copy.heroImageNote[lang]}
              </span>
              <span aria-hidden="true" className="font-serif text-4xl italic text-sand sm:text-5xl">01—05</span>
            </figcaption>
          </motion.figure>
        </div>
      </section>

      <nav
        aria-label={lang === 'sq' ? 'Pesë vendimet e katalogut' : 'The five catalogue decisions'}
        className="sticky top-[4.5rem] z-30 border-b border-ink/10 bg-paper/95 backdrop-blur-md md:top-[4.125rem]"
      >
        <div className="mx-auto flex max-w-7xl overflow-x-auto px-3 py-2 sm:px-8 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {STEPS.map((step, index) => {
            const active = activeSection === step.id;
            return (
              <a
                key={step.id}
                href={`#${step.id}`}
                aria-current={active ? 'step' : undefined}
                className={`flex min-h-11 shrink-0 items-center gap-2.5 border-r border-ink/10 px-4 text-[0.68rem] font-medium uppercase tracking-[0.14em] transition-colors first:border-l ${active ? 'bg-ink text-paper' : 'text-body hover:bg-linen hover:text-ink'}`}
              >
                <span className={active ? 'text-sand' : 'text-clay'}>0{index + 1}</span>
                {step.navLabel[lang]}
              </a>
            );
          })}
          <a
            href="#cmimet"
            aria-current={activeSection === 'cmimet' ? 'step' : undefined}
            className={`flex min-h-11 shrink-0 items-center gap-2.5 border-r border-ink/10 px-4 text-[0.68rem] font-medium uppercase tracking-[0.14em] transition-colors ${activeSection === 'cmimet' ? 'bg-ink text-paper' : 'text-body hover:bg-linen hover:text-ink'}`}
          >
            <span className={activeSection === 'cmimet' ? 'text-sand' : 'text-clay'}>€</span>
            {copy.pricesTitle[lang]}
          </a>
        </div>
      </nav>

      {STEPS.map((step, index) => (
        <StepSection
          key={step.id}
          step={step}
          index={index}
          lang={lang}
          selectedIds={selections[step.id] ?? []}
          onSelect={(optionId) => selectOption(step.id, optionId)}
        />
      ))}

      <section className="bg-ink text-paper">
        <div className="mx-auto grid max-w-7xl lg:grid-cols-2">
          <div className="border-b border-paper/15 px-6 py-20 sm:px-8 sm:py-24 lg:border-b-0 lg:border-r lg:px-12 xl:px-16">
            <div className="flex items-center justify-between gap-6">
              <p className="text-[0.68rem] font-medium uppercase tracking-[0.22em] text-sand">
                {copy.selectionTitle[lang]}
              </p>
              <p className="text-xs text-paper/50">
                <span className="font-serif text-2xl text-paper">{selectedCount}</span>/5 {copy.selectionCount[lang]}
              </p>
            </div>
            <h2 className="mt-5 max-w-[13ch] text-balance font-serif text-[clamp(2rem,4vw,3.2rem)] font-normal leading-[1.04] tracking-[-0.025em]">
              {copy.selectionHeading[lang]}
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-paper/65">
              {copy.selectionIntro[lang]}
            </p>

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
                      <span className={`text-right text-sm transition-colors group-hover:text-sand ${selectedNames.length ? 'text-paper' : 'italic text-paper/35'}`}>
                        {selectedNames.length ? selectedNames.join(', ') : copy.notSelected[lang]}
                      </span>
                    </a>
                  </li>
                );
              })}
            </ol>

            <a
              href={selectionWhatsAppHref}
              target="_blank"
              rel="noopener noreferrer"
              className={`${btnSolidOnDark} mt-9 w-full sm:w-auto`}
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              {copy.sendSelection[lang]}
            </a>
            <p className="mt-3 text-xs leading-relaxed text-paper/40">{copy.completeHint[lang]}</p>
          </div>

          <div className="bg-ink-2 px-6 py-20 sm:px-8 sm:py-24 lg:px-12 xl:px-16">
            <p className="text-[0.68rem] font-medium uppercase tracking-[0.22em] text-sand">
              {copy.standardTitle[lang]}
            </p>
            <h2 className="mt-5 max-w-[13ch] text-balance font-serif text-[clamp(2rem,4vw,3.2rem)] font-normal leading-[1.04] tracking-[-0.025em]">
              {copy.standardHeading[lang]}
            </h2>
            <ul className="mt-9 border-t border-paper/15">
              {copy.standardItems[lang].map((item, index) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ delay: index * 0.05, duration: 0.45, ease: EASE }}
                  className="flex min-h-16 items-center gap-4 border-b border-paper/15 py-3 text-sm leading-relaxed text-paper/80 sm:text-base"
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center border border-sand/40 text-sand">
                    <Check className="h-3.5 w-3.5" aria-hidden="true" />
                  </span>
                  {item}
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-linen">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 sm:px-8 sm:py-28 lg:grid-cols-12 lg:items-center lg:gap-16">
          <div className="lg:order-2 lg:col-span-5">
            <p className="text-[0.68rem] font-medium uppercase tracking-[0.22em] text-clay">
              {copy.trendsTitle[lang]}
            </p>
            <h2 className="mt-5 max-w-[12ch] text-balance font-serif text-[clamp(2.2rem,4.5vw,3.8rem)] font-normal leading-[1.02] tracking-[-0.03em]">
              {copy.trendsHeading[lang]}
            </h2>
            <p className="mt-6 max-w-xl text-base leading-[1.8] text-body sm:text-lg">
              {copy.trendsBody[lang]}
            </p>
            <ul className="mt-9 grid grid-cols-2 border-l border-t border-ink/15">
              {copy.trendChips[lang].map((chip, index) => (
                <li key={chip} className="flex min-h-16 items-center gap-3 border-b border-r border-ink/15 px-3 py-3 text-xs uppercase leading-relaxed tracking-[0.12em] text-body">
                  <span className="text-[0.62rem] text-clay">0{index + 1}</span>
                  {chip}
                </li>
              ))}
            </ul>
          </div>

          <motion.figure
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: EASE }}
            className="lg:order-1 lg:col-span-7"
          >
            <div className="relative aspect-[4/5] overflow-hidden bg-ink/5 sm:aspect-[3/4] lg:aspect-[4/5]">
              <Image
                src="/images/kitchen-catalogue/trends-rounded.webp"
                alt={copy.trendsImageAlt[lang]}
                fill
                sizes="(min-width: 1024px) 58vw, 100vw"
                className="object-cover"
              />
            </div>
            <figcaption className="mt-3 max-w-lg text-xs leading-relaxed text-body/60">
              {copy.visualGuide[lang]}
            </figcaption>
          </motion.figure>
        </div>
      </section>

      <section id="cmimet" className="scroll-mt-32 border-t border-ink/10 bg-paper">
        <div className="mx-auto max-w-7xl px-6 py-20 sm:px-8 sm:py-28">
          <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <p className="text-[0.68rem] font-medium uppercase tracking-[0.22em] text-clay">
                {copy.pricesTitle[lang]}
              </p>
              <h2 className="mt-5 max-w-[17ch] text-balance font-serif text-[clamp(2.2rem,4.5vw,3.8rem)] font-normal leading-[1.02] tracking-[-0.03em]">
                {copy.pricesHeading[lang]}
              </h2>
            </div>
            <p className="max-w-lg text-sm leading-relaxed text-body/70 lg:col-span-4 lg:text-right">
              {copy.pricesNote[lang]}
            </p>
          </div>

          <div className="mt-12 grid gap-px bg-ink/15 lg:grid-cols-3">
            {PRICE_TIERS.map((tier, index) => (
              <motion.article
                key={tier.price}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ delay: index * 0.08, duration: 0.55, ease: EASE }}
                className={`relative flex flex-col ${tier.highlighted ? 'bg-ink text-paper' : 'bg-paper text-ink'}`}
              >
                <div className="relative aspect-[16/9] overflow-hidden bg-linen">
                  <Image
                    src={tier.image}
                    alt={tier.imageAlt[lang]}
                    fill
                    sizes="(min-width: 1024px) 33vw, 100vw"
                    className="object-cover transition-transform duration-700 ease-[var(--ease-out-expo)] hover:scale-[1.025]"
                  />
                  {tier.highlighted && (
                    <span className="absolute left-0 top-0 bg-sand px-4 py-2 text-[0.62rem] font-medium uppercase tracking-[0.16em] text-ink">
                      {copy.popular[lang]}
                    </span>
                  )}
                </div>
                <div className="flex flex-1 flex-col p-6 sm:p-8">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="font-serif text-3xl font-normal">{tier.name[lang]}</h3>
                    <span className={`text-[0.62rem] uppercase tracking-[0.16em] ${tier.highlighted ? 'text-sand' : 'text-clay'}`}>0{index + 1}</span>
                  </div>
                  <p className="mt-6 flex flex-wrap items-baseline gap-x-2 gap-y-1">
                    <span className={`text-xs ${tier.highlighted ? 'text-paper/50' : 'text-body/60'}`}>{copy.from[lang]}</span>
                    <span className="font-serif text-5xl tracking-tight">{tier.price}</span>
                    <span className={`text-xs ${tier.highlighted ? 'text-paper/50' : 'text-body/60'}`}>{copy.perMeter[lang]}</span>
                  </p>
                  <p className={`mt-2 text-sm ${tier.highlighted ? 'text-sand' : 'text-clay'}`}>{tier.total[lang]}</p>
                  <ul className={`mt-7 border-t ${tier.highlighted ? 'border-paper/15' : 'border-ink/15'}`}>
                    {tier.features[lang].map((feature) => (
                      <li key={feature} className={`flex gap-3 border-b py-3 text-sm leading-relaxed ${tier.highlighted ? 'border-paper/15 text-paper/78' : 'border-ink/15 text-body'}`}>
                        <Check className={`mt-0.5 h-4 w-4 shrink-0 ${tier.highlighted ? 'text-sand' : 'text-clay'}`} aria-hidden="true" />
                        {feature}
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
            <h2 className="max-w-[18ch] text-balance font-serif text-[clamp(2.3rem,5vw,4.5rem)] font-normal leading-[1] tracking-[-0.035em]">
              {copy.ctaHeading[lang]}
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-paper/75 sm:text-lg">{copy.ctaSub[lang]}</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:col-span-4 lg:flex-col xl:flex-row">
            <Link href={SHOWROOM_HREF} className={btnSolidOnDark}>
              {copy.visitCta[lang]}
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
            </Link>
            <a href={genericWhatsAppHref} target="_blank" rel="noopener noreferrer" className={btnGhostOnDark}>
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              {copy.whatsappCta[lang]}
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

function StepSection({
  step,
  index,
  lang,
  selectedIds,
  onSelect,
}: {
  step: CatalogueStep;
  index: number;
  lang: Lang;
  selectedIds: string[];
  onSelect: (optionId: string) => void;
}) {
  const onLinen = index % 2 === 1;

  return (
    <section
      id={step.id}
      className={`scroll-mt-32 border-b border-ink/10 ${onLinen ? 'bg-linen' : 'bg-paper'}`}
    >
      <div className="mx-auto max-w-7xl px-6 py-20 sm:px-8 sm:py-28">
        <header className="grid gap-6 lg:grid-cols-12 lg:items-start lg:gap-8">
          <div className="flex items-baseline gap-3 lg:col-span-2 lg:block">
            <p className="text-[0.65rem] font-medium uppercase tracking-[0.2em] text-clay">{copy.stepLabel[lang]}</p>
            <p aria-hidden="true" className="mt-2 font-serif text-6xl italic leading-none text-clay/70 sm:text-7xl">0{index + 1}</p>
          </div>
          <div className="lg:col-span-6">
            <h2 className="max-w-[15ch] text-balance font-serif text-[clamp(2.2rem,4.2vw,3.6rem)] font-normal leading-[1.02] tracking-[-0.03em]">
              {step.title[lang]}
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-[1.75] text-body sm:text-lg">{step.intro[lang]}</p>
            {step.multi && (
              <p className="mt-5 inline-flex items-center gap-2 border border-clay/40 px-3 py-1.5 text-[0.62rem] font-medium uppercase tracking-[0.16em] text-clay">
                {copy.multiHint[lang]}
              </p>
            )}
          </div>
          <aside className="border-l border-clay/35 pl-5 lg:col-span-4 lg:mt-2">
            <p className="text-[0.65rem] font-medium uppercase tracking-[0.18em] text-clay">
              {lang === 'sq' ? 'Pyetja kryesore' : 'The key question'}
            </p>
            <p className="mt-3 max-w-[24ch] font-serif text-xl italic leading-snug text-ink sm:text-2xl">{step.question[lang]}</p>
          </aside>
        </header>

        <p className="mt-10 text-[0.62rem] font-medium uppercase tracking-[0.16em] text-body/55 sm:hidden">{copy.swipeHint[lang]}</p>

        <div className="-mx-6 mt-5 grid snap-x snap-mandatory auto-cols-[84vw] grid-flow-col gap-4 overflow-x-auto px-6 pb-3 sm:mx-0 sm:mt-12 sm:grid-flow-row sm:grid-cols-2 sm:auto-cols-auto sm:gap-5 sm:overflow-visible sm:px-0 sm:pb-0 xl:grid-cols-4">
          {step.options.map((option, optionIndex) => {
            const selected = selectedIds.includes(option.id);
            return (
              <motion.button
                key={option.id}
                type="button"
                aria-pressed={selected}
                aria-label={`${selected ? copy.selectedChoice[lang] : copy.selectChoice[lang]}: ${option.name[lang]}`}
                onClick={() => onSelect(option.id)}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ delay: optionIndex * 0.06, duration: 0.55, ease: EASE }}
                className={`group snap-start text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-clay focus-visible:ring-offset-4 focus-visible:ring-offset-paper ${selected ? 'bg-ink text-paper' : onLinen ? 'bg-paper text-ink' : 'bg-linen text-ink'}`}
              >
                <span className="relative block aspect-[4/3] overflow-hidden bg-ink/5">
                  <Image
                    src={option.image}
                    alt={option.imageAlt[lang]}
                    fill
                    sizes="(min-width: 1280px) 24vw, (min-width: 640px) 48vw, 84vw"
                    className="object-cover transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-[1.025]"
                  />
                  <span className="absolute left-0 top-0 bg-paper px-3 py-2 text-[0.62rem] font-medium tracking-[0.14em] text-ink">
                    0{optionIndex + 1}
                  </span>
                  {selected && (
                    <span className="absolute right-0 top-0 flex h-10 w-10 items-center justify-center bg-clay text-paper">
                      <Check className="h-4 w-4" aria-hidden="true" />
                    </span>
                  )}
                </span>
                <span className={`flex min-h-[16.5rem] flex-col border p-5 sm:min-h-[17.5rem] ${selected ? 'border-ink' : 'border-ink/12'}`}>
                  <span className="flex items-center justify-between gap-4 text-[0.62rem] font-medium uppercase tracking-[0.16em]">
                    <span className={selected ? 'text-sand' : 'text-clay'}>{option.badge[lang]}</span>
                    <span className={selected ? 'text-paper/55' : 'text-body/55'}>{option.tier}</span>
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
