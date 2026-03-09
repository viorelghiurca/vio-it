import { createContext, useContext, useState, useEffect } from 'react'
import { initAnalytics, disableAnalytics } from '../lib/firebase'

const CookieContext = createContext(null)

const STORAGE_KEY = 'vio-it-cookie-consent'
const CONSENT_MAX_AGE_MS = 365 * 24 * 60 * 60 * 1000 // 1 Jahr

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
    if (stored) {
      setConsent(stored)
      if (stored.analytics) {
        initAnalytics()
      }
    }
  }, [])

  const acceptAll = () => {
    const value = saveConsent({ necessary: true, analytics: true, marketing: false })
    setConsent(value)
    initAnalytics()
  }

  const acceptNecessary = () => {
    const value = saveConsent({ necessary: true, analytics: false, marketing: false })
    setConsent(value)
    disableAnalytics()
  }

  const updateConsent = (newConsent) => {
    const value = saveConsent({ necessary: true, ...newConsent })
    setConsent(value)
    if (value.analytics) {
      initAnalytics()
    } else {
      disableAnalytics()
    }
  }

  const resetConsent = () => {
    localStorage.removeItem(STORAGE_KEY)
    setConsent(null)
    disableAnalytics()
  }

  return (
    <CookieContext.Provider value={{ consent, acceptAll, acceptNecessary, updateConsent, resetConsent }}>
      {children}
    </CookieContext.Provider>
  )
}

export const useCookieConsent = () => {
  const ctx = useContext(CookieContext)
  if (!ctx) throw new Error('useCookieConsent muss innerhalb von CookieProvider verwendet werden')
  return ctx
}
