# Changelog

**Version 1: Created a basic website with just the skeleton of the portfolio I am planning to make**
- Built a basic nav bar
- Created sections so I knew how my site was to be layed out

**Version 2: I made a more advanced website with color choices and design decisions about where my skill is and what I am planning on doing**
- Added color and some flex boxes
**Version 3: I made changes and made the website responsive**
- added some images
- Made images and sections all work on mobile

**Version 4: Finally have a working site and logo that matches the rest of my site I just need to make the final stuff like creating a Database and connecting it to an API and showing it on my site**
- Made a logo and put in nav bar
- Started on making the API

**Version 5 : Made php and put it in my html to connect to local database**
- Using mysql I made a working databse but only locally

**Version 6 : Made php file seperate because it was afficting the JS and making it not work**
- I found that php in my html broke the JS

**Version 7 : Made php loop though Ajax script I wrote and this fixed the php**
- Found a short Ajax script that fixed it
**Version 8 : Made imporvments to code and added some extra header and paragraph text**
- Made it more obvious where each section of my portfolio is

**Version 9 : Connected my php to hera and created a database on hera mysql. I commented this out for now so I could work on the design more locally.**
- Got the database to display what  I needed it to display !!

**Version 10 : I connected my backend to my contact page and made it so i can recive emails once people have filled it out.**
- Made a working contact page I can recive emails from it

**Version 11 : Made some cool animations for my logo & my profile picture**
- Now when the my logo is clicked it rotates around
- When my profile picture is click(mobile) or Hovered(PC) it makes a shaking effect

**Version 12 : Made SCSS work in my portfolio & created stacking cards instead of hover & a loading effect when website is being slow**
- Big changes here I made SCSS work in my website
- Added a cool stacking effect when I scroll though my projects section
- Made a loading screen that will fade in to the website when its done

**Version 13 : Cleaned up page structure and moved more logic into reusable component files**
- Continued organizing project pages with shared modules and page-specific JS/CSS
- Reduced inline code so updates are easier to maintain

**Version 14 : Added a full README for this portfolio project**
- Documented project overview, tech stack, folder structure, and run instructions
- Added optional SCSS compile/watch commands and Netlify deployment notes

**Version 15 : Fixed Netlify 404 errors caused by broken/case-sensitive links**
- Corrected homepage links to valid page routes under /pages
- Fixed bad relative asset paths on root index page
- Updated page navbar/footer links to correct home/about routes
- Added Netlify redirects for old legacy URLs to prevent future 404s

**Version 16 : Big content overhaul — added the Philips case study and cleaned up every other page**
- Added the full Philips Museum "feedback wall" case study (AI-powered visitor feedback, my AI for Society minor project)
- Cleaned up and finished the FitPhone, Motivate and Diplora case studies
- Went through the whole site and made the copy more professional
- Switched the contact details over to my real email

**Version 17 : Reworked the About page and added site-wide polish**
- Rewrote my About Me copy and restyled the About page
- Added icon buttons and a GitHub link to the footer
- Added a "Suggested projects" section so people can jump between case studies
- Fixed the loading screen and added variations to the Philips sentiment visualisation

**Version 18 : Rebuilt the homepage as a proper project showcase**
- Redesigned the index with a cleaner structure and typography so it reads better and looks more interesting
- Every project row now shows a live visual — fanned phone mockups, tilted mockup decks, and an auto-playing "mini wall" demo inside a TV mockup for Philips
- Added a custom cursor on the case-study pages
- Fixed hover states, card design and animation smoothness

**Version 19 : Parallax and animation pass across the whole site**
- Added parallax sections to the FitPhone, Diplora and Motivate case studies and refined the parallax design
- Added a hero animation, fade-in reveals, a scroll cue and font fixes across pages
- Added internship/context badges on the homepage and case-study overviews
- Cleaned up the repo (untracked editor config, removed scratch files)

**Version 20 : CSS cleanup — removed dead rules and split oversized page stylesheets**
- Removed dead/leftover selectors across the page stylesheets (unused `header`/`header nav` blocks, `.Overview`, `.media-column`, `.pov-item`, `#navigation`, `#final-container .box`, stale `#reflection` branches, `frontend.css` reference)
- De-duplicated the custom cursor and halo styles by reusing `components/custom-cursor/custom-cursor.css` on the homepage
- Split the two largest page stylesheets into focused files: `diplora.css` → `diplora.css` + `diplora-final.css`, and `index.css` → `index.css` + `index-responsive.css` (cascade order preserved)
- Normalised file headers, removed stray run-on lines and empty placeholder rules

