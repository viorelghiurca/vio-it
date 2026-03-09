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
                  E-Mail: <a href="mailto:mail@viorelghiurca.de" className="text-primary-600 hover:underline">mail@viorelghiurca.de</a>
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

              <LegalSection title="5. Speicherung und Weitergabe">
                <p>
                  Ihre Daten werden in Firebase (Google LLC) gespeichert. Firebase ist nach EU-DSGVO zertifiziert
                  und verarbeitet Daten in EU-Rechenzentren. Eine Weitergabe an Dritte erfolgt nicht,
                  es sei denn, dies ist zur Vertragserfüllung erforderlich oder Sie haben ausdrücklich eingewilligt.
                  Ihre Daten werden nach Abschluss des Anliegens und Ablauf gesetzlicher Aufbewahrungsfristen gelöscht.
                </p>
              </LegalSection>

              <LegalSection title="6. Cookies">
                <p>
                  Wir verwenden Cookies. Notwendige Cookies sind für den Betrieb der Website erforderlich
                  und werden ohne Einwilligung gesetzt. Analytische Cookies (Firebase Analytics) werden
                  nur nach Ihrer ausdrücklichen Einwilligung geladen. Weitere Details finden Sie in unserer{' '}
                  <Link to="/cookie-richtlinie" className="text-primary-600 hover:underline">Cookie-Richtlinie</Link>.
                </p>
              </LegalSection>

              <LegalSection title="7. Ihre Rechte">
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

              <LegalSection title="8. Beschwerderecht">
                <p>
                  Sie haben das Recht, sich bei einer Datenschutz-Aufsichtsbehörde zu beschweren.
                  Die zuständige Aufsichtsbehörde richtet sich nach Ihrem Bundesland.
                </p>
              </LegalSection>

              <LegalSection title="9. Änderungen dieser Datenschutzerklärung">
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
