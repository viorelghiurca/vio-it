import { Link } from 'react-router-dom'
import {
  Award, CheckCircle2, Heart, Lightbulb, Shield, Users,
  ArrowRight, Code2, Bot, Globe, Server, Wrench
} from 'lucide-react'
import AnimatedSection from '../components/ui/AnimatedSection'
import SEOHead from '../components/ui/SEOHead'

const skills = [
  { name: 'KI-Automatisierung & Workflows', icon: <Bot className="w-4 h-4" /> },
  { name: 'Web-Entwicklung (React, Vite, Tailwind)', icon: <Code2 className="w-4 h-4" /> },
  { name: 'Website-Erstellung & SEO', icon: <Globe className="w-4 h-4" /> },
  { name: 'Systemadministration (Windows/Linux)', icon: <Server className="w-4 h-4" /> },
  { name: 'Hardware- & Software-Betreuung', icon: <Wrench className="w-4 h-4" /> },
  { name: 'DevOps & Cloud-Grundlagen', icon: <Code2 className="w-4 h-4" /> },
  { name: 'IT-Support für Unternehmen', icon: <Users className="w-4 h-4" /> },
  { name: 'Digitalisierung & Prozessoptimierung', icon: <Lightbulb className="w-4 h-4" /> },
  { name: 'Projektmanagement', icon: <CheckCircle2 className="w-4 h-4" /> },
]

const values = [
  {
    icon: <Shield className="w-6 h-6 text-primary-600" />,
    title: 'Zuverlässig',
    desc: 'Ich halte, was ich verspreche. Termine, Budgets und Qualitätsansprüche werden eingehalten.',
  },
  {
    icon: <Heart className="w-6 h-6 text-rose-500" />,
    title: 'Lösungsorientiert',
    desc: 'Ich denke nicht in Problemen, sondern in Lösungen. Jede Herausforderung hat einen Weg.',
  },
  {
    icon: <Lightbulb className="w-6 h-6 text-amber-500" />,
    title: 'Modern & innovativ',
    desc: 'Ständige Weiterbildung und Einsatz aktueller Technologien — für Lösungen, die heute und morgen funktionieren.',
  },
  {
    icon: <Users className="w-6 h-6 text-accent-600" />,
    title: 'Transparent',
    desc: 'Klare Kommunikation, verständliche Erklärungen und ehrliche Einschätzungen — immer.',
  },
]

