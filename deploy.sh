#!/bin/bash

echo "🚀 Deploying Sci-Fi Portfolio to GitHub Pages"
echo "=============================================="

# Check if we're in a git repository
if [ ! -d ".git" ]; then
    echo "❌ Not in a git repository. Please run 'git init' first."
    exit 1
fi

# Check if we have a remote
if ! git remote get-url origin > /dev/null 2>&1; then
    echo "📝 No remote repository found."
    echo "Please create a GitHub repository and add it as origin:"
    echo "git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git"
    echo ""
    echo "Or run these commands:"
    echo "1. Create repo on GitHub.com"
    echo "2. git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git"
    echo "3. git push -u origin main"
    echo "4. Enable GitHub Pages in repo settings"
    exit 1
fi

# Build the project
echo "🔨 Building project..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed!"
    exit 1
fi

echo "✅ Build successful!"

# Commit and push
echo "📤 Pushing to GitHub..."
git add .
git commit -m "Deploy sci-fi portfolio updates"
git push origin main

echo ""
echo "🎉 Deployment initiated!"
echo "📱 Check your GitHub repository for deployment status"
echo "🌐 Your site will be available at: https://YOUR_USERNAME.github.io/YOUR_REPO_NAME"
echo ""
echo "💡 To enable custom domain:"
echo "1. Go to repository Settings > Pages"
echo "2. Add your custom domain (e.g., edrisjebran.com)"
echo "3. Update DNS records as needed"