**Version 21 : Fixed broken routes and de-bloated the responsive CSS**
- Removed stale `_redirects`/README entries for retired pages (`/about`, `/thankyou`, `/drawphone`) and deleted the empty `drawphone.html` stub; legacy URLs now 301 to the homepage
- Dropped duplicate `loading-screen.js` includes on the Diplora and Motivate pages
- Deleted dead files: `js/pages/phillipswall-demo-fix.js`, `styles/pages/phillipswall-demo.js`, the unused `components/*/*.html` fragments, and stray `.pdf`/`.csv` assets
- Rewrote `styles/mobile-responsive.css` (523 → 284 lines): removed dead `[style*="…"]` attribute selectors, SVG rules, and legacy `#Onboarding`/`.Overview`/`.media-column` blocks, and merged duplicate media queries
- Extracted inline styles out of `pages/phillipswall.html` into the existing `.suggestion-row`/`.suggested-project-*` classes (also fixed the "You might also like" eyebrow colour)
- Removed the dead `.expanded-card` flip-card styles from `phillipswall-demo.css`
- Added a global design-token layer (`:root` custom properties) in `styles/style.css` and removed the redundant render-blocking font `@import`

**Version 22 : Deleted dead renderers and split the FitPhone stylesheet**
- Removed unused `components/project-page` renderers (`persona-grid.js`, `pov-grid.js`, `pov-hmw.js`, `questions-criteria.js`) — their `render*` functions were never called and the content (personas, POV/HMW boards) now lives in static HTML or no longer exists
- Split `styles/pages/fitphone.css` (898 lines) into `fitphone.css` + `fitphone-responsive.css`, loading the responsive file immediately after the base file to preserve cascade order

