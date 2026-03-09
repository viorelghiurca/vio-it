import { Link } from 'react-router-dom'
import { Home, ArrowLeft } from 'lucide-react'
import SEOHead from '../components/ui/SEOHead'

export default function NotFoundPage() {
  return (
    <>
      <SEOHead title="Seite nicht gefunden" noIndex />
      <div className="min-h-[60vh] bg-gradient-to-br from-neutral-950 via-primary-950 to-neutral-900 flex items-center justify-center px-4 pt-32 pb-20">
        <div className="text-center">
          <p className="text-8xl font-black text-white/10 mb-4 select-none">404</p>
          <h1 className="text-3xl font-bold text-white mb-3">Seite nicht gefunden</h1>
          <p className="text-primary-200 mb-8 max-w-sm mx-auto">
            Die gesuchte Seite existiert leider nicht oder wurde verschoben.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-primary-700 bg-white rounded-xl hover:bg-primary-50 transition-colors"
            >
              <Home className="w-4 h-4" />
              Zur Startseite
            </Link>
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white border border-white/20 rounded-xl hover:bg-white/10 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Zurück
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
