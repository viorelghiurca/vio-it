import { Link } from 'react-router-dom'
import {
  ChevronRight, Bot, Globe, Server, Headphones, TrendingUp,
  CheckCircle2, ArrowRight, Shield, Zap, Clock, Star,
  Users, Award, MessageCircle, ChevronDown
} from 'lucide-react'
import { motion } from 'framer-motion'
import AnimatedSection from '../components/ui/AnimatedSection'
import SEOHead from '../components/ui/SEOHead'
import BgImage from '../components/ui/BgImage'

// ── Hero ──────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-neutral-950 via-primary-950 to-neutral-900 pt-20">
      {/* Background image */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <BgImage src="/images/hero-workspace.jpg" />
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary-600/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-primary-400/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary-500/5 rounded-full blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '64px 64px',
          }}
        />
      </div>

      <div className="section-container relative z-10 py-20 lg:py-32">
        <div className="max-w-4xl mx-auto text-center">
          {/* Headline */}
          <motion.h1
            className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight text-balance"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
          >
            Digitale Lösungen{' '}
            <span className="bg-gradient-to-r from-primary-300 via-primary-200 to-primary-300 bg-clip-text text-transparent">
              die Ihr Unternehmen
            </span>{' '}
            voranbringen
          </motion.h1>

          {/* Subline */}
          <motion.p
            className="text-xl text-neutral-300 max-w-2xl mx-auto mb-10 leading-relaxed"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.28 }}
          >
            Von KI-Automatisierung über professionelle Websites bis hin zu zuverlässigem IT-Support —
            ich bin Ihr persönlicher IT-Partner für nachhaltiges Wachstum.
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.44 }}
          >
            <Link to="/kontakt" className="btn-primary btn-lg text-base">
              Kostenloses Erstgespräch
              <ChevronRight className="w-5 h-5" />
            </Link>
            <Link
              to="/leistungen"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold text-white border border-white/20 bg-white/10 backdrop-blur-sm rounded-xl hover:bg-white/20 transition-all duration-200"
            >
              Leistungen entdecken
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>

          {/* Trust signals */}
          <motion.div
            className="flex flex-wrap justify-center gap-8 mt-16 text-sm text-neutral-400"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.58 }}
          >
            <TrustPill icon={<CheckCircle2 className="w-4 h-4 text-accent-400" />} text="Ausgebildet & zertifiziert" />
            <TrustPill icon={<Shield className="w-4 h-4 text-accent-400" />} text="DSGVO-konform" />
            <TrustPill icon={<Zap className="w-4 h-4 text-accent-400" />} text="Schnelle Reaktionszeit" />
            <TrustPill icon={<Star className="w-4 h-4 text-accent-400" />} text="100% Kundenfokus" />
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center pointer-events-none">
        <div className="flex flex-col items-center gap-2 text-neutral-500 animate-bounce">
          <span className="text-xs font-medium">Mehr erfahren</span>
          <ChevronDown className="w-4 h-4" />
        </div>
      </div>
    </section>
  )
}

function TrustPill({ icon, text }) {
  return (
    <div className="flex items-center gap-2">
      {icon}
      <span>{text}</span>
    </div>
  )
}

// ── Services Overview ─────────────────────────────────────────────────────────
const services = [
  {
    icon: <Bot className="w-6 h-6" />,
    title: 'KI-Automatisierung',
    desc: 'Wiederholende Prozesse automatisieren und Effizienz durch KI-gestützte Workflows steigern.',
    to: '/leistungen#ki-automatisierung',
    color: 'from-violet-500 to-primary-600',
    image: '/images/ki-automatisierung.jpg',
  },
  {
    icon: <Globe className="w-6 h-6" />,
    title: 'Website-Erstellung',
    desc: 'Moderne, performante und conversion-optimierte Unternehmenswebsites mit SEO von Anfang an.',
    to: '/leistungen#website-erstellung',
    color: 'from-primary-500 to-cyan-600',
    image: '/images/webentwicklung.jpg',
  },
  {
    icon: <Server className="w-6 h-6" />,
    title: 'Hardware & Software',
    desc: 'Professionelle Einrichtung, Wartung und Betreuung Ihrer gesamten IT-Infrastruktur.',
    to: '/leistungen#hardware-software',
    color: 'from-emerald-500 to-teal-600',
    image: '/images/server-raum.jpg',
  },
  {
    icon: <Headphones className="w-6 h-6" />,
    title: 'IT-Support & Admin',
    desc: 'Zuverlässiger technischer Support für Windows, Linux, Netzwerke und Benutzerverwaltung.',
    to: '/leistungen#it-support',
    color: 'from-orange-500 to-amber-600',
    image: '/images/it-support.jpg',
  },
  {
    icon: <TrendingUp className="w-6 h-6" />,
    title: 'Digitalisierung',
    desc: 'Bestehende Prozesse analysieren, optimieren und digitale Lösungen entwickeln, die wirklich helfen.',
    to: '/leistungen#digitalisierung',
    color: 'from-pink-500 to-rose-600',
    image: '/images/digitalisierung.jpg',
  },
]

