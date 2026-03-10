import { createContext, useContext, useState, useEffect } from 'react';
import { analytics } from '../lib/firebase';
import { setAnalyticsCollectionEnabled } from 'firebase/analytics';

const CookieContext = createContext(null);

const STORAGE_KEY = 'vio-it-cookie-consent';
const CONSENT_MAX_AGE_MS = 365 * 24 * 60 * 60 * 1000;

function saveConsent(value) {
  const record = { ...value, timestamp: Date.now() };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(record));
  return record;
}

function loadConsent() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return null;

  try {
    const parsed = JSON.parse(stored);
    if (parsed.timestamp && Date.now() - parsed.timestamp > CONSENT_MAX_AGE_MS) {
      localStorage.removeItem(STORAGE_KEY);
      return null;
    }
    return parsed;
  } catch {
    localStorage.removeItem(STORAGE_KEY);
    return null;
  }
}

export function CookieProvider({ children }) {
  const [consent, setConsent] = useState(null);

  useEffect(() => {
    const stored = loadConsent();
    if (stored) {
      setConsent(stored);
      if (stored.analytics) {
        setAnalyticsCollectionEnabled(analytics, true);
      } else {
        setAnalyticsCollectionEnabled(analytics, false);
      }
    } else {
      setAnalyticsCollectionEnabled(analytics, false);
    }
  }, []);

  const acceptAll = () => {
    setAnalyticsCollectionEnabled(analytics, true);
    const value = saveConsent({ necessary: true, analytics: true });
    setConsent(value);
  };

  const acceptNecessary = () => {
    setAnalyticsCollectionEnabled(analytics, false);
    const value = saveConsent({ necessary: true, analytics: false });
    setConsent(value);
  };

  const resetConsent = () => {
    setAnalyticsCollectionEnabled(analytics, false);
    localStorage.removeItem(STORAGE_KEY);
    setConsent(null);
  };

  return (
    <CookieContext.Provider value={{ consent, acceptAll, acceptNecessary, resetConsent }}>
      {children}
    </CookieContext.Provider>
  );
}

export const useCookieConsent = () => {
  const ctx = useContext(CookieContext);
  if (!ctx) throw new Error('useCookieConsent muss innerhalb von CookieProvider verwendet werden');
  return ctx;
};
