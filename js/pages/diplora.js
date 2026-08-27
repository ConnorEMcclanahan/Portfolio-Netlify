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
    problem: 'The existing interface was not accessible enough for the primary patient group: adults aged 65 and over. Small fonts, low contrast, unclear status feedback, and complicated onboarding made it difficult for patients to know whether their sensor was connected and working correctly. The app also needed to show device status without presenting diagnostic interpretations.',
    goals: 'I redesigned and developed an accessible Flutter MVP with simpler onboarding, clear sensor pairing guidance, a persistent battery and connection status, and a focused symptom logbook. The goal was to create a trustworthy experience that reassures patients while keeping clinical interpretation with healthcare professionals.'
  }
};

const finalSectionData = {
  columns: [
    {
      title: 'How Usability Might Be Improved',
      items: [
        {
          title: 'More Guided Onboarding',
          copy: 'Add progressive onboarding hints and contextual walkthroughs for first-time elderly users.'
        },
        {
          title: 'Stronger Readability Controls',
          copy: 'Provide in-app text scaling and contrast presets so users can personalize readability instantly.'
        },
        {
          title: 'Expanded Caregiver Flow',
          copy: 'Support shared caregiver actions for setup checks, reminders, and follow-up assistance.'
        },
        {
          title: 'Smarter Connection Recovery',
          copy: 'Improve BLE reconnection guidance with clearer step-by-step states and recovery feedback.'
        }
      ]
    },
    {
      title: 'Key Learning Outcomes',
      items: [
        {
          title: 'Accessibility Is Product Strategy',
          copy: 'Clear typography, touch targets, and feedback loops directly improved confidence and task success.'
        },
        {
          title: 'Research-to-Iteration Workflow',
          copy: 'User interviews and testing translated into concrete UI improvements across six major iterations.'
        },
        {
          title: 'Cross-Functional Validation',
          copy: 'Balancing patient and healthcare stakeholder needs produced a more trustworthy and practical product.'
        },
        {
          title: 'Implementation Discipline',
          copy: 'Building the MVP with scalable architecture patterns made the solution easier to extend and maintain.'
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

document.addEventListener('DOMContentLoaded', () => {
  if (window.pdfjsLib) {
    window.pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js';
  }

  if (window.ProjectPageComponents) {
    window.ProjectPageComponents.renderIntroSummary('#intro-summary', introSummaryData);
    window.ProjectPageComponents.renderComparisonMatrix('#competitor-analysis-matrix', competitorMatrixData);
    window.ProjectPageComponents.renderFinalColumns('#final-container', finalSectionData);
  }

  window.addEventListener('scroll', checkReveal, { passive: true });
  checkReveal();
});

window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  if (loader) {
    loader.style.display = 'none';
  }
});
