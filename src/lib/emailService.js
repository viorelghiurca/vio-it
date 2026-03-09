import emailjs from '@emailjs/browser'

const SERVICE_ID         = import.meta.env.VITE_EMAILJS_SERVICE_ID
const PUBLIC_KEY         = import.meta.env.VITE_EMAILJS_PUBLIC_KEY
const TMPL_BESTAETIGUNG  = import.meta.env.VITE_EMAILJS_TEMPLATE_BESTAETIGUNG
const TMPL_STORNIERUNG   = import.meta.env.VITE_EMAILJS_TEMPLATE_STORNIERUNG
const TMPL_ADMIN         = import.meta.env.VITE_EMAILJS_TEMPLATE_ADMIN

const ADMIN_EMAIL = 'mail@viorelghiurca.de'
const BASE_URL    = import.meta.env.VITE_BASE_URL || 'https://it.ghiurcaviorel.de'

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

/**
 * Bestätigungs-Mail an den Kunden (nach Buchung).
 */
export async function sendCustomerConfirmation({ booking, bookingId }) {
  const cancelUrl = `${BASE_URL}/stornierung/${bookingId}`
  return emailjs.send(
    SERVICE_ID,
    TMPL_BESTAETIGUNG,
    {
      to_email:     booking.email,
      to_name:      booking.name,
      booking_id:   bookingId.slice(0, 8).toUpperCase(),
      booking_type: terminTypLabel[booking.terminArt] ?? booking.terminArt,
      booking_date: formatDate(booking.datum),
      booking_time: booking.uhrzeit,
      cancel_url:   cancelUrl,
    },
    PUBLIC_KEY,
  )
}

/**
 * Stornierungs-Bestätigungsmail an den Kunden.
 */
export async function sendCancellationConfirmation({ booking, bookingId }) {
  return emailjs.send(
    SERVICE_ID,
    TMPL_STORNIERUNG,
    {
      to_email:     booking.email,
      to_name:      booking.name,
      booking_id:   bookingId.slice(0, 8).toUpperCase(),
      booking_type: terminTypLabel[booking.terminArt] ?? booking.terminArt,
      booking_date: formatDate(booking.datum),
      booking_time: booking.uhrzeit,
    },
    PUBLIC_KEY,
  )
}

/**
 * Benachrichtigungs-Mail an den Admin (Viorel Ghiurca).
 */
export async function sendAdminNotification({ booking, bookingId }) {
  const cancelUrl = `${BASE_URL}/stornierung/${bookingId}`
  return emailjs.send(
    SERVICE_ID,
    TMPL_ADMIN,
    {
      to_email:          ADMIN_EMAIL,
      booking_id:        bookingId.slice(0, 8).toUpperCase(),
      booking_id_full:   bookingId,
      booking_type:      terminTypLabel[booking.terminArt] ?? booking.terminArt,
      booking_date:      formatDate(booking.datum),
      booking_time:      booking.uhrzeit,
      customer_name:     booking.name,
      customer_email:    booking.email,
      customer_phone:    booking.telefon  || '—',
      customer_company:  booking.firma    || '—',
      customer_concern:  booking.anliegen || '—',
      cancel_url:        cancelUrl,
    },
    PUBLIC_KEY,
  )
}
