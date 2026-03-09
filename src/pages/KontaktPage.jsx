import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useState, useRef } from 'react'
import {
  Mail, MapPin, Clock, MessageCircle, User,
  Building2, Phone, Send, CheckCircle2, ArrowRight
} from 'lucide-react'
import AnimatedSection from '../components/ui/AnimatedSection'
import SEOHead from '../components/ui/SEOHead'
import { saveContactRequest } from '../lib/firestore'
import { checkSpam, markSubmitted } from '../lib/spamProtection'

const subjects = [
  'KI-Automatisierung',
  'Website-Erstellung',
  'Hardware & Software Betreuung',
  'IT-Support & Systemadministration',
  'Digitalisierung & Beratung',
  'Allgemeine Anfrage',
  'Sonstiges',
]

export default function KontaktPage() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const honeypotRef = useRef('')

  const onSubmit = async (data) => {
    const spam = checkSpam({ honeypot: honeypotRef.current, formId: 'kontakt' })
    if (spam.blocked) {
      if (spam.reason !== 'bot') toast.error(spam.reason)
      return
    }

    setIsSubmitting(true)
    try {
      await saveContactRequest(data)
      markSubmitted('kontakt')
      setSubmitted(true)
      reset()
      toast.success('Nachricht erfolgreich gesendet!')
    } catch (err) {
      console.error(err)
      toast.error('Fehler beim Senden. Bitte versuchen Sie es erneut oder schreiben Sie direkt an mail@viorelghiurca.de')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <SEOHead
        title="Kontakt – Jetzt Anfrage stellen"
        description="Kontaktieren Sie VIO-IT – Viorel Ghiurca. Wir freuen uns auf Ihre Anfrage zu IT-Support, KI-Automatisierung, Websites und Digitalisierung."
        canonical="/kontakt"
      />

      <div className="bg-gradient-to-br from-neutral-950 via-primary-950 to-neutral-900 pt-32 pb-20">
        <div className="section-container text-center">
          <AnimatedSection>
            <span className="badge bg-white/10 text-primary-200 mb-4">Kontakt</span>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 tracking-tight">
              Wie kann ich Ihnen helfen?
            </h1>
            <p className="text-primary-200 text-lg max-w-xl mx-auto">
              Stellen Sie mir Ihre Frage oder beschreiben Sie Ihr Anliegen — ich melde mich schnell zurück.
            </p>
          </AnimatedSection>
        </div>
      </div>

      <section className="section-padding bg-neutral-50">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-16">

            {/* Contact Info */}
            <AnimatedSection direction="left" className="lg:col-span-1">
              <div className="space-y-6">
                <ContactCard
                  icon={<Mail className="w-5 h-5 text-primary-600" />}
                  title="E-Mail"
                  content={<a href="mailto:mail@viorelghiurca.de" className="text-sm text-neutral-600 hover:text-primary-600 transition-colors">mail@viorelghiurca.de</a>}
                />
                <ContactCard
                  icon={<MapPin className="w-5 h-5 text-primary-600" />}
                  title="Einsatzgebiet"
                  content={<p className="text-sm text-neutral-600">Deutschland – Remote & vor Ort</p>}
                />
                <ContactCard
                  icon={<Clock className="w-5 h-5 text-primary-600" />}
                  title="Erreichbarkeit"
                  content={
                    <div className="text-sm text-neutral-600 space-y-0.5">
                      <p>Mo–Fr: 09:00 – 18:00 Uhr</p>
                      <p className="text-xs text-neutral-400">Für Notfälle nach Vereinbarung</p>
                    </div>
                  }
                />

                <div className="p-5 bg-primary-50 rounded-2xl border border-primary-100">
                  <p className="text-sm font-semibold text-primary-800 mb-2">
                    Lieber direkt einen Termin?
                  </p>
                  <p className="text-xs text-primary-600 mb-4">
                    Buchen Sie jetzt Ihr kostenloses Erstgespräch — unverbindlich und schnell.
                  </p>
                  <Link to="/termin" className="btn-primary w-full justify-center text-xs">
                    Termin buchen
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </AnimatedSection>

            {/* Form */}
            <AnimatedSection direction="right" className="lg:col-span-2">
              {submitted ? (
                <div className="bg-white rounded-2xl shadow-card border border-neutral-100 p-10 text-center">
                  <div className="w-16 h-16 rounded-full bg-accent-100 flex items-center justify-center mx-auto mb-5">
                    <CheckCircle2 className="w-8 h-8 text-accent-500" />
                  </div>
                  <h2 className="text-xl font-bold text-neutral-900 mb-2">Nachricht gesendet!</h2>
                  <p className="text-sm text-neutral-500 mb-6">
                    Vielen Dank! Ich melde mich so schnell wie möglich bei Ihnen zurück.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="btn-outline"
                  >
                    Neue Nachricht senden
                  </button>
                </div>
              ) : (
                <div className="bg-white rounded-2xl shadow-card border border-neutral-100 p-8">
                  <h2 className="text-xl font-bold text-neutral-900 mb-6">Nachricht senden</h2>

                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    {/* Honeypot – unsichtbar für echte Nutzer, Bots füllen es aus */}
                    <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', tabIndex: -1 }}>
                      <label htmlFor="website">Website</label>
                      <input
                        id="website"
                        name="website"
                        type="text"
                        autoComplete="off"
                        tabIndex={-1}
                        onChange={e => { honeypotRef.current = e.target.value }}
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="input-label">
                          <User className="w-3.5 h-3.5 inline mr-1.5" />
                          Name *
                        </label>
                        <input
                          {...register('name', { required: 'Pflichtfeld' })}
                          className="input-field"
                          placeholder="Max Mustermann"
                        />
                        {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>}
                      </div>
                      <div>
                        <label className="input-label">
                          <Building2 className="w-3.5 h-3.5 inline mr-1.5" />
                          Firma (optional)
                        </label>
                        <input {...register('firma')} className="input-field" placeholder="Muster GmbH" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="input-label">
                          <Mail className="w-3.5 h-3.5 inline mr-1.5" />
                          E-Mail *
                        </label>
                        <input
                          {...register('email', {
                            required: 'Pflichtfeld',
                            pattern: { value: /^\S+@\S+\.\S+$/, message: 'Ungültige E-Mail' }
                          })}
                          type="email"
                          className="input-field"
                          placeholder="max@firma.de"
                        />
                        {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>}
                      </div>
                      <div>
                        <label className="input-label">
                          <Phone className="w-3.5 h-3.5 inline mr-1.5" />
                          Telefon (optional)
                        </label>
                        <input {...register('telefon')} type="tel" className="input-field" placeholder="+49 123 456789" />
                      </div>
                    </div>

                    <div>
                      <label className="input-label">
                        <MessageCircle className="w-3.5 h-3.5 inline mr-1.5" />
                        Betreff *
                      </label>
                      <select
                        {...register('betreff', { required: 'Bitte wählen Sie einen Betreff' })}
                        className="input-field"
                      >
                        <option value="">Thema auswählen…</option>
                        {subjects.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                      {errors.betreff && <p className="text-xs text-red-500 mt-1">{errors.betreff.message}</p>}
                    </div>

                    <div>
                      <label className="input-label">Nachricht *</label>
                      <textarea
                        {...register('nachricht', { required: 'Pflichtfeld', minLength: { value: 20, message: 'Bitte etwas mehr beschreiben' } })}
                        rows={5}
                        className="input-field resize-none"
                        placeholder="Beschreiben Sie kurz Ihr Anliegen oder Ihre Herausforderung…"
                      />
                      {errors.nachricht && <p className="text-xs text-red-500 mt-1">{errors.nachricht.message}</p>}
                    </div>

                    {/* DSGVO */}
                    <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-100">
                      <label className="flex items-start gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          {...register('dsgvo', { required: 'Zustimmung erforderlich' })}
                          className="w-4 h-4 mt-0.5 rounded border-neutral-300 text-primary-600 focus:ring-primary-500 shrink-0"
                        />
                        <span className="text-xs text-neutral-600 leading-relaxed">
                          Ich stimme der Verarbeitung meiner Daten zur Bearbeitung meiner Anfrage gemäß der{' '}
                          <Link to="/datenschutz" className="text-primary-600 hover:underline" target="_blank">
                            Datenschutzerklärung
                          </Link>{' '}
                          zu. Die Daten werden nicht an Dritte weitergegeben. *
                        </span>
                      </label>
                      {errors.dsgvo && <p className="text-xs text-red-500 mt-2">{errors.dsgvo.message}</p>}
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn-primary w-full justify-center btn-lg disabled:opacity-60"
                    >
                      {isSubmitting ? 'Wird gesendet…' : 'Nachricht senden'}
                      {!isSubmitting && <Send className="w-4 h-4" />}
                    </button>
                  </form>
                </div>
              )}
            </AnimatedSection>
          </div>
        </div>
      </section>
    </>
  )
}

function ContactCard({ icon, title, content }) {
  return (
    <div className="bg-white rounded-2xl border border-neutral-100 shadow-card p-5 flex items-start gap-4">
      <div className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center shrink-0">
        {icon}
      </div>
      <div>
        <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wide mb-1">{title}</p>
        {content}
      </div>
    </div>
  )
}