export default function UeberMichPage() {
  return (
    <>
      <SEOHead
        title="Über mich – Viorel Ghiurca, IHK-Fachinformatiker"
        description="Viorel Ghiurca – IHK-geprüfter Fachinformatiker und Gründer von VIO-IT. Experte für KI-Automatisierung, Webentwicklung und IT-Support für KMU in Deutschland."
        canonical="/ueber-mich"
      />

      {/* Page Header */}
      <div className="bg-gradient-to-br from-neutral-950 via-primary-950 to-neutral-900 pt-32 pb-20">
        <div className="section-container text-center">
          <AnimatedSection>
            <span className="badge bg-white/10 text-primary-200 mb-4">Über mich</span>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 tracking-tight">
              Viorel Ghiurca
            </h1>
            <p className="text-primary-200 text-lg max-w-xl mx-auto">
              IHK-geprüfter Fachinformatiker · Gründer von VIO-IT
            </p>
          </AnimatedSection>
        </div>
      </div>

      {/* Main Content */}
      <section className="section-padding bg-white">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

            {/* Photo Placeholder */}
            <AnimatedSection direction="left">
              <div className="relative">
                <div className="aspect-[4/5] bg-gradient-to-br from-neutral-100 to-neutral-200 rounded-3xl flex flex-col items-center justify-center border-2 border-dashed border-neutral-200">
                  <div className="w-20 h-20 rounded-full bg-neutral-200 flex items-center justify-center mb-4">
                    <Users className="w-10 h-10 text-neutral-400" />
                  </div>
                  <p className="text-sm text-neutral-400 font-medium">Foto folgt</p>
                  <p className="text-xs text-neutral-300 mt-1">Viorel Ghiurca</p>
                </div>

                {/* Floating badge */}
                <div className="absolute -bottom-5 -right-5 bg-white rounded-2xl shadow-card border border-neutral-100 px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary-100 flex items-center justify-center">
                      <Award className="w-5 h-5 text-primary-600" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-neutral-900">IHK-zertifiziert</p>
                      <p className="text-xs text-neutral-500">Fachinformatiker</p>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            {/* Bio */}
            <AnimatedSection direction="right">
              <span className="badge badge-primary mb-4">Meine Geschichte</span>
              <h2 className="text-3xl font-bold text-neutral-900 mb-6 tracking-tight">
                IT mit Leidenschaft und Expertise
              </h2>

              <div className="space-y-4 text-neutral-600 leading-relaxed">
                <p>
                  Ich bin Viorel Ghiurca — IHK-geprüfter Fachinformatiker und Gründer von VIO-IT.
                  Mit fundierter Ausbildung und praktischer Erfahrung in verschiedenen IT-Bereichen
                  helfe ich kleinen und mittelständischen Unternehmen dabei, die Chancen der
                  Digitalisierung wirklich zu nutzen.
                </p>
                <p>
                  Meine Überzeugung: Gute IT ist kein Luxus für Großunternehmen. Auch kleine Betriebe
                  verdienen moderne, zuverlässige und effiziente digitale Lösungen — zu fairen Preisen
                  und mit persönlichem Service.
                </p>
                <p>
                  Bei VIO-IT arbeite ich stets auf Augenhöhe mit meinen Kunden. Ich erkläre komplexe
                  Themen verständlich, denke unternehmerisch mit und liefere Ergebnisse, die messbar
                  Mehrwert schaffen.
                </p>
              </div>

              <div className="mt-8 p-5 bg-primary-50 rounded-2xl border border-primary-100">
                <p className="text-sm font-semibold text-primary-800 mb-1">Mein Ansatz</p>
                <p className="text-sm text-primary-700">
                  Erst verstehen, dann lösen. Jedes Unternehmen ist einzigartig — deshalb bekommt
                  jeder Kunde individuelle Lösungen statt Standardpakete.
                </p>
              </div>

              <Link to="/termin" className="btn-primary btn-lg mt-8">
                Jetzt Erstgespräch vereinbaren
                <ArrowRight className="w-5 h-5" />
              </Link>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section className="section-padding bg-neutral-50">
        <div className="section-container">
          <AnimatedSection className="text-center mb-12">
            <span className="badge badge-primary mb-4">Kompetenzen</span>
            <h2 className="section-title">Was ich kann</h2>
            <p className="section-subtitle mx-auto">
              Breites Fachwissen, das ich gezielt einsetze, um Ihnen echten Mehrwert zu liefern.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {skills.map((skill, i) => (
              <AnimatedSection key={skill.name} delay={i * 60}>
                <div className="flex items-center gap-3 p-4 bg-white rounded-xl border border-neutral-100 hover:border-primary-200 hover:bg-primary-50/50 transition-all duration-200">
                  <div className="w-8 h-8 rounded-lg bg-primary-100 flex items-center justify-center text-primary-600 shrink-0">
                    {skill.icon}
                  </div>
                  <span className="text-sm font-medium text-neutral-800">{skill.name}</span>
                  <CheckCircle2 className="w-4 h-4 text-accent-500 ml-auto shrink-0" />
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-white">
        <div className="section-container">
          <AnimatedSection className="text-center mb-12">
            <span className="badge badge-primary mb-4">Meine Werte</span>
            <h2 className="section-title">Was mich antreibt</h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <AnimatedSection key={v.title} delay={i * 80}>
                <div className="card p-6 text-center hover:shadow-card-hover transition-shadow">
                  <div className="w-12 h-12 rounded-2xl bg-neutral-50 flex items-center justify-center mx-auto mb-4">
                    {v.icon}
                  </div>
                  <h3 className="text-base font-semibold text-neutral-900 mb-2">{v.title}</h3>
                  <p className="text-sm text-neutral-500 leading-relaxed">{v.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-gradient-to-br from-primary-600 to-primary-900">
        <div className="section-container text-center">
          <AnimatedSection>
            <h2 className="text-3xl font-bold text-white mb-4">
              Überzeugt? Lassen Sie uns sprechen.
            </h2>
            <p className="text-primary-200 mb-8 max-w-xl mx-auto">
              Kostenloses und unverbindliches Erstgespräch — ich freue mich auf Ihre Herausforderung.
            </p>
            <Link
              to="/termin"
              className="inline-flex items-center gap-2 px-8 py-4 text-primary-700 bg-white font-semibold rounded-xl hover:bg-primary-50 transition-colors shadow-lg"
            >
              Termin vereinbaren
              <ArrowRight className="w-5 h-5" />
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </>
  )
}
