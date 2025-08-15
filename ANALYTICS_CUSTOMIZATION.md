# Analytics Customization Guide

## Overview
Your portfolio analytics system is highly customizable. You can choose exactly what to track, enable/disable specific features, and configure privacy settings.

## Quick Configuration

### 1. **Disable Analytics Entirely**
To turn off all analytics tracking:

```javascript
// In src/config/analytics.js
export const ANALYTICS_CONFIG = {
  enabled: false,  // This disables all tracking
  // ... rest of config
};
```

### 2. **Enable Only Basic Page Views**
For minimal tracking:

```javascript
export const ANALYTICS_CONFIG = {
  enabled: true,
  trackPageViews: true,
  events: {
    projectViews: false,
    projectClicks: false,
    cvDownloads: false,
    resumeViews: false,
    contactClicks: false,
    emailClicks: false,
    linkedinClicks: false,
    socialClicks: false,
    githubClicks: false,
    navigationClicks: false,
    sectionViews: false,
    customEvents: false,
  },
  // ... rest of config
};
```

### 3. **Track Only What Matters to You**
Choose specific events you want to track:

```javascript
export const ANALYTICS_CONFIG = {
  enabled: true,
  trackPageViews: true,
  events: {
    // Only track CV downloads and contact clicks
    projectViews: false,
    projectClicks: false,
    cvDownloads: true,      // Track when people download your CV
    resumeViews: false,
    contactClicks: true,    // Track when people contact you
    emailClicks: true,      // Track email clicks specifically
    linkedinClicks: true,   // Track LinkedIn clicks
    socialClicks: false,
    githubClicks: true,     // Track GitHub clicks
    navigationClicks: false,
    sectionViews: false,
    customEvents: true,     // Allow custom events
  },
  // ... rest of config
};
```

## Detailed Configuration Options

### **Main Settings**
```javascript
export const ANALYTICS_CONFIG = {
  // Master switch - disable all analytics
  enabled: true,
  
  // Basic page view tracking
  trackPageViews: true,
  
  // Event-specific tracking
  events: {
    // Project interactions
    projectViews: true,     // When someone views a project
    projectClicks: true,    // When someone clicks on a project
    
    // CV/Resume interactions
    cvDownloads: true,      // When someone downloads your CV
    resumeViews: true,      // When someone views your resume page
    
    // Contact interactions
    contactClicks: true,    // General contact clicks
    emailClicks: true,      // Email contact clicks
    linkedinClicks: true,   // LinkedIn profile clicks
    
    // Social media interactions
    socialClicks: true,     // General social media clicks
    githubClicks: true,     // GitHub profile clicks
    
    // Navigation interactions
    navigationClicks: true, // Menu/navigation clicks
    sectionViews: true,     // When someone views a section
    
    // Custom events
    customEvents: true,     // Allow custom event tracking
  },
  
  // Privacy settings
  privacy: {
    anonymizeIP: true,      // Hide visitor IP addresses
    respectDNT: true,       // Respect "Do Not Track" headers
    requireConsent: false,  // Require cookie consent
  },
  
  // Advanced features
  customDimensions: {
    visitorType: false,     // Track if visitor is recruiter/developer
    projectCategory: false, // Track project categories
    contentSection: false,  // Track content sections
  }
};
```

## Privacy-Focused Configuration

### **Minimal Privacy-Friendly Setup**
```javascript
export const ANALYTICS_CONFIG = {
  enabled: true,
  trackPageViews: true,
  events: {
    // Only track essential business metrics
    cvDownloads: true,      // Track CV downloads (important for job hunting)
    contactClicks: true,    // Track contact attempts
    // Disable everything else
    projectViews: false,
    projectClicks: false,
    resumeViews: false,
    emailClicks: false,
    linkedinClicks: false,
    socialClicks: false,
    githubClicks: false,
    navigationClicks: false,
    sectionViews: false,
    customEvents: false,
  },
  privacy: {
    anonymizeIP: true,      // Always anonymize IPs
    respectDNT: true,       // Respect privacy preferences
    requireConsent: true,   // Require explicit consent
  },
  customDimensions: {
    visitorType: false,
    projectCategory: false,
    contentSection: false,
  }
};
```

## Business-Focused Configuration

### **Recruiter-Friendly Setup**
```javascript
export const ANALYTICS_CONFIG = {
  enabled: true,
  trackPageViews: true,
  events: {
    // Track what recruiters care about
    cvDownloads: true,      // CV downloads = serious interest
    contactClicks: true,    // Contact attempts
    emailClicks: true,      // Email contact
    linkedinClicks: true,   // LinkedIn profile views
    projectViews: true,     // Which projects get attention
    projectClicks: true,    // Project engagement
    // Less important for recruiters
    resumeViews: false,
    socialClicks: false,
    githubClicks: false,
    navigationClicks: false,
    sectionViews: false,
    customEvents: true,
  },
  privacy: {
    anonymizeIP: true,
    respectDNT: true,
    requireConsent: false,
  },
  customDimensions: {
    visitorType: true,      // Try to identify recruiter vs developer
    projectCategory: true,  // Track project categories
    contentSection: false,
  }
};
```

