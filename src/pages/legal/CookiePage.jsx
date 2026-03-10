import { Link } from 'react-router-dom'
import { useCookieConsent } from '../../context/CookieContext'
import SEOHead from '../../components/ui/SEOHead'
import AnimatedSection from '../../components/ui/AnimatedSection'
import { Shield, CheckCircle2, XCircle, BarChart2 } from 'lucide-react'

function LegalSection({ title, children }) {
  return (
    <div>
      <h2 className="text-lg font-semibold text-neutral-900 mb-3 pb-2 border-b border-neutral-100">{title}</h2>
      {children}
    </div>
  )
}

export default function CookiePage() {
  const { consent, resetConsent } = useCookieConsent()
  const hasConsented = consent !== null

  return (
    <>
      <SEOHead
        title="Cookie-Richtlinie"
        description="Cookie-Richtlinie von VIO-IT – Informationen zur Verwendung von Cookies auf it.ghiurcaviorel.de"
        canonical="/cookie-richtlinie"
        noIndex
      />

      <div className="bg-neutral-950 pt-32 pb-16">
        <div className="section-container">
          <AnimatedSection>
            <h1 className="text-4xl font-bold text-white mb-2">Cookie-Richtlinie</h1>
            <p className="text-neutral-400">Stand: März 2026</p>
          </AnimatedSection>
        </div>
      </div>

      <section className="section-padding bg-white">
        <div className="section-container max-w-3xl">
          <AnimatedSection>
            <div className="space-y-10 text-sm text-neutral-600 leading-relaxed">

              <div className="p-5 bg-neutral-50 rounded-2xl border border-neutral-100">
                <p className="text-sm font-semibold text-neutral-900 mb-4">Ihr aktueller Cookie-Status</p>
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-4 py-2">
                    <div className="flex items-center gap-2.5 text-sm text-neutral-700">
                      <span className="text-neutral-400"><Shield className="w-4 h-4" /></span>
                      Notwendige Cookies
                    </div>
                    <div className="flex items-center gap-1.5 text-xs font-medium text-accent-600">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Immer aktiv
                    </div>
                  </div>
                  <div className="flex items-center justify-between gap-4 py-2 border-t border-neutral-200">
                    <div className="flex items-center gap-2.5 text-sm text-neutral-700">
                      <span className="text-neutral-400"><BarChart2 className="w-4 h-4" /></span>
                      Analyse-Cookies
                    </div>
                    {hasConsented && consent.analytics ? (
                      <div className="flex items-center gap-1.5 text-xs font-medium text-accent-600">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Aktiv
                      </div>
                    ) : (
                      <div className="flex items-center gap-1.5 text-xs font-medium text-neutral-500">
                        <XCircle className="w-3.5 h-3.5" />
                        Inaktiv
                      </div>
                    )}
                  </div>
                  {hasConsented && (
                    <div className="flex gap-3 pt-3 border-t border-neutral-200">
                      <button onClick={resetConsent} className="text-xs text-neutral-500 hover:text-red-500 transition-colors">
                        Einwilligung ändern
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <LegalSection title="Was sind Cookies?">
                <p>
                  Cookies sind kleine Textdateien, die von Websites auf Ihrem Gerät gespeichert werden.
                  Sie ermöglichen es, Ihren Browser beim nächsten Besuch wiederzuerkennen und bestimmte
                  Einstellungen zu speichern.
                </p>
              </LegalSection>

              <LegalSection title="Welche Cookies verwenden wir?">
                <p className="mb-4">
                  Diese Website verwendet technisch notwendige und optionale Analyse-Cookies. Es werden keine
                  Marketing-Cookies eingesetzt.
                </p>
                {/* Notwendige Cookies */}
                <div className="border border-neutral-200 rounded-xl overflow-hidden mb-4">
                  <div className="flex items-center justify-between gap-3 px-4 py-3 bg-neutral-50 border-b border-neutral-200">
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-accent-600" />
                      <span className="text-sm font-semibold text-neutral-800">Notwendige Cookies</span>
                    </div>
                    <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-accent-100 text-accent-700">
                      Immer aktiv
                    </span>
                  </div>
                  <div className="p-4">
                    <p className="text-xs text-neutral-500 mb-4">
                      Diese Cookies sind für den Betrieb der Website unbedingt erforderlich.
                    </p>
                    <div className="overflow-x-auto">
                      <table className="w-full text-xs">
                        <thead>
                          <tr className="text-left text-neutral-400 border-b border-neutral-100">
                            <th className="pb-2 pr-4 font-medium">Name</th>
                            <th className="pb-2 pr-4 font-medium">Zweck</th>
                            <th className="pb-2 font-medium">Dauer</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b border-neutral-50">
                            <td className="py-2 pr-4 font-mono text-neutral-600">vio-it-cookie-consent</td>
                            <td className="py-2 pr-4 text-neutral-500">Speichert Ihre Cookie-Einwilligung (localStorage)</td>
                            <td className="py-2 text-neutral-500">1 Jahr</td>
                          </tr>
                          <tr>
                            <td className="py-2 pr-4 font-mono text-neutral-600">_lastSubmit_kontakt</td>
                            <td className="py-2 pr-4 text-neutral-500">Spam-Schutz: verhindert mehrfaches Absenden (localStorage)</td>
                            <td className="py-2 text-neutral-500">60 Sekunden</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                {/* Analyse Cookies */}
                <div className="border border-neutral-200 rounded-xl overflow-hidden">
                  <div className="flex items-center justify-between gap-3 px-4 py-3 bg-neutral-50 border-b border-neutral-200">
                    <div className="flex items-center gap-2">
                      <BarChart2 className="w-4 h-4 text-neutral-500" />
                      <span className="text-sm font-semibold text-neutral-800">Analyse-Cookies</span>
                    </div>
                    <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-700">
                      Optional
                    </span>
                  </div>
                  <div className="p-4">
                    <p className="text-xs text-neutral-500 mb-4">
                      Diese Cookies helfen uns, die Nutzung der Website zu verstehen und zu verbessern. Sie werden nur nach Ihrer expliziten Einwilligung gesetzt.
                    </p>
                    <div className="overflow-x-auto">
                      <table className="w-full text-xs">
                        <thead>
                          <tr className="text-left text-neutral-400 border-b border-neutral-100">
                            <th className="pb-2 pr-4 font-medium">Dienst</th>
                            <th className="pb-2 pr-4 font-medium">Zweck</th>
                            <th className="pb-2 pr-4 font-medium">Cookies</th>
                            <th className="pb-2 font-medium">Anbieter</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="py-2 pr-4 text-neutral-600">Firebase Analytics</td>
                            <td className="py-2 pr-4 text-neutral-500">Erfasst anonymisierte Statistiken zur Seitennutzung</td>
                            <td className="py-2 pr-4 text-neutral-500 font-mono text-xs">_ga, _ga_&lt;id&gt;</td>
                            <td className="py-2 text-neutral-500">Google Ireland Limited</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </LegalSection>

              <LegalSection title="Ihre Rechte">
                <p>
                  Sie können Ihre Cookie-Einwilligung jederzeit widerrufen oder anpassen — entweder über
                  den Cookie-Status oben auf dieser Seite oder in den Einstellungen Ihres Browsers.
                  Weitere Informationen finden Sie in unserer{' '}
                  <Link to="/datenschutz" className="text-primary-600 hover:underline">Datenschutzerklärung</Link>.
                </p>
              </LegalSection>

            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  )
}
