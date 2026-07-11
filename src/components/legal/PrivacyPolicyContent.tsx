'use client';

import LegalDocument, { type LegalSection } from './LegalDocument';
import { STORE } from '@/lib/store';

const UPDATED = { sq: '11 korrik 2026', en: 'July 11, 2026' };

const TITLE = { sq: 'Politika e Privatësisë', en: 'Privacy Policy' };

const INTRO = {
  sq: (
    <>
      Kjo politikë shpjegon si RO-AL SH.P.K. ("{STORE.name}", "ne") mbledh, përdor dhe
      mbron të dhënat personale kur vizitoni faqen{' '}
      <a href="https://roal.design">roal.design</a> ose na kontaktoni nëpërmjet telefonit,
      email-it apo WhatsApp-it.
    </>
  ),
  en: (
    <>
      This policy explains how RO-AL SH.P.K. ("{STORE.name}", "we") collects, uses and
      protects personal data when you visit <a href="https://roal.design">roal.design</a> or
      contact us by phone, email or WhatsApp.
    </>
  ),
};

const SECTIONS: LegalSection[] = [
  {
    heading: { sq: 'Kush jemi ne', en: 'Who we are' },
    body: {
      sq: (
        <p>
          {STORE.name} (RO-AL SH.P.K.) është një punishte mobilerie me porosi, me adresë{' '}
          {STORE.addressLine}. Na kontaktoni në {STORE.email} ose {STORE.phonePretty} për çdo
          pyetje rreth kësaj politike.
        </p>
      ),
      en: (
        <p>
          {STORE.name} (RO-AL SH.P.K.) is a bespoke furniture workshop based at{' '}
          {STORE.addressLine}. Reach us at {STORE.email} or {STORE.phonePretty} with any
          questions about this policy.
        </p>
      ),
    },
  },
  {
    heading: { sq: 'Të dhënat që mbledhim', en: 'Data we collect' },
    body: {
      sq: (
        <ul>
          <li>
            <strong>Të dhëna kontakti</strong> — emri, numri i telefonit, email-i dhe përmbajtja
            e mesazhit tuaj, kur na shkruani nëpërmjet telefonit, email-it, WhatsApp-it ose
            formularëve në faqe.
          </li>
          <li>
            <strong>Të dhëna përdorimi</strong> — faqet e vizituara, lloji i pajisjes/shfletuesit,
            vendndodhja e përafërt dhe faqja referuese, të mbledhura automatikisht nëpërmjet
            mjeteve analitike (p.sh. Firebase/Google Analytics).
          </li>
          <li>
            <strong>Preferenca gjuhësore</strong> — zgjedhja juaj sq/en ruhet lokalisht në
            shfletuesin tuaj (localStorage), jo në serverat tanë.
          </li>
        </ul>
      ),
      en: (
        <ul>
          <li>
            <strong>Contact data</strong> — name, phone number, email address and the content of
            your message, when you reach us by phone, email, WhatsApp or a form on the site.
          </li>
          <li>
            <strong>Usage data</strong> — pages visited, device/browser type, approximate
            location and referring site, collected automatically via analytics tools (e.g.
            Firebase/Google Analytics).
          </li>
          <li>
            <strong>Language preference</strong> — your sq/en choice is stored locally in your
            browser (localStorage), not on our servers.
          </li>
        </ul>
      ),
    },
  },
  {
    heading: { sq: 'Cookies dhe teknologji të ngjashme', en: 'Cookies and similar technologies' },
    body: {
      sq: (
        <p>
          Përdorim cookies dhe teknologji të ngjashme analitike (si Firebase/Google Analytics)
          për të kuptuar si përdoret faqja. Nëse zhvillojmë fushata reklamuese në Meta ose Google
          Ads, mund të përdorim edhe piksela/cookies reklamuese për të matur performancën e
          fushatave dhe, aty ku lejohet, për t'ju shfaqur reklama relevante në platforma të tjera.
          Mund t'i kontrolloni ose fshini cookies nga cilësimet e shfletuesit tuaj në çdo kohë.
        </p>
      ),
      en: (
        <p>
          We use cookies and similar analytics technologies (such as Firebase/Google Analytics)
          to understand how the site is used. If we run advertising campaigns on Meta or Google
          Ads, we may also use advertising pixels/cookies to measure campaign performance and,
          where permitted, show you relevant ads on other platforms. You can control or delete
          cookies from your browser settings at any time.
        </p>
      ),
    },
  },
  {
    heading: { sq: 'Si i përdorim të dhënat', en: 'How we use your data' },
    body: {
      sq: (
        <ul>
          <li>Për t'iu përgjigjur pyetjeve dhe për të organizuar vizita në showroom ose oferta.</li>
          <li>Për të përmirësuar faqen dhe eksperiencën e përdoruesit.</li>
          <li>Për të matur performancën e marketingut dhe fushatave reklamuese.</li>
          <li>Për të përmbushur detyrime ligjore, kur kërkohet.</li>
        </ul>
      ),
      en: (
        <ul>
          <li>To respond to inquiries and arrange showroom visits or quotes.</li>
          <li>To improve the website and user experience.</li>
          <li>To measure marketing and advertising campaign performance.</li>
          <li>To comply with legal obligations, where required.</li>
        </ul>
      ),
    },
  },
  {
    heading: { sq: 'Ndarja e të dhënave', en: 'Sharing your data' },
    body: {
      sq: (
        <p>
          Nuk i shesim të dhënat tuaja personale. I ndajmë vetëm me ofrues shërbimesh që na
          ndihmojnë të operojmë faqen dhe komunikimin (p.sh. Google/Firebase për hosting dhe
          analitikë, Meta për WhatsApp Business dhe reklama), ose kur kërkohet nga ligji.
        </p>
      ),
      en: (
        <p>
          We do not sell your personal data. We only share it with service providers that help
          us run the site and communications (e.g. Google/Firebase for hosting and analytics,
          Meta for WhatsApp Business and advertising), or when required by law.
        </p>
      ),
    },
  },
  {
    heading: { sq: 'Ruajtja e të dhënave', en: 'Data retention' },
    body: {
      sq: (
        <p>
          I ruajmë të dhënat tuaja vetëm për aq kohë sa është e nevojshme për qëllimin për të
          cilin u mblodhën (p.sh. për të përfunduar komunikimin ose porosinë tuaj), ose siç
          kërkohet nga legjislacioni shqiptar.
        </p>
      ),
      en: (
        <p>
          We keep your data only for as long as necessary for the purpose it was collected (e.g.
          to complete our communication or your order), or as required by Albanian law.
        </p>
      ),
    },
  },
  {
    heading: { sq: 'Të drejtat tuaja', en: 'Your rights' },
    body: {
      sq: (
        <p>
          Sipas ligjit nr. 9887/2008 "Për mbrojtjen e të dhënave personale", keni të drejtë të
          kërkoni akses, korrigjim ose fshirje të të dhënave tuaja, si dhe të kundërshtoni
          përpunimin e tyre. Për të ushtruar këto të drejta, na shkruani në {STORE.email}.
        </p>
      ),
      en: (
        <p>
          Under Albanian Law no. 9887/2008 "On the Protection of Personal Data", you have the
          right to request access to, correction of, or deletion of your data, and to object to
          its processing. To exercise these rights, email us at {STORE.email}.
        </p>
      ),
    },
  },
  {
    heading: { sq: 'Siguria', en: 'Security' },
    body: {
      sq: (
        <p>
          Marrim masa teknike dhe organizative të arsyeshme për të mbrojtur të dhënat tuaja nga
          humbja, keqpërdorimi ose aksesi i paautorizuar.
        </p>
      ),
      en: (
        <p>
          We take reasonable technical and organizational measures to protect your data from
          loss, misuse or unauthorized access.
        </p>
      ),
    },
  },
  {
    heading: { sq: 'Fëmijët', en: "Children's privacy" },
    body: {
      sq: (
        <p>
          Faqja jonë nuk drejtohet ndaj fëmijëve nën 16 vjeç dhe nuk mbledhim me dashje të dhëna
          nga ta.
        </p>
      ),
      en: (
        <p>
          Our site is not directed at children under 16, and we do not knowingly collect data
          from them.
        </p>
      ),
    },
  },
  {
    heading: { sq: 'Ndryshime në këtë politikë', en: 'Changes to this policy' },
    body: {
      sq: (
        <p>
          Mund ta përditësojmë këtë politikë herë pas here. Data e përditësimit të fundit shfaqet
          në krye të faqes.
        </p>
      ),
      en: (
        <p>
          We may update this policy from time to time. The last-updated date appears at the top
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

export default function PrivacyPolicyContent() {
  return <LegalDocument title={TITLE} updated={UPDATED} intro={INTRO} sections={SECTIONS} />;
}
