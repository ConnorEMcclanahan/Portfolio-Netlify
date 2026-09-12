const introSummaryData = {
  title: 'Diplora',
  subtitle: 'Mobile health monitoring for older adults',
  lead: 'An Accessible ECG Sensor Companion',
  meta: [
    { label: 'Role', value: 'UX/UI Designer and Front-end Developer' },
    { label: 'Timeline', value: 'September 2025 - January 2026' },
    { label: 'Stack', value: 'Flutter, Dart, Bluetooth BLE, Figma' },
    { label: 'Deliverables', value: 'Research, Personas, Prototype, MVP' },
    { label: 'Context', value: 'Internship Project' }
  ],
  story: {
    background: 'Diplora is a medical technology company developing an ECG sensor and mobile application for cardiovascular monitoring. During my internship, I worked on the front-end experience for the portable sensor system, which supports continuous monitoring while giving clinicians the detailed information they need.',
    problem: 'Diplora needed an accessible mobile interface for their new wearable ECG sensor. The challenge: designing an app that older adults (75+) could confidently pair via Bluetooth and use daily without frustration, ensuring critical medical data wasn\'t lost due to UX friction.',
    goals: 'I redesigned and developed an accessible Flutter MVP with simpler onboarding, clear sensor pairing guidance, a persistent battery and connection status, and a focused symptom logbook. The goal was to create a trustworthy experience that reassures patients while keeping clinical interpretation with healthcare professionals.'
  }
};

const finalSectionData = {
  columns: [
    {
      title: 'Conclusion',
      items: [
        {
          title: 'Medical Compliance & Safety',
          copy: 'The app strictly follows medical device guidelines by showing only device status, battery, connection, and recording state—no diagnostic interpretation or medical advice. All clinical decisions remain with healthcare professionals, ensuring the product stays within regulatory boundaries while providing patients with the reassurance they need.'
        },
        {
          title: 'Business Value Delivered',
          copy: 'WCAG 2.1 AA compliance achieved with 18pt minimum text and 4.5:1 contrast ratios—critical for regulatory approval. Six design iterations based on user feedback resulted in 100% task completion in final validation tests. The functional Flutter MVP with real BLE connection and scalable BLoC architecture is ready for backend integration and clinical trials. Simplifying onboarding from 7+ screens to 4 and consolidating the logbook into one view also reduced cognitive load for users.'
        },
        {
          title: 'Advice to Stakeholders',
          copy: 'Complete backend integration for alerts and symptom logging, replace simulated movement alerts with validated sensor logic, revisit placement guidance once final hardware is available, and broaden testing across more devices with screen readers before clinical adoption.'
        },
        {
          title: 'Key Learnings',
          copy: 'Accessibility is product strategy—clear typography and feedback directly improved confidence. Research-to-iteration workflow turned interviews into concrete UI improvements. Cross-functional validation balanced patient and clinician needs. Implementation discipline with scalable patterns made the solution easier to extend.'
        }
      ]
    }
  ]
};

const competitorMatrixData = {
  title: 'Competitor Analysis',
  copy: 'Evaluated 6 device-connected health apps (AliveCor, myPhonak, Garmin, Omron, Apple Health, FreeStyle) to identify accessibility gaps and opportunities.',
  columns: ['Competitor', 'Device Type', 'Onboarding', 'What Works', "What Doesn\'t"],
  rows: [
    ['AliveCor', 'EKG device', '3 steps: Connect -> Place fingers -> Record', 'Real-time EKG feedback, clear finger placement', 'Small text, medical jargon, no animations'],
    ['myPhonak', 'Hearing aid', 'Pairing mode -> Device detection -> Audio test', 'Direct hearing aid connection, large volume controls', 'Technical audio settings assume familiarity'],
    ['Garmin Connect', 'Fitness trackers', 'Device selection -> Bluetooth pairing -> Profile setup', 'Excellent visual pairing guide, clear status indicators', 'Too many features, assumes tech knowledge'],
    ['Omron Connect', 'Blood pressure monitors', 'Model selection -> Auto-pair -> First reading', 'Large health readings, medical focus, clear layout', 'No interactive device guidance'],
    ['Apple Health', 'Various devices', 'Third-party apps -> Permissions -> Data integration', 'System accessibility support, voice control', 'Complex multi-app setup, overwhelming interface'],
    ['FreeStyle LibreLink', 'Glucose monitors', 'Safety warnings -> Account -> Sensor scan tutorial', 'Simple scanning process, audio feedback', 'Medical terminology assumes health literacy']
  ]
};

function checkReveal() {
  document.querySelectorAll('.reveal').forEach((element) => {
    const elementTop = element.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    element.classList.toggle('active', elementTop < windowHeight - 150);
  });
}

function addContentReveals() {
  document.querySelectorAll('body.project-page-standard .project-section p, body.project-page-standard .project-section h3, body.project-page-standard .project-section h4, body.project-page-standard .project-section li, body.project-page-standard .project-section img, body.project-page-standard .project-section iframe, body.project-page-standard #competitor-analysis-matrix .matrix-shell > *, body.project-page-standard .case-study-phase__overview h3, body.project-page-standard .case-study-phase__overview li, body.project-page-standard #intro-summary .intro-heading > *, body.project-page-standard #intro-summary .intro-summary-left > *, body.project-page-standard #intro-summary .intro-meta-item, body.project-page-standard #intro-summary .intro-story-block h2, body.project-page-standard #intro-summary .intro-story-block p, body.project-page-standard .case-study-process h2, body.project-page-standard .case-study-process__step').forEach((element) => {
    element.classList.add('reveal', 'reveal-content');
  });
}

document.addEventListener('DOMContentLoaded', () => {
  if (window.pdfjsLib) {
    window.pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js';
  }

  if (window.ProjectPageComponents) {
    window.ProjectPageComponents.renderIntroSummary('#intro-summary', introSummaryData);
    window.ProjectPageComponents.renderComparisonMatrix('#competitor-analysis-matrix', competitorMatrixData);
    window.ProjectPageComponents.renderFinalColumns('#final-container', finalSectionData);
  }

  addContentReveals();
  window.addEventListener('scroll', checkReveal, { passive: true });
  checkReveal();
});

window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  if (loader) {
    loader.style.display = 'none';
  }
});
