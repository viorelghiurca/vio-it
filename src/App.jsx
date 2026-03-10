import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { Toaster } from 'react-hot-toast'
import { CookieProvider } from './context/CookieContext'

import Layout from './components/layout/Layout'

const colors = {
  neutral800: '#1f2937',
  neutral50:  '#f9fafb',
  accent500:  '#10b981',
  red500:     '#ef4444',
}

import HomePage from './pages/HomePage'
import UeberMichPage from './pages/UeberMichPage'
import LeistungenPage from './pages/LeistungenPage'
import KontaktPage from './pages/KontaktPage'
import ImpressumPage from './pages/legal/ImpressumPage'
import DatenschutzPage from './pages/legal/DatenschutzPage'
import CookiePage from './pages/legal/CookiePage'
import NotFoundPage from './pages/NotFoundPage'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])
  return null
}

export default function App() {
  return (
    <CookieProvider>
    <BrowserRouter>
      <ScrollToTop />
      <Toaster
        position="bottom-right"
          toastOptions={{
            duration: 5000,
            style: {
              borderRadius: '16px',
              background: colors.neutral800,
              color: colors.neutral50,
              fontSize: '14px',
              fontFamily: 'Inter, sans-serif',
            },
            success: {
              iconTheme: { primary: colors.accent500, secondary: colors.neutral50 },
            },
            error: {
              iconTheme: { primary: colors.red500, secondary: colors.neutral50 },
            },
          }}
      />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="ueber-mich" element={<UeberMichPage />} />
          <Route path="leistungen" element={<LeistungenPage />} />
          <Route path="kontakt" element={<KontaktPage />} />
          <Route path="impressum" element={<ImpressumPage />} />
          <Route path="datenschutz" element={<DatenschutzPage />} />
          <Route path="cookie-richtlinie" element={<CookiePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </CookieProvider>
  )
}
