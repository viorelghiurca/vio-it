import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Cookie, ChevronDown, ChevronUp, Shield, BarChart2 } from 'lucide-react'
import { useCookieConsent } from '../../context/CookieContext'

export default function CookieBanner() {
  const { consent, acceptAll, acceptNecessary } = useCookieConsent()
  const [expanded, setExpanded] = useState(false)

  if (consent !== null) return null

  const handleDecline = () => {
    acceptNecessary()
  }

  return (
    <div className="fixed bottom-0 inset-x-0 z-50 p-3 sm:p-6">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-2xl border border-neutral-200 overflow-hidden">
        <div className="p-5 sm:p-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3 sm:gap-4 text-center sm:text-left">
            <div className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center shrink-0">
              <Cookie className="w-5 h-5 text-primary-600" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-base font-semibold text-neutral-900 mb-1">
                Datenschutz & Cookies
              </h3>
              <p className="text-sm text-neutral-500 leading-relaxed">
                Wir verwenden Cookies, um die Funktionalität unserer Website zu gewährleisten und mit Ihrer Zustimmung
                die Nutzung zu analysieren, um Ihr Nutzererlebnis zu verbessern.
              </p>

              <button
                onClick={() => setExpanded(!expanded)}
                className="inline-flex items-center gap-1.5 mt-2 text-xs font-medium text-primary-600 hover:text-primary-700 transition-colors"
              >
                {expanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                {expanded ? 'Weniger anzeigen' : 'Details anzeigen'}
              </button>

              {expanded && (
                <div className="mt-4 space-y-3 text-left">
                  <div className="flex items-start gap-3 p-3 bg-neutral-50 rounded-xl">
                    <div className="mt-0.5">
                      <Shield className="w-4 h-4 text-accent-500" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-neutral-800">Notwendige Cookies</span>
                        <span className="text-xs text-accent-600 font-medium">Immer aktiv</span>
                      </div>
                      <p className="text-xs text-neutral-500 mt-0.5">
                        Für die Grundfunktionen der Website erforderlich (Cookie-Einwilligung, Spam-Schutz).
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-neutral-50 rounded-xl">
                    <div className="mt-0.5">
                      <BarChart2 className="w-4 h-4 text-neutral-400" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-neutral-800">Analyse-Cookies</span>
                        <span className="text-xs text-neutral-500 font-medium">Optional</span>
                      </div>
                      <p className="text-xs text-neutral-500 mt-0.5">
                        Helfen uns zu verstehen, wie Besucher die Website nutzen, um sie zu verbessern (z.B. Google Analytics).
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-5 flex flex-col sm:flex-row items-center gap-3">
                <button
                  onClick={acceptAll}
                  className="btn-primary w-full sm:w-auto justify-center"
                >
                  Annehmen
                </button>

                <button onClick={handleDecline} className="btn-secondary w-full sm:w-auto justify-center">
                  Nur notwendige Cookies akzeptieren
                </button>
              </div>

              <p className="text-xs text-neutral-400 mt-3">
                Weitere Informationen in unserer{' '}
                <Link to="/datenschutz" className="text-primary-600 hover:underline">
                  Datenschutzerklärung
                </Link>{' '}
                und{' '}
                <Link to="/cookie-richtlinie" className="text-primary-600 hover:underline">
                  Cookie-Richtlinie
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
