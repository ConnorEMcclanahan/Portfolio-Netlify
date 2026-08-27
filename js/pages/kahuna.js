const introSummaryData = {
  title: 'Kahuna Surfing App',
  subtitle: 'Surf conditions made clear for beginners',
  lead: 'As Visual and UX Designer and Front-end Engineer, I led Kahuna from concept through prototype. Built in Figma, iterated through user testing, and delivered an interactive high-fidelity mobile prototype.',
  meta: [
    { label: 'Role', value: 'UX/UI and Front-end Developer' },
    { label: 'Duration', value: '4 weeks' },
    { label: 'Tools', value: 'Figma, JavaScript' },
    { label: 'Deliverables', value: 'Survey, Personas, Prototypes' },
    { label: 'Release', value: 'Figma Share Link' }
  ],
  story: {
    background: 'Kahuna is a beginner-friendly surf weather app that turns conditions and forecasts into practical guidance for time on the waves.',
    problem: 'Existing weather apps often present raw data without enough context for new surfers to understand what conditions will feel like.',
    goals: 'Make weather, rain intensity, wind, and surf conditions easy to scan, compare, and act on before a session.'
  }
};

const questionsCriteriaData = {
  questionsTitle: 'Project Questions',
  questions: [
    'How much is 1 mm of rain in everyday terms, and how does it feel stepping outside?',
    'Should I grab a towel when coming in? What about someone shorter or taller?',
    'How can we present rain intensity so beginners instantly understand it?',
    'What analogies or visuals best convey the sensation of rain?',
    'How do we tailor a surfing app for newcomers to both weather data and waves?'
  ],
  criteriaTitle: 'Questions and Criteria',
  criteriaLead: 'By refining these core questions, we ensured every design decision:',
  criteria: [
    'Bridges the gap between raw rainfall metrics and real-world experience.',
    'Offers context-aware advice, for example towel recommendations by height or conditions.',
    'Uses intuitive graphs, icons, and analogies for clarity.',
    'Delivers a friendly onboarding for first-time surfing and weather app users.'
  ]
};

const povHmwData = {
  povTitle: 'POV',
  hmwTitle: 'HMW',
  headers: ['Users', 'Need', 'Insight'],
  povRow: {
    users: 'A surfer who needs weather insight before heading out.',
    need: 'To show accurate weather information for surfers.',
    insight: 'Users need a precise, easy-to-use app that lets them see beaches, weather, and waves quickly and for free.'
  },
  hmwItems: [
    'How might we create a good representation of the weather?',
    'How might we make a more usable app for surfers of all skills?',
    'How might we improve upon existing weather apps to build something unique and easy?'
  ]
};

function initCharts() {
  if (!window.Chart) {
    return;
  }

  const createGradient = (ctx) => {
    const gradient = ctx.createLinearGradient(0, 0, 0, 300);
    gradient.addColorStop(0, '#6E07F3');
    gradient.addColorStop(1, '#A020F0');
    return gradient;
  };

  const appsCanvas = document.getElementById('nlAppsChart');
  if (appsCanvas) {
    const ctxApps = appsCanvas.getContext('2d');
    new Chart(ctxApps, {
      type: 'bar',
      data: {
        labels: ['Buienradar', 'KNMI', 'Weeronline', 'Weerplaza', 'WeatherPro', 'Buienalarm', 'NOS Weer', 'Yahoo!', 'AccuWeather'],
        datasets: [{
          label: 'Users (%)',
          data: [25, 15, 12, 10, 8, 7, 6, 5, 12],
          backgroundColor: createGradient(ctxApps),
          borderColor: '#6E07F3',
          borderWidth: 2
        }]
      },
      options: {
        scales: {
          y: { beginAtZero: true, ticks: { color: '#ddd' }, grid: { color: '#333' } },
          x: { ticks: { color: '#ddd' }, grid: { color: '#333' } }
        },
        plugins: { legend: { display: false } }
      }
    });
  }

  const featureCanvas = document.getElementById('featureRankChart');
  if (featureCanvas) {
    const ctxFeat = featureCanvas.getContext('2d');
    new Chart(ctxFeat, {
      type: 'bar',
      data: {
        labels: ['Simplicity', 'Forecast', 'Rain Intensity', 'Wind Speed', 'Animations'],
        datasets: [{
          label: 'Score',
          data: [95, 90, 85, 75, 20],
          backgroundColor: createGradient(ctxFeat),
          borderColor: '#6E07F3',
          borderWidth: 2
        }]
      },
      options: {
        scales: {
          y: { beginAtZero: true, ticks: { color: '#ddd' }, grid: { color: '#333' } },
          x: { ticks: { color: '#ddd' }, grid: { color: '#333' } }
        },
        plugins: { legend: { display: false } }
      }
    });
  }

  const sportsCanvas = document.getElementById('sportsChart');
  if (sportsCanvas) {
    const ctxSports = sportsCanvas.getContext('2d');
    new Chart(ctxSports, {
      type: 'bar',
      data: {
        labels: ['Surfing', 'Sailing', 'Kitesurf', 'Tennis', 'Soccer', 'Running', 'Cycling', 'Golf', 'Basketball'],
        datasets: [{
          label: 'Dependence (%)',
          data: [90, 85, 80, 30, 25, 20, 15, 10, 10],
          backgroundColor: createGradient(ctxSports),
          borderColor: '#6E07F3',
          borderWidth: 2
        }]
      },
      options: {
        scales: {
          y: { beginAtZero: true, ticks: { color: '#ddd' }, grid: { color: '#333' } },
          x: { ticks: { color: '#ddd' }, grid: { color: '#333' } }
        },
        plugins: { legend: { display: false } }
      }
    });
  }
}

