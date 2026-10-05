// Custom cursor for the /pages/ subpages (index.html has its own copy).
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

    const MAX_PULL = 14; // px — cap how far the ring leans toward a hovered element
    let pullX = pointerX;
    let pullY = pointerY;
    if (magnetStrength > 0) {
      let dx = magnetX - pointerX;
      let dy = magnetY - pointerY;
      const dist = Math.hypot(dx, dy);
      if (dist > MAX_PULL) {
        dx = (dx / dist) * MAX_PULL;
        dy = (dy / dist) * MAX_PULL;
      }
      pullX = pointerX + dx;
      pullY = pointerY + dy;
    }

    if (snapNext) {
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

    // Hide the native pointer only after the replacement is painted.
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
    // Hand the native pointer back while the replacement is hidden.
    if (!next) {
      nativeHidden = false;
      document.body.classList.remove('has-custom-cursor');
    }
    if (next) {
      snapNext = true;
      start();
    }
  };

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
      // Measure only when the hover target changes (layout pass is expensive).
      if (enlarged && hovered) {
        const box = hovered.getBoundingClientRect();
        magnetX = box.left + box.width / 2;
        magnetY = box.top + box.height / 2;
        magnetStrength = 0.18;
      } else {
        magnetStrength = 0;
      }
    }

    if (document.hasFocus()) {
      setVisible(true);
    }
    start();
  };

  document.addEventListener('mousemove', onPointerMove, { passive: true });
  document.addEventListener('mouseleave', () => setVisible(false));
  window.addEventListener('blur', () => setVisible(false));
  window.addEventListener('focus', () => setVisible(true));
}

document.addEventListener('DOMContentLoaded', () => {
  initCustomCursor();
});