function ServiceThumb({ image, icon, color, title }) {
  const [failed, setFailed] = useState(false)

  if (failed || !image) {
    return (
      <div className={`h-32 bg-gradient-to-br ${color} flex items-center justify-center text-white/80`}>
        <div className="w-10 h-10">{icon}</div>
      </div>
    )
  }

  return (
    <div className="relative h-32 overflow-hidden">
      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        loading="lazy"
        onError={() => setFailed(true)}
      />
      <div className={`absolute inset-0 bg-gradient-to-t from-black/20 to-transparent`} />
    </div>
  )
}

function ServicesOverview() {
  return (
    <section className="section-padding bg-neutral-50">
      <div className="section-container">
        <AnimatedSection className="text-center mb-16">
          <span className="badge badge-primary mb-4">Leistungen</span>
          <h2 className="section-title">Alles aus einer Hand</h2>
          <p className="section-subtitle mx-auto">
            Ob Sie eine neue Website benötigen, Prozesse automatisieren oder Ihre IT zuverlässig
            betreut haben möchten — VIO-IT ist Ihr kompetenter Partner.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {services.map((s, i) => (
            <AnimatedSection key={s.title} delay={i * 80}>
              <Link to={s.to} className="card-hover flex flex-col h-full group overflow-hidden">
                <ServiceThumb image={s.image} icon={s.icon} color={s.color} title={s.title} />
                <div className="p-5 pt-4 flex flex-col flex-1">
                  <h3 className="text-base font-semibold text-neutral-900 mb-2">{s.title}</h3>
                  <p className="text-sm text-neutral-500 leading-relaxed flex-1">{s.desc}</p>
                  <div className="flex items-center gap-1.5 mt-4 text-primary-600 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    Mehr erfahren <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </Link>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection className="text-center mt-10">
          <Link to="/leistungen" className="btn-outline btn-lg">
            Alle Leistungen ansehen
            <ChevronRight className="w-4 h-4" />
          </Link>
        </AnimatedSection>
      </div>
    </section>
  )
}

// ── Why VIO-IT ────────────────────────────────────────────────────────────────
const benefits = [
  {
    icon: <Award className="w-5 h-5" />,
    title: 'Ausgebildet & erfahren',
    desc: 'Abgeschlossene Ausbildung als Fachinformatiker mit breiter Praxiserfahrung — kein Quereinsteiger, sondern echter Profi.',
  },
  {
    icon: <Users className="w-5 h-5" />,
    title: 'Persönlicher Ansprechpartner',
    desc: 'Kein anonymes Call-Center, sondern direkter Kontakt zu Ihrem IT-Experten.',
  },
  {
    icon: <Clock className="w-5 h-5" />,
    title: 'Schnelle Reaktionszeiten',
    desc: 'Bei IT-Problemen zählt jede Minute. Wir reagieren schnell und lösen Probleme effizient.',
  },
  {
    icon: <Shield className="w-5 h-5" />,
    title: 'DSGVO & Datenschutz',
    desc: 'Alle Lösungen werden datenschutzkonform nach deutschen Standards entwickelt und betrieben.',
  },
  {
    icon: <Zap className="w-5 h-5" />,
    title: 'Moderne Technologien',
    desc: 'Stets auf dem neuesten Stand — von KI-Tools bis zu modernen Web-Frameworks.',
  },
  {
    icon: <MessageCircle className="w-5 h-5" />,
    title: 'Klare Kommunikation',
    desc: 'Kein IT-Kauderwelsch. Verständliche Erklärungen, transparente Angebote, ehrliche Beratung.',
  },
]

function WhyVioIT() {
  return (
    <section className="section-padding bg-white">
      <div className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <AnimatedSection direction="left">
            <span className="badge badge-primary mb-4">Warum VIO-IT?</span>
            <h2 className="section-title mb-6">
              Ihr zuverlässiger IT-Partner für nachhaltigen Erfolg
            </h2>
            <p className="text-neutral-500 leading-relaxed mb-8">
              Als ausgebildeter Fachinformatiker mit breiter Expertise in modernen Technologien
              biete ich Ihnen maßgeschneiderte Lösungen, die wirklich funktionieren.
              Keine Standardpakete, sondern individuelle Betreuung, die zu Ihrem Unternehmen passt.
            </p>
            <div className="relative rounded-2xl overflow-hidden mb-8 shadow-lg">
              <img
                src="/images/beratung.jpg"
                alt="Team-Meeting mit Laptops in einem modernen Tech-Büro"
                className="w-full h-56 object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-950/30 to-transparent" />
            </div>
            <Link to="/ueber-mich" className="btn-primary">
              Mehr über VIO-IT
              <ArrowRight className="w-4 h-4" />
            </Link>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {benefits.map((b, i) => (
              <AnimatedSection key={b.title} delay={i * 60}>
                <div className="flex gap-4 p-5 rounded-2xl bg-neutral-50 hover:bg-primary-50 transition-colors group">
                  <div className="w-10 h-10 rounded-xl bg-primary-100 flex items-center justify-center text-primary-600 shrink-0 group-hover:bg-primary-200 transition-colors">
                    {b.icon}
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-neutral-900 mb-1">{b.title}</h3>
                    <p className="text-xs text-neutral-500 leading-relaxed">{b.desc}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ── Process Steps ─────────────────────────────────────────────────────────────
const steps = [
  { step: '01', title: 'Kostenloses Erstgespräch', desc: 'Wir besprechen Ihre Herausforderungen und Ziele – unverbindlich und ohne versteckte Kosten.' },
  { step: '02', title: 'Analyse & Konzept', desc: 'Ich analysiere Ihre aktuelle Situation und entwickle ein maßgeschneidertes Konzept für Sie.' },
  { step: '03', title: 'Umsetzung', desc: 'Professionelle Implementierung mit regelmäßigen Updates und transparenter Kommunikation.' },
  { step: '04', title: 'Support & Weiterentwicklung', desc: 'Langfristige Betreuung, schnelle Hilfe bei Problemen und kontinuierliche Optimierung.' },
]

function HowWeWork() {
  return (
    <section className="relative section-padding bg-gradient-to-br from-primary-950 to-neutral-950 overflow-hidden">
      <BgImage src="/images/beratung.jpg" />
      <div className="section-container relative z-10">
        <AnimatedSection className="text-center mb-16">
          <span className="badge bg-white/10 text-primary-200 mb-4">So läuft es ab</span>
          <h2 className="section-title text-white mb-4">
            Von der Idee zur Lösung — in 4 Schritten
          </h2>
          <p className="text-primary-200 max-w-2xl mx-auto">
            Transparente Zusammenarbeit von Anfang an. Kein Bluff, keine Überraschungen.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {steps.map((s, i) => (
            <AnimatedSection key={s.step} delay={i * 100} className="h-full">
              <div className="relative p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors group h-full flex flex-col">
                <span className="text-4xl font-black text-white/10 mb-4 block group-hover:text-white/20 transition-colors">
                  {s.step}
                </span>
                <h3 className="text-base font-semibold text-white mb-2">{s.title}</h3>
                <p className="text-sm text-primary-200 leading-relaxed">{s.desc}</p>
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 z-10">
                    <ChevronRight className="w-6 h-6 text-primary-400/50" />
                  </div>
                )}
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Projects Placeholder ──────────────────────────────────────────────────────

// ── FAQ ───────────────────────────────────────────────────────────────────────
const faqs = [
  {
    q: 'Für wen ist das hier eigentlich gedacht?',
    a: 'Ich arbeite am liebsten mit kleinen und mittelständischen Unternehmen, Selbstständigen und lokalen Betrieben zusammen — also genau den Menschen, die ihre IT in guten Händen wissen möchten, ohne eine große Agentur zu beauftragen.',
  },
  {
    q: 'Was kostet das Erstgespräch?',
    a: 'Gar nichts. Das erste Gespräch ist vollständig kostenlos und unverbindlich. Ich höre mir Ihre Situation an, gebe ehrliches Feedback — und wenn es nicht passt, sage ich das auch.',
  },
  {
    q: 'Wie schnell melden Sie sich bei einem IT-Problem?',
    a: 'Bei dringenden Problemen bin ich in der Regel innerhalb weniger Stunden erreichbar. Für Kunden mit laufender Betreuung vereinbaren wir konkrete Reaktionszeiten, an die ich mich halte.',
  },
  {
    q: 'Arbeiten Sie auch remote?',
    a: 'Ja, der Großteil meiner Arbeit läuft remote — das spart Zeit und funktioniert sehr gut. Bei Bedarf komme ich aber auch gerne persönlich vorbei. Ich bin deutschlandweit verfügbar.',
  },
  {
    q: 'Sind Ihre Lösungen DSGVO-konform?',
    a: 'Ja, und das ist kein Marketingversprechen. Datenschutz ist für mich Grundvoraussetzung, kein optionales Extra. Alles was ich entwickle und einrichte, wird datenschutzkonform umgesetzt und dokumentiert.',
  },
  {
    q: 'Ich verstehe nicht viel von IT – ist das ein Problem?',
    a: 'Überhaupt nicht — im Gegenteil. Ich erkläre alles auf Augenhöhe, ohne Fachbegriffe die niemand braucht. Mein Ziel ist, dass Sie am Ende verstehen, was ich gemacht habe und warum.',
  },
]

function FAQ() {
  return (
    <section className="relative section-padding bg-neutral-50 overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-100/40 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-primary-50/60 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3 pointer-events-none" />

      <div className="section-container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Left: Sticky info panel */}
          <AnimatedSection direction="left" className="lg:col-span-2">
            <div className="lg:sticky lg:top-28">
              <span className="badge badge-primary mb-4">FAQ</span>
              <h2 className="section-title mb-4">Häufige Fragen</h2>
              <p className="text-neutral-500 leading-relaxed mb-8">
                Die wichtigsten Fragen — ehrlich und direkt beantwortet. Falls Ihre Frage nicht dabei ist, melden Sie sich einfach.
              </p>

              <FaqImage />

              <Link to="/kontakt" className="btn-primary">
                Eigene Frage stellen
                <MessageCircle className="w-4 h-4" />
              </Link>
            </div>
          </AnimatedSection>

          {/* Right: FAQ items */}
          <div className="lg:col-span-3 space-y-3">
            {faqs.map((faq, i) => (
              <AnimatedSection key={i} delay={i * 60}>
                <FAQItem question={faq.q} answer={faq.a} />
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function FaqImage() {
  const [failed, setFailed] = useState(false)

  if (failed) return null

  return (
    <div className="relative rounded-2xl overflow-hidden mb-8 shadow-lg">
      <img
        src="/images/faq.jpg"
        alt="Häufige Fragen — Q&A"
        className="w-full h-48 object-cover"
        loading="lazy"
        onError={() => setFailed(true)}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-primary-950/40 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-5">
        <p className="text-white text-sm font-semibold">Fragen & Antworten</p>
        <p className="text-primary-200 text-xs">Ehrlich und direkt beantwortet</p>
      </div>
    </div>
  )
}

function FAQItem({ question, answer }) {
  const [open, setOpen] = useState(false)

  return (
    <div className={`rounded-2xl border overflow-hidden transition-all duration-300 ${open ? 'bg-white border-primary-200 shadow-md' : 'bg-white border-neutral-100 hover:border-primary-100'}`}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-4 p-5 text-left group"
      >
        <span className={`text-sm font-semibold flex-1 transition-colors ${open ? 'text-primary-700' : 'text-neutral-900'}`}>
          {question}
        </span>
        <ChevronDown
          className={`w-4 h-4 shrink-0 transition-all duration-300 ${open ? 'text-primary-600 rotate-180' : 'text-neutral-300'}`}
        />
      </button>
      <div
        className="overflow-hidden transition-all duration-300 ease-out"
        style={{ maxHeight: open ? '400px' : '0', opacity: open ? 1 : 0 }}
      >
        <div className="px-5 pb-5 text-sm text-neutral-500 leading-relaxed">
          {answer}
        </div>
      </div>
    </div>
  )
}

// ── CTA Banner ────────────────────────────────────────────────────────────────
function CTABanner() {
  return (
    <section className="section-padding bg-white">
      <div className="section-container">
        <AnimatedSection>
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 p-10 lg:p-16 text-center">
            <BgImage src="/images/webentwicklung.jpg" opacity="opacity-[0.12]" />
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary-400/20 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />
            <div className="relative z-10">
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4 tracking-tight">
                Bereit für den nächsten Schritt?
              </h2>
              <p className="text-primary-200 max-w-xl mx-auto mb-8 text-lg">
                Vereinbaren Sie jetzt Ihr kostenloses Erstgespräch und erfahren Sie,
                wie VIO-IT Ihr Unternehmen digital voranbringen kann.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/kontakt"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold text-primary-700 bg-white rounded-xl hover:bg-primary-50 transition-colors shadow-lg"
                >
                  Jetzt Anfrage senden
                  <ChevronRight className="w-5 h-5" />
                </Link>
                <Link
                  to="/leistungen"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold text-white border border-white/30 rounded-xl hover:bg-white/10 transition-colors"
                >
                  Leistungen entdecken
                </Link>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}

// ── Page Export ───────────────────────────────────────────────────────────────
import { useState } from 'react'

export default function HomePage() {
  return (
    <>
      <SEOHead
        description="VIO-IT – Ihr IT-Partner für KI-Automatisierung, Website-Erstellung, IT-Support und Digitalisierung. Viorel Ghiurca, Fachinformatiker & IT-Experte. Kostenloses Erstgespräch."
        canonical="/"
      />
      <Hero />
      <ServicesOverview />
      <WhyVioIT />
      <HowWeWork />
      <FAQ />
      <CTABanner />
    </>
  )
}