function initPDF() {
  if (!window.pdfjsLib) {
    return;
  }

  document.querySelectorAll('.pdf-container[data-pdf-url]').forEach((container) => {
    const url = container.dataset.pdfUrl;
    const canvas = container.querySelector('.pdf-canvas');
    if (!canvas) {
      return;
    }

    const ctx = canvas.getContext('2d');
    const loading = container.querySelector('.pdf-loading');
    const pageIndicator = container.querySelector('.pdf-page-indicator');
    const pageNumSpan = container.querySelector('.pdf-page-num');
    const prevBtn = container.querySelector('.pdf-prev-btn');
    const nextBtn = container.querySelector('.pdf-next-btn');
    const zoomIn = container.querySelector('.pdf-zoom-in');
    const zoomOut = container.querySelector('.pdf-zoom-out');

    let pdfDoc = null;
    let pageNum = 1;
    let zoom = 1.2;

    const render = (num) => {
      if (!pdfDoc) {
        return;
      }

      if (loading) {
        loading.style.display = 'block';
      }

      pdfDoc.getPage(num).then((page) => {
        const viewport = page.getViewport({ scale: zoom });
        canvas.width = viewport.width;
        canvas.height = viewport.height;

        page.render({ canvasContext: ctx, viewport }).promise.then(() => {
          if (loading) {
            loading.style.display = 'none';
          }
          if (pageIndicator) {
            pageIndicator.textContent = `Page ${num}/${pdfDoc.numPages}`;
          }
          if (pageNumSpan) {
            pageNumSpan.textContent = `${num}/${pdfDoc.numPages}`;
          }
        });
      });
    };

    pdfjsLib.getDocument(url).promise.then((doc) => {
      pdfDoc = doc;
      render(pageNum);
    }).catch(() => {
      if (loading) {
        loading.textContent = 'Failed to load PDF.';
      }
    });

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        if (pageNum > 1) {
          pageNum -= 1;
          render(pageNum);
        }
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        if (pdfDoc && pageNum < pdfDoc.numPages) {
          pageNum += 1;
          render(pageNum);
        }
      });
    }

    if (zoomIn) {
      zoomIn.addEventListener('click', () => {
        zoom *= 1.2;
        render(pageNum);
      });
    }

    if (zoomOut) {
      zoomOut.addEventListener('click', () => {
        zoom /= 1.2;
        render(pageNum);
      });
    }
  });
}

