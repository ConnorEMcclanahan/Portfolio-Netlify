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
  });
})();