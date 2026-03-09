import {
  collection, addDoc, setDoc, deleteDoc, serverTimestamp,
  query, orderBy, getDocs, doc, getDoc, updateDoc,
} from 'firebase/firestore'
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
 * Speichert eine Terminbuchung in Firestore und erstellt gleichzeitig
 * einen öffentlich lesbaren Slot in `belegteSlots` (ohne personenbezogene Daten).
 */
export async function saveAppointment(data) {
  const docRef = await addDoc(collection(db, 'terminbuchungen'), {
    ...data,
    status: 'ausstehend',
    createdAt: serverTimestamp(),
  })

  const slotId = `${data.datum}_${data.uhrzeit}`
  await setDoc(doc(db, 'belegteSlots', slotId), {
    datum: data.datum,
    uhrzeit: data.uhrzeit,
    bookingId: docRef.id,
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

/**
 * Markiert den Termin als storniert und entfernt den zugehörigen Slot
 * aus der öffentlichen `belegteSlots`-Collection.
 */
export async function cancelAppointment(id, { datum, uhrzeit } = {}) {
  const docRef = doc(db, 'terminbuchungen', id)
  await updateDoc(docRef, { status: 'storniert', cancelledAt: serverTimestamp() })

  if (datum && uhrzeit) {
    const slotId = `${datum}_${uhrzeit}`
    await deleteDoc(doc(db, 'belegteSlots', slotId))
  }
}

// ── Gebuchte Slots pro Datum (für Kalender-Sperrung) ─────────────────────────

/**
 * Liest die belegten Zeitslots aus der `belegteSlots`-Collection.
 * Diese Collection enthält keine personenbezogenen Daten und darf
 * daher öffentlich gelesen werden (Firestore-Regel: allow read).
 */
export async function getBookingsMap() {
  const snapshot = await getDocs(collection(db, 'belegteSlots'))
  const map = {}
  snapshot.docs.forEach(d => {
    const { datum, uhrzeit } = d.data()
    if (!datum || !uhrzeit) return
    if (!map[datum]) map[datum] = []
    if (!map[datum].includes(uhrzeit)) map[datum].push(uhrzeit)
  })
  return map
}
