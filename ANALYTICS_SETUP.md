# Google Analytics Setup Guide

## Overview
Your portfolio website is now configured with Google Analytics 4 (GA4) tracking. This guide will help you set up and customize your analytics.

## Step 1: Get Your Google Analytics Tracking ID

### Option A: Use Existing GA4 Property
If you want to use the same Google Analytics property as your other website:

1. Go to [Google Analytics](https://analytics.google.com/)
2. Select your existing property
3. Go to **Admin** → **Data Streams**
4. Click **Add Stream** → **Web**
5. Enter your website details:
   - **Website URL**: `https://edrisjebran.com`
   - **Stream name**: `Edris Portfolio`
6. Click **Create Stream**
7. Copy the **Measurement ID** (starts with `G-`)

### Option B: Create New GA4 Property
If you want a separate property for your portfolio:

1. Go to [Google Analytics](https://analytics.google.com/)
2. Click **Start measuring**
3. Follow the setup wizard
4. Create a new property for your portfolio
5. Add a web data stream for `https://edrisjebran.com`
6. Copy the **Measurement ID** (starts with `G-`)

## Step 2: Update Your Tracking ID

Replace `G-XXXXXXXXXX` in these files with your actual tracking ID:

1. **`index.html`** (line with `gtag/js?id=G-XXXXXXXXXX`)
2. **`404.html`** (line with `gtag/js?id=G-XXXXXXXXXX`)
3. **`src/config/analytics.js`** (line with `GA_TRACKING_ID = 'G-XXXXXXXXXX'`)

## Step 3: Deploy Your Changes

After updating the tracking ID:

```bash
npm run build
git add .
git commit -m "Add Google Analytics tracking"
git push origin main
```

## Step 4: Verify Installation

1. **Check Real-Time Reports**:
   - Go to Google Analytics
   - Navigate to **Reports** → **Realtime** → **Overview**
   - Visit your website
   - You should see your visit in real-time

2. **Use Browser Developer Tools**:
   - Open browser dev tools (F12)
   - Go to **Network** tab
   - Filter by "google"
   - You should see requests to `googletagmanager.com`

## Step 5: Custom Event Tracking

Your portfolio includes custom event tracking for:

### Automatic Events
- **Page views**: Tracked automatically
- **CV downloads**: Tracked when users download your CV
- **Project views**: Tracked when users view project details
- **Contact clicks**: Tracked when users click contact methods
- **Social media clicks**: Tracked when users click social links

### Manual Event Tracking
You can add custom tracking to any component:

```jsx
import { usePortfolioAnalytics } from '../hooks/useAnalytics';

function MyComponent() {
  const { trackCustomEvent } = usePortfolioAnalytics();
  
  const handleButtonClick = () => {
    trackCustomEvent('button_click', 'engagement', 'Custom Button');
  };
  
  return <button onClick={handleButtonClick}>Click me</button>;
}
```

## Step 6: Privacy and Compliance

### GDPR Compliance
- Google Analytics respects user privacy settings
- Consider adding a cookie consent banner for EU visitors
- You can implement IP anonymization if needed

### Cookie Notice
Consider adding a simple cookie notice:

```jsx
// Add to your main App component
const [showCookieNotice, setShowCookieNotice] = useState(true);

// Cookie notice component
{showCookieNotice && (
  <div className="cookie-notice">
    <p>This site uses cookies for analytics.</p>
    <button onClick={() => setShowCookieNotice(false)}>Accept</button>
  </div>
)}
```

## Step 7: Analytics Dashboard Setup

### Recommended Reports
1. **Audience Overview**: Basic visitor metrics
2. **Traffic Sources**: Where visitors come from
3. **Page Views**: Most popular sections
4. **Events**: Custom interactions
5. **User Engagement**: Time on site, bounce rate

### Custom Dimensions (Optional)
You can set up custom dimensions for:
- **Project categories**: Track which types of projects get most attention
- **Visitor type**: Recruiters vs. developers vs. general public
- **Content sections**: Which parts of your portfolio are most viewed

## Troubleshooting

### Common Issues

1. **No data appearing**:
   - Check if tracking ID is correct
   - Verify the script is loading (check Network tab)
   - Wait 24-48 hours for data to appear

2. **Duplicate tracking**:
   - Ensure tracking ID is only added once per page
   - Check for multiple GA installations

3. **Blocked by ad blockers**:
   - Some users may block analytics
   - Consider implementing fallback tracking

### Testing Commands
```bash
# Test if GA is loading
curl -I https://www.googletagmanager.com/gtag/js

# Check for tracking requests
# Use browser dev tools Network tab and filter by "google"
```

## Advanced Features

### Enhanced Ecommerce (Optional)
If you want to track portfolio interactions as "purchases":

```jsx
// Track project view as "view_item"
gtag('event', 'view_item', {
  currency: 'USD',
  value: 0, // No actual value, just for tracking
  items: [{
    item_id: projectName,
    item_name: projectName,
    item_category: 'portfolio_project'
  }]
});
```

### Custom Metrics
Track portfolio-specific metrics:
- **Time spent on projects section**
- **CV download rate**
- **Contact form submissions**
- **Social media engagement**

## Support

If you encounter issues:
- Check [Google Analytics Help Center](https://support.google.com/analytics/)
- Verify your tracking ID is correct
- Test with browser developer tools
- Check for JavaScript errors in console

Your analytics will help you understand:
- Which projects attract the most attention
- How visitors navigate your portfolio
- Which contact methods are most effective
- Where your traffic comes from