function initScrollCue() {
  const scrollCue = document.querySelector('.scroll-down');
  if (!scrollCue) {
    return;
  }

  const toggleCue = () => {
    scrollCue.style.opacity = window.scrollY > window.innerHeight * 0.3 ? '0' : '1';
  };

  toggleCue();
  window.addEventListener('scroll', toggleCue, { passive: true });
}

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function onClick(e) {
      const targetId = this.getAttribute('href');
      if (!targetId) {
        return;
      }

      e.preventDefault();
      if (targetId === '#') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      const target = document.querySelector(targetId);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
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
  if (!window.THREE) {
    return;
  }

  const loader = document.getElementById('loader');
  if (!loader) {
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

  const rand = (min, max) => min + Math.random() * (max - min);

  const createGlobe = (radius) => {
    const group = new THREE.Group();
    const edges = new THREE.EdgesGeometry(new THREE.SphereGeometry(radius, 16, 16));
    group.add(new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: 0x6E07F3, transparent: true, opacity: 0.8 })));

    const spikeVerts = new Float32Array(40 * 2 * 3);
    let idx = 0;
    for (let i = 0; i < 40; i += 1) {
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
    for (let i = 0; i < 80; i += 1) {
      const t = rand(-radius * 0.6, radius * 0.6);
      const h = rand(-radius * 0.2, radius * 0.2) * (1 - Math.abs(t) / (radius * 0.6));
      points.push(new THREE.Vector3(t, h, 0), new THREE.Vector3(t, -h, 0));
    }

    const waveGeo = new THREE.BufferGeometry().setFromPoints(points);
    const waveMat = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.6 });
    const wave1 = new THREE.LineSegments(waveGeo, waveMat);
    group.add(wave1, wave1.clone().rotateX(Math.PI / 2), wave1.clone().rotateY(Math.PI / 2));

    return group;
  };

  const radius = 40;
  const placed = [];
  const globes = [];

  for (let i = 0; i < 5; i += 1) {
    let x;
    let y;
    let scale;
    let globeRadius;
    let attempts = 0;

    do {
      x = rand(-100, 100);
      y = rand(-60, 60);
      scale = rand(0.6, 1.2);
      globeRadius = radius * scale;
      attempts += 1;
    } while (placed.some((p) => Math.hypot(p.x - x, p.y - y) < p.radius + globeRadius) && attempts < 1000);

    placed.push({ x, y, radius: globeRadius });
    const globe = createGlobe(radius);
    globe.position.set(x, y, 0);
    globe.scale.set(scale, scale, scale);
    scene.add(globe);
    globes.push({ globe, speed: rand(0.1, 0.3) });
  }

  let prev = 0;
  const animate = (time = 0) => {
    const dt = (time - prev) / 1000;
    prev = time;

    globes.forEach((obj) => {
      obj.globe.rotation.y += dt * obj.speed;
      obj.globe.rotation.x += dt * obj.speed * 0.4;
    });

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  };

  requestAnimationFrame(animate);

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  if (window.pdfjsLib) {
    window.pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js';
  }

  initScrollCue();
  initSmoothScroll();
  initCharts();
  initThreeLoader();

  if (window.ProjectPageComponents) {
    window.ProjectPageComponents.renderIntroSummary('#intro-summary', introSummaryData);
    window.ProjectPageComponents.renderQuestionsCriteria('#questions', questionsCriteriaData);
    window.ProjectPageComponents.renderPovHmw('#hmw-pov', povHmwData);
    window.ProjectPageComponents.renderFinalColumns('#final-container', finalSectionData);
  }
});

window.addEventListener('scroll', reveal);
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  if (loader) {
    loader.style.display = 'none';
  }

  document.body.classList.add('loaded');
  initPDF();
  reveal();
});

const finalSectionData = {
  columns: [
    {
      title: 'How Usability Might Be Improved',
      items: [
        {
          title: 'Live Conditions Integration',
          copy: 'Integrate a free wave-and-weather API so users get real-time surf data without paywalls.'
        },
        {
          title: 'Clearer Contextual Visuals',
          copy: 'Use clearer visual states, like light drizzle vs heavy downpour, to speed user understanding.'
        },
        {
          title: 'Stronger Surf Guidance',
          copy: 'Add prominent reminders and interactive surf graphs for wave height and wind direction.'
        },
        {
          title: 'Scalable Location Coverage',
          copy: 'Expand support to more beaches and community events as the platform grows.'
        }
      ]
    },
    {
      title: 'Lessons Learned',
      items: [
        {
          title: 'Simplicity First',
          copy: 'Balancing simplicity with functionality is critical because feature overload overwhelms new users.'
        },
        {
          title: 'Test Early, Test Fast',
          copy: 'Rapid paper and low-fidelity tests surfaced major usability issues before expensive implementation.'
        },
        {
          title: 'Expert Input Matters',
          copy: 'Feedback from surfers and meteorology experts added valuable, real-world domain accuracy.'
        },
        {
          title: 'Planning Enables Agility',
          copy: 'Consistent planning, client reviews, and agile iteration kept the team aligned and delivery cohesive.'
        }
      ]
    }
  ]
};

document.addEventListener('DOMContentLoaded', () => {
  if (window.pdfjsLib) {
    window.pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js';
  }

  const scrollCue = document.querySelector('.scroll-down');
  if (scrollCue) {
    const toggleCue = () => {
      scrollCue.style.opacity = window.scrollY > window.innerHeight * 0.3 ? '0' : '1';
    };

    toggleCue();
    window.addEventListener('scroll', toggleCue, { passive: true });
  }

  if (!window.ProjectPageComponents) {
    return;
  }

  window.ProjectPageComponents.renderIntroSummary('#intro-summary', introSummaryData);
  window.ProjectPageComponents.renderFinalColumns('#final-container', finalSectionData);
});
