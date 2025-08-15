import { useEffect, useState } from 'react';
import { 
  trackDeviceInfo, 
  trackBrowserInfo, 
  trackScreenInfo, 
  trackOSInfo, 
  trackLocationInfo, 
  trackUserBehavior, 
  trackPerformanceMetrics,
  ANALYTICS_CONFIG 
} from '../config/analytics';

// Cookie consent component
const CookieConsent = ({ onAccept, onDecline }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black/90 text-white p-4 z-50">
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-sm">
          <p>
            This website uses cookies and similar technologies to analyze site usage, 
            provide personalized content, and improve your experience. 
            We collect information about your device, browser, and usage patterns.
          </p>
          <p className="mt-2 text-xs opacity-80">
            By accepting, you consent to our use of cookies and data collection. 
            You can change your preferences at any time.
          </p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={onDecline}
            className="px-4 py-2 text-sm border border-gray-600 hover:border-gray-400 transition-colors"
          >
            Decline
          </button>
          <button 
            onClick={onAccept}
            className="px-4 py-2 text-sm bg-blue-600 hover:bg-blue-500 transition-colors"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
};

// Enhanced analytics component
const EnhancedAnalytics = () => {
  const [consentGiven, setConsentGiven] = useState(() => {
    return localStorage.getItem('analytics_consent') === 'true';
  });
  
  const [showConsent, setShowConsent] = useState(() => {
    return !localStorage.getItem('analytics_consent') && ANALYTICS_CONFIG.privacy.requireConsent;
  });

  const handleConsentAccept = () => {
    setConsentGiven(true);
    setShowConsent(false);
    localStorage.setItem('analytics_consent', 'true');
    
    // Track consent given
    trackUserBehavior('consent_given', { type: 'analytics' });
  };

  const handleConsentDecline = () => {
    setConsentGiven(false);
    setShowConsent(false);
    localStorage.setItem('analytics_consent', 'false');
    
    // Track consent declined
    trackUserBehavior('consent_declined', { type: 'analytics' });
  };

  useEffect(() => {
    if (!consentGiven && ANALYTICS_CONFIG.privacy.requireConsent) {
      return; // Don't track anything without consent
    }

    // Track comprehensive user information
    const trackUserInfo = () => {
      // Device information
      if (ANALYTICS_CONFIG.enhancedTracking.deviceInfo) {
        trackDeviceInfo();
      }

      // Browser information
      if (ANALYTICS_CONFIG.enhancedTracking.browserInfo) {
        trackBrowserInfo();
      }

      // Screen information
      if (ANALYTICS_CONFIG.enhancedTracking.screenInfo) {
        trackScreenInfo();
      }

      // Operating system information
      if (ANALYTICS_CONFIG.enhancedTracking.osInfo) {
        trackOSInfo();
      }

      // Location information (timezone, language)
      if (ANALYTICS_CONFIG.enhancedTracking.locationInfo) {
        trackLocationInfo();
      }

      // Performance metrics
      if (ANALYTICS_CONFIG.enhancedTracking.performanceMetrics) {
        trackPerformanceMetrics();
      }

      // Track initial page view with enhanced data
      trackUserBehavior('page_view', {
        url: window.location.href,
        referrer: document.referrer,
        user_agent: navigator.userAgent.substring(0, 100), // Truncated for privacy
      });
    };

    // Track user interactions
    const trackInteractions = () => {
      // Track scroll depth
      let maxScroll = 0;
      window.addEventListener('scroll', () => {
        const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
        if (scrollPercent > maxScroll) {
          maxScroll = scrollPercent;
          if (maxScroll % 25 === 0) { // Track every 25% scroll
            trackUserBehavior('scroll_depth', { depth: maxScroll });
          }
        }
      });

      // Track time on page
      let startTime = Date.now();
      window.addEventListener('beforeunload', () => {
        const timeOnPage = Date.now() - startTime;
        trackUserBehavior('time_on_page', { duration: timeOnPage });
      });

      // Track mouse movements (aggregated)
      let mouseMovements = 0;
      window.addEventListener('mousemove', () => {
        mouseMovements++;
        if (mouseMovements % 100 === 0) { // Track every 100 movements
          trackUserBehavior('mouse_activity', { movements: mouseMovements });
        }
      });

      // Track clicks
      document.addEventListener('click', (e) => {
        const target = e.target;
        trackUserBehavior('click', {
          element: target.tagName.toLowerCase(),
          class: target.className || 'none',
          id: target.id || 'none',
          text: target.textContent?.substring(0, 50) || 'none', // Truncated for privacy
        });
      });
    };

    // Initialize tracking
    trackUserInfo();
    trackInteractions();

    // Track session start
    trackUserBehavior('session_start', {
      session_id: Date.now().toString(),
      timestamp: new Date().toISOString(),
    });

  }, [consentGiven]);

  // Don't render anything if analytics is disabled
  if (!ANALYTICS_CONFIG.enabled) {
    return null;
  }

  return (
    <>
      {showConsent && (
        <CookieConsent 
          onAccept={handleConsentAccept}
          onDecline={handleConsentDecline}
        />
      )}
    </>
  );
};

export default EnhancedAnalytics;
