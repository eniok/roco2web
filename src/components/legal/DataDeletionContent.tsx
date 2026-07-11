'use client';

import LegalDocument, { type LegalSection } from './LegalDocument';
import { STORE } from '@/lib/store';

const UPDATED = { sq: '11 korrik 2026', en: 'July 11, 2026' };

const TITLE = {
  sq: 'Udhëzime për Fshirjen e të Dhënave',
  en: 'Data Deletion Instructions',
};

const INTRO = {
  sq: (
    <>
      RO-AL SH.P.K. ("{STORE.name}", "ne") respekton të drejtën tuaj për të kërkuar fshirjen e
      të dhënave personale. Kjo faqe shpjegon çfarë të dhënash mbajmë dhe si të kërkoni fshirjen
      e tyre.
    </>
  ),
  en: (
    <>
      RO-AL SH.P.K. ("{STORE.name}", "we") respects your right to request deletion of your
      personal data. This page explains what data we hold and how to request its removal.
    </>
  ),
};

const SECTIONS: LegalSection[] = [
  {
    heading: { sq: 'Çfarë të dhënash mbajmë', en: 'What data we hold' },
    body: {
      sq: (
        <p>
          {STORE.name} nuk kërkon që përdoruesit të krijojnë llogari dhe nuk ruan profile
          përdoruesish. Në lidhje me platformat e Meta-s (Facebook, Instagram, WhatsApp), ne
          kryesisht <strong>analizojmë të dhëna të grumbulluara mbi performancën e reklamave dhe
          faqes</strong> — jo të dhëna personale të identifikueshme. Të vetmet të dhëna personale
          që mund të mbajmë janë ato që na jepni vullnetarisht kur na kontaktoni (p.sh. emri,
          numri i telefonit ose përmbajtja e një mesazhi në WhatsApp).
        </p>
      ),
      en: (
        <p>
          {STORE.name} does not require users to create accounts and does not maintain user
          profiles. In relation to Meta platforms (Facebook, Instagram, WhatsApp), we primarily{' '}
          <strong>analyze aggregated advertising and page performance data</strong> — not
          personally identifiable data. The only personal data we may hold is what you provide
          voluntarily when you contact us (e.g. your name, phone number or the content of a
          WhatsApp message).
        </p>
      ),
    },
  },
  {
    heading: { sq: 'Si të kërkoni fshirjen', en: 'How to request deletion' },
    body: {
      sq: (
        <>
          <p>
            Për të kërkuar fshirjen e çdo të dhëne personale që mund të kemi për ju, na dërgoni një
            kërkesë me email në{' '}
            <a href={`mailto:${STORE.email}?subject=Kerkese%20per%20fshirje%20te%20dhenash`}>
              {STORE.email}
            </a>{' '}
            me temën <strong>"Kërkesë për fshirje të dhënash"</strong>, ose na shkruani në WhatsApp
            në <a href={STORE.whatsapp}>{STORE.phonePretty}</a>.
          </p>
          <p>Ju lutemi përfshini në kërkesë:</p>
          <ul>
            <li>Emrin që keni përdorur kur na kontaktuat;</li>
            <li>Numrin e telefonit ose email-in nga i cili na keni shkruar;</li>
            <li>Kanalin nëpërmjet të cilit na kontaktuat (telefon, email, WhatsApp, Facebook, Instagram).</li>
          </ul>
        </>
      ),
      en: (
        <>
          <p>
            To request deletion of any personal data we may hold about you, send us a request by
            email at{' '}
            <a href={`mailto:${STORE.email}?subject=Data%20deletion%20request`}>{STORE.email}</a>{' '}
            with the subject <strong>"Data deletion request"</strong>, or message us on WhatsApp at{' '}
            <a href={STORE.whatsapp}>{STORE.phonePretty}</a>.
          </p>
          <p>Please include in your request:</p>
          <ul>
            <li>The name you used when you contacted us;</li>
            <li>The phone number or email you contacted us from;</li>
            <li>The channel you used to reach us (phone, email, WhatsApp, Facebook, Instagram).</li>
          </ul>
        </>
      ),
    },
  },
  {
    heading: { sq: 'Çfarë ndodh më pas', en: 'What happens next' },
    body: {
      sq: (
        <p>
          Do t'ju konfirmojmë marrjen e kërkesës dhe do të fshijmë të dhënat tuaja personale nga
          sistemet tona brenda <strong>30 ditësh</strong>, përveç rasteve kur ligji na kërkon t'i
          ruajmë për një periudhë më të gjatë (p.sh. detyrime fiskale për porosi të përfunduara).
          Në atë rast, do t'ju njoftojmë për arsyen dhe afatin.
        </p>
      ),
      en: (
        <p>
          We will confirm receipt of your request and delete your personal data from our systems
          within <strong>30 days</strong>, unless the law requires us to retain it for longer
          (e.g. tax obligations for completed orders). In that case, we will notify you of the
          reason and the timeframe.
        </p>
      ),
    },
  },
  {
    heading: {
      sq: 'Të dhënat në platformat e Meta-s',
      en: 'Data on Meta platforms',
    },
    body: {
      sq: (
        <p>
          Të dhënat që Meta (Facebook, Instagram, WhatsApp) mban për ju në llogaritë tuaja
          administrohen nga Meta dhe nga cilësimet tuaja të privatësisë në ato platforma. Për të
          fshirë të dhëna direkt nga llogaria juaj në Meta, përdorni cilësimet e privatësisë të
          Facebook/Instagram ose vizitoni{' '}
          <a href="https://www.facebook.com/help/delete_account" target="_blank" rel="noopener noreferrer">
            qendrën e ndihmës së Meta-s
          </a>
          . Kërkesa drejtuar nesh mbulon vetëm të dhënat që ne mbajmë jashtë platformave të Meta-s.
        </p>
      ),
      en: (
        <p>
          Data that Meta (Facebook, Instagram, WhatsApp) holds about you in your own accounts is
          managed by Meta and your privacy settings on those platforms. To delete data directly
          from your Meta account, use your Facebook/Instagram privacy settings or visit the{' '}
          <a href="https://www.facebook.com/help/delete_account" target="_blank" rel="noopener noreferrer">
            Meta help center
          </a>
          . A request to us covers only the data we hold outside of Meta's platforms.
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

export default function DataDeletionContent() {
  return <LegalDocument title={TITLE} updated={UPDATED} intro={INTRO} sections={SECTIONS} />;
}
