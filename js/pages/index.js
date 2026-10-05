// WebGL clamps line widths to 1, so Vanta's wireframe can't be thickened with
// a linewidth setting. We rebuild the lines as screen-space quads instead.
const GLOBE_LINE_WIDTH_PX = 2;

function thickenVantaGlobeLines(effect) {
  const THREE = window.THREE;
  if (!THREE || !effect || !effect.renderer) {
    return;
  }

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

  // Each segment becomes a quad, pushed out by half the line width in screen space.
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

  const thicken = (lineSegments, colorHex) => {
    if (!lineSegments || !lineSegments.geometry) {
      return lineSegments;
    }
    const src = lineSegments.geometry.getAttribute('position');
    if (!src) {
      return lineSegments;
    }

    const srcCount = src.count;
    const segmentCount = srcCount / 2;
    const srcArray = src.array;

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
    material.color = new THREE.Color(colorHex);
    materials.push(material);

    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.copy(lineSegments.position);
    mesh.rotation.copy(lineSegments.rotation);
    mesh.scale.copy(lineSegments.scale);
    mesh.visible = lineSegments.visible;
    mesh.frustumCulled = false; // quads can poke past the line's bounding box

    const parent = lineSegments.parent;
    if (parent) {
      parent.add(mesh);
      parent.remove(lineSegments);
    }

    return mesh;
  };

  effect.sphere = thicken(effect.sphere, 0x9a53ff);
  effect.linesMesh2 = thicken(effect.linesMesh2, 0xffffff);
  effect.linesMesh3 = thicken(effect.linesMesh3, 0xffffff);

  window.addEventListener('resize', () => window.setTimeout(updateSize, 150));
}


function initVantaBackground() {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!window.VANTA || !window.VANTA.GLOBE || reduceMotion) {
    initHeroEntrance();
    return;
  }

  // Full-screen globe behind the hero, purple dots with white lines/arcs.
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

  // Cap the render resolution; re-apply after Vanta's own resize handler.
  const capResolution = () => {
    if (effect.renderer && typeof effect.renderer.setPixelRatio === 'function') {
      effect.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    }
  };
  capResolution();

  thickenVantaGlobeLines(effect);

  // Throttle the loop to ~30fps.
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

  window.addEventListener('resize', () => window.setTimeout(capResolution, 120));

  initHeroEntrance();
}

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

  const htmlContent = heroTitle.innerHTML;
  
  heroTitle.innerHTML = '';
  
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = htmlContent;
  
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

  const rebuildNode = (sourceNode, parent) => {
    if (sourceNode.nodeType === Node.TEXT_NODE) {
      wrapTextWithWords(sourceNode.textContent, parent);
    } else if (sourceNode.nodeType === Node.ELEMENT_NODE) {
      const clone = document.createElement(sourceNode.tagName.toLowerCase());
      if (sourceNode.className) {
        clone.className = sourceNode.className;
      }
      Array.from(sourceNode.childNodes).forEach(child => rebuildNode(child, clone));
      if (clone.childNodes.length) {
        parent.appendChild(clone);
      }
    }
  };

  Array.from(tempDiv.childNodes).forEach(node => rebuildNode(node, heroTitle));

  const spans = heroTitle.querySelectorAll('.split-char');
  
  spans.forEach((span, index) => {
    const delay = Math.min(index * 15, 200);
    setTimeout(() => {
      span.classList.add('is-visible');
    }, delay);
  });

  heroContent.classList.add('is-visible');
}


function initPortraitAnimation() {
  const portrait = document.querySelector('.about-portrait');
  if (!portrait) {
    return;
  }

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


document.addEventListener('DOMContentLoaded', () => {
  initVantaBackground();
  window.Portfolio.initRevealOnScroll();
  initPortraitAnimation();
  initScrollCue({ target: '#previous-work', threshold: 0.3 });
});
