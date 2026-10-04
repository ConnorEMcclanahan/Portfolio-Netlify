// ==========================================================================
// Thicker Vanta globe lines
// --------------------------------------------------------------------------
// WebGL clamps gl.lineWidth to 1 on nearly every browser, so Vanta's
// LineBasicMaterial lines (the sphere wireframe, the outer arcs and the
// latitude rings) can't be thickened with a `linewidth` setting. Instead we
// rebuild those LineSegments as screen-space triangle quads and expand them
// by GLOBE_LINE_WIDTH_PX in the vertex shader. The dots and the soft additive
// connecting lines are left untouched.
// ==========================================================================
const GLOBE_LINE_WIDTH_PX = 2;

function thickenVantaGlobeLines(effect) {
  const THREE = window.THREE;
  if (!THREE || !effect || !effect.renderer) {
    return;
  }

  // One shared resolution uniform so all three materials update together.
  const resolution = { value: new THREE.Vector2(1, 1) };
  const materials = [];

  const updateSize = () => {
    const size = new THREE.Vector2();
    effect.renderer.getDrawingBufferSize(size);
    resolution.value.copy(size);
    const dpr = effect.renderer.getPixelRatio() || window.devicePixelRatio || 1;
    for (const material of materials) {
      material.uniforms.uLineWidth.value = GLOBE_LINE_WIDTH_PX * dpr;
    }
  };
  updateSize();

  // Each line segment is expanded into a quad. The shader takes the segment's
  // opposite endpoint (`opposite`) and which side of the line a vertex sits on
  // (`side` = -1 left / +1 right), then pushes it out by half the line width in
  // screen space so the thickness stays constant regardless of camera angle.
  const vertexShader = [
    'attribute vec3 opposite;',
    'attribute float side;',
    'uniform vec2 uResolution;',
    'uniform float uLineWidth;',
    'void main() {',
    '  vec4 pos = modelViewMatrix * vec4(position, 1.0);',
    '  vec4 opp = modelViewMatrix * vec4(opposite, 1.0);',
    '  vec4 clipPos = projectionMatrix * pos;',
    '  vec4 clipOpp = projectionMatrix * opp;',
    '  vec2 ndc = clipPos.xy / clipPos.w;',
    '  vec2 ndcOpp = clipOpp.xy / clipOpp.w;',
    '  vec2 dirPx = (ndcOpp - ndc) * uResolution * 0.5;',
    '  float len = length(dirPx);',
    '  vec2 normalPx = len > 0.0001 ? dirPx / len : vec2(1.0, 0.0);',
    '  normalPx = vec2(-normalPx.y, normalPx.x);',
    '  vec2 offsetNdc = normalPx * side * uLineWidth * 0.5 * 2.0 / uResolution;',
    '  ndc += offsetNdc;',
    '  gl_Position = vec4(ndc * clipPos.w, clipPos.z, clipPos.w);',
    '}',
  ].join('\n');

  const fragmentShader = [
    'uniform vec3 uColor;',
    'void main() {',
    '  gl_FragColor = vec4(uColor, 1.0);',
    '}',
  ].join('\n');

  // Turn one of Vanta's LineSegments into a thick, screen-space quad mesh.
  const thicken = (lineSegments, colorHex) => {
    if (!lineSegments || !lineSegments.geometry) {
      return lineSegments;
    }
    const src = lineSegments.geometry.getAttribute('position');
    if (!src) {
      return lineSegments;
    }

    const srcCount = src.count; // two vertices per segment
    const segmentCount = srcCount / 2;
    const srcArray = src.array;

    // Four vertices per segment (a quad): 0 = A left, 1 = A right,
    // 2 = B left, 3 = B right.
    const positions = new Float32Array(segmentCount * 4 * 3);
    const opposites = new Float32Array(segmentCount * 4 * 3);
    const sides = new Float32Array(segmentCount * 4);
    const indices = new Uint16Array(segmentCount * 6);

    for (let i = 0; i < segmentCount; i++) {
      const a = i * 2;
      const b = a + 1;
      const ax = srcArray[a * 3];
      const ay = srcArray[a * 3 + 1];
      const az = srcArray[a * 3 + 2];
      const bx = srcArray[b * 3];
      const by = srcArray[b * 3 + 1];
      const bz = srcArray[b * 3 + 2];

      const v = i * 4;
      const p = i * 12;
      positions[p + 0] = ax; positions[p + 1] = ay; positions[p + 2] = az;
      positions[p + 3] = ax; positions[p + 4] = ay; positions[p + 5] = az;
      positions[p + 6] = bx; positions[p + 7] = by; positions[p + 8] = bz;
      positions[p + 9] = bx; positions[p + 10] = by; positions[p + 11] = bz;

      opposites[p + 0] = bx; opposites[p + 1] = by; opposites[p + 2] = bz;
      opposites[p + 3] = bx; opposites[p + 4] = by; opposites[p + 5] = bz;
      opposites[p + 6] = ax; opposites[p + 7] = ay; opposites[p + 8] = az;
      opposites[p + 9] = ax; opposites[p + 10] = ay; opposites[p + 11] = az;

      sides[v + 0] = -1; sides[v + 1] = 1; sides[v + 2] = -1; sides[v + 3] = 1;

      const t = i * 6;
      indices[t + 0] = v + 0; indices[t + 1] = v + 1; indices[t + 2] = v + 2;
      indices[t + 3] = v + 2; indices[t + 4] = v + 1; indices[t + 5] = v + 3;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('opposite', new THREE.BufferAttribute(opposites, 3));
    geometry.setAttribute('side', new THREE.BufferAttribute(sides, 1));
    geometry.setIndex(new THREE.Uint16BufferAttribute(indices, 1));

    const material = new THREE.ShaderMaterial({
      uniforms: {
        uColor: { value: new THREE.Color(colorHex) },
        uResolution: resolution,
        uLineWidth: { value: GLOBE_LINE_WIDTH_PX * (effect.renderer.getPixelRatio() || 1) },
      },
      vertexShader,
      fragmentShader,
      side: THREE.DoubleSide,
    });
    // Vanta's animation loop calls material.color.set(...) on these meshes
    // every frame; expose a plain Color so that keeps working without error.
    // The shader itself reads the fixed uColor uniform.
    material.color = new THREE.Color(colorHex);
    materials.push(material);

    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.copy(lineSegments.position);
    mesh.rotation.copy(lineSegments.rotation);
    mesh.scale.copy(lineSegments.scale);
    mesh.visible = lineSegments.visible;
    mesh.frustumCulled = false; // screen-space quads can poke past the line's bounding box

    const parent = lineSegments.parent;
    if (parent) {
      parent.add(mesh);
      parent.remove(lineSegments);
    }

    return mesh;
  };

  // Swap the three static line meshes for thick versions and repoint Vanta's
  // own references so its animation loop keeps rotating them (and setting
  // their color) without throwing.
  effect.sphere = thicken(effect.sphere, 0x9a53ff);
  effect.linesMesh2 = thicken(effect.linesMesh2, 0xffffff);
  effect.linesMesh3 = thicken(effect.linesMesh3, 0xffffff);

  // Keep the thickness consistent when the canvas resizes.
  window.addEventListener('resize', () => window.setTimeout(updateSize, 150));
}


function initVantaBackground() {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!window.VANTA || !window.VANTA.GLOBE || reduceMotion) {
    // Skip the WebGL globe for users who prefer reduced motion — it is the
    // single most expensive animation on the page.
    initHeroEntrance();
    return;
  }

  // Full-screen Vanta globe behind the whole hero — the big parallax ball.
  // Brighter purple dots (#9A53FF, the site's lighter accent, unlit so the
  // white spotlight can't wash them out) with white lines/arcs (color2) so
  // the purple dots still read as distinct dots against the black hero.
  // Throttled to ~30fps with a capped resolution, and pointer controls on
  // so the ball follows the cursor.
  const effect = window.VANTA.GLOBE({
    el: '#top',
    mouseControls: true,
    touchControls: true,
    gyroControls: false,
    minHeight: 200,
    minWidth: 200,
    scale: 1,
    scaleMobile: 1,
    color: 0x9a53ff,
    color2: 0xffffff,
    backgroundColor: 0x0,
    points: 8,
  });

  // Cap the WebGL render resolution — the single biggest cost on high-DPI
  // screens — and re-apply it after Vanta's own resize handler re-sets it.
  const capResolution = () => {
    if (effect.renderer && typeof effect.renderer.setPixelRatio === 'function') {
      effect.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    }
  };
  capResolution();

  // Rebuild the globe's line meshes as screen-space quads so they render
  // thicker (WebGL clamps gl.lineWidth to 1, so linewidth alone won't work).
  thickenVantaGlobeLines(effect);

  // Throttle the animation loop to ~30fps so the globe keeps animating but does
  // about half the GPU work of the default 60fps loop.
  const originalLoop = effect.animationLoop;
  let lastRender = 0;
  effect.animationLoop = () => {
    const now = performance.now();
    if (now - lastRender >= 33) {
      lastRender = now;
      originalLoop.call(effect);
    } else {
      effect.req = window.requestAnimationFrame(effect.animationLoop);
    }
  };

  // Vanta re-applies the full device pixel ratio on window resize; cap it again.
  window.addEventListener('resize', () => window.setTimeout(capResolution, 120));

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

  // Reveal with IntersectionObserver instead of a scroll + getBoundingClientRect
  // loop. getBoundingClientRect() on every reveal element on every scroll frame
  // forces synchronous layout, which is what made scrolling feel like it
  // "grabbed" whenever you paused and changed direction.
  if (!('IntersectionObserver' in window)) {
    revealElements.forEach((el) => el.classList.add('active'));
    return;
  }

  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        io.unobserve(entry.target); // reveal once and stay revealed
      }
    });
  }, { rootMargin: '0px 0px -12% 0px', threshold: 0 });

  revealElements.forEach((el) => io.observe(el));
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
    // element's centre (magnetic lift); the halo follows the raw pointer. The
    // tug is capped so a large image or figure — whose centre can sit hundreds
    // of pixels away from the pointer — can never drag the ring off the dot.
    const MAX_PULL = 14; // px — the most the ring may lean toward the centre
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
      // Only measure the hovered element when the hover target changes, not on
      // every pointermove — getBoundingClientRect() can force a layout pass.
      if (enlarged && hovered) {
        const box = hovered.getBoundingClientRect();
        magnetX = box.left + box.width / 2;
        magnetY = box.top + box.height / 2;
        magnetStrength = 0.18;
      } else {
        magnetStrength = 0;
      }
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
