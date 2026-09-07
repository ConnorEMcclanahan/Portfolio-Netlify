const introSummaryData = {
  title: 'Phillips Wall',
  subtitle: 'Making visitor perspectives visible over time',
  lead: 'An AI-powered interactive timeline for museum feedback',
  meta: [
    { label: 'Role', value: 'Frontend Developer and UI/UX Designer' },
    { label: 'Context', value: 'AI for Society Minor group project' },
    { label: 'Focus', value: 'AI, data preparation, visualization, user testing' },
    { label: 'Audience', value: 'Museum visitors, researchers, and educators' }
  ],
  story: {
    background: 'The Phillips Museum collected visitor opinions on sticky notes, but the responses were static, scattered, and difficult to compare over time.',
    problem: 'The project needed a way to transform handwritten feedback into an interactive timeline without hiding uncertainty or removing human interpretation from the process.',
    goals: 'Create an evolving visualization that organizes visitor responses, reveals sentiment and recurring themes, and helps people engage with how public perspectives change.'
  }
};

document.addEventListener('DOMContentLoaded', () => {
  if (window.ProjectPageComponents) {
    window.ProjectPageComponents.renderIntroSummary('#intro-summary', introSummaryData);
  }

  const checkReveal = () => {
    document.querySelectorAll('.reveal').forEach((element) => {
      element.classList.toggle('active', element.getBoundingClientRect().top < window.innerHeight - 120);
    });
  };

  window.addEventListener('scroll', checkReveal, { passive: true });
  checkReveal();
});

window.addEventListener('load', () => {
  const loader = document.querySelector('#loader');
  if (loader) {
    loader.style.display = 'none';
  }
});
