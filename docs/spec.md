# Spec Lite — EdrisJebran.com (Sci‑Fi SPA)

## Goals
- Immersive sci‑fi theme; recruiter‑friendly UX.
- Sections: Hero, About, Experience, Education, Hobbies, Contact.
- Inline CV (timeline) + downloadable PDF.
- Responsive, fast, deploy via GitHub Pages.

## Design Tokens
- Colors: primary #00F0FF, accent #A020F0, cyber #00FF88, bg #050B16.
- Fonts: Orbitron (display), Inter (body).
- Glow: `shadow-neon` + hover transitions.

## Acceptance Criteria (MVP)
- [ ] Loads in < 2s on broadband; Lighthouse Perf ≥ 90.
- [ ] Hero renders WebGL starfield; 60fps desktop; mobile fallback OK.
- [ ] Smooth scroll nav with active section offsets.
- [ ] Timeline animates in on scroll (Framer Motion).
- [ ] Social links clickable; CV download works.
- [ ] Pages deploys on push to `main`; HTTPS enabled for custom domain.
