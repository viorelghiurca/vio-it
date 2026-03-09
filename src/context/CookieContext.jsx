import { createContext, useContext, useState, useEffect } from 'react'
import { initAnalytics } from '../lib/firebase'

const CookieContext = createContext(null)

const STORAGE_KEY = 'vio-it-cookie-consent'

export function CookieProvider({ children }) {
  const [consent, setConsent] = useState(null) // null = noch nicht entschieden

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      const parsed = JSON.parse(stored)
      setConsent(parsed)
      if (parsed.analytics) {
        initAnalytics()
      }
    }
  }, [])

  const acceptAll = () => {
    const value = { necessary: true, analytics: true, marketing: false }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(value))
    setConsent(value)
    initAnalytics()
  }

  const acceptNecessary = () => {
    const value = { necessary: true, analytics: false, marketing: false }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(value))
    setConsent(value)
  }

  const updateConsent = (newConsent) => {
    const value = { necessary: true, ...newConsent }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(value))
    setConsent(value)
    if (value.analytics) {
      initAnalytics()
    }
  }

  const resetConsent = () => {
    localStorage.removeItem(STORAGE_KEY)
    setConsent(null)
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
