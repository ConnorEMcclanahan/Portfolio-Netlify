function initVantaBackground() {
  if (!window.VANTA || !window.VANTA.GLOBE) {
    return;
  }

  // Full-screen Vanta globe behind the whole hero — the big parallax ball,
  // same setup as the original design.
  window.VANTA.GLOBE({
    el: '#top',
    mouseControls: true,
    touchControls: true,
    gyroControls: false,
    minHeight: 200,
    minWidth: 200,
    scale: 1,
    scaleMobile: 1,
    color: 0x6e07f3,
    backgroundColor: 0x0,
  });

  // Trigger the hero entrance animation once Vanta has initialised.
  // This keeps the text reveal in sync with the background so the page
  // feels like one coordinated entrance rather than two unrelated swaps.
  initHeroEntrance();
}

/**
 * Hero entrance animation - characters fade in immediately on page load,
 * similar to how project page images appear. No typing effect, just a
 * quick staggered fade-in that feels energetic.
 */
function initHeroEntrance() {
  const heroContent = document.querySelector('.hero__content');
  const heroTitle = document.querySelector('.hero-title');
  if (!heroContent || !heroTitle) {
    return;
  }

  // Respect reduced motion preference - show everything immediately
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion) {
    heroContent.classList.add('is-visible');
    return;
  }

  // Get the HTML content and preserve <em> tags
  const htmlContent = heroTitle.innerHTML;
  
  // Clear and rebuild with character spans, but preserve <em> structure
  heroTitle.innerHTML = '';
  
  // Parse the HTML and wrap each character in a span, preserving <em> tags
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = htmlContent;
  
  // Wrap each word in a non-breaking wrapper, then split characters
  // inside the word. The spaces between words stay as normal text nodes
  // so the browser only ever breaks lines at word boundaries — never
  // mid-word (e.g. "des" / "ign"). Characters keep .split-char so the
  // existing staggered animation is untouched.
  const wrapWord = (word, parent) => {
    if (!word) {
      return;
    }
    const wordSpan = document.createElement('span');
    wordSpan.className = 'split-word';
    for (let i = 0; i < word.length; i++) {
      const charSpan = document.createElement('span');
      charSpan.className = 'split-char';
      charSpan.textContent = word[i];
      wordSpan.appendChild(charSpan);
    }
    parent.appendChild(wordSpan);
  };

  const wrapTextWithWords = (text, parent) => {
    // Split on normal spaces; each space becomes a real (collapsible,
    // breakable) text node between word wrappers.
    const words = text.split(' ');
    words.forEach((word, index) => {
      wrapWord(word, parent);
      if (index < words.length - 1) {
        parent.appendChild(document.createTextNode(' '));
      }
    });
  };

  // Recursively rebuild a node: element wrappers (em/span/...) are cloned
  // so styling is preserved, text is split word-first inside them.
  const rebuildNode = (sourceNode, parent) => {
    if (sourceNode.nodeType === Node.TEXT_NODE) {
      wrapTextWithWords(sourceNode.textContent, parent);
    } else if (sourceNode.nodeType === Node.ELEMENT_NODE) {
      const clone = document.createElement(sourceNode.tagName.toLowerCase());
      if (sourceNode.className) {
        clone.className = sourceNode.className;
      }
      // Preserve em styling hooks if ever needed; class copy covers it.
      Array.from(sourceNode.childNodes).forEach(child => rebuildNode(child, clone));
      // Skip empty clones (e.g. stray whitespace-only wrappers add nothing).
      if (clone.childNodes.length) {
        parent.appendChild(clone);
      }
    }
  };

    // Process each child node
  Array.from(tempDiv.childNodes).forEach(node => rebuildNode(node, heroTitle));

  // Immediately show all characters with a tiny stagger for visual interest
  // This makes it appear right away like the project page images
  const spans = heroTitle.querySelectorAll('.split-char');
  
  spans.forEach((span, index) => {
    // Very quick stagger - characters appear almost simultaneously
    // but with just enough delay to create a subtle wave effect
    const delay = Math.min(index * 15, 200); // Cap at 200ms total
    setTimeout(() => {
      span.classList.add('is-visible');
    }, delay);
  });

  // Show the container immediately too - no delay
  heroContent.classList.add('is-visible');
}



