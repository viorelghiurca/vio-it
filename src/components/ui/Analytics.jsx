import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { analytics } from '../../lib/firebase';
import { logEvent } from 'firebase/analytics';
import { useCookieConsent } from '../../context/CookieContext';

function Analytics() {
  const location = useLocation();
  const { consent } = useCookieConsent();

  useEffect(() => {
    if (consent && consent.analytics) {
      logEvent(analytics, 'page_view', {
        page_path: location.pathname + location.search,
      });
    }
  }, [location, consent]);

  return null;
}

export default Analytics;
