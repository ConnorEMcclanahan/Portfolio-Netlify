(function () {
  function addCaseStudyNav() {
    const intro = document.querySelector('#intro-summary');
    const sections = Array.from(document.querySelectorAll('body.project-page-standard section[id]'))
      .filter((section) => section.id !== 'intro-summary' && (section.querySelector('h1, h2, h3') || ['competitor-analysis', 'research-question', 'observational-studies', 'user-feedback', 'mockup-flow', 'implementation-showcase', 'final-container', 'high-fidelity-prototypes'].includes(section.id)));

    const isDiplora = window.location.pathname.toLowerCase().includes('diplora');
    const isMotivate = window.location.pathname.toLowerCase().includes('motivate');
    const isPhillipsWall = window.location.pathname.toLowerCase().includes('phillipswall');
    const isFitPhone = window.location.pathname.toLowerCase().includes('fitphone');
    const phaseMatchers = isPhillipsWall ? [
      ['01 / Discovery - Understanding the Visitor Feedback Problem', /research|feedback|problem/i],
      ['02 / Architecture - Mapping Feedback into a Spatial System', /requirement|architecture|matrix|grid|coordinate/i],
      ['03 / Prototyping - Validating the AI and Interface', /prototype|timeline|interactive|design|trust/i],
      ['04 / Validation - Testing the Live Museum System', /data|pipeline|implementation|testing|integration|real-time/i],
      ['05 / Handover - Preparing the Exhibition Package', /impact|handover|delivery|dashboard|roadmap/i]
    ] : isMotivate ? [
      ['01 / Research - Understanding the User and Context', /research|question|interview|competitor|observational/i],
      ['02 / Requirements - Translating Research into Features', /feature|moscow|requirement|priorit/i],
      ['03 / Prototyping - Validating the Experience', /prototype|workflow|feedback|low-fidelity|mockup|test/i],
      ['04 / Implementation - Bridging Design and Code', /implementation|mockup|final|vue|pdf/i]
    ] : isFitPhone ? [
      ['01 / Research - Understanding the User and Context', /research|question|competitor|feedback|analysis/i],
      ['02 / Requirements - Defining the Product Direction', /requirement|goal|feature|moscow|criteria/i],
      ['03 / Design & Testing - Refining the Experience', /prototype|testing|sketch|ideation|feedback|iteration/i],
      ['04 / Implementation - Building the Product', /implementation|flutter|final|app|build/i]
    ] : [
      ['01 / Research - Understanding the User and Context', /research|survey|interview|competitor/i],
      ['02 / Design System - Building a Scalable Foundation', /design-system|brand|accessib/i],
      ['03 / Requirements - Translating Research into Features', /requirement|persona|feature|priorit/i],
      ['04 / Prototyping - Validating the Experience', /prototype|design-iterations|high-fidelity|mockup|test/i],
      ['05 / Implementation - Bridging Design and Code', /implementation|development|flutter|bloc|bluetooth/i]
    ];
    const phaseContents = isPhillipsWall ? {
      Discovery: [
        { title: 'Museum Environment Audit', copy: 'We conducted contextual observation inside the Philips Museum and studied how visitors moved from the interactive AI exhibits toward the feedback area. This revealed a clear drop in engagement: visitors actively explored AI throughout the exhibition, but the final activity ended at a static sticky-note wall. The notes were personal and engaging, but visitors had no intuitive way to explore how their perspectives connected.', image: '../images/phillipswall/museum-installation.jpeg' },
        { title: 'Legacy System and Data Review', copy: 'We evaluated an inherited scanner and a dataset of approximately 650 sticky notes from the previous team. Parts of the code and documentation were corrupted, and the PaddleOCR approach struggled with cursive and irregular handwriting. We restored access, inspected the implementation, reviewed the data quality, and identified recognition accuracy as a core UX requirement.', image: '../images/phillipswall/event-room-wide.jpeg' },
        { title: 'Large-Display UX Research', copy: 'A public display has different constraints from a mobile or desktop interface. We considered readability from a distance, generous touch targets, clear visual hierarchy, and controls that could be reached by visitors of different ages and abilities. These findings shaped our use of large visual clusters, short labels, high contrast, and simple interaction states.' },
        { title: 'Stakeholder Interviews', copy: 'We spoke with museum stakeholders, Fontys advisors, the previous development team, and legal or privacy experts. These conversations clarified the educational purpose, deployment constraints, GDPR boundaries, anonymous processing, content moderation needs, and the features that were realistic within the project timeline.' },
        { title: 'Client Proposal Strategy', copy: 'After completing the research, we authored and submitted the formal project proposal, “Your thoughts connected,” to the Philips Museum for review. The document aligned stakeholders around the visitor journey, defined the Agile lifecycle and sprint milestones, documented technical and ethical requirements, and established the project deliverables.' },
        { title: 'Phase Transition', copy: 'Discovery gave us a clear mandate: replace static sticky notes with an automated, verified visual system. With the visitor problem, technical constraints, and project scope understood, we moved into designing the spatial architecture of the feedback experience.' }
      ],
      Architecture: [
        { title: 'Low-Fidelity Sketching', copy: 'We mapped visitor touchpoints and X/Y grid layouts on whiteboards and paper before moving into digital tools. We compared word clouds, text lists, bar charts, and spatial mapping. Word clouds hide context and lists fail on public displays, while a 2D matrix could show the shape of the conversation at a glance.', image: '../images/phillipswall/sentiment-map-sketch.jpeg' },
        { title: '2D Sentiment Matrix', copy: 'We converted qualitative responses into spatial coordinates. The X-axis represents future outlook, from uneasy or concerned to optimistic, while the Y-axis represents current attitude toward AI, from sceptic to enthusiast. OpenAI prompt rules assigned deterministic X and Y values between -1.00 and +1.00.', image: '../images/phillipswall/live-sentiment-graph.jpeg' },
        { title: 'Question Color Logic', copy: 'We mapped the ten exhibition questions to primary color palettes and used saturation variations to distinguish subtopics within each group. This gave visitors a visual way to identify themes without adding another layer of text-heavy navigation.', image: '../images/phillipswall/statistics-dashboard.jpeg' },
        { title: 'Proximity Node Clustering', copy: 'To prevent the display from becoming cluttered as hundreds of notes were added, we designed a proximity rule that merged nearby responses into expandable heat-map nodes. Visitors could select a cluster to explore the individual entries inside it.' },
        { title: 'Phase Transition', copy: 'With the spatial coordinate rules and visual hierarchy established on paper, we moved into proof-of-concept prototypes to test the AI engine and refine the high-fidelity interface.' }
      ],
      Prototyping: [
        { title: 'AI Pipeline Sandbox', copy: 'We built proof-of-concept Python scripts using OpenAI Vision (gpt-4o) through Portkey to test handwriting recognition, filtering, Dutch and English translation, and stance classification before connecting the full application. Setting the temperature to 0 made the output more deterministic and repeatable across messy handwritten notes.', image: '../images/phillipswall/WhatsApp Image 2025-05-13 at 20.54.26 (2).jpeg' },
        { title: 'High-Fidelity UI Systems', copy: 'We translated the spatial model into high-fidelity Figma components for large touchscreens. The system used readable typography, high contrast, generous spacing, clear controls, and a hierarchy that could be understood from a distance.', image: '../images/phillipswall/prototype-response-screen.jpeg' },
        { title: 'In-Situ Prototype Usability Testing', copy: 'We brought interactive prototypes into the museum and observed visitors using the screens. Their behavior revealed friction around prompt selection, layout density, instruction clarity, and understanding where a response would appear.' },
        { title: 'A/B Design Testing and Sticker Voting', copy: 'To resolve the debate about how aggregated sentiment should look, we presented two live layouts side by side at the Spring 2025 AI & Data Event. Option A used a dynamic 2D scatter plot with circular cluster nodes; Option B used stacked rectangular and square bars. Visitors cast physical sticker votes for their preferred view. The circular layout won because its organic clusters felt more approachable than a rigid chart and made sentiment differences easier to compare at a glance. The event also recognized the strength of the complete demonstration: our team won 1st Place for Best Table and Showcase.', image: '../images/phillipswall/WhatsApp Image 2025-05-09 at 15.00.08.jpeg' },
        { title: 'Ethical AI and User Agency', copy: 'Because handwriting recognition can misread messy input, we designed a pre-scan privacy explanation covering GDPR boundaries and prohibited content, followed by a post-scan verification step. Visitors could understand what would happen to their note and confirm or correct the transcription before it became public.' },
        { title: 'Phase Transition', copy: 'Once sticker voting confirmed the 2D circular cluster layout and the technical sandbox showed that the AI engine was viable, we moved into full-stack React development to build the live application.' }
      ],
      Validation: [
        { title: 'Full-Stack Integration', copy: 'We connected the React frontend to a Flask API, SQLite database, and OpenAI Vision pipeline through Portkey. The monolithic architecture kept deployment straightforward while environment credentials remained separated from the public codebase.', image: '../images/phillipswall/system-architecture.jpeg' },
        { title: 'Real-Time Data State', copy: 'We configured asynchronous API updates so newly submitted Post-it notes rendered immediately on the live sentiment board without a full page reload. This made the feedback loop feel immediate and showed visitors the result of their contribution.', image: '../images/phillipswall/live-sentiment-graph.jpeg' },
        { title: 'Live Museum Functional Testing', copy: 'We deployed the working application inside the Philips Museum and tested it with real visitors. The physical testing revealed how people scanned notes, interpreted the graph, navigated the controls, and searched for their own response.', image: '../images/phillipswall/museum-installation.jpeg' },
        { title: 'Solving the “Where is my note?” Friction', copy: 'During live testing, visitors scanned a note and then struggled to locate it among the existing nodes. We added a temporary high-contrast “YOU” marker and entry animation, turning orientation confusion into immediate confirmation.', image: '../images/phillipswall/live-sentiment-graph.jpeg' },
        { title: 'Multilingual Accessibility', copy: 'We added a persistent Dutch and English language switcher to support international museum traffic and make the questions, instructions, and visualizations easier to access.', image: '../images/phillipswall/event-live-demonstration.jpeg' },
        { title: 'Phase Transition', copy: 'After polishing the live interaction loop using direct visitor feedback, we packaged the application and built the administrative tools needed for museum curators.' }
      ],
      Handover: [
        { title: 'Curator Analytics Dashboard', copy: 'We built an internal dashboard for museum staff to track total scans, language distribution, popular prompt questions, and rejected or moderated content. This gave curators structured insight without requiring manual sorting of the physical notes.', image: '../images/phillipswall/statistics-dashboard.jpeg' },
        { title: 'Client Delivery Package', copy: 'We prepared the production source code, technical documentation, architecture information, database details, recommendations, and a prioritized roadmap so the museum or a future development team could continue the project.' }
      ]
    } : isMotivate ? {
      Research: ['Manufacturing Research', 'Research Question', 'Stakeholder Interviews', 'Competitor Analysis', 'Observational Studies', 'Research Conclusion'],
      Requirements: ['Features List', 'MoSCoW Method Analysis', 'Requirements Conclusion'],
      Prototyping: ['User Feedback on Low-Fidelity Prototypes', 'Prototyping & User Testing', 'Low-Fidelity Prototypes', 'Final Design', 'Prototyping Conclusion'],
      Implementation: ['Implementation & Delivery', 'Implementation Conclusion']
    } : isFitPhone ? {
      Research: ['Questions & Criteria', 'Ideation', 'Research Conclusion'],
      Requirements: ['Client Feedback & User Research', 'MoSCoW Prioritization', 'Agile Process', 'Agile Retrospective', 'Key Feedback Timeline', 'Requirements Conclusion'],
      'Design & Testing': ['Low-fidelity Sketches', 'High-fidelity Prototype', 'Final Design', 'Onboarding', 'Home Screen', 'Activities & Education', 'Journal Entry / Weekly Check-in', 'Stats', 'Design & Testing Conclusion'],
      Implementation: ['Core Screens', 'Improvements', 'Implementation Demo', 'Implementation Conclusion']
    } : {
      Research: ['Research Approach', 'Research Overview', 'Literature Review', 'Stakeholder Interviews', 'Patient Interviews', 'Survey Analysis', 'Internal Feedback', 'Competitor Analysis', 'Research Conclusion'],
      'Design System': ['Brand Identity', 'Accessible Design Standards', 'Scalable Components', 'Design System Takeaway'],
      Requirements: ['User Requirements & Features', 'User Journey Mapping', 'MoSCoW Prioritization', 'User Personas', 'Requirements Conclusion'],
      Prototyping: ['Low-Fidelity Prototypes', 'User Testing on High-Fidelity Prototypes', 'What Worked Well', 'Key Iterations', 'Design Iterations Based on Feedback', 'High-Fidelity Prototypes', 'Prototyping Conclusion'],
      Implementation: ['Implementation & Development', 'Development Approach', 'Tech Stack', 'Completed Features', 'Technical Architecture', 'Technical Challenges', 'Quality Assurance', 'Known Limitations', 'Implementation Conclusion']
    };
    const usedSections = new Set();
    const preferredIds = isDiplora
      ? [['research', 'competitor-analysis', 'research-conclusion'], ['design-system'], ['requirements', 'personas', 'requirements-conclusion'], ['prototyping', 'design-iterations', 'high-fidelity-prototypes', 'prototyping-conclusion'], ['implementation']]
      : isPhillipsWall
        ? [['research', 'proposal', 'research-conclusion'], ['requirements'], ['prototyping'], ['data-preparation', 'implementation'], ['impact']]
      : isMotivate
        ? [['pmt-research', 'competitor-analysis', 'research-question', 'customer-interviews', 'observational-studies', 'research-conclusion'], ['features-list', 'moscow-analysis', 'requirements-conclusion'], ['user-feedback', 'prototyping', 'low-fidelity', 'final-design', 'mockup-flow', 'prototyping-conclusion'], ['implementation-details', 'implementation-conclusion']]
      : isFitPhone
        ? [['research'], ['requirements'], ['prototyping', 'final-design', 'design-testing-conclusion'], ['implementation']]
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
        phaseHeader.className = 'case-study-phase reveal';
        const phaseName = label.match(/^\d+ \/ ([^-]+)/)?.[1].trim() || label;
        if ((isMotivate && phaseName === 'Prototyping') || (isFitPhone && phaseName === 'Design & Testing')) {
          phaseHeader.classList.add('case-study-phase--wide-final');
        }
        const contents = phaseContents[phaseName] || [];
        const narratives = isPhillipsWall ? contents
          .filter((item) => typeof item !== 'string')
          .map((item) => [item.title, item.copy, item.image]) : contents
          .filter((item) => typeof item !== 'string')
          .map((item) => [item.title, item.copy, item.image]);
        const overviewMarkup = isPhillipsWall && contents.some((item) => item.items)
          ? contents.map((group) => `
              <div class="case-study-phase__overview-group">
                <h3>${group.title}</h3>
                <ul>${group.items.map((item) => `<li>${item}</li>`).join('')}</ul>
              </div>
            `).join('')
          : `<ul>${contents.map((item) => `<li>${typeof item === 'string' ? item : item.title}</li>`).join('')}</ul>`;
        phaseHeader.innerHTML = `
          <div class="case-study-phase__title reveal"><h2>${label}</h2></div>
          <div class="case-study-phase__body">
            <aside class="case-study-phase__overview">
              <h3>Overview</h3>
              ${overviewMarkup}
            </aside>
            <div class="case-study-phase__content">
              ${narratives.map(([title, copy, image]) => `
                <article class="case-study-phase__narrative reveal">
                  <h3>${title}</h3>
                  <p>${copy}</p>
                  ${image ? `<figure class="case-study-phase__narrative-media"><img src="${image}" alt="" loading="lazy"></figure>` : ''}
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
    processSection.className = 'case-study-process reveal';
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