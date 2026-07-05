const introSummaryData = {
  title: 'Instruction Creation Tool',
  lead: 'As UX/UI Designer and Front-end Developer, I led the development of an intuitive instruction management system within PMT that meets industry standardization requirements while optimizing user experience for factory environments.',
  meta: [
    { label: 'Role', value: 'UX/UI Designer and Front-end Developer' },
    { label: 'Duration', value: 'Feb 19 - Jun 28, 2024 (18 weeks)' },
    { label: 'Stack', value: 'Vue 3, PDF.js, Node.js, Figma' },
    { label: 'Deliverables', value: 'Research Report, Competitive Analysis, Hi-fi Prototype, ICT' },
    { label: 'Release', value: 'Integrated PMT Branch' }
  ]
};

const finalSectionData = {
  columns: [
    {
      title: 'Project Achievements and Future Improvements',
      items: [
        {
          title: 'Platform Integration Success',
          copy: 'Successfully integrated the instruction-creation tool within the PMT platform.'
        },
        {
          title: 'Factory-Friendly UX',
          copy: 'Delivered a responsive, user-friendly interface aligned with TWI methodology for shop-floor use.'
        },
        {
          title: 'Stronger Content Workflow',
          copy: 'Enhanced PDF handling and identified next improvements like better low-connectivity uploads.'
        },
        {
          title: 'Future Smart Features',
          copy: 'AI-assisted suggestions, richer image editing, and advanced analytics are clear next opportunities.'
        }
      ]
    },
    {
      title: 'Key Learning Outcomes',
      items: [
        {
          title: 'End-to-End Delivery',
          copy: 'Delivered full CRUD frontend functionality using Vue.js in a real production context.'
        },
        {
          title: 'Context-Aware Design',
          copy: 'Adapted interface decisions to factory constraints while preserving clarity and speed.'
        },
        {
          title: 'Leadership and Collaboration',
          copy: 'Led prototype and testing phases while balancing stakeholder feedback and technical feasibility.'
        },
        {
          title: 'Technical and Research Growth',
          copy: 'Improved in Vue.js, UX practice, and structured user research that directly shaped product decisions.'
        }
      ]
    }
  ]
};

const observationalData = {
  title: 'Observational Studies',
  copy: 'Conducted observational studies to understand how factory workers interact with the current PMT system. These studies provided valuable insights into practical challenges in navigation, access to instructions, and update management, and helped identify improvements grounded in real factory workflows.',
  panels: [
    {
      title: 'Key Findings',
      list: [
        'Technical limitations requiring responsive design across devices',
        'Need for compatibility with various media formats and file types',
        'Noisy factory environments requiring clear visual interfaces',
        'Standardization needs aligned with Training Within Industry methods'
      ]
    }
  ]
};

const userFeedbackData = {
  title: 'User Feedback on Low-Fidelity Prototypes',
  copy: 'To gather feedback on low-fidelity prototypes, initial interviews were conducted. Users reviewed sketches and answered questions to validate information coverage, usability, design clarity, and functional direction.',
  panels: [
    {
      title: 'Key Validation Points',
      list: [
        'Navigation clarity and flow',
        'Design intuitiveness',
        'Feature completeness',
        'Overall user experience'
      ]
    },
    {
      title: 'Insights Gathered',
      copy: 'Feedback provided crucial insight into navigation clarity, design intuitiveness, and overall UX. Users confirmed the feature set and direction while reinforcing the need for a robust, user-friendly interface.'
    },
    {
      title: 'Next Steps',
      copy: 'This validation helped align the product direction with user expectations and established a strong foundation for further refinement.'
    }
  ]
};

const mockupFlowData = {
  items: [
    {
      title: 'Standard Form',
      copy: 'A clear form flow allows users to quickly create a standard.',
      image: '../Images/Motivate/mockup-1.png',
      alt: 'Mockup Home',
      device: 'phone'
    },
    {
      title: 'Standard Form Pt2',
      copy: 'The second step adds images and follows standard practices with safety and quality emphasized.',
      image: '../Images/Motivate/mockup-2.png',
      alt: 'Activity',
      device: 'phone'
    },
    {
      title: 'Standard Form Pt3',
      copy: 'The final step provides an overview so users can make last-minute updates before submission.',
      image: '../Images/Motivate/mockup-3.png',
      alt: 'Education',
      device: 'phone'
    },
    {
      title: 'Approval',
      copy: 'Standards are routed for approval where authorized users can edit, accept, or reject.',
      image: '../Images/Motivate/mockup-5.png',
      alt: 'Journal Entry',
      device: 'tablet'
    },
    {
      title: 'Viewing Standard',
      copy: 'After approval, standards are stored and available across factory tablets and PCs.',
      image: '../Images/Motivate/mockup-4.png',
      alt: 'Stats',
      device: 'tablet'
    }
  ]
};

const competitorAnalysisData = {
  title: 'Competitor Analysis',
  copy: 'Research into existing instruction creation tools helped identify market opportunities and user needs.',
  focusTitle: 'Analysis Focus Areas:',
  focusItems: [
    'Ease of use and interface design',
    'Quick editing capabilities',
    'Device compatibility across platforms',
    'Modern design principles',
    'Language support features'
  ],
  columns: ['Platform', 'Strengths', 'Weaknesses'],
  rows: [
    {
      name: 'SwipeGuide',
      strengths: ['Multilingual support', 'Quick creation features', 'Clean design'],
      weaknesses: ['Impersonal gamification', 'Crowded interface']
    },
    {
      name: 'Workclout',
      strengths: ['Intuitive design', 'Cross-device compatibility', 'Easy readability'],
      weaknesses: ['Weak call-to-actions', 'Limited offline features']
    },
    {
      name: 'Poka',
      strengths: ['Troubleshooting features', 'Feedback tracking', 'Visual documentation'],
      weaknesses: ['Low user engagement', 'Incomplete feature set']
    }
  ]
};

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
  initThreeLoader();

  if (window.ProjectPageComponents) {
    window.ProjectPageComponents.renderIntroSummary('#intro-summary', introSummaryData);
    window.ProjectPageComponents.renderComparisonTable('#competitor-analysis-mount', competitorAnalysisData);
    window.ProjectPageComponents.renderSplitInsights('#observational-mount', observationalData);
    window.ProjectPageComponents.renderSplitInsights('#user-feedback-mount', userFeedbackData);
    window.ProjectPageComponents.renderMockupFlow('#mockup-flow', mockupFlowData);
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
