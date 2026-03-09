import { collection, addDoc, serverTimestamp, query, orderBy, getDocs, where, doc, getDoc, updateDoc } from 'firebase/firestore'
import { db } from './firebase'

// ── Kontaktanfragen ──────────────────────────────────────────────────────────

/**
 * Speichert eine Kontaktanfrage in Firestore.
 * @param {{ name: string, firma?: string, email: string, telefon?: string, betreff: string, nachricht: string }} data
 */
export async function saveContactRequest(data) {
  const docRef = await addDoc(collection(db, 'kontaktanfragen'), {
    ...data,
    status: 'neu',
    createdAt: serverTimestamp(),
  })
  return docRef.id
}

// ── Terminbuchungen ──────────────────────────────────────────────────────────

/**
 * Speichert eine Terminbuchung in Firestore.
 * @param {{ name: string, firma?: string, email: string, telefon?: string, terminArt: string, datum: string, uhrzeit: string, anliegen?: string }} data
 */
export async function saveAppointment(data) {
  const docRef = await addDoc(collection(db, 'terminbuchungen'), {
    ...data,
    status: 'ausstehend',
    createdAt: serverTimestamp(),
  })
  return docRef.id
}

// ── Einzelne Buchung abrufen ──────────────────────────────────────────────────
export async function getAppointmentById(id) {
  const docRef = doc(db, 'terminbuchungen', id)
  const snap = await getDoc(docRef)
  if (!snap.exists()) return null
  return { id: snap.id, ...snap.data() }
}

// ── Termin stornieren ─────────────────────────────────────────────────────────
export async function cancelAppointment(id) {
  const docRef = doc(db, 'terminbuchungen', id)
  await updateDoc(docRef, { status: 'storniert', cancelledAt: serverTimestamp() })
}

// ── Admin: Alle Buchungen abrufen ─────────────────────────────────────────────
export async function getAppointments() {
  const q = query(collection(db, 'terminbuchungen'), orderBy('createdAt', 'desc'))
  const snapshot = await getDocs(q)
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
}

// ── Gebuchte Slots pro Datum (für Kalender-Sperrung) ─────────────────────────
export async function getBookingsMap() {
  const q = query(
    collection(db, 'terminbuchungen'),
    where('status', '!=', 'storniert'),
  )
  const snapshot = await getDocs(q)
  const map = {}
  snapshot.docs.forEach(doc => {
    const { datum, uhrzeit } = doc.data()
    if (!datum || !uhrzeit) return
    if (!map[datum]) map[datum] = []
    if (!map[datum].includes(uhrzeit)) map[datum].push(uhrzeit)
  })
  return map
}
