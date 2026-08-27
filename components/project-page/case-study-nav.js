(function () {
  function addCaseStudyNav() {
    const intro = document.querySelector('#intro-summary');
    const sections = Array.from(document.querySelectorAll('body.project-page-standard section[id]'))
      .filter((section) => section.id !== 'intro-summary' && (section.querySelector('h1, h2, h3') || ['competitor-analysis', 'final-container'].includes(section.id)));

    const phaseMatchers = [
      ['01 / Research - Understanding the User and Context', /research|survey|interview|competitor/i],
      ['02 / Design System - Building a Scalable Foundation', /design-system|brand|accessib/i],
      ['03 / Requirements - Translating Research into Features', /requirement|persona|feature|priorit/i],
      ['04 / Prototyping - Validating the Experience', /prototype|design-iterations|high-fidelity|mockup|test/i],
      ['05 / Implementation - Bridging Design and Code', /implementation|development|flutter|bloc|bluetooth/i]
    ];
    const phaseContents = {
      Research: ['Research Phase Overview', 'Online Research & Literature Review', 'Competitor Analysis', 'Stakeholder Interviews', 'Survey', 'Patient Interviews', 'Research Conclusion'],
      'Design System': ['Establishing Visual Identity', 'Accessible Design Standards', 'Key Outputs', 'Conclusion'],
      Requirements: ['User Journey Mapping', 'Target User Personas', 'User Requirements', 'MoSCoW Prioritization'],
      Prototyping: ['Low-Fidelity Prototypes', 'User Testing on High-Fidelity Prototypes', 'High-Fidelity Prototypes', 'Design Iterations Based on Feedback'],
      Implementation: ['Development Approach', 'Technical Implementation', 'Completed Features', 'Technical Architecture', 'Technical Challenges', 'Quality Assurance', 'Known Limitations', 'Implementation Conclusion']
    };
    const usedSections = new Set();
    const isDiplora = window.location.pathname.toLowerCase().includes('diplora');
    const preferredIds = isDiplora
      ? [['research', 'research-methods', 'competitor-analysis'], ['design-system'], ['requirements', 'personas'], ['prototyping', 'design-iterations', 'high-fidelity-prototypes'], ['implementation']]
      : [];
    const phaseSections = phaseMatchers
      .map(([label, matcher], phaseIndex) => {
        const preferredSectionIds = preferredIds[phaseIndex] || [];
        const matchingSections = sections.filter((candidate) => {
          if (usedSections.has(candidate)) {
            return false;
          }

          if (preferredSectionIds.length > 0) {
            return preferredSectionIds.includes(candidate.id);
          }

          return matcher.test(`${candidate.id} ${candidate.textContent}`);
        });
        if (matchingSections.length === 0) {
          return null;
        }

        matchingSections.forEach((section) => usedSections.add(section));

        const phaseId = `phase-${label.slice(0, 2).trim()}`;
        const phaseHeader = document.createElement('div');
        phaseHeader.id = phaseId;
        phaseHeader.className = 'case-study-phase';
        const phaseName = label.match(/^\d+ \/ ([^-]+)/)?.[1].trim() || label;
        const contents = phaseContents[phaseName] || [];
        const narratives = [];
        phaseHeader.innerHTML = `
          <div class="case-study-phase__title"><h2>${label}</h2></div>
          <div class="case-study-phase__body">
            <aside class="case-study-phase__overview">
              <h3>Overview</h3>
              <ul>${contents.map((item) => `<li>${item}</li>`).join('')}</ul>
            </aside>
            <div class="case-study-phase__content">
              ${narratives.map(([title, copy]) => `
                <article class="case-study-phase__narrative">
                  <h3>${title}</h3>
                  <p>${copy}</p>
                </article>
              `).join('')}
            </div>
          </div>
        `;
        matchingSections[0].insertAdjacentElement('beforebegin', phaseHeader);
        const content = phaseHeader.querySelector('.case-study-phase__content');
        matchingSections.forEach((section) => content.appendChild(section));
        return { label: label.replace(/^\d+ \/ /, '').split(' - ')[0], section: phaseHeader };
      })
      .filter(Boolean);

    if (!intro || phaseSections.length < 2) {
      return;
    }

    const processSection = document.createElement('section');
    processSection.id = 'process-overview';
    processSection.className = 'case-study-process';
    const processIcons = ['search-outline', 'accessibility-outline', 'options-outline', 'bulb-outline', 'construct-outline'];
    processSection.innerHTML = `
      <div class="case-study-process__inner">
        <h2>THE PROCESS</h2>
        <div class="case-study-process__steps">
          ${phaseSections.map(({ label }, index) => `
            <a class="case-study-process__step" href="#phase-${String(index + 1).padStart(2, '0')}">
              <ion-icon name="${processIcons[index] || 'ellipse-outline'}" aria-hidden="true"></ion-icon>
              <span>${label}</span>
            </a>
          `).join('')}
        </div>
      </div>
    `;
    const introImage = intro.nextElementSibling?.classList.contains('IntroPic')
      ? intro.nextElementSibling
      : intro;
    introImage.insertAdjacentElement('afterend', processSection);

    let phaseAnchor = processSection;
    phaseSections.forEach(({ section }) => {
      phaseAnchor.insertAdjacentElement('afterend', section);
      phaseAnchor = section;
    });

    const nav = document.createElement('nav');
    nav.className = 'case-study-nav';
    nav.setAttribute('aria-label', 'Case study sections');
    nav.innerHTML = `
      <div class="case-study-nav__inner">
        <button class="case-study-nav__toggle" type="button" aria-label="Toggle section menu" aria-expanded="false">
          <span></span>
          <span></span>
          <span></span>
        </button>

        <div class="case-study-nav__links" id="case-study-nav-links">
          <a href="#intro-summary">Overview</a>
          ${phaseSections.map(({ label, section }) => {
            return `<a href="#${section.id}">${label}</a>`;
          }).join('')}
        </div>

        <a class="case-study-nav__top" href="#top" aria-label="Back to top">
          <ion-icon name="chevron-up-outline" aria-hidden="true"></ion-icon>
          <span>Top</span>
        </a>
      </div>
    `;

    const toggle = nav.querySelector('.case-study-nav__toggle');
    const links = nav.querySelector('.case-study-nav__links');

    if (toggle && links) {
      toggle.addEventListener('click', () => {
        const isOpen = links.classList.toggle('is-open');
        toggle.setAttribute('aria-expanded', String(isOpen));
      });

      links.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => {
          links.classList.remove('is-open');
          toggle.setAttribute('aria-expanded', 'false');
        });
      });
    }

    intro.insertAdjacentElement('afterend', nav);
  }

  function getPhaseLead(phaseName) {
    const leads = {
      Empathize: 'I combined literature review, competitor analysis, interviews, and survey research to understand the accessibility barriers facing elderly ECG users.',
      Define: 'I translated research findings into journeys, personas, and prioritized requirements for a simpler and more reassuring monitoring experience.',
      Ideate: 'I established the visual and accessibility foundations that gave the product a consistent direction before detailed screens were designed.',
      Prototype: 'I moved from paper flows to high-fidelity screens, then built and refined the Flutter MVP around the validated design direction.',
      Test: 'I tested the experience with older users and used their behavior and feedback to improve clarity, reassurance, and task completion.'
    };

    return leads[phaseName] || '';
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', addCaseStudyNav);
  } else {
    addCaseStudyNav();
  }
})();