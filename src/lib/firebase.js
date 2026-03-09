import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAnalytics, setAnalyticsCollectionEnabled, isSupported } from 'firebase/analytics'

const firebaseConfig = {
  apiKey:            import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain:        import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId:         import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket:     import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId:             import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId:     import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)

let analyticsInstance = null

export const initAnalytics = async () => {
  const supported = await isSupported()
  if (supported) {
    analyticsInstance = getAnalytics(app)
    setAnalyticsCollectionEnabled(analyticsInstance, true)
    return analyticsInstance
  }
  return null
}

export const disableAnalytics = async () => {
  const supported = await isSupported()
  if (supported) {
    const analytics = getAnalytics(app)
    setAnalyticsCollectionEnabled(analytics, false)
    analyticsInstance = null
  }
}

export default app
