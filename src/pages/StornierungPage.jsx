import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Calendar, Clock, MessageCircle, CheckCircle2, XCircle, AlertTriangle, ArrowRight } from 'lucide-react'
import AnimatedSection from '../components/ui/AnimatedSection'
import SEOHead from '../components/ui/SEOHead'
import { getAppointmentById, cancelAppointment } from '../lib/firestore'
import { sendCancellationConfirmation } from '../lib/emailService'

const terminTypLabel = {
  erstgespraech: 'Kostenloses Erstgespräch (30 Min.)',
  beratung:      'Ausführliche Beratung (60 Min.)',
  'it-analyse':  'IT-Infrastruktur Analyse (90 Min.)',
}

function formatDate(isoDate) {
  if (!isoDate) return ''
  const [y, m, d] = isoDate.split('-')
  return `${d}.${m}.${y}`
}

export default function StornierungPage() {
  const { bookingId } = useParams()
  const [booking, setBooking]       = useState(null)
  const [loading, setLoading]       = useState(true)
  const [notFound, setNotFound]     = useState(false)
  const [confirming, setConfirming] = useState(false)
  const [done, setDone]             = useState(false)
  const [error, setError]           = useState('')

  useEffect(() => {
    if (!bookingId) { setNotFound(true); setLoading(false); return }
    getAppointmentById(bookingId)
      .then(data => {
        if (!data) setNotFound(true)
        else setBooking(data)
      })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false))
  }, [bookingId])

  const handleCancel = async () => {
    setConfirming(true)
    setError('')
    try {
      await cancelAppointment(bookingId, { datum: booking.datum, uhrzeit: booking.uhrzeit })
      sendCancellationConfirmation({ booking, bookingId }).catch(() => {})
      setDone(true)
    } catch {
      setError('Stornierung fehlgeschlagen. Bitte versuchen Sie es erneut oder kontaktieren Sie uns direkt.')
    } finally {
      setConfirming(false)
    }
  }

  return (
    <>
      <SEOHead
        title="Termin stornieren – VIO-IT"
        description="Stornierung Ihres gebuchten Termins bei VIO-IT."
        canonical="/stornierung"
      />

      <div className="bg-gradient-to-br from-neutral-950 via-primary-950 to-neutral-900 pt-32 pb-20">
        <div className="section-container text-center">
          <AnimatedSection>
            <span className="badge bg-white/10 text-primary-200 mb-4">Terminverwaltung</span>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 tracking-tight">
              Termin stornieren
            </h1>
          </AnimatedSection>
        </div>
      </div>

      <section className="section-padding bg-neutral-50">
        <div className="section-container max-w-xl">
          <AnimatedSection>

            {/* Laden */}
            {loading && (
              <div className="bg-white rounded-2xl shadow-card border border-neutral-100 p-10 text-center">
                <div className="w-10 h-10 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin mx-auto mb-4" />
                <p className="text-neutral-500 text-sm">Buchung wird geladen…</p>
              </div>
            )}

            {/* Nicht gefunden */}
            {!loading && notFound && (
              <div className="bg-white rounded-2xl shadow-card border border-neutral-100 p-10 text-center">
                <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-5">
                  <AlertTriangle className="w-8 h-8 text-red-400" />
                </div>
                <h2 className="text-xl font-bold text-neutral-900 mb-2">Buchung nicht gefunden</h2>
                <p className="text-neutral-500 text-sm mb-6">
                  Dieser Stornierungs-Link ist ungültig oder abgelaufen.
                </p>
                <Link to="/termin" className="btn-primary btn-lg">
                  Neuen Termin buchen
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            )}

            {/* Bereits storniert */}
            {!loading && booking && booking.status === 'storniert' && !done && (
              <div className="bg-white rounded-2xl shadow-card border border-neutral-100 p-10 text-center">
                <div className="w-16 h-16 rounded-full bg-neutral-100 flex items-center justify-center mx-auto mb-5">
                  <XCircle className="w-8 h-8 text-neutral-400" />
                </div>
                <h2 className="text-xl font-bold text-neutral-900 mb-2">Termin bereits storniert</h2>
                <p className="text-neutral-500 text-sm mb-6">
                  Dieser Termin wurde bereits storniert.
                </p>
                <Link to="/termin" className="btn-primary btn-lg">
                  Neuen Termin buchen
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            )}

            {/* Stornierung bestätigen */}
            {!loading && booking && booking.status !== 'storniert' && !done && (
              <div className="bg-white rounded-2xl shadow-card border border-neutral-100 p-8">
                <div className="w-14 h-14 rounded-full bg-amber-100 flex items-center justify-center mx-auto mb-5">
                  <AlertTriangle className="w-7 h-7 text-amber-500" />
                </div>
                <h2 className="text-xl font-bold text-neutral-900 mb-2 text-center">
                  Termin wirklich stornieren?
                </h2>
                <p className="text-neutral-500 text-sm text-center mb-6">
                  Hallo <strong>{booking.name}</strong>, möchten Sie folgenden Termin stornieren?
                </p>

                <div className="p-4 bg-primary-50 border border-primary-100 rounded-xl mb-6">
                  <p className="text-xs font-semibold text-primary-700 mb-3">
                    Buchung #{booking.id?.slice(0, 8).toUpperCase()}
                  </p>
                  <div className="space-y-2 text-sm text-primary-600">
                    <p className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 shrink-0" />
                      {formatDate(booking.datum)}
                    </p>
                    <p className="flex items-center gap-2">
                      <Clock className="w-4 h-4 shrink-0" />
                      {booking.uhrzeit}
                    </p>
                    <p className="flex items-center gap-2">
                      <MessageCircle className="w-4 h-4 shrink-0" />
                      {terminTypLabel[booking.terminArt] ?? booking.terminArt}
                    </p>
                  </div>
                </div>

                {error && (
                  <p className="text-sm text-red-500 text-center mb-4">{error}</p>
                )}

                <div className="flex flex-col sm:flex-row gap-3">
                  <Link
                    to="/"
                    className="flex-1 btn-secondary justify-center btn-lg"
                  >
                    Abbrechen
                  </Link>
                  <button
                    onClick={handleCancel}
                    disabled={confirming}
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold text-sm transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {confirming ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Wird storniert…
                      </>
                    ) : (
                      <>
                        <XCircle className="w-4 h-4" />
                        Ja, Termin stornieren
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* Stornierung erfolgreich */}
            {done && (
              <div className="bg-white rounded-2xl shadow-card border border-neutral-100 p-10 text-center">
                <div className="w-16 h-16 rounded-full bg-accent-100 flex items-center justify-center mx-auto mb-5">
                  <CheckCircle2 className="w-8 h-8 text-accent-500" />
                </div>
                <h2 className="text-xl font-bold text-neutral-900 mb-2">Termin storniert</h2>
                <p className="text-neutral-500 text-sm mb-6">
                  Ihr Termin wurde erfolgreich storniert. Eine Bestätigung wurde an Ihre E-Mail-Adresse gesendet.
                </p>
                <Link to="/termin" className="btn-primary btn-lg">
                  Neuen Termin buchen
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            )}

          </AnimatedSection>
        </div>
      </section>
    </>
  )
}