## Using Analytics in Components

### **Basic Usage**
```jsx
import { usePortfolioAnalytics } from '../hooks/useAnalytics';

function ProjectCard({ project }) {
  const { trackProject, trackProjectInteraction } = usePortfolioAnalytics();
  
  const handleView = () => {
    trackProject(project.name);
  };
  
  const handleClick = () => {
    trackProjectInteraction(project.name, 'click');
  };
  
  return (
    <div onClick={handleClick} onMouseEnter={handleView}>
      <h3>{project.name}</h3>
    </div>
  );
}
```

### **Conditional Tracking**
```jsx
function ContactButton() {
  const { trackEmail, isEnabled } = usePortfolioAnalytics();
  
  const handleClick = () => {
    if (isEnabled()) {
      trackEmail();
    }
    // Always perform the action, regardless of analytics
    window.location.href = 'mailto:edrisjebran@hotmail.com';
  };
  
  return <button onClick={handleClick}>Email Me</button>;
}
```

### **Custom Events**
```jsx
function CustomComponent() {
  const { trackCustom } = usePortfolioAnalytics();
  
  const handleSpecialAction = () => {
    trackCustom('special_action', 'engagement', 'Custom Button Click', 1);
  };
  
  return <button onClick={handleSpecialAction}>Special Action</button>;
}
```

## Common Configuration Scenarios

### **Scenario 1: Job Hunting Focus**
```javascript
// Track what matters for job applications
events: {
  cvDownloads: true,      // Most important
  contactClicks: true,    // Recruiter interest
  projectViews: true,     // Project interest
  emailClicks: true,      // Direct contact
  linkedinClicks: true,   // Professional networking
  // Disable less important tracking
  projectClicks: false,
  resumeViews: false,
  socialClicks: false,
  githubClicks: false,
  navigationClicks: false,
  sectionViews: false,
  customEvents: false,
}
```

### **Scenario 2: Developer Community Focus**
```javascript
// Track developer community engagement
events: {
  githubClicks: true,     // Developer networking
  projectViews: true,     // Code project interest
  projectClicks: true,    // Project engagement
  socialClicks: true,     // Community engagement
  // Less important for developers
  cvDownloads: false,
  contactClicks: false,
  emailClicks: false,
  linkedinClicks: false,
  resumeViews: false,
  navigationClicks: false,
  sectionViews: false,
  customEvents: true,
}
```

### **Scenario 3: Privacy-First Approach**
```javascript
// Minimal tracking for privacy-conscious users
events: {
  cvDownloads: true,      // Only essential business metric
  // Disable everything else
  projectViews: false,
  projectClicks: false,
  resumeViews: false,
  contactClicks: false,
  emailClicks: false,
  linkedinClicks: false,
  socialClicks: false,
  githubClicks: false,
  navigationClicks: false,
  sectionViews: false,
  customEvents: false,
}
```

## Testing Your Configuration

### **Check What's Enabled**
```jsx
function AnalyticsDebug() {
  const { getAnalyticsConfig, isEnabled } = usePortfolioAnalytics();
  
  const config = getAnalyticsConfig();
  
  return (
    <div>
      <p>Analytics Enabled: {isEnabled() ? 'Yes' : 'No'}</p>
      <p>Page Views: {config.trackPageViews ? 'Yes' : 'No'}</p>
      <p>CV Downloads: {config.events.cvDownloads ? 'Yes' : 'No'}</p>
      {/* Add more as needed */}
    </div>
  );
}
```

## Best Practices

1. **Start Minimal**: Begin with basic page views and essential events
2. **Add Gradually**: Enable more tracking as you understand what's useful
3. **Respect Privacy**: Always anonymize IPs and respect user preferences
4. **Focus on Value**: Track events that provide actionable insights
5. **Test Thoroughly**: Verify tracking works before deploying

## Troubleshooting

### **Analytics Not Working**
1. Check if `enabled: true` in config
2. Verify your GA tracking ID is correct
3. Check browser console for errors
4. Ensure events are enabled in the config

### **Too Much Data**
1. Disable unnecessary events
2. Use more specific event tracking
3. Focus on high-value interactions only

### **Privacy Concerns**
1. Enable `anonymizeIP: true`
2. Enable `respectDNT: true`
3. Consider `requireConsent: true`
4. Disable non-essential tracking

Your analytics configuration is now fully customizable to match your specific needs and privacy preferences!
