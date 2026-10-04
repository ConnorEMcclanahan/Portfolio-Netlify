// Hides the shared #loader on window load.
(function () {
  'use strict';

  var hidden = false;

  function hideLoader() {
    if (hidden) {
      return;
    }
    hidden = true;

    var loader = document.getElementById('loader');
    if (loader) {
      loader.style.display = 'none';
      var evt;
      try {
        evt = new CustomEvent('loading-screen:hide', { bubbles: true });
      } catch (e) {
        evt = document.createEvent('Event');
        evt.initEvent('loading-screen:hide', false, false);
      }
      loader.dispatchEvent(evt);
    }

    // Signals to hero entrance animations that the page is visible.
    if (document.body) {
      document.body.classList.add('loaded');
    }
  }

  window.addEventListener('load', hideLoader);
  // Fallback: never keep the loader up longer than ~2s.
  window.setTimeout(hideLoader, 2000);
})();