function initScrollCue() {
  const scrollCue = document.querySelector('.scroll-down');
  if (!scrollCue) {
    return;
  }

  function toggleCue() {
    scrollCue.style.opacity = window.scrollY > window.innerHeight * 0.3 ? '0' : '1';
  }

  window.addEventListener('scroll', toggleCue, { passive: true });
  toggleCue();
}

const introSummaryData = {
  title: 'FitPhone Case Study',
  subtitle: 'Digital wellness for healthier phone habits',
  lead: 'I designed and built FitPhone, a community-focused digital wellness app that helps young adults build healthier relationships with their phones.',
  meta: [
    { label: 'Role', value: 'UI/UX Designer & Front-end Engineer' },
    { label: 'Duration', value: '4 weeks' },
    { label: 'Tech', value: 'Flutter, Dart' },
    { label: 'Design', value: 'Figma, Canva' },
    { label: 'Release', value: 'App Store & Play Store' }
  ],
  story: {
    background: 'FitPhone is a digital wellness app designed to help young adults build healthier relationships with their phones through community and reflection.',
    problem: 'Most digital wellness tools only track screen time. They rarely provide personalized guidance, social support, or reasons to change behavior.',
    goals: 'Design and build a motivating, community-driven experience with goals, progress tracking, educational content, and peer accountability.'
  },
  image: {
    src: '../Images/sss.png',
    alt: 'FitPhone key screens'
  }
};

const finalSectionData = {
  columns: [
    {
      title: 'How Usability Might Be Improved',
      items: [
        { title: 'Local Community Events', copy: 'Connect with local groups to organize real-world fitness events and meetups.' },
        { title: 'Scalability', copy: 'Expand FitPhone to include more cities and locations over time.' },
        { title: 'Privacy Adaptations', copy: 'Strengthen data privacy controls as the user base grows.' },
        { title: 'Continuous Improvement', copy: 'Iterate based on ongoing user feedback post-launch.' }
      ]
    },
    {
      title: 'Lessons Learned',
      items: [
        { title: 'Balance Tech & User Needs', copy: 'Technical requirements must always serve real user goals, not the other way around.' },
        { title: 'Flutter Deep-Dive', copy: 'Hands-on Flutter development was a major growth opportunity across the whole team.' },
        { title: 'App Dev Complexity', copy: 'Integrating features, troubleshooting bugs, and App Store prep each required dedicated time.' },
        { title: 'Client Collaboration', copy: 'Managing meetings, gathering feedback, and iterating based on it was crucial to success.' }
      ]
    }
  ]
};

function initPDF() {
  document.querySelectorAll('.pdf-container[data-pdf-url]').forEach((container) => {
    const url = container.dataset.pdfUrl;
    const canvas = container.querySelector('.pdf-canvas');
    const ctx = canvas.getContext('2d');
    const pageIndicator = container.querySelector('.pdf-page-indicator');
    const prevBtn = container.querySelector('.pdf-prev-btn');
    const nextBtn = container.querySelector('.pdf-next-btn');
    const zoomIn = container.querySelector('.pdf-zoom-in');
    const zoomOut = container.querySelector('.pdf-zoom-out');
    const loading = container.querySelector('.pdf-loading');
    const pageNumSpan = container.querySelector('.pdf-page-num');

    let pdfDoc;
    let pageNum = 1;
    let zoomLevel = 1.2;

    async function renderPage(num) {
      loading.style.display = 'block';
      const page = await pdfDoc.getPage(num);
      const viewport = page.getViewport({ scale: zoomLevel });
      canvas.height = viewport.height;
      canvas.width = viewport.width;

      await page.render({ canvasContext: ctx, viewport }).promise;
      loading.style.display = 'none';

      pageIndicator.textContent = `Page ${num}/${pdfDoc.numPages}`;
      pageNumSpan.textContent = `${num}/${pdfDoc.numPages}`;
    }

    prevBtn.onclick = () => {
      if (pageNum > 1) {
        renderPage(--pageNum);
      }
    };

    nextBtn.onclick = () => {
      if (pageNum < pdfDoc.numPages) {
        renderPage(++pageNum);
      }
    };

    zoomIn.onclick = () => {
      zoomLevel *= 1.2;
      renderPage(pageNum);
    };

    zoomOut.onclick = () => {
      zoomLevel /= 1.2;
      renderPage(pageNum);
    };

    pdfjsLib.getDocument(url).promise
      .then((doc) => {
        pdfDoc = doc;
        renderPage(pageNum);
      })
      .catch(() => {
        loading.textContent = 'Failed to load PDF.';
      });
  });
}

