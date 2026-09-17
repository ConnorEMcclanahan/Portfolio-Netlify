/* Figma embeds — click-to-load component.
   Figma iframes pull megabytes of JS/WASM and render blank until they finish
   hydrating, so the embed URL lives in data-figma-src and the real iframe is
   only injected when the visitor asks for it. Until then the shell shows a
   lightweight poster (existing project image) with a Figma badge and CTA.
   After injection the poster stays behind the iframe until its load event,
   masking Figma's blank-hydration period. */
(function () {
  const api = window.ProjectPageComponents = window.ProjectPageComponents || {};

  /* Warmed up on hover/focus intent so the eventual load starts faster,
     but still fetched only when the visitor shows interest. */
  const PRECONNECT_HOSTS = ['https://www.figma.com', 'https://embed.figma.com'];
  let preconnectAdded = false;

  const FIGMA_MARK =
    '<svg viewBox="0 0 38 57" aria-hidden="true" focusable="false">' +
    '<path fill="#1abcfe" d="M19 28.5a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0z"/>' +
    '<path fill="#0acf83" d="M0 47.5A9.5 9.5 0 0 1 9.5 38H19v9.5a9.5 9.5 0 1 1-19 0z"/>' +
    '<path fill="#ff7262" d="M19 0v19h9.5a9.5 9.5 0 1 0 0-19H19z"/>' +
    '<path fill="#f24e1e" d="M0 9.5A9.5 9.5 0 0 0 9.5 19H19V0H9.5A9.5 9.5 0 0 0 0 9.5z"/>' +
    '<path fill="#a259ff" d="M0 28.5A9.5 9.5 0 0 1 9.5 19H19v19H9.5A9.5 9.5 0 0 1 0 28.5z"/>' +
    '</svg>';

  const escapeHtml = api.escapeHtml || function (value) {
    return String(value == null ? '' : value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  };

  function addPreconnect() {
    if (preconnectAdded || !document.head) return;
    preconnectAdded = true;
    PRECONNECT_HOSTS.forEach(function (href) {
      const link = document.createElement('link');
      link.rel = 'preconnect';
      link.href = href;
      link.crossOrigin = 'anonymous';
      document.head.appendChild(link);
    });
  }

  function buildShell(el) {
    const src = el.getAttribute('data-figma-src');
    if (!src) return;

    const title = el.getAttribute('data-title') || 'Interactive Figma embed';
    const eyebrow = el.getAttribute('data-eyebrow') || 'Figma embed';
    const ctaLabel = el.getAttribute('data-cta') || 'Load interactive prototype';
    const note = el.getAttribute('data-note') || 'Nothing is fetched until you click.';
    const poster = el.getAttribute('data-poster');
    const posterPosition = el.getAttribute('data-poster-position') || 'center';
    const ratio = el.getAttribute('data-ratio');

    if (ratio) {
      el.style.setProperty('--figma-ratio', ratio);
    }

    el.classList.add('figma-embed');
    el.setAttribute('aria-label', title);

    const posterMarkup = poster
      ? '<img class="figma-embed__poster-img" src="' + escapeHtml(poster) + '"' +
        ' alt="" loading="lazy" decoding="async"' +
        ' style="object-position:' + escapeHtml(posterPosition) + '">'
      : '';

    el.innerHTML =
      '<div class="figma-embed__poster" aria-hidden="true">' + posterMarkup + '</div>' +
      '<div class="figma-embed__panel">' +
        '<span class="figma-embed__badge">' + FIGMA_MARK + '<span>Figma</span></span>' +
        '<span class="figma-embed__eyebrow">' + escapeHtml(eyebrow) + '</span>' +
        '<span class="figma-embed__title">' + escapeHtml(title) + '</span>' +
        '<button type="button" class="figma-embed__cta">' +
          '<span class="figma-embed__cta-spinner" aria-hidden="true"></span>' +
          '<span class="figma-embed__cta-label">' + escapeHtml(ctaLabel) + '</span>' +
        '</button>' +
        '<span class="figma-embed__note">' + escapeHtml(note) + '</span>' +
      '</div>';

    const posterImg = el.querySelector('.figma-embed__poster-img');
    if (posterImg) {
      /* A missing poster should never break the shell — fall back to the gradient. */
      posterImg.addEventListener('error', function () {
        posterImg.remove();
      });
    }

    el.addEventListener('pointerenter', addPreconnect);
    el.addEventListener('focusin', addPreconnect);
    el.addEventListener('click', function () {
      activate(el);
    });
  }

  function activate(el) {
    if (el.dataset.figmaState) return;
    el.dataset.figmaState = 'loading';

    const src = el.getAttribute('data-figma-src');
    const title = el.getAttribute('data-title') || 'Interactive Figma embed';
    const loadingLabel = el.getAttribute('data-loading-label') || 'Loading Figma…';

    addPreconnect();
    el.classList.add('is-loading');

    const label = el.querySelector('.figma-embed__cta-label');
    if (label) {
      label.textContent = loadingLabel;
    }

    const iframe = document.createElement('iframe');
    iframe.className = 'figma-embed__frame';
    iframe.setAttribute('title', title);
    iframe.setAttribute('loading', 'lazy');
    iframe.setAttribute('allowfullscreen', '');
    iframe.setAttribute('allow', 'clipboard-write; fullscreen');
    iframe.setAttribute('referrerpolicy', 'no-referrer-when-downgrade');

    let revealed = false;
    const reveal = function () {
      if (revealed) return;
      revealed = true;
      /* rAF so the opacity transition on .figma-embed__frame always runs. */
      requestAnimationFrame(function () {
        el.classList.remove('is-loading');
        el.classList.add('is-ready');
        el.dataset.figmaState = 'ready';
      });
    };

    /* Small delay after load lets Figma paint its first frame before the fade. */
    iframe.addEventListener('load', function () {
      setTimeout(reveal, 350);
    });
    /* Safety net: if the load event never fires (flaky network), still
       swap to the iframe so the visitor is not stuck on the spinner. */
    setTimeout(reveal, 9000);

    el.appendChild(iframe);
    iframe.src = src;
  }

  api.initFigmaEmbeds = function initFigmaEmbeds(root) {
    (root || document).querySelectorAll('[data-figma-src]').forEach(function (el) {
      if (el.dataset.figmaInit) return;
      el.dataset.figmaInit = '1';
      buildShell(el);
    });
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      api.initFigmaEmbeds();
    });
  } else {
    api.initFigmaEmbeds();
  }
})();
