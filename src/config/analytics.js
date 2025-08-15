// Google Analytics Configuration
export const GA_TRACKING_ID = 'G-QT3D71QPBK'; // Your GA4 tracking ID

// Analytics Configuration - Choose what to track
export const ANALYTICS_CONFIG = {
  // Enable/disable Google Analytics entirely
  enabled: true,
  
  // Track page views (basic analytics)
  trackPageViews: true,
  
  // Track specific events
  events: {
    // Project interactions
    projectViews: true,
    projectClicks: true,
    
    // CV/Resume interactions
    cvDownloads: true,
    resumeViews: true,
    
    // Contact interactions
    contactClicks: true,
    emailClicks: true,
    linkedinClicks: true,
    
    // Social media interactions
    socialClicks: true,
    githubClicks: true,
    
    // Navigation interactions
    navigationClicks: true,
    sectionViews: true,
    
    // Custom events
    customEvents: true,
  },
  
  // Privacy settings
  privacy: {
    // Anonymize IP addresses (REQUIRED for privacy compliance)
    anonymizeIP: true,
    // Respect Do Not Track
    respectDNT: true,
    // Cookie consent required (RECOMMENDED for comprehensive tracking)
    requireConsent: true,
    // Enhanced privacy settings
    enhancedPrivacy: {
      // Don't track exact location
      preciseLocation: false,
      // Don't track cross-site behavior
      crossSiteTracking: false,
      // Don't track personal identifiers
      personalIdentifiers: false,
    }
  },
  
  // Enhanced tracking dimensions (privacy-compliant)
  enhancedTracking: {
    // Device and browser information
    deviceInfo: true,
    browserInfo: true,
    screenInfo: true,
    osInfo: true,
    
    // Location information (country/city level only)
    locationInfo: true,
    timezoneInfo: true,
    
    // User behavior
    userBehavior: true,
    sessionInfo: true,
    
    // Performance metrics
    performanceMetrics: true,
    
    // Custom dimensions
    customDimensions: {
      visitorType: true,      // Recruiter vs developer vs general
      projectCategory: true,  // Project categories
      contentSection: true,   // Content sections
      userIntent: true,       // Job hunting vs browsing
    }
  }
};

// Check if analytics should be enabled
export const isAnalyticsEnabled = () => {
  return ANALYTICS_CONFIG.enabled && typeof window !== 'undefined';
};

// Check if specific event tracking is enabled
export const isEventEnabled = (eventName) => {
  return isAnalyticsEnabled() && ANALYTICS_CONFIG.events[eventName];
};

// Google Analytics event tracking functions
export const trackPageView = (url) => {
  if (isAnalyticsEnabled() && ANALYTICS_CONFIG.trackPageViews && window.gtag) {
    window.gtag('config', GA_TRACKING_ID, {
      page_location: url,
      anonymize_ip: ANALYTICS_CONFIG.privacy.anonymizeIP,
    });
  }
};

export const trackEvent = (action, category, label, value) => {
  if (isAnalyticsEnabled() && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
      anonymize_ip: ANALYTICS_CONFIG.privacy.anonymizeIP,
    });
  }
};

// Conditional event tracking functions
export const trackProjectView = (projectName) => {
  if (isEventEnabled('projectViews')) {
    trackEvent('project_view', 'engagement', projectName);
  }
};

export const trackProjectClick = (projectName) => {
  if (isEventEnabled('projectClicks')) {
    trackEvent('project_click', 'engagement', projectName);
  }
};

export const trackCVDownload = () => {
  if (isEventEnabled('cvDownloads')) {
    trackEvent('cv_download', 'engagement', 'CV Download');
  }
};

export const trackResumeView = () => {
  if (isEventEnabled('resumeViews')) {
    trackEvent('resume_view', 'engagement', 'Resume View');
  }
};

export const trackContactClick = (method) => {
  if (isEventEnabled('contactClicks')) {
    trackEvent('contact_click', 'engagement', method);
  }
};

export const trackEmailClick = () => {
  if (isEventEnabled('emailClicks')) {
    trackEvent('email_click', 'engagement', 'Email Contact');
  }
};

export const trackLinkedInClick = () => {
  if (isEventEnabled('linkedinClicks')) {
    trackEvent('linkedin_click', 'engagement', 'LinkedIn Profile');
  }
};

export const trackSocialClick = (platform) => {
  if (isEventEnabled('socialClicks')) {
    trackEvent('social_click', 'engagement', platform);
  }
};

export const trackGithubClick = () => {
  if (isEventEnabled('githubClicks')) {
    trackEvent('github_click', 'engagement', 'GitHub Profile');
  }
};

export const trackNavigationClick = (section) => {
  if (isEventEnabled('navigationClicks')) {
    trackEvent('navigation_click', 'engagement', section);
  }
};

export const trackSectionView = (section) => {
  if (isEventEnabled('sectionViews')) {
    trackEvent('section_view', 'engagement', section);
  }
};

export const trackCustomEvent = (action, category, label, value) => {
  if (isEventEnabled('customEvents')) {
    trackEvent(action, category, label, value);
  }
};

// Enhanced tracking functions (privacy-compliant)
export const trackDeviceInfo = () => {
  if (isAnalyticsEnabled() && ANALYTICS_CONFIG.enhancedTracking.deviceInfo && window.gtag) {
    const userAgent = navigator.userAgent;
    const isMobile = /Mobile|Android|iPhone|iPad/.test(userAgent);
    const isTablet = /iPad|Android(?=.*\bMobile\b)(?=.*\bSafari\b)/.test(userAgent);
    
    let deviceType = 'desktop';
    if (isTablet) deviceType = 'tablet';
    else if (isMobile) deviceType = 'mobile';
    
    window.gtag('event', 'device_info', {
      event_category: 'system',
      event_label: deviceType,
      custom_map: {
        'device_type': deviceType,
        'user_agent': userAgent.substring(0, 100), // Truncated for privacy
      }
    });
  }
};

