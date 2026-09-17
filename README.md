# Connor McClanahan Portfolio

A personal portfolio site showcasing UI/UX and front-end development work, with detailed case-study pages for internship, university, and minor projects.

## Overview

This repository contains a static multi-page portfolio built with HTML, CSS, and vanilla JavaScript, deployed on Netlify straight from the repository root — no build step, bundler, or package manager required.

The site is assembled from small self-contained components (each ships its own CSS + JS), shared case-study modules that build every project page, and page-specific scripts/styles for anything unique to a single page.

## Pages

- Home: `index.html`
- About: `pages/about.html`
- Diplora — ECG companion app (internship): `pages/diplora.html`
- Philips — AI-powered museum feedback wall (AI for Society minor): `pages/phillipswall.html`
- Fontys FitPhone — community wellness app: `pages/fitphone.html`
- Motivate — factory-floor PWA: `pages/motivate.html`
- Thank You: `pages/thankyou.html`

Legacy root-level URLs (e.g. `/about.html`) are 301-redirected to their current `pages/` locations through Netlify's `_redirects` file.

## Tech Stack

- HTML5
- CSS3 (native custom properties for design tokens)
- Vanilla JavaScript (ES modules, one component per feature)
- Fonts & icons: Google Fonts (Plus Jakarta Sans, Syne), Ionicons, Font Awesome
- Three.js + Vanta.js — animated globe behind the homepage hero

## Project Structure

```text
.
├── components/                  # Reusable components (each with its own CSS/JS)
│   ├── navbar/
│   ├── footer/
│   ├── loading-screen/          # Fade-out loading screen
│   ├── custom-cursor/           # Custom cursor on case-study pages
│   ├── scroll-cue/
│   ├── device-cascade/          # Cascading phone/tablet mockups
│   ├── staggered-mockup/        # Staggered wave of device screens
│   └── project-page/            # Shared case-study section modules
├── images/
│   ├── diplora/
│   ├── mockups/                 # Homepage mockup fans (home, activity, journal, ...)
│   ├── motivate/
│   └── phillipswall/
├── js/
│   ├── pages/                   # Page-specific scripts (incl. Philips wall demos)
│   ├── script.js
│   └── vantaglobe.js            # Vanta globe for the hero
├── pages/                       # All secondary pages (about, case studies, thankyou)
├── pdfs/                        # Resume, research and project documents
├── styles/
│   ├── pages/                   # Page-specific stylesheets
│   ├── style.css                # Main stylesheet
│   ├── frontend.css
│   └── mobile-responsive.css
├── _redirects                   # Netlify 301s for legacy URLs
└── index.html                   # Homepage
```

## Local Development

This is a fully static site — there is nothing to install. Serve the root folder with any static server.

Option A (VS Code):
- Use the Live Server extension and open `index.html`.

Option B (Node):
```bash
npx serve .
```

Option C (Python):
```bash
python -m http.server
```

## Deployment

The site deploys to Netlify by connecting this repository and publishing from the root directory. The `_redirects` file handles 301 redirects from legacy root-level routes to the current `pages/` locations.

## Architecture Notes

- Components in `components/` are self-contained: each ships its own CSS and JS and can be dropped into any page.
- Case-study pages are assembled from shared modules in `components/project-page/` (intro summaries, persona grids, POV/HMW boards, comparison tables/matrices, insights, final columns, etc.) so every project page stays consistent.
- Page-specific behavior lives in `js/pages/`; page-specific styling lives in `styles/pages/`.
- The Philips case study embeds an interactive parallax version of the feedback wall (`js/pages/phillipswall-demo.js`), and the homepage shows an auto-playing mini version inside a TV mockup (`js/pages/index-phillips-tv.js`).

## Author

Connor McClanahan
- GitHub: https://github.com/ConnorEMcclanahan
