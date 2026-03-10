import { createContext, useContext, useState, useEffect } from 'react'

const CookieContext = createContext(null)

const STORAGE_KEY = 'vio-it-cookie-consent'
const CONSENT_MAX_AGE_MS = 365 * 24 * 60 * 60 * 1000

function saveConsent(value) {
  const record = { ...value, timestamp: Date.now() }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(record))
  return record
}

function loadConsent() {
  const stored = localStorage.getItem(STORAGE_KEY)
  if (!stored) return null

  try {
    const parsed = JSON.parse(stored)
    if (parsed.timestamp && Date.now() - parsed.timestamp > CONSENT_MAX_AGE_MS) {
      localStorage.removeItem(STORAGE_KEY)
      return null
    }
    return parsed
  } catch {
    localStorage.removeItem(STORAGE_KEY)
    return null
  }
}

export function CookieProvider({ children }) {
  const [consent, setConsent] = useState(null)

  useEffect(() => {
    const stored = loadConsent()
    if (stored) setConsent(stored)
  }, [])

  const acceptAll = () => {
    const value = saveConsent({ necessary: true })
    setConsent(value)
  }

  const acceptNecessary = () => {
    const value = saveConsent({ necessary: true })
    setConsent(value)
  }

  const resetConsent = () => {
    localStorage.removeItem(STORAGE_KEY)
    setConsent(null)
  }

  return (
    <CookieContext.Provider value={{ consent, acceptAll, acceptNecessary, resetConsent }}>
      {children}
    </CookieContext.Provider>
  )
}

export const useCookieConsent = () => {
  const ctx = useContext(CookieContext)
  if (!ctx) throw new Error('useCookieConsent muss innerhalb von CookieProvider verwendet werden')
  return ctx
}
