import { useState, useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import {
  Calendar, Clock, MessageCircle, CheckCircle2,
  User, Building2, Mail, Phone, ChevronRight, ArrowRight
} from 'lucide-react'
import AnimatedSection from '../components/ui/AnimatedSection'
import SEOHead from '../components/ui/SEOHead'
import CustomCalendar, { toKey } from '../components/ui/CustomCalendar'
import { saveAppointment, getBookingsMap } from '../lib/firestore'
import { sendCustomerConfirmation, sendAdminNotification } from '../lib/emailService'
import { checkSpam, markSubmitted } from '../lib/spamProtection'

const appointmentType = {
  id: 'erstgespraech',
  title: 'Kostenloses Erstgespräch',
  desc: '30 Min. — Kennenlernen & Bedarfsanalyse',
  duration: '30 Minuten',
}

const timeSlots = [
  '09:00 Uhr', '09:30 Uhr', '10:00 Uhr', '10:30 Uhr',
  '11:00 Uhr', '11:30 Uhr', '14:00 Uhr', '14:30 Uhr',
  '15:00 Uhr', '15:30 Uhr', '16:00 Uhr', '16:30 Uhr',
]

export default function TerminPage() {
  const [step, setStep] = useState(1)
  const [selectedType] = useState('erstgespraech')
  const [selectedDate, setSelectedDate] = useState(null)
  const [selectedTime, setSelectedTime] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [bookingId, setBookingId] = useState(null)
  const [bookedSlotsMap, setBookedSlotsMap] = useState({})

  const { register, handleSubmit, formState: { errors } } = useForm()
  const honeypotRef = useRef('')

  useEffect(() => {
    getBookingsMap()
      .then(setBookedSlotsMap)
      .catch(() => {})
  }, [])

  const minDate = (() => {
    const d = new Date()
    d.setDate(d.getDate() + 1)
    return d
  })()

  const formatDate = (d) => {
    if (!d) return ''
    const dd = String(d.getDate()).padStart(2, '0')
    const MM = String(d.getMonth() + 1).padStart(2, '0')
    const yyyy = d.getFullYear()
    return `${dd}.${MM}.${yyyy}`
  }

  const bookedTimesForDate = selectedDate
    ? (bookedSlotsMap[toKey(selectedDate)] || [])
    : []

  const handleDateChange = (date) => {
    setSelectedDate(date)
    setSelectedTime('')
  }

  const onSubmit = async (data) => {
    if (!selectedType || !selectedDate || !selectedTime) {
      toast.error('Bitte alle Felder ausfüllen.')
      return
    }

    const spam = checkSpam({ honeypot: honeypotRef.current, formId: 'termin' })
    if (spam.blocked) {
      if (spam.reason !== 'bot') toast.error(spam.reason)
      return
    }

    setIsSubmitting(true)
    try {
      const bookingData = {
        ...data,
        terminArt: selectedType,
        datum: selectedDate ? selectedDate.toISOString().split('T')[0] : '',
        uhrzeit: selectedTime,
      }
      const id = await saveAppointment(bookingData)
      markSubmitted('termin')
      setBookingId(id)
      setStep(3)
      toast.success('Termin erfolgreich gebucht!')

      Promise.allSettled([
        sendCustomerConfirmation({ booking: bookingData, bookingId: id }),
        sendAdminNotification({ booking: bookingData, bookingId: id }),
      ]).catch(() => {})
    } catch (err) {
      console.error(err)
      toast.error('Fehler beim Speichern. Bitte versuchen Sie es erneut.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <SEOHead
        title="Termin buchen – Kostenloses Erstgespräch"
        description="Jetzt kostenloses Erstgespräch mit VIO-IT buchen. IT-Beratung, KI-Automatisierung, Website-Erstellung – Termin online vereinbaren."
        canonical="/termin"
      />

      <div className="bg-gradient-to-br from-neutral-950 via-primary-950 to-neutral-900 pt-32 pb-20">
        <div className="section-container text-center">
          <AnimatedSection>
            <span className="badge bg-white/10 text-primary-200 mb-4">Termin buchen</span>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 tracking-tight">
              Kostenloses Erstgespräch
            </h1>
            <p className="text-primary-200 text-lg max-w-xl mx-auto">
              Buchen Sie jetzt Ihren Wunschtermin — unverbindlich, schnell und ohne Verpflichtung.
            </p>
          </AnimatedSection>
        </div>
      </div>

      <section className="section-padding bg-neutral-50">
        <div className="section-container max-w-3xl">

          {/* Progress Indicator */}
          {step < 3 && (
            <AnimatedSection className="mb-10">
              <div className="flex items-center gap-3">
                {[1, 2].map((s) => (
                  <div key={s} className="flex items-center gap-3 flex-1">
                    <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-semibold transition-all ${
                      step > s ? 'bg-accent-500 text-white' :
                      step === s ? 'bg-primary-600 text-white' :
                      'bg-neutral-200 text-neutral-400'
                    }`}>
                      {step > s ? <CheckCircle2 className="w-4 h-4" /> : s}
                    </div>
                    <span className={`text-sm font-medium hidden sm:block ${step >= s ? 'text-neutral-800' : 'text-neutral-400'}`}>
                      {s === 1 ? 'Datum & Zeit' : 'Ihre Daten'}
                    </span>
                    {s < 2 && <div className={`flex-1 h-0.5 ${step > s ? 'bg-accent-400' : 'bg-neutral-200'}`} />}
                  </div>
                ))}
              </div>
            </AnimatedSection>
          )}

          {/* Step 1: Datum & Zeit */}
          {step === 1 && (
            <AnimatedSection>
              <div className="bg-white rounded-2xl shadow-card border border-neutral-100 p-8">
                <h2 className="text-xl font-bold text-neutral-900 mb-2">Wann passt es Ihnen?</h2>
                <p className="text-sm text-neutral-500 mb-6">Wählen Sie Ihren Wunschtermin.</p>

                <div className="space-y-6 mb-8">
                  {/* Date */}
                  <div>
                    <label className="input-label mb-2 block">
                      <Calendar className="w-4 h-4 inline mr-1.5" />
                      Datum auswählen
                    </label>
                    <CustomCalendar
                      value={selectedDate}
                      onChange={handleDateChange}
                      minDate={minDate}
                      bookedSlotsMap={bookedSlotsMap}
                      totalSlots={timeSlots.length}
                    />
                  </div>

                  {/* Time */}
                  {selectedDate && (
                    <div>
                      <label className="input-label mb-2 block">
                        <Clock className="w-4 h-4 inline mr-1.5" />
                        Uhrzeit auswählen
                      </label>
                      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                        {timeSlots.map(slot => {
                          const isBooked = bookedTimesForDate.includes(slot)
                          const isSelected = selectedTime === slot
                          return (
                            <button
                              key={slot}
                              type="button"
                              onClick={() => !isBooked && setSelectedTime(slot)}
                              disabled={isBooked}
                              className={`relative py-2.5 text-sm font-medium rounded-xl border-2 transition-all duration-150 ${
                                isBooked
                                  ? 'border-neutral-100 bg-neutral-50 text-neutral-300 cursor-not-allowed'
                                  : isSelected
                                  ? 'border-primary-500 bg-primary-50 text-primary-700 shadow-sm'
                                  : 'border-neutral-200 text-neutral-600 hover:border-primary-300 hover:bg-primary-50/50'
                              }`}
                            >
                              {slot}
                              {isBooked && (
                                <span className="absolute inset-0 flex items-center justify-center rounded-xl">
                                  <span className="w-5 h-0.5 bg-neutral-300 rotate-12 rounded-full" />
                                </span>
                              )}
                            </button>
                          )
                        })}
                      </div>
                      {bookedTimesForDate.length > 0 && (
                        <p className="mt-2 text-xs text-neutral-400 flex items-center gap-1">
                          <span className="w-3 h-0.5 bg-neutral-300 rotate-12 rounded-full inline-block" />
                          Durchgestrichen = bereits gebucht
                        </p>
                      )}
                    </div>
                  )}
                </div>

                <button
                  onClick={() => selectedDate && selectedTime && setStep(2)}
                  disabled={!selectedDate || !selectedTime}
                  className="btn-primary w-full justify-center btn-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
                >
                  Weiter
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </AnimatedSection>
          )}

          {/* Step 2: Kontaktdaten */}
          {step === 2 && (
            <AnimatedSection>
              <div className="bg-white rounded-2xl shadow-card border border-neutral-100 p-8">
                <button onClick={() => setStep(1)} className="text-sm text-primary-600 hover:text-primary-700 mb-4 flex items-center gap-1">
                  ← Zurück
                </button>
                <h2 className="text-xl font-bold text-neutral-900 mb-2">Ihre Kontaktdaten</h2>
                <p className="text-sm text-neutral-500 mb-6">Damit ich Ihren Termin bestätigen kann.</p>

                {/* Booking Summary */}
                <div className="p-4 bg-primary-50 border border-primary-100 rounded-xl mb-6">
                  <p className="text-xs font-semibold text-primary-700 mb-2">Ihre Buchung</p>
                  <div className="flex flex-wrap gap-3 text-xs text-primary-600">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      {formatDate(selectedDate)}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      {selectedTime}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MessageCircle className="w-3.5 h-3.5" />
                      {appointmentType.title}
                    </span>
                  </div>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  {/* Honeypot – unsichtbar für echte Nutzer, Bots füllen es aus */}
                  <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', tabIndex: -1 }}>
                    <label htmlFor="company_url">Company URL</label>
                    <input
                      id="company_url"
                      name="company_url"
                      type="text"
                      autoComplete="off"
                      tabIndex={-1}
                      onChange={e => { honeypotRef.current = e.target.value }}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="input-label">
                        <User className="w-3.5 h-3.5 inline mr-1.5" />
                        Name *
                      </label>
                      <input
                        {...register('name', { required: 'Bitte Name angeben' })}
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
                      <input
                        {...register('firma')}
                        className="input-field"
                        placeholder="Muster GmbH"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="input-label">
                      <Mail className="w-3.5 h-3.5 inline mr-1.5" />
                      E-Mail-Adresse *
                    </label>
                    <input
                      {...register('email', {
                        required: 'E-Mail erforderlich',
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
                    <input
                      {...register('telefon')}
                      type="tel"
                      className="input-field"
                      placeholder="+49 123 456789"
                    />
                  </div>

                  <div>
                    <label className="input-label">
                      <MessageCircle className="w-3.5 h-3.5 inline mr-1.5" />
                      Anliegen / Beschreibung (optional)
                    </label>
                    <textarea
                      {...register('anliegen')}
                      rows={3}
                      className="input-field resize-none"
                      placeholder="Worum geht es bei Ihrem Termin? Was sind Ihre aktuellen Herausforderungen?"
                    />
                  </div>

                  {/* DSGVO */}
                  <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-100">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        {...register('dsgvo', { required: 'Bitte stimmen Sie der Datenschutzerklärung zu' })}
                        className="w-4 h-4 mt-0.5 rounded border-neutral-300 text-primary-600 focus:ring-primary-500 shrink-0"
                      />
                      <span className="text-xs text-neutral-600 leading-relaxed">
                        Ich stimme zu, dass meine Angaben zur Bearbeitung meiner Terminanfrage gespeichert werden.
                        Die Daten werden DSGVO-konform behandelt und nicht an Dritte weitergegeben.
                        Weitere Informationen in der{' '}
                        <Link to="/datenschutz" className="text-primary-600 hover:underline" target="_blank">
                          Datenschutzerklärung
                        </Link>. *
                      </span>
                    </label>
                    {errors.dsgvo && <p className="text-xs text-red-500 mt-2">{errors.dsgvo.message}</p>}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary w-full justify-center btn-lg disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Wird gespeichert…' : 'Termin jetzt verbindlich buchen'}
                    {!isSubmitting && <CheckCircle2 className="w-5 h-5" />}
                  </button>
                </form>
              </div>
            </AnimatedSection>
          )}

          {/* Step 3: Bestätigung */}
          {step === 3 && (
            <AnimatedSection>
              <div className="bg-white rounded-2xl shadow-card border border-neutral-100 p-10 text-center">
                <div className="w-20 h-20 rounded-full bg-accent-100 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-10 h-10 text-accent-500" />
                </div>
                <h2 className="text-2xl font-bold text-neutral-900 mb-3">
                  Termin erfolgreich gebucht!
                </h2>
                <p className="text-neutral-500 mb-2">
                  Vielen Dank! Ich werde mich in Kürze bei Ihnen melden, um den Termin zu bestätigen.
                </p>
                {bookingId && (
                  <p className="text-xs text-neutral-400 mb-6">
                    Buchungs-ID: <code className="bg-neutral-100 px-2 py-0.5 rounded">{bookingId.slice(0, 8).toUpperCase()}</code>
                  </p>
                )}
                <div className="p-5 bg-primary-50 border border-primary-100 rounded-xl mb-6 text-left">
                  <p className="text-xs font-semibold text-primary-700 mb-3">Ihre Buchung</p>
                  <div className="space-y-2 text-sm text-primary-600">
                    <p className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {formatDate(selectedDate)}
                    </p>
                    <p className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      {selectedTime}
                    </p>
                    <p className="flex items-center gap-2">
                      <MessageCircle className="w-4 h-4" />
                      {appointmentType.title}
                    </p>
                  </div>
                </div>
                <Link to="/" className="btn-primary btn-lg">
                  Zurück zur Startseite
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </AnimatedSection>
          )}
        </div>
      </section>
    </>
  )
}
