const introSummaryData = {
  title: 'Philips',
  subtitle: 'Turning handwritten museum feedback into a living conversation',
  lead: 'An AI-powered feedback wall that helps visitors see how people think about the future of AI',
  meta: [
    { label: 'Role', value: 'Frontend Developer and UI/UX Designer' },
    { label: 'Context', value: 'AI For Society Minor' },
    { label: 'Timeline', value: '20 weeks (Spring 2025)' },
    { label: 'Tools', value: 'React, JavaScript, Python, SQLite, OpenAI Vision' },
    { label: 'GitHub', value: 'github.com/ConnorEMcclanahan/PhilipsWall', href: 'https://github.com/ConnorEMcclanahan/PhilipsWall' }
  ],
  story: {
    background: 'The Philips Museum exhibition successfully immersed visitors in exploring and reflecting upon artificial intelligence, yet the physical visitor journey historically terminated at a passive, static sticky-note wall. This conventional setup limited visitor engagement, offering no digital mechanism for people to explore how individual viewpoints connected conceptually across the broader exhibition space.',
    problem: 'The multidisciplinary development team faced the complex challenge of transforming these spontaneous handwritten notes into a dynamic digital experience without sacrificing the raw authenticity and tactile charm of the physical medium. Simultaneously, the solution had to adhere strictly to General Data Protection Regulation compliance boundaries, ensuring visitors were never exposed to unnecessary privacy risks or identity retention hazards.',
    goals: 'The initiative aimed to engineer a clear, highly accessible spatial data visualization that allowed visitors to immediately see their individual responses positioned in direct relation to the wider public dialogue. In parallel, the project needed to furnish museum stakeholders with structured, actionable insights and automated analytics derived from ongoing feedback collection, eliminating the need for manual sorting.'
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
          title: 'Privacy & Responsible AI',
          copy: 'Every response is anonymised before it is stored, and privacy guidance appears before scanning so visitors understand what is captured and why. The AI stance score is treated as a useful interpretation rather than an unquestionable truth, and uncertain or flagged content routes to human review instead of publishing automatically.'
        },
        {
          title: 'Business Value Delivered',
          copy: 'The project turned a passive sticky-note wall into a living visualisation. Around 700 responses were processed through an OpenAI Vision pipeline that transcribes, moderates, translates, and scores each note, and the frontend places live results on a two-axis sentiment map with clustering and a timeline filter. Museum staff gained an analytics view covering scan counts, language distribution, popular prompts, and moderated content. The working system won first place for best table and showcase at the Spring 2025 AI & Data Event.'
        },
        {
          title: 'Advice to Stakeholders',
          copy: 'Add a dedicated scanning station so contributing feels intentional, expand the administrative tools used for curation, and improve duplicate handling. Broaden language support, keep a clear human-review path for uncertain classifications, and continue visitor testing before the concept moves into a permanent exhibition.'
        },
        {
          title: 'Key Learnings',
          copy: 'A multidisciplinary team needs deliberate communication to stay aligned, so structured weekly meetings, transparent standards, and a peer assessment cycle turned early friction into shared goals. Filtering ideas against what was feasible within one academic semester kept the scope realistic, and restoring a corrupted legacy codebase was a lesson in patience with technical debt. Combining backgrounds in software engineering, UI/UX design, business, and creative media is what made a system that bridges physical visitor interaction with AI visualisation possible, and clarity about what the model does, and does not, know is what makes it trustworthy for visitors.'
        }
      ]
    }
  ]
};

document.addEventListener('DOMContentLoaded', () => {
  if (window.ProjectPageComponents) {
    window.ProjectPageComponents.renderIntroSummary('#intro-summary', introSummaryData);
    window.ProjectPageComponents.renderFinalColumns('#final-container', finalSectionData);
  }

  initScrollCue({ threshold: 0.3 });

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
