// src/constants/index.ts
import { BuildingOffice2Icon, BuildingStorefrontIcon, CheckBadgeIcon, HomeModernIcon, SparklesIcon, WrenchScrewdriverIcon } from "@heroicons/react/20/solid";

/* Example image imports (replace with your own) */
import qualityMaterialsImg from "../../public/images/3a10262a-0ec1-40ed-b335-027a0ad6d843.png";
import modernDesignImg from "../../public/images/living.png";
import craftedToLastImg from "../../public/images/precision.png";

export const navLinks = [
  { label: "Home", href: "/" }, // Changed from #hero
  { label: "About", href: "/#about" },
  { label: "Services", href: "/#services" },
  { label: "Blog", href: "/blog" }, // New
  { label: "Instagram", href: "/#instagram" },
  { label: "Contact", href: "/#contact" },
];

export interface AboutCard {
  img: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  title: string;
  text: string;
}

export const aboutCards: AboutCard[] = [
  {
    img: qualityMaterialsImg.src,
    icon: CheckBadgeIcon,
    title: 'Premium Materials',
    text: 'Ethically sourced hardwoods, FSC‑certified plywood and low‑VOC finishes that honour both craft and planet.',
  },
  {
    img: modernDesignImg.src,
    icon: SparklesIcon,
    title: 'Innovative Design',
    text: 'Space‑smart interiors and statement pieces, engineered in CAD and refined in the workshop for form‑meets‑function elegance.',
  },
  {
    img: craftedToLastImg.src,
    icon: WrenchScrewdriverIcon,
    title: 'Precision Crafting',
    text: 'CNC‑cut to 0.1 mm, hand‑assembled under a 30‑point QA checklist.',
  },
];


export interface ServiceItem {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  title: string;
  description: string;
  features: string[];
}

export const servicesData: ServiceItem[] = [
  {
    icon: BuildingOffice2Icon,
    title: 'Architectural Partnership',
    description:
      'End‑to‑end collaboration with architects and interior designers, from concept sketches to site supervision. Scalable packages accommodate everything from value‑driven laminates to ultra‑luxury finishes.',
    features: [
      '3D modelling & photoreal renders',
      'Curated material library & samples',
      'Comprehensive technical drawing set',
      'On‑site measurement & coordination',
    ],
  },
  {
    icon: HomeModernIcon,
    title: 'Bespoke Residential Furnishing',
    description:
      'Made‑to‑measure cabinetry, kitchens, wardrobes and loose furniture — CNC‑cut to the millimetre, hand‑finished, and delivered with white‑glove service.',
    features: [
      'Custom sizing for any footprint',
      'Premium & eco‑certified materials',
      'Precision CNC cutting & hand finishing',
      'Delivery, assembly & staging',
    ],
  },
  {
    icon: BuildingStorefrontIcon,
    title: 'Commercial & Hospitality Fit‑Out',
    description:
      'Contract‑grade solutions for offices, retail stores and hotels, delivered on schedule with a single point of contact. Choose from durable laminates to statement veneers.',
    features: [
      'Bulk‑order economies of scale',
      'Dedicated project & budget management',
      'Fire‑safe & acoustic materials',
      'Post‑installation maintenance programme',
    ],
  },
  // {
  //   icon: TruckIcon,
  //   title: 'Logistics, Installation & After‑Care',
  //   description:
  //     'Nationwide transport, meticulous mounting and lifetime servicing—from our workshop gate to your client’s handover.',
  //   features: [
  //     'Certified installers & levelling',
  //     'Protective packaging removal & site cleaning',
  //     'Warranty & scheduled service visits',
  //   ],
  // },
];

export const productsData = [
    {
        imgSrc: "https://images.unsplash.com/photo-1598993847980-805c9c5492b9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        alt: "Modern Chair",
        name: "Modern Chair",
        price: "$129.99"
    },
    {
        imgSrc: "https://images.unsplash.com/photo-1615874959471-bcd2d482df1c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        alt: "Sofa",
        name: "Comfort Sofa",
        price: "$899.99"
    },
    {
        imgSrc: "https://images.unsplash.com/photo-1657372170556-1515647f4035?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        alt: "Dining Table",
        name: "Dining Table",
        price: "$499.99"
    }
];