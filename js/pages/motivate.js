const introSummaryData = {
  title: 'Instruction Creation Tool',
  subtitle: 'Creating clearer work instructions for factory teams',
  lead: 'An intuitive tool embedded in Motivate\u0027s Platform Management Tool (PMT) that streamlines standard work instructions for factory environments.',
  meta: [
    { label: 'Role', value: 'UX/UI Designer and Front-end Developer' },
    { label: 'Timeline', value: 'Feb 19 - Jun 28, 2024 (18 weeks)' },
    { label: 'Tools Used', value: 'Vue 3, PDF.js, Node.js, Figma' }
  ],
  story: {
    background: 'The Instruction Creation Tool directly extends Motivate\u0027s Platform Management Tool to empower manufacturing and assembly teams tasked with authoring standardized work instructions within demanding factory environments. By integrating deeply into Motivate\u0027s existing architecture, the project supports a continuous push toward paperless, efficient shop floor operations and real-time data accessibility.',
    problem: 'Prior to this system, managers and operators struggled with significant operational friction caused by their reliance on scattered files and disparate external tools. This fragmentation made critical tasks\u2014such as instruction creation, formal approval routing, strict version control, and rapid multi-device access\u2014unnecessarily difficult to manage across the production floor.',
    goals: 'The core objective was to establish a unified, frictionless workflow for authoring, reviewing, publishing, and viewing rich multimedia work instructions across diverse factory devices. Key targets included refining the platform\u0027s interface for maximum usability, optimizing the high-definition PDF viewer within an iframe to streamline document handling, and fully meeting industry compliance and standardization requirements.'
  }
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
  copy: [
    'I observed how factory workers interacted with the existing PMT system during real instruction-related tasks. The studies focused on navigation, finding the correct instruction, accessing updates, and working across different devices and conditions.',
    'This made the gap between the digital workflow and the physical factory environment visible. Workers needed to find the right information quickly, often while dealing with noise, limited attention, and different screen sizes. The observation work therefore became a practical check on whether the new workflow would support real use rather than only look clear in a prototype.'
  ],
  panels: [
    {
      title: 'What this changed',
      copy: 'The findings led to a responsive interface, support for multiple media formats, clearer visual hierarchy, and a workflow aligned with Training Within Industry methods. The ICT needed to make the latest approved instruction easy to find and understand at the point of work.'
    }
  ]
};

const userFeedbackData = {
  title: 'User Feedback on Low-Fidelity Prototypes',
  copy: [
    'To gather feedback on low-fidelity prototypes, I conducted initial interviews in which users reviewed sketches and answered questions about the proposed workflow. The sessions tested whether the screens communicated the right information and whether the overall direction felt understandable before visual detail was added.',
    'This early feedback was important because it exposed problems in structure and flow while they were still inexpensive to change. It helped separate essential workflow steps from ideas that could wait until later iterations.'
  ],
  panels: [
    {
      title: 'Key Validation Points',
      copy: 'The sessions focused on whether users could understand the navigation and flow, recognize the purpose of each screen, find the expected features, and complete the workflow without unnecessary explanation.'
    },
    {
      title: 'Insights Gathered',
      copy: [
        'Feedback provided crucial insight into navigation clarity, design intuitiveness, and overall UX. Users confirmed the feature set and direction while reinforcing the need for a robust, user-friendly interface.',
        'The strongest signal was that the workflow needed to feel direct and predictable: users should understand what to do next, why a step was required, and how their work would move through review and approval.'
      ]
    },
    {
      title: 'Next Steps',
      copy: 'This validation helped align the product direction with user expectations and established a strong foundation for further refinement.'
    }
  ]
};

const mockupFlowData = {
  layout: 'editorial',
  items: [
    {
      title: 'Standard Form',
      copy: [
        'The first step gives managers a focused way to start a new standard without leaving the PMT platform. The form establishes the instruction title, ownership, and core information before the user moves into the detailed content.',
        'Keeping the entry point simple reduces the information users need to process at once and creates a clear beginning for the approval workflow.'
      ],
      image: '../images/motivate/mockup-1.png',
      alt: 'Mockup Home',
      device: 'phone'
    },
    {
      title: 'Standard Form Pt2',
      copy: [
        'The second step builds the standard around the real work being documented. Managers can add images, describe the task, and emphasize safety and quality requirements so the instruction is useful on the factory floor.',
        'Multimedia support helps teams explain processes that are difficult to communicate through text alone and gives operators more context while they work.'
      ],
      image: '../images/motivate/mockup-2.png',
      alt: 'Activity',
      device: 'phone'
    },
    {
      title: 'Standard Form Pt3',
      copy: [
        'Before submission, the final form step gives the manager an overview of the complete standard. This review stage makes it possible to catch missing information and check the order of the instruction.',
        'Managers can make last-minute changes before sending the work into approval, reducing avoidable rework later in the process.'
      ],
      image: '../images/motivate/mockup-3.png',
      alt: 'Education',
      device: 'phone'
    },
    {
      title: 'Approval',
      copy: [
        'Once submitted, standards move into a controlled approval workflow. Authorized users can review the instruction, inspect its supporting media, and either approve it, request changes, or reject it.',
        'Keeping review and responsibility inside PMT makes version control clearer than relying on separate messages or files.'
      ],
      image: '../images/motivate/mockup-5.png',
      alt: 'Journal Entry',
      device: 'tablet'
    },
    {
      title: 'Viewing Standard',
      copy: [
        'After approval, the standard becomes available to the people who need it during production. The viewer is designed for factory tablets and PCs so the latest approved instruction is accessible at the point of work.',
        'This creates one consistent source for daily use while preserving a clear path for future updates.'
      ],
      image: '../images/motivate/mockup-4.png',
      alt: 'Stats',
      device: 'tablet'
    }
  ]
};

const competitorAnalysisData = {
  title: 'Competitor Analysis',
  copy: 'Research into existing instruction creation tools helped identify market opportunities and user needs. I compared each platform through the lens of ease of use, editing speed, cross-device access, current interface patterns, and language support. This comparison showed that the strongest opportunity was not simply adding more features, but creating a clearer workflow that makes authoring and reviewing standards easier for factory teams.',
  focusItems: [],
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

function addContentReveals() {
  document.querySelectorAll('body.project-page-standard .project-section p, body.project-page-standard .project-section h3, body.project-page-standard .project-section h4, body.project-page-standard .project-section li, body.project-page-standard .project-section img, body.project-page-standard .case-study-phase__overview h3, body.project-page-standard .case-study-phase__overview li, body.project-page-standard .case-study-process h2, body.project-page-standard .case-study-process__step').forEach((element) => {
    element.classList.add('reveal', 'reveal-content');
  });
}


document.addEventListener('DOMContentLoaded', () => {
  if (window.pdfjsLib) {
    window.pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js';
  }

  initScrollCue();
  initSmoothScroll();

  if (window.ProjectPageComponents) {
    window.ProjectPageComponents.renderIntroSummary('#intro-summary', introSummaryData);
    window.ProjectPageComponents.renderComparisonTable('#competitor-analysis-mount', competitorAnalysisData);
    window.ProjectPageComponents.renderSplitInsights('#observational-mount', observationalData);
    window.ProjectPageComponents.renderSplitInsights('#user-feedback-mount', userFeedbackData);
    window.ProjectPageComponents.renderMockupFlow('#mockup-flow', mockupFlowData);
    window.ProjectPageComponents.renderFinalColumns('#final-container', finalSectionData);
  }

  addContentReveals();
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
