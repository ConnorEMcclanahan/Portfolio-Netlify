const introSummaryData = {
  title: 'Phillips Wall',
  subtitle: 'Turning handwritten museum feedback into a living conversation',
  lead: 'An AI-powered feedback wall that helps visitors see how people think about the future of AI',
  meta: [
    { label: 'Role', value: 'Frontend Developer and UI/UX Designer' },
    { label: 'Context', value: 'AI for Society Minor group project' },
    { label: 'Timeline', value: 'Spring 2025' },
    { label: 'Tools', value: 'React, JavaScript, Python, SQLite, OpenAI Vision' }
  ],
  story: {
    background: 'The Philips Museum exhibition invited visitors to reflect on artificial intelligence, but the experience ended with handwritten notes on a static wall.',
    problem: 'We needed to turn those notes into an interactive experience without losing the spontaneity of the physical wall or exposing visitors to unnecessary privacy risks.',
    goals: 'Create a clear, accessible visualization where visitors could see their response in relation to the wider conversation and the museum could learn from the collected feedback.'
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
