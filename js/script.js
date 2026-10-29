// Shared client-side helpers loaded on every page. Namespaced under
// `window.Portfolio` so shared behaviour stays separate from page-specific
// scripts and does not leak loose globals.
(function () {
  'use strict';

  const api = (window.Portfolio = window.Portfolio || {});

  function smoothBehavior() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
      ? 'auto'
      : 'smooth';
  }

  // Smooth-scroll in-page anchor links (`#section`); a bare `#` scrolls to the
  // top. Delegated on the document so it also covers links components inject
  // after load (e.g. the scroll cue) without extra listeners per link.
  function initSmoothAnchorLinks() {
    document.addEventListener('click', (event) => {
      if (
        event.defaultPrevented
        || event.button !== 0
        || event.metaKey
        || event.ctrlKey
        || event.shiftKey
        || event.altKey
        || !(event.target instanceof Element)
      ) {
        return;
      }

      const link = event.target.closest('a[href^="#"]');
      if (!link) return;

      const href = link.getAttribute('href');
      if (!href) return;

      if (href === '#') {
        event.preventDefault();
        window.scrollTo({ top: 0, behavior: smoothBehavior() });
        return;
      }

      let target = null;
      try {
        target = document.querySelector(href);
      } catch (error) {
        return; // Not a valid selector — leave the click to the browser.
      }
      if (!target) return;

      event.preventDefault();
      target.scrollIntoView({ behavior: smoothBehavior() });
    });
  }

  // Reveal `.reveal` elements once as they enter the viewport, then stop
  // observing them. Falls back to revealing everything when IntersectionObserver
  // is unavailable. Waits for the loading screen to reveal the page first, so
  // reveals never play hidden behind it.
  function initRevealOnScroll() {
    const reveals = document.querySelectorAll('.reveal');
    if (!reveals.length) return;

    const start = () => {
      if (!('IntersectionObserver' in window)) {
        reveals.forEach((el) => el.classList.add('active'));
        return;
      }

      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
          }
        });
      }, { rootMargin: '0px 0px -12% 0px', threshold: 0 });

      reveals.forEach((el) => observer.observe(el));
    };

    if (document.body && document.body.classList.contains('loaded')) {
      start();
      return;
    }

    const onReveal = () => {
      document.removeEventListener('loading-screen:hide', onReveal);
      window.removeEventListener('load', onReveal);
      start();
    };
    document.addEventListener('loading-screen:hide', onReveal);
    // Safety: if the loading screen never fires (it always should), reveal
    // once the window load event has settled.
    window.addEventListener('load', onReveal);
  }

  // Mark every element matching `selector` as scroll-revealable content. Call
  // before initRevealOnScroll so the injected elements are observed too.
  function initContentReveals(selector) {
    document.querySelectorAll(selector).forEach((element) => {
      element.classList.add('reveal', 'reveal-content');
    });
  }

  api.initSmoothAnchorLinks = initSmoothAnchorLinks;
  api.initRevealOnScroll = initRevealOnScroll;
  api.initContentReveals = initContentReveals;

  document.addEventListener('DOMContentLoaded', initSmoothAnchorLinks);
})();
