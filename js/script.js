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
  // top. Runs on DOMContentLoaded, before components inject their own links.
  function initSmoothAnchorLinks() {
    document.querySelectorAll('a[href^="#"]').forEach((link) => {
      link.addEventListener('click', (event) => {
        const href = link.getAttribute('href');
        if (!href) return;

        if (href === '#') {
          event.preventDefault();
          window.scrollTo({ top: 0, behavior: smoothBehavior() });
          return;
        }

        const target = document.querySelector(href);
        if (!target) return;

        event.preventDefault();
        target.scrollIntoView({ behavior: smoothBehavior() });
      });
    });
  }

  // Reveal `.reveal` elements once as they enter the viewport, then stop
  // observing them. Falls back to revealing everything when IntersectionObserver
  // is unavailable.
  function initRevealOnScroll() {
    const reveals = document.querySelectorAll('.reveal');
    if (!reveals.length) return;

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
