import { Link } from 'react-router-dom'
import { Mail, Phone, MapPin, Linkedin, Github, ExternalLink } from 'lucide-react'

const services = [
  { label: 'KI-Automatisierung',        to: '/leistungen#ki-automatisierung' },
  { label: 'Website-Erstellung',         to: '/leistungen#website-erstellung' },
  { label: 'Hardware & Software',        to: '/leistungen#hardware-software' },
  { label: 'IT-Support',                 to: '/leistungen#it-support' },
  { label: 'Digitalisierung',            to: '/leistungen#digitalisierung' },
]

const legal = [
  { label: 'Impressum',          to: '/impressum' },
  { label: 'Datenschutz',        to: '/datenschutz' },
  { label: 'Cookie-Richtlinie',  to: '/cookie-richtlinie' },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-neutral-950 text-neutral-400">
      <div className="section-container py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2.5 mb-5 group w-fit">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-600 to-primary-400 flex items-center justify-center">
                <span className="text-white font-black text-sm tracking-tight">VIO</span>
              </div>
              <span className="text-xl font-bold text-white">
                VIO<span className="text-primary-400">-IT</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed max-w-sm mb-6">
              Digitale Lösungen für moderne Unternehmen – KI-Automatisierung, professionelle Websites
              und zuverlässiger IT-Support aus einer Hand.
            </p>
            <div className="space-y-2.5">
              <a href="mailto:mail@viorelghiurca.de" className="flex items-center gap-2.5 text-sm hover:text-white transition-colors group">
                <Mail className="w-4 h-4 text-primary-400 shrink-0" />
                <span>mail@viorelghiurca.de</span>
              </a>
              <div className="flex items-center gap-2.5 text-sm">
                <MapPin className="w-4 h-4 text-primary-400 shrink-0" />
                <span>Deutschland – deutschlandweiter Service</span>
              </div>
            </div>
          </div>

          {/* Leistungen */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-5">
              Leistungen
            </h4>
            <ul className="space-y-3">
              {services.map(s => (
                <li key={s.to}>
                  <Link
                    to={s.to}
                    className="text-sm hover:text-white hover:translate-x-0.5 transition-all duration-150 inline-block"
                  >
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Rechtliches */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-5">
              Rechtliches
            </h4>
            <ul className="space-y-3">
              {legal.map(l => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="text-sm hover:text-white transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
                Termin buchen
              </h4>
              <Link
                to="/termin"
                className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-primary-600 rounded-lg hover:bg-primary-500 transition-colors"
              >
                Erstgespräch vereinbaren
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-neutral-500">
            © {year} VIO-IT · Viorel Ghiurca · Fachinformatiker & IT-Experte
          </p>
          <p className="text-xs text-neutral-600">
            Professionelle IT-Lösungen · Made in Germany
          </p>
        </div>
      </div>
    </footer>
  )
}
