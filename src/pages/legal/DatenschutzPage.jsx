import { Link } from 'react-router-dom'
import SEOHead from '../../components/ui/SEOHead'
import AnimatedSection from '../../components/ui/AnimatedSection'

function LegalSection({ title, children }) {
  return (
    <div>
      <h2 className="text-lg font-semibold text-neutral-900 mb-3 pb-2 border-b border-neutral-100">{title}</h2>
      {children}
    </div>
  )
}

export default function DatenschutzPage() {
  return (
    <>
      <SEOHead
        title="Datenschutzerklärung"
        description="Datenschutzerklärung von VIO-IT – DSGVO-konforme Informationen zur Datenverarbeitung."
        canonical="/datenschutz"
        noIndex
      />

      <div className="bg-neutral-950 pt-32 pb-16">
        <div className="section-container">
          <AnimatedSection>
            <h1 className="text-4xl font-bold text-white mb-2">Datenschutzerklärung</h1>
            <p className="text-neutral-400">Stand: März 2026 · Gemäß DSGVO, BDSG und TMG</p>
          </AnimatedSection>
        </div>
      </div>

      <section className="section-padding bg-white">
        <div className="section-container max-w-3xl">
          <AnimatedSection>
            <div className="space-y-10 text-sm text-neutral-600 leading-relaxed">

              <LegalSection title="1. Verantwortlicher">
                <p>
                  Verantwortlicher im Sinne der DSGVO ist:<br /><br />
                  <strong>VIO-IT · Viorel Ghiurca</strong><br />
                  86720 Nördlingen<br />
                  E-Mail: <a href="mailto:mail@viorelghiurca.de" className="text-primary-600 hover:underline">mail@viorelghiurca.de</a><br />
                  Website: <a href="https://it.ghiurcaviorel.de" className="text-primary-600 hover:underline">it.ghiurcaviorel.de</a>
                </p>
              </LegalSection>

              <LegalSection title="2. Welche Daten wir erheben">
                <p className="mb-3">Wir erheben und verarbeiten folgende personenbezogene Daten:</p>
                <ul className="list-disc list-inside space-y-1 text-neutral-600">
                  <li>Kontaktformular: Name, Firma (optional), E-Mail, Telefon (optional), Nachricht</li>
                  <li>Terminbuchung: Name, Firma (optional), E-Mail, Telefon (optional), Terminart, Datum/Zeit, Anliegen</li>
                  <li>Technische Daten: IP-Adresse (anonymisiert), Browser-Typ, Seitenaufrufe (nur nach Einwilligung)</li>
                </ul>
              </LegalSection>

              <LegalSection title="3. Zweck der Datenverarbeitung">
                <p className="mb-3">Wir verarbeiten Ihre Daten ausschließlich zu folgenden Zwecken:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Beantwortung Ihrer Kontaktanfragen</li>
                  <li>Durchführung und Bestätigung von Terminbuchungen</li>
                  <li>Verbesserung der Website (nur nach ausdrücklicher Einwilligung)</li>
                </ul>
              </LegalSection>

              <LegalSection title="4. Rechtsgrundlagen">
                <p>
                  Die Verarbeitung Ihrer Daten erfolgt auf Basis von:
                </p>
                <ul className="list-disc list-inside space-y-1 mt-2">
                  <li><strong>Art. 6 Abs. 1 lit. b DSGVO</strong> – Vertragserfüllung und vorvertragliche Maßnahmen</li>
                  <li><strong>Art. 6 Abs. 1 lit. a DSGVO</strong> – Einwilligung (bei optionalen Cookies/Analytics)</li>
                  <li><strong>Art. 6 Abs. 1 lit. f DSGVO</strong> – Berechtigte Interessen (technischer Betrieb)</li>
                </ul>
              </LegalSection>

              <LegalSection title="5. Speicherung und Aufbewahrungsfristen">
                <p className="mb-3">
                  Ihre Daten werden in Firebase (Google Ireland Limited) gespeichert. Die Datenverarbeitung
                  erfolgt in einem Rechenzentrum in Deutschland (Standort: europe-west3, Frankfurt).
                  Eine Weitergabe an sonstige Dritte erfolgt nicht,
                  es sei denn, dies ist zur Vertragserfüllung erforderlich oder Sie haben ausdrücklich eingewilligt.
                </p>
                <p className="mb-3">Wir löschen Ihre personenbezogenen Daten, sobald der Zweck der Speicherung entfällt:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li><strong>Kontaktanfragen:</strong> 6 Monate nach Abschluss der Kommunikation</li>
                  <li><strong>Terminbuchungen:</strong> 6 Monate nach dem Termin, sofern keine Geschäftsbeziehung entsteht</li>
                  <li><strong>Cookie-Einwilligung:</strong> Automatisches Ablaufdatum nach 1 Jahr</li>
                  <li><strong>Analysedaten:</strong> Automatische Löschung nach 14 Monaten (Firebase Analytics Standard)</li>
                </ul>
                <p className="mt-3">
                  Gesetzliche Aufbewahrungspflichten (z.&nbsp;B. steuerrechtlich) bleiben hiervon unberührt.
                </p>
              </LegalSection>

              <LegalSection title="6. Auftragsverarbeiter und Drittanbieter">
                <p className="mb-3">Zur Bereitstellung unserer Website und Dienste setzen wir folgende Drittanbieter ein:</p>

                <h3 className="text-sm font-semibold text-neutral-800 mt-4 mb-1">a) Firebase (Google Ireland Limited)</h3>
                <p>
                  Wir nutzen Firebase Firestore zur Speicherung von Kontaktanfragen und Terminbuchungen sowie
                  Firebase Analytics (nur nach Ihrer Einwilligung) zur anonymisierten Nutzungsanalyse.
                  Die Daten werden in einem Google-Rechenzentrum in Deutschland (Region europe-west3, Frankfurt am Main) gespeichert.
                  Die Datenverarbeitung erfolgt auf Grundlage eines Auftragsverarbeitungsvertrags (AVV) mit Google.
                  Google Ireland Limited hat seinen Sitz in der EU. Soweit eine Datenübermittlung in die USA stattfindet,
                  erfolgt diese auf Basis des EU-US Data Privacy Frameworks (Angemessenheitsbeschluss der EU-Kommission vom 10. Juli 2023).
                  Weitere Informationen: <a href="https://firebase.google.com/support/privacy" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">firebase.google.com/support/privacy</a>
                </p>

                <h3 className="text-sm font-semibold text-neutral-800 mt-4 mb-1">b) EmailJS</h3>
                <p>
                  Für den Versand von Bestätigungs-E-Mails bei Terminbuchungen und Stornierungen nutzen wir den Dienst EmailJS.
                  Dabei werden Ihr Name, Ihre E-Mail-Adresse und die Buchungsdaten an die Server von EmailJS übermittelt.
                  Die Rechtsgrundlage ist Art.&nbsp;6 Abs.&nbsp;1 lit.&nbsp;b DSGVO (Vertragserfüllung).
                  Weitere Informationen: <a href="https://www.emailjs.com/legal/privacy-policy/" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">emailjs.com/legal/privacy-policy</a>
                </p>

                <h3 className="text-sm font-semibold text-neutral-800 mt-4 mb-1">c) GitHub Pages (Hosting)</h3>
                <p>
                  Die Website wird über GitHub Pages (GitHub Inc., USA) gehostet. Beim Aufruf der Website werden
                  technisch bedingt Ihre IP-Adresse und der User-Agent an die Server von GitHub übermittelt.
                  Die Rechtsgrundlage ist Art.&nbsp;6 Abs.&nbsp;1 lit.&nbsp;f DSGVO (berechtigtes Interesse an der zuverlässigen Bereitstellung der Website).
                  GitHub nimmt am EU-US Data Privacy Framework teil.
                  Weitere Informationen: <a href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">GitHub Privacy Statement</a>
                </p>
              </LegalSection>

              <LegalSection title="7. Schriftarten">
                <p>
                  Diese Website verwendet die Schriftart „Inter" (Open-Source, SIL Open Font License).
                  Die Schriftdateien werden lokal von unserem Server bereitgestellt – es findet keine
                  Verbindung zu externen Font-Servern (z.&nbsp;B. Google Fonts) statt. Es werden daher
                  keine personenbezogenen Daten an Dritte im Zusammenhang mit der Schriftart-Einbindung übermittelt.
                </p>
              </LegalSection>

              <LegalSection title="8. Cookies">
                <p>
                  Wir verwenden Cookies. Notwendige Cookies sind für den Betrieb der Website erforderlich
                  und werden ohne Einwilligung gesetzt. Analytische Cookies (Firebase Analytics) werden
                  nur nach Ihrer ausdrücklichen Einwilligung geladen. Weitere Details finden Sie in unserer{' '}
                  <Link to="/cookie-richtlinie" className="text-primary-600 hover:underline">Cookie-Richtlinie</Link>.
                </p>
              </LegalSection>

              <LegalSection title="9. SSL/TLS-Verschlüsselung">
                <p>
                  Diese Website nutzt aus Sicherheitsgründen eine SSL- bzw. TLS-Verschlüsselung.
                  Eine verschlüsselte Verbindung erkennen Sie daran, dass die Adresszeile des Browsers
                  von „http://" auf „https://" wechselt. Wenn die SSL- bzw. TLS-Verschlüsselung
                  aktiviert ist, können die Daten, die Sie an uns übermitteln, nicht von Dritten mitgelesen werden.
                </p>
              </LegalSection>

              <LegalSection title="10. Ihre Rechte">
                <p className="mb-3">Sie haben nach der DSGVO folgende Rechte:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li><strong>Auskunftsrecht</strong> (Art. 15 DSGVO)</li>
                  <li><strong>Recht auf Berichtigung</strong> (Art. 16 DSGVO)</li>
                  <li><strong>Recht auf Löschung</strong> (Art. 17 DSGVO)</li>
                  <li><strong>Recht auf Einschränkung der Verarbeitung</strong> (Art. 18 DSGVO)</li>
                  <li><strong>Recht auf Datenübertragbarkeit</strong> (Art. 20 DSGVO)</li>
                  <li><strong>Widerspruchsrecht</strong> (Art. 21 DSGVO)</li>
                  <li><strong>Recht auf Widerruf der Einwilligung</strong> (Art. 7 Abs. 3 DSGVO)</li>
                </ul>
                <p className="mt-3">
                  Um diese Rechte auszuüben, wenden Sie sich an:
                  <a href="mailto:mail@viorelghiurca.de" className="text-primary-600 hover:underline ml-1">mail@viorelghiurca.de</a>
                </p>
              </LegalSection>

              <LegalSection title="11. Beschwerderecht">
                <p className="mb-3">
                  Sie haben das Recht, sich bei einer Datenschutz-Aufsichtsbehörde zu beschweren.
                  Die für uns zuständige Aufsichtsbehörde ist:
                </p>
                <p>
                  <strong>Bayerisches Landesamt für Datenschutzaufsicht (BayLDA)</strong><br />
                  Promenade 18, 91522 Ansbach<br />
                  Telefon: +49 (0) 981 180093-0<br />
                  E-Mail: <a href="mailto:poststelle@lda.bayern.de" className="text-primary-600 hover:underline">poststelle@lda.bayern.de</a><br />
                  Web: <a href="https://www.lda.bayern.de" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">www.lda.bayern.de</a>
                </p>
              </LegalSection>

              <LegalSection title="12. Änderungen dieser Datenschutzerklärung">
                <p>
                  Wir behalten uns vor, diese Datenschutzerklärung anzupassen, wenn sich technische
                  oder rechtliche Gegebenheiten ändern. Die aktuelle Version finden Sie stets auf dieser Seite.
                </p>
              </LegalSection>

            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  )
}
