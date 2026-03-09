import SEOHead from '../../components/ui/SEOHead'
import AnimatedSection from '../../components/ui/AnimatedSection'

export default function ImpressumPage() {
  return (
    <>
      <SEOHead
        title="Impressum"
        description="Impressum von VIO-IT – Viorel Ghiurca, Fachinformatiker & IT-Dienstleister."
        canonical="/impressum"
        noIndex
      />

      <div className="bg-neutral-950 pt-32 pb-16">
        <div className="section-container">
          <AnimatedSection>
            <h1 className="text-4xl font-bold text-white mb-2">Impressum</h1>
            <p className="text-neutral-400">Gesetzlich erforderliche Angaben gemäß § 5 TMG</p>
          </AnimatedSection>
        </div>
      </div>

      <section className="section-padding bg-white">
        <div className="section-container max-w-3xl">
          <AnimatedSection>
            <div className="prose prose-neutral max-w-none space-y-10">

              <LegalSection title="Angaben gemäß § 5 TMG">
                <p className="text-neutral-600 text-sm leading-relaxed">
                  <strong>VIO-IT</strong><br />
                  Viorel Ghiurca<br />
                  86720 Nördlingen<br />
                  Deutschland
                </p>
              </LegalSection>

              <LegalSection title="Kontakt">
                <p className="text-neutral-600 text-sm leading-relaxed">
                  E-Mail: <a href="mailto:mail@viorelghiurca.de" className="text-primary-600 hover:underline">mail@viorelghiurca.de</a><br />
                  Website: <a href="https://it.ghiurcaviorel.de" className="text-primary-600 hover:underline">it.ghiurcaviorel.de</a>
                </p>
              </LegalSection>

              <LegalSection title="Berufsbezeichnung und berufsrechtliche Regelungen">
                <p className="text-neutral-600 text-sm leading-relaxed">
                  Berufsbezeichnung: Fachinformatiker
                </p>
              </LegalSection>

              <LegalSection title="Verbraucherstreitbeilegung / Universalschlichtungsstelle">
                <p className="text-neutral-600 text-sm leading-relaxed">
                  Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer
                  Verbraucherschlichtungsstelle teilzunehmen.
                </p>
              </LegalSection>

              <LegalSection title="Haftungsausschluss">
                <p className="text-neutral-600 text-sm leading-relaxed">
                  <strong>Haftung für Inhalte:</strong> Als Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG für
                  eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis
                  10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte
                  fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige
                  Tätigkeit hinweisen.
                </p>
              </LegalSection>

            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  )
}

function LegalSection({ title, children }) {
  return (
    <div>
      <h2 className="text-lg font-semibold text-neutral-900 mb-3 pb-2 border-b border-neutral-100">
        {title}
      </h2>
      {children}
    </div>
  )
}
