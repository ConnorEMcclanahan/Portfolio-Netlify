const introSummaryData = {
  title: 'FitPhone Case Study',
  subtitle: 'Digital wellness for healthier phone habits',
  lead: 'A cross-platform app that helps young adults build healthier smartphone habits through self-awareness and mindful usage.',
  meta: [
    { label: 'Role', value: 'UI/UX Designer & Front-end Engineer' },
    { label: 'Timeline', value: '4 weeks' },
    { label: 'Tools Used', value: 'Flutter, Dart' },
    { label: 'GitHub', value: 'github.com/z3r0-21/fitphone', href: 'https://github.com/z3r0-21/fitphone' }
  ],
  story: {
    background: 'FitPhone is an innovative project designed to empower young adults aged 18 to 30 to cultivate intentional smartphone habits through heightened self-awareness. While mobile technology provides undeniable everyday utility, unmonitored device usage directly drives widespread challenges including acute sleep deprivation, reduced cognitive focus, and chronic procrastination. The application addresses these modern friction points by introducing structured behavioral frameworks that turn passive screen interaction into active, mindful choices.',
    problem: 'Most legacy digital wellness applications fail to sustain meaningful, long-term user engagement because they rely exclusively on passive screen-time tracking and restrictive usage caps. These solutions present users with raw metrics without offering actionable strategies, personalized behavioral guidance, or social incentive structures. Consequently, users are left with data about their negative habits but lack the motivation, tools, or community support necessary to drive actual behavioral change.',
    goals: 'The core objective was to design and engineer a comprehensive digital ecosystem that enables users to take control of their digital well-being through shared accountability and personal milestone tracking. FitPhone fulfills this by pairing robust front-end functionality with community-driven features: empowering users to set clear, measurable goals, visualize their focus metrics over time, engage with digestible behavioral education, and participate in peer-led accountability groups.'
  }
};

/* Single-column conclusion. Uses the same structure and length as the Diplora
   case study: one Conclusion column, four titled paragraphs. */
const finalSectionData = {
  columns: [
    {
      title: 'Conclusion',
      items: [
        {
          title: 'Digital Wellbeing & User Trust',
          copy: 'FitPhone treats phone usage as a habit to understand rather than a behaviour to restrict. Goals, guided weekly reflection, and peer accountability replace punitive caps and raw screen-time numbers, so users get encouragement instead of judgement. Privacy controls were kept adaptable so they can be strengthened as the community grows.'
        },
        {
          title: 'Business Value Delivered',
          copy: 'A cross-platform Flutter app was delivered in four weeks, covering onboarding, home, activities and education, weekly check-ins, and stats. Onboarding questions generate personalised recommendations so users always have an immediate next step, while tracking and gamified achievements keep engagement high. Client feedback sessions and MoSCoW prioritisation kept the feature set focused, and the built product is ready to extend with more locations and a wider community layer.'
        },
        {
          title: 'Advice to Stakeholders',
          copy: 'Expand the community layer with local events and additional cities, strengthen data privacy controls before the user base grows, and set up a structured post-launch feedback loop. Further device testing and release preparation would reduce risk as the feature set expands.'
        },
        {
          title: 'Key Learnings',
          copy: 'Technical work only matters when it serves a real user goal. Four weeks of Flutter development was a fast lesson in how much hidden effort sits behind one feature, from integration and debugging to store preparation. Regular client collaboration and honest retrospectives kept the team aligned, and the project confirmed that accountability and reflection motivate change far more than tracking alone.'
        }
      ]
    }
  ]
};

