function createGradient(ctx) {
  const gradient = ctx.createLinearGradient(0, 0, 0, 300);
  gradient.addColorStop(0, '#6E07F3');
  gradient.addColorStop(1, '#A020F0');
  return gradient;
}

const introSummaryData = {
  title: 'Urban Sports Tracker',
  subtitle: 'Training insights for athletes in motion',
  lead: 'As part of a collaborative team, I contributed to the design and front-end development of the Urban Sports Tracker - a cross-platform app focused on monitoring and visualizing workout impact. Working closely with the team, I helped shape the user interface, designed key screens, and built interactive components, ensuring a clear and engaging experience for athletes tracking their performance.',
  meta: [
    { label: 'Role', value: 'UI/UX Designer & Front-end Developer (Support)' },
    { label: 'Duration', value: '4 weeks' },
    { label: 'Tech Stack', value: 'Figma, Visual Studio Code, GitHub' },
    { label: 'Platforms', value: 'iOS & Android' },
    { label: 'Deliverables', value: 'High-fidelity Prototypes, Front-end Pages, Visual Assets' }
  ],
  story: {
    background: 'Urban Sports Tracker is a cross-platform experience for athletes who want to understand training impact and progress over time.',
    problem: 'Athletes struggled to interpret performance data and identify fatigue patterns in an existing experience with unclear navigation and dense visualizations.',
    goals: 'Make performance insights readable and actionable while creating a consistent, engaging experience across iOS and Android.'
  },
  image: {
    src: '../Images/urbannns.png',
    alt: 'Urban key screens'
  }
};

const finalSectionData = {
  columns: [
    {
      title: 'How Usability Might Be Improved',
      items: [
        { title: 'Back-End Integration', copy: 'Connect training sessions to individual user accounts via proper back-end integration.' },
        { title: 'Broader User Testing', copy: 'Expand testing across diverse athlete groups and skill levels for richer feedback.' },
        { title: 'AI Fatigue Prediction', copy: 'Implement AI models for predictive fatigue detection and injury risk alerts.' },
        { title: 'Online Hosting', copy: 'Host the application online to improve accessibility and long-term scalability.' }
      ]
    },
    {
      title: 'Lessons Learned',
      items: [
        { title: 'Scalable Data Architecture', copy: 'A secure, scalable database is essential for any sports performance application.' },
        { title: 'Clear Data Visualisation', copy: 'Fatigue and impact data must be shown simply - athletes need quick, readable insights.' },
        { title: 'User Feedback Value', copy: 'Surveys and guerrilla testing surfaced real usability issues that internal review missed.' },
        { title: 'Agile Communication', copy: 'Proactive communication and flexibility are crucial to keeping agile teams aligned.' }
      ]
    }
  ]
};

const personaData = [
  {
    alt: 'Kaloyan Georgiev',
    image: 'https://stanandstacy.com/wp-content/uploads/2020/05/wat-is-een-buyerpersona-stanandstacy.jpg',
    goal: 'Track his training progress and compare results over time in a clear, easy-to-read way.',
    facts: [
      { key: 'Age', value: '20' },
      { key: 'Occupation', value: 'Student' },
      { key: 'Location', value: 'Bulgaria' },
      { key: 'Tech Comfort', value: 'High' }
    ],
    needs: ['Easy progress tracking', 'Clear statistics view', 'Fast app navigation'],
    frustrations: ['Outdated UI', 'Confusing statistics', 'Poor mobile experience'],
    quote: '"I just want to see how I\'m improving - why is it so hard to read?"',
    captionTitle: 'Persona 1: Primary User',
    captionCopy: 'Represents young athletes aged 18-25 who train regularly and want clear, motivating data to track their performance improvements.'
  },
  {
    alt: 'Adam Svoboda',
    image: 'https://img.a.transfermarkt.technology/portrait/big/590205-1711577517.jpg?lm=1',
    goal: 'Use a redesigned platform that is visually consistent and intuitive without needing to re-learn the interface.',
    facts: [
      { key: 'Age', value: '22' },
      { key: 'Occupation', value: 'Student' },
      { key: 'Location', value: 'Czech Republic' },
      { key: 'Tech Comfort', value: 'Medium' }
    ],
    needs: ['Better UI for the platform', 'Consistent visual design', 'Simpler onboarding'],
    frustrations: ['Confusing design', 'Inconsistent colors', 'Unintuitive layout'],
    quote: '"The app could be great - it just looks like it was made in 2010."',
    captionTitle: 'Persona 2: Secondary User',
    captionCopy: 'Casual users and returning athletes who need a visually consistent, modern interface to stay engaged with the platform long-term.'
  }
];

const povData = [
  {
    title: 'Point of View',
    copy: 'A user who wants to check his training data and compare it for improvement, but is confused on how to do so.'
  },
  {
    title: 'How Might We',
    list: [
      'Show the user\'s data in an easy and understandable way.',
      'Track the data and showcase the improvement over time.',
      'Ensure that the shown data is accurate.',
      'Ensure data can be displayed without causing confusion.'
    ]
  },
  {
    title: 'Point of View',
    subtitle: 'Xsens Dot Device',
    copy: 'A user who wants to use his Xsens Dot device as easily as possible, but cannot do so.'
  },
  {
    title: 'How Might We',
    subtitle: 'Xsens Dot Device',
    list: [
      'Identify the easiest way to showcase device data in the app.',
      'Make the data understandable but as detailed as possible.',
      'Make the experience between the Xsens Dot device and app fluid.',
      'Create an efficient way of collecting and storing device data.'
    ]
  }
];

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

function initCharts() {
  if (typeof Chart === 'undefined') {
    return;
  }

  const occupationCanvas = document.getElementById('occupationChart');
  const sportsCanvas = document.getElementById('sportsChart');
  if (!occupationCanvas || !sportsCanvas) {
    return;
  }

  const ctx1 = occupationCanvas.getContext('2d');
  const ctx2 = sportsCanvas.getContext('2d');

  new Chart(ctx1, {
    type: 'pie',
    data: {
      labels: ['Student (82%)', 'Other (12%)', 'Employed (6%)'],
      datasets: [{
        data: [82, 12, 6],
        backgroundColor: [createGradient(ctx1), '#7f5af0', '#a78bfa'],
        borderColor: '#111',
        borderWidth: 2
      }]
    },
    options: {
      plugins: {
        legend: {
          position: 'bottom',
          labels: { color: '#bbb' }
        }
      }
    }
  });

  new Chart(ctx2, {
    type: 'bar',
    data: {
      labels: ['Skateboarding (44%)', 'Street Basketball (25%)', 'Rollerblading (19%)', 'Freerun (12%)', 'Parkour (12%)', 'BMX Biking (6%)', "Didn\'t participate (31%)"],
      datasets: [{
        label: 'Participation %',
        data: [44, 25, 19, 12, 12, 6, 31],
        backgroundColor: createGradient(ctx2),
        borderColor: '#6E07F3',
        borderWidth: 2,
        borderRadius: 10
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
          ticks: { color: '#bbb' },
          grid: { color: '#333' }
        },
        x: {
          ticks: { color: '#bbb' },
          grid: { color: '#333' }
        }
      },
      plugins: {
        legend: { display: false }
      }
    }
  });
}

function initPDF() {
  if (typeof pdfjsLib === 'undefined') {
    return;
  }

  pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js';

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
    window.ProjectPageComponents.renderPersonaGrid('#personas-grid', personaData);
    window.ProjectPageComponents.renderPovGrid('#pov-grid', povData);
  }

  initScrollCue();
  initCharts();
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