function initReveal() {
  const revealElements = document.querySelectorAll('.reveal');
  if (!revealElements.length) {
    return;
  }

  const revealPoint = 150;

  const checkReveal = () => {
    const windowHeight = window.innerHeight;

    revealElements.forEach((element) => {
      const elementTop = element.getBoundingClientRect().top;
      if (elementTop < windowHeight - revealPoint) {
        element.classList.add('active');
      } else {
        element.classList.remove('active');
      }
    });
  };

  checkReveal();
  window.addEventListener('scroll', checkReveal, { passive: true });
}

function initPortraitAnimation() {
  const portrait = document.querySelector('.about-portrait');
  if (!portrait) {
    return;
  }

  // Trigger fade-in animation when portrait comes into view
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        portrait.classList.add('loaded');
        observer.unobserve(portrait);
      }
    });
  }, { threshold: 0.1 });

  observer.observe(portrait);
}

// Custom cursor — replaces the native pointer, which the stylesheet hides via
// `body.has-custom-cursor`. That class is only added once the replacement has
// actually been painted, so the pointer can never blink out on load, and any
// device that opts out below keeps its real cursor. It is removed again
// whenever DevTools holds focus (inspect element) or the pointer leaves the
// window — the moments the replacement can't be there — so the native
// pointer takes over exactly when the effect steps aside.
//
//  * A 6px dot is written straight from the pointer position with no easing, so
//    the click target is always exactly under the cursor; a 34px ring trails
//    slightly behind it. That pairing is what stops it feeling laggy.
//  * clientX/clientY + position: fixed keeps every layer pinned to the viewport,
//    so they cannot lag behind or "stick" while the page scrolls.
//  * The halo is its own root-level layer using mix-blend-mode: screen, so it
//    can only ever brighten what is beneath it, never cover text.
//  * Transforms are written in a single rAF loop using translate3d only, and the
//    loop parks itself once everything has settled.
function initCustomCursor() {
  const cursor = document.querySelector('.custom-cursor');
  const glow = document.querySelector('.pointer-glow');
  if (!cursor || !glow) {
    return;
  }

  const dot = cursor.querySelector('.custom-cursor__dot');
  const ring = cursor.querySelector('.custom-cursor__ring');
  const halo = glow.querySelector('.pointer-glow__halo');
  if (!dot || !ring || !halo) {
    return;
  }

  // Skip touch devices (no real hover) and anyone who asked for less motion.
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (!finePointer.matches || reducedMotion.matches) {
    return;
  }

  // The stylesheet keeps these layers display:none until this point, so devices
  // that bail out above never pay for rendering them.
  cursor.classList.add('is-enabled');
  glow.classList.add('is-enabled');

  const RING_EASE = 0.28;     // slight trail — alive, but still feels precise
  const HALO_EASE = 0.08;     // much slower, so the halo only whispers
  const SCALE_EASE = 0.16;

  let pointerX = 0;
  let pointerY = 0;
  let ringX = 0;
  let ringY = 0;
  let haloX = 0;
  let haloY = 0;
  let scale = 1;
  let targetScale = 1;
  let visible = false;
  let overInteractive = false;
  let magnetX = 0;
  let magnetY = 0;
  let magnetStrength = 0;
  let snapNext = false;
  let frame = null;
  let nativeHidden = false;

  const settled = () => (
    Math.abs(pointerX - ringX) < 0.1
    && Math.abs(pointerY - ringY) < 0.1
    && Math.abs(pointerX - haloX) < 0.1
    && Math.abs(pointerY - haloY) < 0.1
    && Math.abs(targetScale - scale) < 0.002
  );

  const frameStep = () => {
    frame = null;

    // The ring eases toward the pointer, tugged slightly toward the hovered
    // element's centre (magnetic lift); the halo follows the raw pointer.
    const pullX = magnetStrength > 0 ? pointerX + (magnetX - pointerX) * magnetStrength : pointerX;
    const pullY = magnetStrength > 0 ? pointerY + (magnetY - pointerY) * magnetStrength : pointerY;

    if (snapNext) {
      // Land exactly on the pointer instead of sweeping across the viewport.
      ringX = haloX = pointerX;
      ringY = haloY = pointerY;
      snapNext = false;
    } else {
      ringX += (pullX - ringX) * RING_EASE;
      ringY += (pullY - ringY) * RING_EASE;
      haloX += (pointerX - haloX) * HALO_EASE;
      haloY += (pointerY - haloY) * HALO_EASE;
    }

    scale += (targetScale - scale) * SCALE_EASE;

    dot.style.transform = `translate3d(${pointerX}px, ${pointerY}px, 0)`;
    ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) scale(${scale})`;
    halo.style.transform = `translate3d(${haloX}px, ${haloY}px, 0)`;

    // Only now is it safe to hide the native pointer: the replacement has been
    // painted in this very frame, so there is never a moment with no cursor.
    if (visible && !nativeHidden) {
      nativeHidden = true;
      document.body.classList.add('has-custom-cursor');
    }

    if (!settled()) {
      frame = window.requestAnimationFrame(frameStep);
    }
  };

  const start = () => {
    if (frame === null && !settled()) {
      frame = window.requestAnimationFrame(frameStep);
    }
  };

  const setVisible = (next) => {
    if (visible === next) {
      return;
    }
    visible = next;
    cursor.classList.toggle('is-active', next);
    glow.classList.toggle('is-active', next);
    // Whenever the replacement hides, hand the native pointer back — e.g.
    // DevTools holds focus (inspect element) or the pointer left the window.
    // Without this, `cursor: none` would stay applied while nothing is on
    // screen, leaving the visitor with no pointer at all. frameStep re-adds
    // the class after it paints the replacement again, so the swap stays
    // flicker-free.
    if (!next) {
      nativeHidden = false;
      document.body.classList.remove('has-custom-cursor');
    }
    if (next) {
      snapNext = true;
      start();
    }
  };

  // Subtle lift: links, buttons, and images gently tug + enlarge the ring,
  // like the mockup hover. Nothing else changes.
  const HOVER_SELECTOR = 'a, button, .tag, img, figure,'
    + ' .project-showcase__media, .project-showcase__media-link,'
    + ' .suggested-project-card, .profile-image, .about-portrait, .IntroPic';

  const onPointerMove = (event) => {
    pointerX = event.clientX;
    pointerY = event.clientY;

    const target = event.target;
    const hovered = target instanceof Element ? target.closest(HOVER_SELECTOR) : null;
    const enlarged = hovered !== null;
    if (enlarged !== overInteractive) {
      overInteractive = enlarged;
      cursor.classList.toggle('is-over', enlarged);
      targetScale = enlarged ? 1.55 : 1;
    }
    if (hovered) {
      const box = hovered.getBoundingClientRect();
      magnetX = box.left + box.width / 2;
      magnetY = box.top + box.height / 2;
      magnetStrength = 0.18;
    } else {
      magnetStrength = 0;
    }

    // The effect stays on at all times now — including while scrolling — and
    // only stands down while DevTools holds focus (inspect element), where
    // the native pointer is what you actually want under your hand.
    if (document.hasFocus()) {
      setVisible(true);
    }
    start();
  };

  document.addEventListener('mousemove', onPointerMove, { passive: true });
  document.addEventListener('mouseleave', () => setVisible(false));
  window.addEventListener('blur', () => setVisible(false));
  // Returning from DevTools (or another tab) brings the effect straight back
  // without waiting for the next mouse move.
  window.addEventListener('focus', () => setVisible(true));
}

document.addEventListener('DOMContentLoaded', () => {
  initVantaBackground();
  initReveal();
  initPortraitAnimation();
  initCustomCursor();
  initScrollCue({ target: '#previous-work', threshold: 0.3 });
});

// Hide the shared loading screen once everything is loaded.
// (The shared component's loading-screen.js already does this,
// but index.html loads Vanta Globe which can be slow, so do it
// explicitly here too for consistency.)
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  if (loader) {
    loader.style.display = 'none';
  }
});
