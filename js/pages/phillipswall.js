const introSummaryData = {
  title: 'Phillips Wall',
  subtitle: 'Turning handwritten museum feedback into a living conversation',
  lead: 'An AI-powered feedback wall that helps visitors see how people think about the future of AI',
  meta: [
    { label: 'Role', value: 'Frontend Developer and UI/UX Designer' },
    { label: 'Context', value: 'AI for Society Minor group project' },
    { label: 'Timeline', value: 'Spring 2025' },
    { label: 'Tools', value: 'React, JavaScript, Python, SQLite, OpenAI Vision' },
    { label: 'GitHub', value: 'github.com/ConnorEMcclanahan/PhillipsWall', href: 'https://github.com/ConnorEMcclanahan/PhillipsWall' }
  ],
  story: {
    background: 'The Philips Museum exhibition successfully immersed visitors in exploring and reflecting upon artificial intelligence, yet the physical visitor journey historically terminated at a passive, static sticky-note wall. This conventional setup limited visitor engagement, offering no digital mechanism for people to explore how individual viewpoints connected conceptually across the broader exhibition space.',
    problem: 'The multidisciplinary development team faced the complex challenge of transforming these spontaneous handwritten notes into a dynamic digital experience without sacrificing the raw authenticity and tactile charm of the physical medium. Simultaneously, the solution had to adhere strictly to General Data Protection Regulation compliance boundaries, ensuring visitors were never exposed to unnecessary privacy risks or identity retention hazards.',
    goals: 'The initiative aimed to engineer a clear, highly accessible spatial data visualization that allowed visitors to immediately see their individual responses positioned in direct relation to the wider public dialogue. In parallel, the project needed to furnish museum stakeholders with structured, actionable insights and automated analytics derived from ongoing feedback collection, eliminating the need for manual sorting.'
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
