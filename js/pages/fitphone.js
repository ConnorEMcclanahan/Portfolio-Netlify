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

const mockupFlowData = {
  layout: 'editorial',
  items: [
    {
      title: 'Onboarding',
      copy: [
        'During onboarding, users identify the challenges they want to solve, such as spending too much time scrolling or struggling to make time for healthier activities. Their answers create a more personal starting point than a generic screen-time dashboard.',
        'Based on these choices, FitPhone recommends relevant resources and activities. This gives users an immediate next step and makes the rest of the experience feel connected to their own goals.'
      ],
      image: '../Images/Mockups/Onboarding.png',
      alt: 'FitPhone onboarding screen',
      device: 'phone'
    },
    {
      title: 'Home Screen',
      copy: [
        'The home screen acts as a central hub for personalized activities, progress, and reminders based on the user’s selected goals. It gives users a quick view of what they can do next without making them search through the app.',
        'Tracking and gamified achievements help keep engagement high, while the activity cards turn a long-term goal into smaller actions that are easier to return to each day.'
      ],
      image: '../Images/Mockups/Home/WhatsApp Image 2025-04-27 at 23.59.48-portrait.png',
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
        { src: '../Images/Mockups/Activty/WhatsApp Image 2025-04-27 at 23.57.23-portrait.png', alt: 'FitPhone activities screen' },
        { src: '../Images/Mockups/Education.png', alt: 'FitPhone education screen' }
      ],
      device: 'phone'
    },
    {
      title: 'Journal Entry / Weekly Check-in',
      copy: [
        'The weekly check-in gives users a dedicated moment to reflect on their phone usage by recording screen time, pickups, and responses to guided questions.',
        'This turns usage data into a personal reflection instead of a judgment. Users can notice patterns over time and connect their progress back to the goals they selected during onboarding.'
      ],
      image: '../Images/Mockups/journelentry/WhatsApp Image 2025-04-27 at 23.57.24-portrait.png',
      alt: 'FitPhone journal entry screen',
      device: 'phone'
    },
    {
      title: 'Stats',
      copy: [
        'The stats screen provides a visual overview of screen time, pickups, and phone usage trends. Presenting these measures together helps users see how their habits change rather than focusing on one isolated number.',
        'The screen supports continued motivation by making progress visible and giving users evidence they can use during their weekly reflection and next goal-setting cycle.'
      ],
      image: '../Images/Mockups/Stats.png',
      alt: 'FitPhone stats screen',
      device: 'phone'
    }
  ]
};

function reveal() {
  document.querySelectorAll('.reveal').forEach((el) => {
    const top = el.getBoundingClientRect().top;
    el.classList.toggle('active', top < window.innerHeight - 150);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  if (window.ProjectPageComponents) {
    window.ProjectPageComponents.renderIntroSummary('#intro-summary', introSummaryData);
    window.ProjectPageComponents.renderFinalColumns('#final-container', finalSectionData);
    window.ProjectPageComponents.renderMockupFlow('#mockup-flow', mockupFlowData);
  }

  initScrollCue();
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