**Version 23 : Made internal links work when opened locally (file://)**
- Replaced absolute root-relative links (`/`, `/#about`, `/diplora`, `/motivate`, `/fitphone`, `/phillipswall`, `/pdfs/resume.pdf`) with relative paths so the site can be clicked through without a server (e.g. `pages/diplora.html`, `../index.html#about`, `motivate.html`)
- Fixed a broken logo reference in `pages/fitphone.html` (`../Images/logo.png` → `../images-optimized/logo.webp`)

**Version 24 : Performance pass — removed expensive compositing and layout thrash**
- Removed `mix-blend-mode: screen` from the cursor halo (a full-layer blend composited every frame) and all `backdrop-filter: blur` on the navbar, case-study nav, Philips demo, and TV mini-demo
- Stopped the custom cursor calling `getBoundingClientRect()` on every pointermove — it now only re-measures when the hover target changes
- Throttled every scroll-reveal handler with `requestAnimationFrame` so they no longer run `getBoundingClientRect()` over every `.reveal` element on every scroll event
- Skipped the WebGL Vanta globe for users with `prefers-reduced-motion`

**Version 25 : Tuned the Vanta globe (removed pointer "grab", lighter + brighter)**
- Disabled `mouseControls`/`touchControls` on the globe so it no longer follows/drags with the pointer (this was the "grab" feel) and does less per-frame work
- Reduced the globe's point grid (`points: 8`) for a lighter render
- Brightened the globe from `#6E07F3` to `#9a53ff` (the site's lighter accent) and set `color2` to match, fixing the darker-than-expected purple

**Version 26 : Load-time optimizations**
- Made the render-blocking Three.js + Vanta scripts `defer` so they no longer block first paint
- Added `preconnect` hints for Google Fonts, cdnjs, and unpkg on every page
- Merged the two Google Fonts `<link>` tags into one request per page
- Added `loading="lazy" decoding="async"` to all below-the-fold images (logos stay eager)
- Added a 2s fallback so the loading screen never blocks the page for too long

**Version 27 : Paused the Vanta globe while the hero is off-screen**
- The globe's WebGL render loop now pauses (via `IntersectionObserver`) once the hero scrolls out of view, and resumes when it returns — this stops it competing with page scroll, fixing the "grab"/stutter felt when scrolling down past the hero

**Version 28 : Kept competitor tables horizontal on mobile**
- Competitor-analysis tables and matrices no longer stack into a single column on mobile; on larger phones and tablets the columns shrink to fit, and on very small screens the rows stay horizontal and scroll sideways so they stay readable

**Version 29 : Restored the Vanta globe original look and feel**
- Returned the hero globe to its original deep-purple (#6E07F3) with the white accent dots and default point density (dropped the brighter #9a53ff colour, the monochrome `color2` override, and the `points: 8` reduction)
- Re-enabled `mouseControls`/`touchControls` so the globe rotates with the pointer again, while keeping the `defer` load, reduced-motion skip, and the off-screen render pause

**Version 30 : Brightened the hero globe and eased its scroll cost**
- Brightened the Vanta globe to the site lighter accent (#9a53ff) with white accent dots so it no longer reads as dark against the black hero
- Turned off the globe pointer-follow (`mouseControls`/`touchControls`) so it no longer grabs/catches as you scroll, and reduced the dot grid (`points: 8`) to lighten the WebGL render
- The globe now also pauses its render loop when the tab is hidden, on top of the existing pause when scrolled off-screen

**Version 31 : Frozen the hero globe into a static background**
- The Vanta globe now renders a single frame and then stops its WebGL loop, so it no longer redraws every frame and can not "grab" or jank the scroll (it scrolls like the static project-page heroes)
- Re-renders one frame on window resize so it stays crisp; pointer-follow and the off-screen/tab pause logic were removed as no longer needed
- Shrunk the dark bottom fade overlay on the hero from 40% to 18% so it no longer dims the globe

**Version 32 : Smoothed index scrolling and re-animated the globe cheaply**
- Replaced the scroll-driven reveal (which called getBoundingClientRect() on every reveal element every frame M-bM-^@M-^T the cause of the scroll grab) with an IntersectionObserver reveal
- Re-animated the Vanta globe but throttled its loop to ~30fps and capped its render resolution at 2x device-pixel-ratio, so it animates without the previous lag; removed the scroll-linked pause/resume that caused the grab when changing direction
- Reviewed the custom cursor: it already parks when idle and has no mix-blend-mode, so it was left as-is

**Version 33 : Re-enabled globe cursor-follow and fixed the index scroll CSS**
- Re-enabled `mouseControls`/`touchControls` so the Vanta globe follows the cursor again
- Changed `body { overflow-x: hidden }` to `overflow-x: clip` so `<body>` is no longer turned into a scroll container (a known cause of the index-only scroll grab)
- Removed the misleading `will-change: transform` hint on the full-screen globe canvas, which was promoting a large GPU layer and adding compositing work on every scroll frame

**Version 34 : Matched the Vanta globe to the site text purple**
- Set the globe dots to #6E07F3 (the same purple as the hero text/accent) and made them monochrome
- Set the globe background to a dark purple (#23153C) instead of black, so the whole globe reads purple rather than sitting on a black backdrop

**Version 35 : Reverted the globe background and removed the bottom fade**
- Reverted the globe background to black (the dark-purple background was not wanted)
- Removed the dark bottom-fade overlay on the hero entirely
- Kept the globe dots as the text purple (#6E07F3)

**Version 36 : Brought back the globe dots and matched them to the bottom-part purple**
- Made the Vanta globe dots unlit (MeshBasicMaterial) so they always render the true text purple (#6E07F3) instead of washing out under the white spotlight
- Restored the white globe lines/arcs (color2 back to white) so the purple dots read as distinct dots again

**Version 37 : Pinned the navbar and removed the white overscroll flash**
- Made the navbar stay fixed at the top on every project page (it was absolutely positioned inside the hero, so it scrolled away with the page)
- Gave the fixed navbar an opaque dark background so content does not show through while scrolling
- Set a dark background and dark color-scheme on the root element so the page edges never flash white when scrolling past the top or bottom

**Version 38 : Brightened the Vanta globe dots (kept the white lines)**
- Brightened the globe dots from the deep text purple (#6E07F3) to the site's lighter accent (#9A53FF) so they stand out more against the black hero
- Kept the globe's white lines/arcs (`color2`) white, so the brighter purple dots still read as distinct dots

**Version 39 : Thickened the Vanta globe lines**
- Rebuilt the globe's line meshes (sphere wireframe, outer arcs, latitude rings) as screen-space quads so they render ~2px thick instead of 1px — WebGL clamps `gl.lineWidth` to 1, so the normal `linewidth` setting has no effect in browsers

**Version 40 : Smoothed project pages and sped up their load**
- Deferred the PDF.js library and removed the redundant `pdf.worker.min.js` script tags (they were blocking first paint in the `<head>` on Motivate, FitPhone and Diplora)
- Replaced the scroll-reveal on all project pages with `IntersectionObserver` (reveal-once) instead of calling `getBoundingClientRect()` over every `.reveal` element on every scroll frame, which forced synchronous layout and made scrolling feel laggy
- Added `decoding="async"` to the lazy-loaded images so image decode no longer blocks the main thread
