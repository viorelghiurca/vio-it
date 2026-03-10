import { Link, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import {
  Bot, Globe, Server, Headphones, TrendingUp,
  CheckCircle2, ArrowRight, Zap, Timer, BarChart3,
  Smartphone, Search, ShoppingCart, Wifi, Monitor,
  Users, Cpu, FileText, BarChart2, Settings
} from 'lucide-react'
import AnimatedSection from '../components/ui/AnimatedSection'
import SEOHead from '../components/ui/SEOHead'
import BgImage from '../components/ui/BgImage'

// ── Service Detail Block ──────────────────────────────────────────────────────
function ServiceBlock({ id, icon, gradient, title, tagline, problem, solution, benefits, cta, image, imageAlt }) {
  return (
    <div id={id} className="scroll-mt-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* Content */}
        <AnimatedSection direction="left">
          <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${gradient} text-white shadow-lg mb-6`}>
            {icon}
          </div>
          <span className="badge badge-primary mb-3">{tagline}</span>
          <h2 className="text-3xl font-bold text-neutral-900 mb-4 tracking-tight">{title}</h2>

          <div className="space-y-5 mb-8">
            <div>
              <h3 className="text-sm font-semibold text-neutral-500 uppercase tracking-wide mb-2">
                Das Problem
              </h3>
              <p className="text-neutral-600 leading-relaxed text-sm">{problem}</p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-neutral-500 uppercase tracking-wide mb-2">
                Die Lösung
              </h3>
              <p className="text-neutral-600 leading-relaxed text-sm">{solution}</p>
            </div>
          </div>

          <Link to="/kontakt" className="btn-primary">
            {cta || 'Beratung anfragen'}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </AnimatedSection>

        {/* Image + Benefits */}
        <AnimatedSection direction="right">
          {image && (
            <div className="relative rounded-2xl overflow-hidden mb-6 shadow-lg">
              <img
                src={image}
                alt={imageAlt || title}
                className="w-full h-52 object-cover"
                loading="lazy"
              />
              <div className={`absolute inset-0 bg-gradient-to-t from-neutral-900/20 to-transparent`} />
            </div>
          )}
          <div className="bg-neutral-50 rounded-3xl p-8">
            <h3 className="text-sm font-semibold text-neutral-500 uppercase tracking-wide mb-5">
              Das bringt es Ihnen
            </h3>
            <ul className="space-y-4">
              {benefits.map((b, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-accent-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-neutral-800">{b.title}</p>
                    {b.desc && <p className="text-xs text-neutral-500 mt-0.5">{b.desc}</p>}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </AnimatedSection>
      </div>
    </div>
  )
}

const serviceData = [
  {
    id: 'ki-automatisierung',
    icon: <Bot className="w-8 h-8" />,
    gradient: 'from-violet-500 to-primary-600',
    title: 'KI-Automatisierung',
    tagline: 'Effizienz steigern',
    image: '/images/ki-automatisierung.jpg',
    imageAlt: 'Künstliche Intelligenz und Automatisierung – Roboter-Technologie',
    problem: 'Viele Unternehmen verbringen täglich Stunden mit wiederholenden Aufgaben: E-Mails sortieren, Daten erfassen, Berichte erstellen, Kundenkommunikation managen. Das kostet Zeit, Geld und Nerven — und lässt sich größtenteils automatisieren.',
    solution: 'Mit maßgeschneiderten KI-gestützten Workflows automatisiere ich Ihre Geschäftsprozesse. Von einfachen Automatisierungen bis hin zu komplexen KI-Lösungen — so dass Ihr Team sich auf wertschöpfende Aufgaben konzentrieren kann.',
    benefits: [
      { title: 'Bis zu 40% Zeitersparnis bei Routineaufgaben', desc: 'Mehr Zeit für das Wesentliche' },
      { title: 'Fehlerreduktion durch automatisierte Prozesse', desc: 'Konsistente, zuverlässige Ergebnisse' },
      { title: 'Skalierbare Lösungen die mitwachsen', desc: 'Kein Mehraufwand bei mehr Aufträgen' },
      { title: 'Individuelle Anpassung an Ihr Unternehmen', desc: 'Keine Standardlösung – alles maßgeschneidert' },
      { title: 'Integration in bestehende Tools und Systeme', desc: 'Nahtlose Verbindung mit Ihrer Software' },
    ],
  },
  {
    id: 'website-erstellung',
    icon: <Globe className="w-8 h-8" />,
    gradient: 'from-primary-500 to-cyan-600',
    title: 'Website-Erstellung',
    tagline: 'Online präsent sein',
    image: '/images/webentwicklung.jpg',
    imageAlt: 'Professionelle Webentwicklung – Code auf dem Bildschirm',
    problem: 'Eine veraltete oder nicht vorhandene Website kostet täglich potenzielle Kunden. In der digitalen Welt ist Ihre Website oft der erste Eindruck — und der entscheidet, ob jemand Kunde wird oder zur Konkurrenz geht.',
    solution: 'Ich erstelle moderne, schnelle und conversion-optimierte Unternehmenswebsites, die auf Google gefunden werden und Besucher in Kunden verwandeln. Von der Konzeption über das Design bis zur Veröffentlichung — alles aus einer Hand.',
    benefits: [
      { title: 'Professionelles Design mit eigenem Branding', desc: 'Wiedererkennbar und vertrauenswürdig' },
      { title: 'Vollständig responsive für alle Geräte', desc: 'Smartphone, Tablet und Desktop' },
      { title: 'SEO-Grundoptimierung von Anfang an', desc: 'Besser bei Google gefunden werden' },
      { title: 'Schnelle Ladezeiten (Core Web Vitals)', desc: 'Bessere Rankings und User Experience' },
      { title: 'Conversion-optimierte CTAs und Struktur', desc: 'Mehr Anfragen durch clevere Nutzerführung' },
    ],
  },
  {
    id: 'hardware-software',
    icon: <Server className="w-8 h-8" />,
    gradient: 'from-emerald-500 to-teal-600',
    title: 'Hardware & Software Betreuung',
    tagline: 'IT-Infrastruktur',
    image: '/images/server-raum.jpg',
    imageAlt: 'Server-Racks im modernen Rechenzentrum',
    problem: 'IT-Probleme kosten Unternehmen Zeit und Geld. Wenn Rechner langsam laufen, Software nicht richtig konfiguriert ist oder Geräte ausfallen, leidet die Produktivität — und meist gibt es niemanden, der schnell und kompetent hilft.',
    solution: 'Ich übernehme die vollständige Betreuung Ihrer Hard- und Software: Einrichtung neuer Arbeitsplätze, Wartung bestehender Systeme, Software-Updates und -konfiguration sowie Beratung bei IT-Anschaffungen.',
    benefits: [
      { title: 'Professionelle Einrichtung neuer Arbeitsplätze', desc: 'Alles startklar vom ersten Tag an' },
      { title: 'Regelmäßige Wartung und Updates', desc: 'Stabiler und sicherer IT-Betrieb' },
      { title: 'Beratung bei Hard- und Softwarekauf', desc: 'Das Richtige zum fairen Preis' },
      { title: 'Datensicherung und Backup-Konzepte', desc: 'Ihre Daten sind sicher' },
      { title: 'Lizenzverwaltung und Softwarepflege', desc: 'Immer compliant und aktuell' },
    ],
  },
  {
    id: 'it-support',
    icon: <Headphones className="w-8 h-8" />,
    gradient: 'from-orange-500 to-amber-600',
    title: 'IT-Support & Systemadministration',
    tagline: 'Zuverlässige Betreuung',
    image: '/images/it-support.jpg',
    imageAlt: 'Professioneller IT-Support mit Headset',
    problem: 'IT-Probleme passieren immer zum ungünstigsten Zeitpunkt. Ohne kompetenten Ansprechpartner verlieren Mitarbeiter produktive Stunden bei der Fehlersuche — oder warten tagelang auf Hilfe.',
    solution: 'Als externer IT-Administrator stehe ich Ihnen schnell zur Seite: remote oder vor Ort. Von Windows- und Linux-Systemen über Netzwerke bis hin zur Benutzerverwaltung — ich halte Ihre IT am Laufen.',
    benefits: [
      { title: 'Schnelle Reaktion bei IT-Problemen', desc: 'Remote-Support in kurzer Zeit' },
      { title: 'Windows und Linux Administration', desc: 'Expertise auf beiden Plattformen' },
      { title: 'Netzwerkkonfiguration und -wartung', desc: 'Stabile und sichere Netzwerke' },
      { title: 'Benutzerverwaltung und Rechtevergabe', desc: 'Sicher und geordnet' },
      { title: 'Proaktive Überwachung statt Feuerwehr', desc: 'Probleme erkennen bevor sie entstehen' },
    ],
  },
  {
    id: 'digitalisierung',
    icon: <TrendingUp className="w-8 h-8" />,
    gradient: 'from-pink-500 to-rose-600',
    title: 'Digitalisierung & Prozessoptimierung',
    tagline: 'Modernisierung',
    image: '/images/digitalisierung.jpg',
    imageAlt: 'Prozessplanung und Strategieentwicklung am Whiteboard',
    problem: 'Viele Unternehmen arbeiten noch mit veralteten, manuellen Prozessen. Excel-Tabellen, Papierdokumente, fehlende Automatisierung — das kostet täglich Zeit und verhindert weiteres Wachstum.',
    solution: 'Ich analysiere Ihre bestehenden Abläufe, identifiziere Optimierungspotenziale und entwickle digitale Lösungen, die wirklich helfen. Dabei setze ich auf moderne Tools, die Ihr Team schnell annehmen kann.',
    benefits: [
      { title: 'Systematische Prozessanalyse', desc: 'Klares Bild über Stärken und Schwächen' },
      { title: 'Individuelle digitale Lösungskonzepte', desc: 'Passend zu Ihrem Unternehmen' },
      { title: 'Integration moderner Software und Tools', desc: 'Das Beste aus der aktuellen Tech-Welt' },
      { title: 'Mitarbeiterschulung und Onboarding', desc: 'Akzeptanz von Anfang an' },
      { title: 'Messbare Ergebnisse und ROI', desc: 'Sie sehen, was die Digitalisierung bringt' },
    ],
  },
]

export default function LeistungenPage() {
  const location = useLocation()

  useEffect(() => {
    if (location.hash) {
      const el = document.getElementById(location.hash.slice(1))
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }, 100)
      }
    }
  }, [location])

  return (
    <>
      <SEOHead
        title="Leistungen – KI-Automatisierung, Website-Erstellung, IT-Support"
        description="VIO-IT Leistungen: KI-Automatisierung, professionelle Websites, Hardware & Software Betreuung, IT-Support und Digitalisierung für KMU in Deutschland."
        canonical="/leistungen"
      />

      {/* Header */}
      <div className="relative bg-gradient-to-br from-neutral-950 via-primary-950 to-neutral-900 pt-32 pb-20 overflow-hidden">
        <BgImage src="/images/webentwicklung.jpg" />
        <div className="section-container text-center relative z-10">
          <AnimatedSection>
            <span className="badge bg-white/10 text-primary-200 mb-4">Leistungen</span>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 tracking-tight">
              Alles, was Ihr Unternehmen braucht
            </h1>
            <p className="text-primary-200 text-lg max-w-xl mx-auto">
              Von der Website bis zur vollständigen Digitalisierung — maßgeschneiderte IT-Lösungen aus einer Hand.
            </p>
          </AnimatedSection>

          {/* Quick nav */}
          <AnimatedSection delay={200} className="mt-8 flex flex-wrap justify-center gap-3">
            {serviceData.map(s => (
              <a
                key={s.id}
                href={`#${s.id}`}
                onClick={e => {
                  e.preventDefault()
                  document.getElementById(s.id)?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="px-4 py-2 text-sm font-medium text-primary-200 bg-white/10 border border-white/20 rounded-full hover:bg-white/20 transition-colors"
              >
                {s.title}
              </a>
            ))}
          </AnimatedSection>
        </div>
      </div>

      {/* Services */}
      <section className="section-padding bg-white">
        <div className="section-container space-y-28">
          {serviceData.map((service, i) => (
            <div key={service.id}>
              <ServiceBlock {...service} />
              {i < serviceData.length - 1 && <div className="divider mt-28" />}
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-neutral-50">
        <div className="section-container">
          <AnimatedSection>
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary-600 to-primary-900 p-10 lg:p-16 text-center">
              <BgImage src="/images/hero-workspace.jpg" opacity="opacity-[0.10]" />
              <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              <div className="relative z-10">
                <h2 className="text-3xl font-bold text-white mb-4">
                  Welche Leistung interessiert Sie?
                </h2>
                <p className="text-primary-200 mb-8 max-w-xl mx-auto">
                  Vereinbaren Sie ein kostenloses Erstgespräch und wir besprechen gemeinsam,
                  welche Lösung am besten zu Ihrem Unternehmen passt.
                </p>
                <Link
                  to="/kontakt"
                  className="inline-flex items-center gap-2 px-8 py-4 text-primary-700 bg-white font-semibold rounded-xl hover:bg-primary-50 transition-colors shadow-lg"
                >
                  Kostenloses Erstgespräch anfragen
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  )
}
