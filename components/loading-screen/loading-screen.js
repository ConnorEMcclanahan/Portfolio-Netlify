// Shared loading-screen behaviour.
//
// While the loader covers the page, every <img> on the page (including the
// native-lazy ones below the fold) is force-fetched and decoded, so nothing
// pops into view while the user scrolls. The site is revealed once images,
// fonts and the window load event have all settled — capped by a hard
// timeout so slow connections are never held hostage.
//
// Images are also tagged with `.is-loaded` the moment they finish (or fail)
// so they fade in via CSS instead of appearing abruptly. The loader itself
// fades out and is removed from the DOM once the fade has finished.
(function () {
  'use strict';

  var MAX_LOADER_MS = 2500;
  var LOADER_REMOVE_DELAY_MS = 600;
  var hidden = false;

  function dispatchHide() {
    if (hidden) {
      return;
    }
    hidden = true;

    var loader = document.getElementById('loader');
    if (loader) {
      loader.classList.add('loading-screen--hidden');

      var evt;
      try {
        evt = new CustomEvent('loading-screen:hide', { bubbles: true });
      } catch (e) {
        evt = document.createEvent('Event');
        evt.initEvent('loading-screen:hide', true, false);
      }
      loader.dispatchEvent(evt);

      // Remove the element once the fade-out has finished so it can never
      // intercept pointer events or keep compositing.
      window.setTimeout(function () {
        if (loader.parentNode) {
          loader.parentNode.removeChild(loader);
        }
      }, LOADER_REMOVE_DELAY_MS);
    }

    // Safety net: nothing may stay invisible once the site is revealed.
    var imgs = document.querySelectorAll('img');
    for (var i = 0; i < imgs.length; i++) {
      imgs[i].classList.add('is-loaded');
    }

    // Signals hero/entrance animations that the page is visible.
    if (document.body) {
      document.body.classList.add('loaded');
    }
  }

  // Force-fetch one URL; resolves on load, error, or decode completion.
  function preload(src) {
    return new Promise(function (resolve) {
      var image = new Image();
      var done = false;
      function finish() {
        if (done) {
          return;
        }
        done = true;
        resolve();
      }
      image.onload = finish;
      image.onerror = finish;
      image.src = src;
      if (typeof image.decode === 'function') {
        image.decode().then(finish, finish);
      }
    });
  }

  // Force-fetch every image currently in the DOM. Native lazy loading means
  // the browser will not fetch off-screen images on its own — this is what
  // stops them popping in mid-scroll.
  function preloadAllImages() {
    var imgs = Array.prototype.slice.call(document.querySelectorAll('img[src]'));
    var urls = imgs
      .map(function (img) {
        return img.getAttribute('src');
      })
      .filter(function (src) {
        return src && src.indexOf('data:') !== 0;
      });
    return Promise.all(urls.map(preload));
  }

  function fontsReady() {
    if (!document.fonts || !document.fonts.ready) {
      return Promise.resolve();
    }
    return document.fonts.ready;
  }

  function windowLoaded() {
    if (document.readyState === 'complete') {
      return Promise.resolve();
    }
    return new Promise(function (resolve) {
      window.addEventListener('load', resolve, { once: true });
    });
  }

  function start() {
    // Fade-in bookkeeping. Image load/error events do not bubble, so this is
    // registered on the capture phase; it also covers images injected after
    // the loader has gone (e.g. lazy-rendered components).
    function mark(event) {
      var target = event.target;
      if (target instanceof HTMLImageElement) {
        target.classList.add('is-loaded');
      }
    }
    document.addEventListener('load', mark, true);
    document.addEventListener('error', mark, true);

    // Tag images that already finished before this script ran.
    var imgs = document.querySelectorAll('img');
    for (var i = 0; i < imgs.length; i++) {
      if (imgs[i].complete) {
        imgs[i].classList.add('is-loaded');
      }
    }

    Promise.all([preloadAllImages(), fontsReady(), windowLoaded()])
      .then(dispatchHide)
      .catch(dispatchHide);

    // Fallback: never keep the loader up longer than MAX_LOADER_MS.
    window.setTimeout(dispatchHide, MAX_LOADER_MS);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }
})();