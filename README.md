# Edris Jebran — Sci‑Fi Portfolio (React + Vite)

## Quick Start
```bash
npm install
npm run dev
```

## Build
```bash
npm run build
npm run preview
```

## Deploy (GitHub Pages via Actions)
- Push to `main`. The workflow builds to `dist/` and publishes to `gh-pages` branch.
- In GitHub → Settings → Pages: attach custom domain (edrisjebran.com) and enable HTTPS.

## Squarespace DNS → GitHub Pages
- A (@): 185.199.108.153 / 109.153 / 110.153 / 111.153
- CNAME (www): <your-username>.github.io

## SPA Fallback
A postbuild script copies `dist/index.html` to `dist/404.html` to support deep links on Pages.

## Analytics
- Copy `.env.example` to `.env` and set `VITE_GA4_ID` or `VITE_PLAUSIBLE_DOMAIN`.

## Testing
```
npm run test
```

## Linting/Formatting
Add your editor integrations for ESLint and Prettier.