export const trackBrowserInfo = () => {
  if (isAnalyticsEnabled() && ANALYTICS_CONFIG.enhancedTracking.browserInfo && window.gtag) {
    const browser = getBrowserInfo();
    
    window.gtag('event', 'browser_info', {
      event_category: 'system',
      event_label: browser.name,
      custom_map: {
        'browser_name': browser.name,
        'browser_version': browser.version,
        'browser_language': navigator.language,
      }
    });
  }
};

export const trackScreenInfo = () => {
  if (isAnalyticsEnabled() && ANALYTICS_CONFIG.enhancedTracking.screenInfo && window.gtag) {
    window.gtag('event', 'screen_info', {
      event_category: 'system',
      event_label: `${screen.width}x${screen.height}`,
      custom_map: {
        'screen_width': screen.width,
        'screen_height': screen.height,
        'color_depth': screen.colorDepth,
        'pixel_ratio': window.devicePixelRatio || 1,
      }
    });
  }
};

export const trackOSInfo = () => {
  if (isAnalyticsEnabled() && ANALYTICS_CONFIG.enhancedTracking.osInfo && window.gtag) {
    const os = getOSInfo();
    
    window.gtag('event', 'os_info', {
      event_category: 'system',
      event_label: os.name,
      custom_map: {
        'os_name': os.name,
        'os_version': os.version,
        'platform': navigator.platform,
      }
    });
  }
};

export const trackLocationInfo = () => {
  if (isAnalyticsEnabled() && ANALYTICS_CONFIG.enhancedTracking.locationInfo && window.gtag) {
    // Note: This requires user consent and IP geolocation service
    // We'll use a privacy-compliant approach
    window.gtag('event', 'location_info', {
      event_category: 'system',
      event_label: 'location_detected',
      custom_map: {
        'timezone': Intl.DateTimeFormat().resolvedOptions().timeZone,
        'language': navigator.language,
        'languages': navigator.languages?.join(',') || navigator.language,
      }
    });
  }
};

export const trackUserBehavior = (action, details = {}) => {
  if (isAnalyticsEnabled() && ANALYTICS_CONFIG.enhancedTracking.userBehavior && window.gtag) {
    window.gtag('event', 'user_behavior', {
      event_category: 'engagement',
      event_label: action,
      custom_map: {
        'action': action,
        'timestamp': Date.now(),
        'session_id': getSessionId(),
        ...details
      }
    });
  }
};

export const trackPerformanceMetrics = () => {
  if (isAnalyticsEnabled() && ANALYTICS_CONFIG.enhancedTracking.performanceMetrics && window.gtag) {
    // Track page load performance
    window.addEventListener('load', () => {
      setTimeout(() => {
        const perfData = performance.getEntriesByType('navigation')[0];
        if (perfData) {
          window.gtag('event', 'performance_metrics', {
            event_category: 'performance',
            event_label: 'page_load',
            custom_map: {
              'load_time': perfData.loadEventEnd - perfData.loadEventStart,
              'dom_content_loaded': perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart,
              'first_paint': performance.getEntriesByName('first-paint')[0]?.startTime || 0,
              'first_contentful_paint': performance.getEntriesByName('first-contentful-paint')[0]?.startTime || 0,
            }
          });
        }
      }, 0);
    });
  }
};

// Helper functions
const getBrowserInfo = () => {
  const userAgent = navigator.userAgent;
  let browser = { name: 'Unknown', version: 'Unknown' };
  
  if (userAgent.includes('Chrome')) {
    browser.name = 'Chrome';
    browser.version = userAgent.match(/Chrome\/(\d+)/)?.[1] || 'Unknown';
  } else if (userAgent.includes('Firefox')) {
    browser.name = 'Firefox';
    browser.version = userAgent.match(/Firefox\/(\d+)/)?.[1] || 'Unknown';
  } else if (userAgent.includes('Safari')) {
    browser.name = 'Safari';
    browser.version = userAgent.match(/Version\/(\d+)/)?.[1] || 'Unknown';
  } else if (userAgent.includes('Edge')) {
    browser.name = 'Edge';
    browser.version = userAgent.match(/Edge\/(\d+)/)?.[1] || 'Unknown';
  }
  
  return browser;
};

const getOSInfo = () => {
  const userAgent = navigator.userAgent;
  let os = { name: 'Unknown', version: 'Unknown' };
  
  if (userAgent.includes('Windows')) {
    os.name = 'Windows';
    os.version = userAgent.match(/Windows NT (\d+\.\d+)/)?.[1] || 'Unknown';
  } else if (userAgent.includes('Mac')) {
    os.name = 'macOS';
    os.version = userAgent.match(/Mac OS X (\d+_\d+)/)?.[1]?.replace('_', '.') || 'Unknown';
  } else if (userAgent.includes('Linux')) {
    os.name = 'Linux';
    os.version = 'Unknown';
  } else if (userAgent.includes('Android')) {
    os.name = 'Android';
    os.version = userAgent.match(/Android (\d+\.\d+)/)?.[1] || 'Unknown';
  } else if (userAgent.includes('iOS')) {
    os.name = 'iOS';
    os.version = userAgent.match(/OS (\d+_\d+)/)?.[1]?.replace('_', '.') || 'Unknown';
  }
  
  return os;
};

const getSessionId = () => {
  if (!sessionStorage.getItem('analytics_session_id')) {
    sessionStorage.setItem('analytics_session_id', Date.now().toString());
  }
  return sessionStorage.getItem('analytics_session_id');
};
