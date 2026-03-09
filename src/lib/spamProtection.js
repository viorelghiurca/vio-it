const COOLDOWN_MS = 60_000

/**
 * Prüft, ob eine Formular-Absendung als Spam gilt.
 * @param {{ honeypot: string, formId: string }} opts
 * @returns {{ blocked: boolean, reason?: string }}
 */
export function checkSpam({ honeypot, formId }) {
  if (honeypot) {
    return { blocked: true, reason: 'bot' }
  }

  const key = `_lastSubmit_${formId}`
  const last = Number(localStorage.getItem(key) || 0)
  const now = Date.now()

  if (now - last < COOLDOWN_MS) {
    const waitSec = Math.ceil((COOLDOWN_MS - (now - last)) / 1000)
    return { blocked: true, reason: `Bitte warten Sie noch ${waitSec} Sekunden.` }
  }

  return { blocked: false }
}

/**
 * Markiert ein Formular als gerade abgesendet (setzt Cooldown-Timestamp).
 */
export function markSubmitted(formId) {
  localStorage.setItem(`_lastSubmit_${formId}`, String(Date.now()))
}
