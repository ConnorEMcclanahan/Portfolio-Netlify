// Shared Loading Screen Component
// Listens for the window load event and hides the shared
// #loader element. Dispatches 'loading-screen:hide' so any
// page-level code can react if needed.

(function () {
  'use strict';

  window.addEventListener('load', function () {
    var loader = document.getElementById('loader');
    if (loader) {
      loader.style.display = 'none';
      // Also dispatch for any listener that prefers an event
      var evt;
      try {
        evt = new CustomEvent('loading-screen:hide', { bubbles: true });
      } catch (e) {
        // Fallback for older browsers
        evt = document.createEvent('Event');
        evt.initEvent('loading-screen:hide', false, false);
      }
      loader.dispatchEvent(evt);
    }

    // The loading screen was the only thing covering the hero, so this class
    // is the "the page is actually visible now" signal. The hero entrance
    // animations (device-cascade, staggered-mockup) wait on it before they
    // play — otherwise they would run hidden behind the loader.
    if (document.body) {
      document.body.classList.add('loaded');
    }
  });
})();