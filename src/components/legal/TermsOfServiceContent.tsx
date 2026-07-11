'use client';

import LegalDocument, { type LegalSection } from './LegalDocument';
import { STORE } from '@/lib/store';

const UPDATED = { sq: '11 korrik 2026', en: 'July 11, 2026' };

const TITLE = { sq: 'Kushtet e Përdorimit', en: 'Terms of Service' };

const INTRO = {
  sq: (
    <>
      Këto kushte rregullojnë përdorimin e faqes <a href="https://roal.design">roal.design</a>{' '}
      nga ana juaj. Duke përdorur faqen, pranoni këto kushte. Nëse nuk jeni dakord, ju lutemi mos
      e përdorni faqen.
    </>
  ),
  en: (
    <>
      These terms govern your use of <a href="https://roal.design">roal.design</a>. By using
      the site, you agree to these terms. If you do not agree, please do not use the site.
    </>
  ),
};

const SECTIONS: LegalSection[] = [
  {
    heading: { sq: 'Rreth faqes dhe shërbimeve', en: 'About the site and services' },
    body: {
      sq: (
        <p>
          {STORE.name} (RO-AL SH.P.K.) është një punishte mobilerie me porosi. Kjo faqe ofron
          informacion mbi shërbimet tona (kuzhina, garderoba, ambiente pune, dhoma ndenje,
          hoteleri dhe lokale). Çmimet, afatet dhe skicat e paraqitura në faqe ose gjatë
          bisedave në WhatsApp/telefon janë orientuese dhe jo oferta detyruese, deri sa të
          konfirmohen me shkrim në një ofertë ose kontratë të veçantë.
        </p>
      ),
      en: (
        <p>
          {STORE.name} (RO-AL SH.P.K.) is a bespoke furniture workshop. This site provides
          information about our services (kitchens, wardrobes, workspaces, living-room
          cabinetry, hospitality fit-outs). Prices, timelines and renders shown on the site or
          discussed over WhatsApp/phone are indicative only and not a binding offer until
          confirmed in writing in a separate quote or contract.
        </p>
      ),
    },
  },
  {
    heading: { sq: 'Përdorimi i lejuar', en: 'Acceptable use' },
    body: {
      sq: (
        <p>
          Pranoni të mos e përdorni faqen për qëllime të paligjshme, të mos përpiqeni të merrni
          akses të paautorizuar në sistemet tona, dhe të mos kopjoni apo ripërdorni përmbajtjen
          e faqes pa leje.
        </p>
      ),
      en: (
        <p>
          You agree not to use the site for unlawful purposes, not to attempt unauthorized
          access to our systems, and not to copy or reuse the site's content without
          permission.
        </p>
      ),
    },
  },
  {
    heading: { sq: 'Pronësia intelektuale', en: 'Intellectual property' },
    body: {
      sq: (
        <p>
          Përmbajtja e faqes — tekstet, fotografitë e projekteve, dizajni dhe logoja — i përket
          RO-AL SH.P.K., përveçse kur shënohet ndryshe. Nuk mund të riprodhohet ose përdoret
          komercialisht pa lejen tonë me shkrim.
        </p>
      ),
      en: (
        <p>
          The site's content — text, project photography, design and logo — belongs to RO-AL
          SH.P.K. unless otherwise noted. It may not be reproduced or used commercially without
          our written permission.
        </p>
      ),
    },
  },
  {
    heading: { sq: 'Porositë me porosi', en: 'Custom orders' },
    body: {
      sq: (
        <p>
          Çdo porosi mobilerie me porosi rregullohet nga një ofertë/kontratë e veçantë e
          nënshkruar nga të dyja palët, e cila përcakton çmimin final, paradhënien, afatin e
          prodhimit/instalimit dhe garancinë. Këto Kushte Përdorimi rregullojnë vetëm përdorimin
          e faqes, jo marrëdhënien tregtare të porosisë.
        </p>
      ),
      en: (
        <p>
          Any bespoke furniture order is governed by a separate quote/contract signed by both
          parties, setting out the final price, deposit, production/installation timeline and
          warranty. These Terms of Service govern only your use of the website, not the
          underlying commercial order.
        </p>
      ),
    },
  },
  {
    heading: { sq: 'Linqe të palëve të treta', en: 'Third-party links' },
    body: {
      sq: (
        <p>
          Faqja përmban linqe drejt platformave të palëve të treta (Google Maps, Instagram,
          WhatsApp). Nuk jemi përgjegjës për përmbajtjen ose praktikat e privatësisë të këtyre
          platformave.
        </p>
      ),
      en: (
        <p>
          The site links to third-party platforms (Google Maps, Instagram, WhatsApp). We are
          not responsible for the content or privacy practices of those platforms.
        </p>
      ),
    },
  },
  {
    heading: { sq: 'Kufizimi i përgjegjësisë', en: 'Limitation of liability' },
    body: {
      sq: (
        <p>
          Faqja ofrohet "siç është". Në masën maksimale të lejuar nga ligji, nuk mbajmë
          përgjegjësi për dëme indirekte, mospërputhje të përkohshme të informacionit, ose
          ndërprerje të disponueshmërisë së faqes.
        </p>
      ),
      en: (
        <p>
          The site is provided "as is". To the maximum extent permitted by law, we are not
          liable for indirect damages, temporary inaccuracies in the information shown, or
          interruptions to site availability.
        </p>
      ),
    },
  },
  {
    heading: { sq: 'E drejta e zbatueshme', en: 'Governing law' },
    body: {
      sq: (
        <p>
          Këto kushte rregullohen nga legjislacioni i Republikës së Shqipërisë. Çdo mosmarrëveshje
          do të zgjidhet nga gjykatat kompetente në Tiranë.
        </p>
      ),
      en: (
        <p>
          These terms are governed by the laws of the Republic of Albania. Any dispute will be
          resolved by the competent courts in Tirana.
        </p>
      ),
    },
  },
  {
    heading: { sq: 'Ndryshime në kushte', en: 'Changes to these terms' },
    body: {
      sq: (
        <p>
          Mund t'i përditësojmë këto kushte herë pas here. Data e përditësimit të fundit shfaqet
          në krye të faqes.
        </p>
      ),
      en: (
        <p>
          We may update these terms from time to time. The last-updated date appears at the top
          of this page.
        </p>
      ),
    },
  },
  {
    heading: { sq: 'Na kontaktoni', en: 'Contact us' },
    body: {
      sq: (
        <p>
          {STORE.name}, {STORE.addressLine} · {STORE.email} · {STORE.phonePretty}
        </p>
      ),
      en: (
        <p>
          {STORE.name}, {STORE.addressLine} · {STORE.email} · {STORE.phonePretty}
        </p>
      ),
    },
  },
];

export default function TermsOfServiceContent() {
  return <LegalDocument title={TITLE} updated={UPDATED} intro={INTRO} sections={SECTIONS} />;
}