const mockupFlowData = {
  layout: 'editorial',
  items: [
    {
      title: 'Onboarding',
      copy: [
        'During onboarding, users identify the challenges they want to solve, such as spending too much time scrolling or struggling to make time for healthier activities. Their answers create a more personal starting point than a generic screen-time dashboard.',
        'Based on these choices, FitPhone recommends relevant resources and activities. This gives users an immediate next step and makes the rest of the experience feel connected to their own goals.'
      ],
      image: '../images-optimized/mockups/onboarding.webp',
      alt: 'FitPhone onboarding screen',
      device: 'phone'
    },
    {
      title: 'Home Screen',
      copy: [
        'The home screen acts as a central hub for personalized activities, progress, and reminders based on the user\'s selected goals. It gives users a quick view of what they can do next without making them search through the app.',
        'Tracking and gamified achievements help keep engagement high, while the activity cards turn a long-term goal into smaller actions that are easier to return to each day.'
      ],
      image: '../images-optimized/mockups/home/whatsapp-home-portrait.webp',
      alt: 'FitPhone home screen',
      device: 'phone'
    },
    {
      title: 'Activities & Education',
      copy: [
        'The activities area gives users alternatives to phone use that connect with their interests, including both individual and group activities. The goal is to make changing a habit feel practical rather than restrictive.',
        'Educational resources provide context and encouragement alongside those activities. Together, these sections help users understand their habits and find realistic ways to replace unhelpful routines.'
      ],
      images: [
        { src: '../images-optimized/mockups/activty/whatsapp-activity-portrait.webp', alt: 'FitPhone activities screen' },
        { src: '../images-optimized/mockups/education.webp', alt: 'FitPhone education screen' }
      ],
      device: 'phone'
    },
    {
      title: 'Journal Entry / Weekly Check-in',
      copy: [
        'The weekly check-in gives users a dedicated moment to reflect on their phone usage by recording screen time, pickups, and responses to guided questions.',
        'This turns usage data into a personal reflection instead of a judgment. Users can notice patterns over time and connect their progress back to the goals they selected during onboarding.'
      ],
      image: '../images-optimized/mockups/journelentry/whatsapp-journal-portrait.webp',
      alt: 'FitPhone journal entry screen',
      device: 'phone'
    },
    {
      title: 'Stats',
      copy: [
        'The stats screen provides a visual overview of screen time, pickups, and phone usage trends. Presenting these measures together helps users see how their habits change rather than focusing on one isolated number.',
        'The screen supports continued motivation by making progress visible and giving users evidence they can use during their weekly reflection and next goal-setting cycle.'
      ],
      image: '../images-optimized/mockups/stats.webp',
      alt: 'FitPhone stats screen',
      device: 'phone'
    }
  ]
};

function initPDF() {
  if (!window.pdfjsLib) {
    return;
  }

  window.pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js';

  document.querySelectorAll('.pdf-container[data-pdf-url]').forEach((container) => {
    const canvas = container.querySelector('.pdf-canvas');
    const loading = container.querySelector('.pdf-loading');
    if (!canvas) {
      return;
    }

    window.pdfjsLib.getDocument(container.dataset.pdfUrl).promise.then((pdf) => {
      return pdf.getPage(1);
    }).then((page) => {
      const viewport = page.getViewport({ scale: 1.2 });
      canvas.width = viewport.width;
      canvas.height = viewport.height;
      return page.render({
        canvasContext: canvas.getContext('2d'),
        viewport
      }).promise;
    }).then(() => {
      if (loading) {
        loading.style.display = 'none';
      }
    }).catch(() => {
      if (loading) {
        loading.textContent = 'The MoSCoW document could not be loaded. Open this page through a local server.';
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
  document.querySelectorAll('body.project-page-standard .project-section p, body.project-page-standard .project-section h3, body.project-page-standard .project-section h4, body.project-page-standard .project-section li, body.project-page-standard .project-section img, body.project-page-standard .project-section iframe, body.project-page-standard .case-study-phase__title h2, body.project-page-standard .case-study-phase__overview h3, body.project-page-standard .case-study-phase__overview li, body.project-page-standard .case-study-process h2, body.project-page-standard .case-study-process__step, body.project-page-standard #intro-summary .intro-heading > *, body.project-page-standard #intro-summary .intro-summary-left > *, body.project-page-standard #intro-summary .intro-meta-item, body.project-page-standard #intro-summary .intro-story-block h2, body.project-page-standard #intro-summary .intro-story-block p').forEach((element) => {
    element.classList.add('reveal', 'reveal-content');
  });
}

document.addEventListener('DOMContentLoaded', () => {
  if (window.ProjectPageComponents) {
    window.ProjectPageComponents.renderIntroSummary('#intro-summary', introSummaryData);
    window.ProjectPageComponents.renderFinalColumns('#final-container', finalSectionData);
    window.ProjectPageComponents.renderMockupFlow('#mockup-flow', mockupFlowData);
  }

  initScrollCue({ threshold: 0.3 });
  initPDF();
  addContentReveals();
  window.addEventListener('scroll', reveal, { passive: true });
  reveal();
});

window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  if (loader) {
    loader.style.display = 'none';
  }

  document.body.classList.add('loaded');
  reveal();
});
