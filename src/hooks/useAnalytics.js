import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { 
  trackPageView, 
  trackProjectView, 
  trackProjectClick,
  trackCVDownload, 
  trackResumeView,
  trackContactClick, 
  trackEmailClick,
  trackLinkedInClick,
  trackSocialClick, 
  trackGithubClick,
  trackNavigationClick,
  trackSectionView,
  trackCustomEvent,
  isAnalyticsEnabled,
  ANALYTICS_CONFIG
} from '../config/analytics';

// Hook for tracking page views
export const usePageTracking = () => {
  const location = useLocation();
  
  useEffect(() => {
    trackPageView(window.location.href);
  }, [location]);
};

// Hook for tracking portfolio-specific events
export const usePortfolioAnalytics = () => {
  const trackProject = (projectName) => {
    trackProjectView(projectName);
  };

  const trackProjectInteraction = (projectName, interactionType = 'view') => {
    if (interactionType === 'view') {
      trackProjectView(projectName);
    } else if (interactionType === 'click') {
      trackProjectClick(projectName);
    }
  };

  const trackCV = () => {
    trackCVDownload();
  };

  const trackResume = () => {
    trackResumeView();
  };

  const trackContact = (method) => {
    trackContactClick(method);
  };

  const trackEmail = () => {
    trackEmailClick();
  };

  const trackLinkedIn = () => {
    trackLinkedInClick();
  };

  const trackSocial = (platform) => {
    trackSocialClick(platform);
  };

  const trackGithub = () => {
    trackGithubClick();
  };

  const trackNavigation = (section) => {
    trackNavigationClick(section);
  };

  const trackSection = (section) => {
    trackSectionView(section);
  };

  const trackCustom = (action, category, label, value) => {
    trackCustomEvent(action, category, label, value);
  };

  // Get analytics configuration
  const getAnalyticsConfig = () => {
    return ANALYTICS_CONFIG;
  };

  // Check if analytics is enabled
  const isEnabled = () => {
    return isAnalyticsEnabled();
  };

  return {
    // Project tracking
    trackProject,
    trackProjectInteraction,
    
    // CV/Resume tracking
    trackCV,
    trackResume,
    
    // Contact tracking
    trackContact,
    trackEmail,
    trackLinkedIn,
    
    // Social tracking
    trackSocial,
    trackGithub,
    
    // Navigation tracking
    trackNavigation,
    trackSection,
    
    // Custom tracking
    trackCustom,
    
    // Configuration
    getAnalyticsConfig,
    isEnabled,
  };
};
