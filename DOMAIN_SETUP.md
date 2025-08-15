# Setting Up edrisjebran.com with GitHub Pages

## Overview
Your portfolio website is now configured to work with your custom domain `edrisjebran.com`. This guide will walk you through the complete setup process.

## Prerequisites
- A GitHub repository for your portfolio
- Domain ownership of `edrisjebran.com`
- Access to your domain's DNS settings

## Step 1: GitHub Repository Setup

1. **Create a GitHub repository** (if not already done):
   ```bash
   git init
   git remote add origin https://github.com/YOUR_USERNAME/edris-portfolio.git
   git add .
   git commit -m "Initial commit"
   git push -u origin main
   ```

2. **Enable GitHub Pages**:
   - Go to your repository on GitHub
   - Navigate to Settings > Pages
   - Under "Source", select "Deploy from a branch"
   - Choose "main" branch and "/ (root)" folder
   - Click "Save"

## Step 2: DNS Configuration

Configure your domain's DNS records to point to GitHub Pages:

### Option A: Using A Records (Recommended)
Add these A records in your domain's DNS settings:
```
A    @    185.199.108.153
A    @    185.199.109.153
A    @    185.199.110.153
A    @    185.199.111.153
```

### Option B: Using CNAME Record
Add this CNAME record:
```
CNAME    @    YOUR_USERNAME.github.io
```

## Step 3: GitHub Pages Custom Domain

1. In your repository Settings > Pages
2. Under "Custom domain", enter: `edrisjebran.com`
3. Check "Enforce HTTPS" (recommended)
4. Click "Save"

## Step 4: Deploy Your Site

Run the deployment script:
```bash
chmod +x deploy.sh
./deploy.sh
```

Or manually:
```bash
npm run build
git add .
git commit -m "Deploy portfolio updates"
git push origin main
```

## Step 5: Verify Setup

1. **DNS Propagation**: DNS changes can take 24-48 hours to propagate
2. **Check GitHub Pages**: Your repository should show a green checkmark for Pages
3. **Test Your Domain**: Visit `https://edrisjebran.com` to verify it works

## Troubleshooting

### Common Issues:

1. **DNS Not Propagated**:
   - Use tools like `dig edrisjebran.com` or `nslookup edrisjebran.com`
   - Wait 24-48 hours for full propagation

2. **HTTPS Not Working**:
   - Ensure "Enforce HTTPS" is checked in GitHub Pages settings
   - Wait for SSL certificate to be issued (can take up to 24 hours)

3. **404 Errors**:
   - Verify the CNAME file is in the `public/` directory
   - Check that GitHub Pages is enabled for the main branch

### Useful Commands:
```bash
# Check DNS propagation
dig edrisjebran.com
nslookup edrisjebran.com

# Test local build
npm run build
npm run preview

# Check GitHub Pages status
curl -I https://edrisjebran.com
```

## Security & Best Practices

1. **Enable HTTPS**: Always use HTTPS for production sites
2. **Keep Dependencies Updated**: Regularly update npm packages
3. **Monitor Performance**: Use tools like Lighthouse for optimization
4. **Backup**: Keep regular backups of your code and content

## Next Steps

Once your domain is working:
1. Set up analytics (Google Analytics, Plausible, etc.)
2. Configure email forwarding if needed
3. Set up monitoring for uptime
4. Consider adding a CDN for better performance

## Support

If you encounter issues:
- Check GitHub Pages documentation
- Verify DNS settings with your domain provider
- Review GitHub Pages troubleshooting guide
- Check browser developer tools for errors

Your portfolio will be live at: **https://edrisjebran.com**