function reveal() {
  document.querySelectorAll('.reveal').forEach((el) => {
    const top = el.getBoundingClientRect().top;
    el.classList.toggle('active', top < window.innerHeight - 150);
  });
}

function initThreeLoader() {
  const loader = document.getElementById('loader');
  if (!loader || typeof THREE === 'undefined') {
    return;
  }

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 1000);
  camera.position.set(0, 0, 200);

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  loader.appendChild(renderer.domElement);

  scene.add(new THREE.AmbientLight(0xffffff, 0.3));
  const dir = new THREE.DirectionalLight(0xffffff, 0.7);
  dir.position.set(1, 1, 1);
  scene.add(dir);

  function rand(min, max) {
    return min + Math.random() * (max - min);
  }

  function createGlobe(radius) {
    const group = new THREE.Group();
    const edges = new THREE.EdgesGeometry(new THREE.SphereGeometry(radius, 16, 16));
    group.add(new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: 0x6E07F3, transparent: true, opacity: 0.8 })));

    const spikeVerts = new Float32Array(40 * 2 * 3);
    let idx = 0;
    for (let i = 0; i < 40; i++) {
      const theta = Math.acos(rand(-1, 1));
      const phi = rand(0, Math.PI * 2);
      const x = radius * Math.sin(theta) * Math.cos(phi);
      const y = radius * Math.sin(theta) * Math.sin(phi);
      const z = radius * Math.cos(theta);

      spikeVerts[idx++] = x;
      spikeVerts[idx++] = y;
      spikeVerts[idx++] = z;

      const scale = 1 + rand(0.15, 0.35);
      spikeVerts[idx++] = x * scale;
      spikeVerts[idx++] = y * scale;
      spikeVerts[idx++] = z * scale;
    }

    group.add(new THREE.LineSegments(
      new THREE.BufferGeometry().setAttribute('position', new THREE.BufferAttribute(spikeVerts, 3)),
      new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.3 })
    ));

    const points = [];
    for (let i = 0; i < 80; i++) {
      const t = rand(-radius * 0.6, radius * 0.6);
      const h = rand(-radius * 0.2, radius * 0.2) * (1 - Math.abs(t) / (radius * 0.6));
      points.push(new THREE.Vector3(t, h, 0), new THREE.Vector3(t, -h, 0));
    }

    const waveGeo = new THREE.BufferGeometry().setFromPoints(points);
    const waveMat = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.6 });
    const wave1 = new THREE.LineSegments(waveGeo, waveMat);
    group.add(wave1, wave1.clone().rotateX(Math.PI / 2), wave1.clone().rotateY(Math.PI / 2));

    return group;
  }

  const baseRadius = 40;
  const placed = [];
  const globes = [];

  for (let i = 0; i < 5; i++) {
    let x;
    let y;
    let scale;
    let radius;
    let attempts = 0;

    do {
      x = rand(-100, 100);
      y = rand(-60, 60);
      scale = rand(0.6, 1.2);
      radius = baseRadius * scale;
      attempts++;
    } while (placed.some((p) => Math.hypot(p.x - x, p.y - y) < p.radius + radius) && attempts < 1000);

    placed.push({ x, y, radius });
    const globe = createGlobe(baseRadius);
    globe.position.set(x, y, 0);
    globe.scale.set(scale, scale, scale);
    scene.add(globe);
    globes.push({ globe, speed: rand(0.1, 0.3) });
  }

  let prev = 0;
  function animate(time = 0) {
    const dt = (time - prev) / 1000;
    prev = time;

    globes.forEach((obj) => {
      obj.globe.rotation.y += dt * obj.speed;
      obj.globe.rotation.x += dt * obj.speed * 0.4;
    });

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate);

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  if (window.ProjectPageComponents) {
    window.ProjectPageComponents.renderIntroSummary('#intro-summary', introSummaryData);
    window.ProjectPageComponents.renderFinalColumns('#final-container', finalSectionData);
  }

  initScrollCue();
  initThreeLoader();
  window.addEventListener('scroll', reveal, { passive: true });
});

window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  if (loader) {
    loader.style.display = 'none';
  }

  document.body.classList.add('loaded');
  initPDF();
  reveal();
});
