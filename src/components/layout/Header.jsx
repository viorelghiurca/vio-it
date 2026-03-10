import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Menu, X, ChevronRight, Home, User, Layers, Mail } from 'lucide-react'

const navLinks = [
  { to: '/',            label: 'Start',       icon: <Home className="w-4 h-4" /> },
  { to: '/ueber-mich',  label: 'Über mich',   icon: <User className="w-4 h-4" /> },
  { to: '/leistungen',  label: 'Leistungen',  icon: <Layers className="w-4 h-4" /> },
  { to: '/kontakt',     label: 'Kontakt',     icon: <Mail className="w-4 h-4" /> },
]

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [location])

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-neutral-950/80 backdrop-blur-xl shadow-lg shadow-black/20 border-b border-white/5'
          : 'bg-transparent'
      }`}
    >
      <div className="section-container">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="relative">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-600 to-primary-400 flex items-center justify-center shadow-md group-hover:shadow-primary-400/30 group-hover:scale-105 transition-all duration-300">
                <span className="text-white font-black text-sm tracking-tight">VIO</span>
              </div>
              <div className="absolute -inset-1 rounded-xl bg-primary-400/20 blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
            </div>
            <span className="text-xl font-bold text-white">
              VIO<span className="text-primary-300">-IT</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1 bg-white/[0.06] backdrop-blur-sm rounded-2xl p-1.5">
            {navLinks.map(link => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  `relative px-4 py-2 text-sm font-medium rounded-xl transition-all duration-200 ${
                    isActive
                      ? 'text-white bg-white/20 shadow-sm shadow-white/5'
                      : 'text-white/70 hover:text-white hover:bg-white/10'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* CTA Desktop */}
          <div className="hidden lg:flex items-center">
            <Link
              to="/kontakt"
              className="group inline-flex items-center gap-2 text-sm font-semibold rounded-xl transition-all duration-300 px-6 py-2.5 text-white border border-white/25 bg-white/10 backdrop-blur-sm hover:bg-white/20 hover:border-white/40"
            >
              Erstgespräch
              <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={`lg:hidden relative w-10 h-10 flex items-center justify-center rounded-xl transition-all duration-300 text-white hover:bg-white/10 ${menuOpen ? 'bg-white/15' : ''}`}
            aria-label="Menü öffnen"
          >
            <span className={`transition-all duration-300 ${menuOpen ? 'rotate-90 scale-110' : ''}`}>
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden fixed inset-x-0 top-16 bottom-0 transition-all duration-300 ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-neutral-950/50 backdrop-blur-sm transition-opacity duration-300 ${menuOpen ? 'opacity-100' : 'opacity-0'}`}
          onClick={() => setMenuOpen(false)}
        />

        {/* Panel */}
        <div className={`relative mx-4 mt-2 bg-white rounded-2xl shadow-2xl border border-neutral-100 overflow-hidden transition-all duration-300 ${menuOpen ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'}`}>
          <div className="p-4 space-y-1">
            {navLinks.map(link => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3.5 text-sm font-medium rounded-xl transition-all duration-200 ${
                    isActive
                      ? 'text-primary-700 bg-primary-50'
                      : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50'
                  }`
                }
              >
                <span className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                  location.pathname === link.to
                    ? 'bg-primary-100 text-primary-600'
                    : 'bg-neutral-100 text-neutral-400'
                }`}>
                  {link.icon}
                </span>
                {link.label}
              </NavLink>
            ))}
          </div>
          <div className="p-4 pt-2 border-t border-neutral-100">
            <Link to="/kontakt" className="btn-primary w-full justify-center">
              Kostenloses Erstgespräch
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
