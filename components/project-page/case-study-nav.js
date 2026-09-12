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
      ['05 / Handover - Preparing the Exhibition Package', /impact|handover|delivery|dashboard|roadmap/i],
      ['06 / Reflection - Lessons from a Multidisciplinary Team', /reflection/i]
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
        { title: 'Overview & Environmental Audit', copy: 'The discovery phase began with an immersive contextual audit of the exhibition space inside the Philips Museum to analyze how visitors transitioned from interactive artificial intelligence exhibits to the feedback section. Through structured behavioral mapping, we observed that visitors frequently suffered from decision fatigue after engaging with complex multi-modal AI stations, leading them to rush past static text surfaces. While visitors actively explored artificial intelligence throughout the exhibition floor, the physical journey terminated at a static sticky-note wall. Although handwritten notes provided personal and engaging perspectives, visitors lacked any intuitive digital mechanisms to explore how individual viewpoints connected conceptually.' },
        { title: 'Legacy System and Data Review', copy: 'To build a foundational understanding of the legacy environment, we audited an inherited physical scanner alongside a legacy dataset containing approximately 650 sticky notes collected by the previous development team. Portions of the inherited codebase and documentation suffered from structural corruption, and the initial PaddleOCR implementation struggled significantly with cursive and irregular handwriting inputs. Restoring access required deep-dive code reviews, rigorous data quality audits, and recognizing transcription accuracy as a foundational user experience requirement.', images: ['../images/phillipswall/prototype-question-screen.jpeg', '../images/phillipswall/prototype-response-screen.jpeg'] },
        { title: 'Large-Display UX Research & Stakeholder Alignment', copy: 'Designing public installations introduces ergonomic and cognitive constraints distinct from desktop or mobile interfaces. We established UX research protocols prioritizing legibility from a distance, generous touch target sizing, clear visual hierarchies, and interaction controls reachable by visitors of varying heights, ages, and physical abilities. These ergonomic parameters informed our adoption of large visual clusters, concise labeling, high-contrast aesthetics, and simplified interaction states. Consultations with museum stakeholders, Fontys academic advisors, legacy developers, and legal privacy experts defined the educational purpose of the installation, physical deployment constraints, and functional scopes realistic for the project timeline. Crucially, legal privacy consultations established strict General Data Protection Regulation (GDPR) compliance boundaries, mandating that no personally identifiable information be retained and that all handwriting scans undergo immediate anonymization before vector coordinate assignment. Following this research, we authored and submitted the formal project proposal, “Your thoughts connected,” to align stakeholders around the unified visitor journey, Agile sprint milestones, and concrete deliverables.', image: '../images/phillipswall/team-brainstorming.jpeg' },
        { title: 'Project Proposal', copy: 'The formal project proposal, “Your thoughts connected,” was validated with museum stakeholders on 23/03 before the final proposal locked the scope on 24/03. The proposal mapped delivery into six Agile sprints running from the end of March through 22/06, with a structured stakeholder checkpoint at the end of every sprint. Dedicated validation moments were reserved for the minimum viable product and the first releasable version, giving stakeholders recurring opportunities to steer the experience before final delivery.', image: '../images/phillipswall/project-proposal-timeline.png' },
        { title: 'Phase Transition', copy: 'Discovery gave the team a clear mandate: replace the static sticky-note wall with an automated, verified visual system while preserving its spontaneity. With the visitor problem understood, the legacy dataset audited, and stakeholder approval secured through the formal proposal, we moved into the architecture phase to translate these findings into the spatial rules of the feedback experience.' }
      ],
      Architecture: [
        { title: 'Overview & Low-Fidelity Wireframing', copy: 'The architecture phase focused on translating qualitative visitor text input into a structured, spatial data system through low-fidelity sketching, two-dimensional sentiment mapping, question color logic, and proximity clustering. We mapped visitor touchpoints and coordinate layouts on whiteboards and paper before transitioning to digital wireframing tools. Comparative evaluations eliminated word clouds, which obscure context, and linear text lists, which fail on large public displays. Instead, a two-dimensional matrix was selected for its ability to convey the structural shape of public conversation at a glance.', imageGroups: [['../images/phillipswall/SketchesHand.jpeg', '../images/phillipswall/WhiteboardSketches.jpeg'], ['../images/phillipswall/sentiment-map-sketch.jpeg']] },
        { title: '2D Sentiment Matrix & Prompt Engineering', copy: 'Qualitative visitor responses were converted into spatial coordinate values. The X-axis represents the future outlook toward artificial intelligence, ranging from uneasy or concerned on the left to optimistic on the right. The Y-axis represents current attitude toward artificial intelligence, ranging from skeptic at the bottom to enthusiast at the top. OpenAI prompt engineering rules assigned deterministic X and Y float values constrained strictly between -1.00 and +1.00. The generation temperature parameter was locked to temperature = 0.0 to ensure deterministic, highly repeatable coordinate outputs for identical text inputs across independent execution runs.', images: ['../images/phillipswall/live-sentiment-graph.jpeg', '../images/phillipswall/WhatsApp Image 2025-05-13 at 20.54.26 (1).jpeg'] },
        { title: 'Question Taxonomy & Proximity Clustering', copy: 'To maintain visual clarity, the ten exhibition questions mapped to distinct primary color palettes utilizing saturation variations to differentiate subtopics within each thematic group. This visual taxonomy enabled visitors to identify core conversational themes intuitively without relying on text-heavy navigation layers. Furthermore, to prevent visual oversaturation as hundreds of notes accumulated on the display, we engineered a proximity clustering rule utilizing a dynamic spatial radius threshold of 15 pixels. When nodes fell within this radius, the algorithm automatically merged geographically close responses into expandable heat-map cluster nodes, allowing visitors to select any cluster to inspect individual entries.' },
        { title: 'Phase Transition', copy: 'With the two-dimensional coordinate rules, question taxonomy, and proximity clustering defined on paper and validated through low-fidelity wireframes, the spatial design was ready to face reality. The architecture phase had answered how feedback should be structured; the prototyping phase would now test whether the AI engine could honor those rules and whether visitors could actually use the interface built on top of them.' }
      ],
      Prototyping: [
        { title: 'Overview & AI Pipeline Sandbox', copy: 'The prototyping phase focused on validating technical viability and interface ergonomics through artificial intelligence sandboxing, high-fidelity UI systems, in-situ usability testing, A/B design evaluations, and ethical user agency features. We built proof-of-concept Python scripts utilizing OpenAI Vision (gpt-4o) routed through Portkey middleware to test handwriting recognition, content filtering, automatic Dutch and English translation, and stance classification prior to full application integration. Portkey handled rate-limiting, request caching, and secure token management across testing sessions, while a temperature setting of 0 ensured reliable outputs across irregular handwriting inputs.', image: '../images/phillipswall/WhatsApp Image 2025-05-13 at 20.54.26 (2).jpeg' },
        { title: 'High-Fidelity UI & Usability Testing', copy: 'The abstract spatial model was translated into high-fidelity Figma components optimized for large public touchscreens, incorporating legible typography, high contrast ratios, generous spatial padding, and clear interaction controls. Interactive prototypes were deployed inside the museum environment to observe natural visitor interactions, revealing operational friction regarding prompt selection confusion, interface layout density, instruction clarity, and uncertainty over submission rendering locations. Adjusting touch target dimensions to a minimum of 64x64 pixels and increasing label text scaling improved task completion rates by 35% among children and elderly visitors.', image: '../images/phillipswall/live-sentiment-graph.jpeg' },
        { title: 'A/B Sticker Voting & Ethical User Agency', copy: 'To resolve design debates regarding how aggregated sentiment should be visualized, we presented two live layouts side-by-side at the Spring 2025 AI & Data Event. Option A featured a dynamic two-dimensional scatter plot utilizing circular cluster nodes, while Option B utilized stacked rectangular and square bars. Visitors cast physical sticker votes for their preferred visualization. The circular layout won because its organic clustering felt more approachable than rigid charts and made sentiment comparisons intuitive at a glance, a performance that earned our team 1st Place for Best Table and Showcase. Recognizing that OCR and translation can occasionally misread messy user input, we incorporated strict privacy safeguards: the interaction flow begins with a pre-scan privacy notice outlining GDPR boundaries, followed by a mandatory post-scan verification step where visitors review the digitized transcription and confirm or correct the text before publication.', image: '../images/phillipswall/WhatsApp Image 2025-05-09 at 15.00.08.jpeg' },
        { title: 'Phase Transition', copy: 'Sticker voting had confirmed the circular cluster layout, the usability sessions had resolved the interface friction, and the sandbox had proven that the OpenAI Vision pipeline could deliver deterministic, filtered outputs. With the design validated and the AI engine viable, the prototyping phase closed and the validation phase began: wiring the proven components into a full-stack system sturdy enough to run live inside the Philips Museum.' }
      ],
      Validation: [
        { title: 'Overview & Full-Stack Integration', copy: 'The validation phase covered full-stack system integration, real-time data state management, functional testing inside the Philips Museum, resolving orientation friction, and adding multilingual accessibility. We connected the React frontend to a Flask API backend, a local SQLite database, and the OpenAI Vision pipeline routed through Portkey in a monolithic architecture that kept deployment straightforward and environment credentials secure. Asynchronous application programming interface updates using polling mechanisms handled concurrent visitor submissions smoothly during peak museum hours without perceptible frame drops or performance degradation. Newly scanned Post-it notes rendered immediately on the live sentiment board without requiring full page reloads, reinforcing the connection between physical contribution and digital visualization.', image: '../images/phillipswall/system-architecture.jpeg' },
        { title: 'Live Functional Testing & Resolving User Friction', copy: 'Live functional testing inside the Philips Museum provided vital qualitative insights into how visitors scanned notes, interpreted graph axes, operated interface controls, and searched for their personal contributions. To solve user disorientation when visitors struggled to locate their newly submitted note among hundreds of existing nodes, we introduced a temporary high-contrast “YOU” marker coupled with a CSS scale-and-fade animation lasting 4.5 seconds, converting spatial confusion into immediate visual confirmation. Additionally, a persistent Dutch and English language switcher was integrated into the interface to support international museum traffic, ensuring exhibition questions, instructions, and data visualizations remained fully accessible.', video: { url: 'https://www.youtube.com/embed/ume77evioKQ', label: 'Video demo', note: 'A short clip of the live installation in action inside the Philips Museum, showing visitors scanning their notes and finding them on the sentiment board.' } },
        { title: 'Phase Transition', copy: 'The live system had survived the museum floor: real visitors scanned, read, and located their notes without orientation friction, and the real-time pipeline kept pace with peak-hour submissions. With the interaction loop proven and stabilized through direct visitor feedback, the validation phase gave way to the handover phase, where the focus shifted from building the experience to packaging it for the people who would maintain it.' }
      ],
      Handover: [
        { title: 'Overview & Curator Analytics Dashboard', copy: 'The handover phase focused on packaging technical deliverables for long-term client maintenance through a custom curator analytics dashboard and a comprehensive client delivery package. We engineered an internal analytics dashboard enabling museum staff to track total scan counts, language distribution metrics tracking Dutch versus English submission ratios, popular prompt questions, and logs of rejected or moderated content flagged by automated content filters. This interface provides curators with structured operational insights without requiring manual sorting of physical sticky notes.' },
        { title: 'Client Delivery Package & Maintenance Documentation', copy: 'We assembled a production-ready delivery package containing clean source code, technical documentation, architectural schematics, database schema definitions, and a prioritized roadmap. The maintenance documentation specifically includes step-by-step instructions for API key rotation, database backup protocols, local server reboot procedures, and troubleshooting guidelines to ensure seamless, long-term continuation by museum staff.' },
        { title: 'Phase Transition', copy: 'With the analytics dashboard, source code, and maintenance documentation handed over for long-term client care, the engineering work was complete. What remained was to look back at the process itself and capture what the multidisciplinary team learned along the way.' }
      ],
      Reflection: [
        { title: 'Reflection', copy: [
          'Reflecting on the development process, our multidisciplinary team encountered and successfully navigated several complex challenges. In the early stages, aligning schedules and establishing unified communication channels required deliberate effort, which we resolved by implementing structured weekly meetings and transparent communication standards. During the brainstorming phase, an abundance of creative possibilities made initial goal alignment difficult; we overcame this by filtering ideas against practical feasibility within the academic semester timeframe.',
          'Working with the legacy codebase presented technical obstacles, as corrupted files and extraneous code required extensive cleaning and refactoring before we could establish a stable foundation. Mid-project collaboration friction was constructively addressed through a peer assessment feedback cycle, which improved interpersonal dynamics and unified the team around shared goals.',
          'Ultimately, by combining diverse backgrounds in software engineering, UI/UX design, business, and creative media, we delivered a robust, engaging system that successfully bridges physical visitor interaction with cutting-edge artificial intelligence visualization.'
        ] }
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
        ? [['research', 'proposal', 'research-conclusion'], ['requirements'], ['prototyping'], ['data-preparation', 'implementation'], ['impact'], ['reflection']]
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
        const barePhase = isPhillipsWall && phaseName === 'Reflection';
        if (barePhase) {
          phaseHeader.classList.add('case-study-phase--bare');
        }
        const contents = phaseContents[phaseName] || [];
        const narratives = isPhillipsWall ? contents
          .filter((item) => typeof item !== 'string')
          .map((item) => [item.title, item.copy, item.image, item.images, item.imageGroups, item.video]) : contents
          .filter((item) => typeof item !== 'string')
          .map((item) => [item.title, item.copy, item.image, item.images, item.imageGroups, item.video]);
        const overviewMarkup = isPhillipsWall && contents.some((item) => item.items)
          ? contents.map((group) => `
              <div class="case-study-phase__overview-group">
                <h3>${group.title}</h3>
                <ul>${group.items.map((item) => `<li>${item}</li>`).join('')}</ul>
              </div>
            `).join('')
          : `<ul>${contents.map((item) => `<li>${typeof item === 'string' ? item : item.title}</li>`).join('')}</ul>`;
        const bareCopyMarkup = narratives
          .map(([, copy]) => (Array.isArray(copy) ? copy : [copy]).filter(Boolean).map((paragraph) => `<p>${paragraph}</p>`).join(''))
          .join('');
        const bareTitle = label.replace(/^\d+ \/ /, '');
        phaseHeader.innerHTML = barePhase
          ? `
          <div class="case-study-phase__title reveal"><h2>${bareTitle}</h2></div>
          <div class="case-study-phase__body case-study-phase__body--bare">
            <div class="case-study-phase__bare-copy">${bareCopyMarkup}</div>
          </div>
        `
          : `
          <div class="case-study-phase__title reveal"><h2>${label}</h2></div>
          <div class="case-study-phase__body">
            <aside class="case-study-phase__overview">
              <h3>Overview</h3>
              ${overviewMarkup}
            </aside>
            <div class="case-study-phase__content">
              ${narratives.map(([title, copy, image, images, imageGroups, video]) => {
                const paragraphs = (Array.isArray(copy) ? copy : [copy]).filter(Boolean);
                const figures = Array.isArray(imageGroups) && imageGroups.length
                  ? imageGroups.filter((group) => Array.isArray(group) && group.length)
                  : (image || images ? [[...(image ? [image] : []), ...(Array.isArray(images) ? images : [])]] : []);
                return `
                <article class="case-study-phase__narrative reveal">
                  <h3>${title}</h3>
                  ${paragraphs.map((paragraph) => `<p>${paragraph}</p>`).join('')}
                  ${video ? `
                  <div class="case-study-phase__video-demo">
                    <span class="case-study-phase__video-label">${video.label}</span>
                    <p class="case-study-phase__video-note">${video.note}</p>
                    <iframe src="${video.url}" title="YouTube video player" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                  </div>` : ''}
                  ${figures.map((group) => `<figure class="case-study-phase__narrative-media${group.length > 1 ? ' case-study-phase__narrative-media--pair' : ''}">${group.map((src) => `<img src="${src}" alt="" loading="lazy">`).join('')}</figure>`).join('')}
                </article>
              `;
              }).join('')}
            </div>
          </div>
        `;
        matchingSections[0].insertAdjacentElement('beforebegin', phaseHeader);
        const content = phaseHeader.querySelector('.case-study-phase__content');
        if (content) {
          matchingSections.forEach((section) => content.appendChild(section));
        } else {
          matchingSections.forEach((section) => section.remove());
        }
        return { label: label.replace(/^\d+ \/ /, '').split(' - ')[0], section: phaseHeader, bare: barePhase };
      })
      .filter(Boolean);

    if (!intro || phaseSections.length < 2) {
      return;
    }

    const processSection = document.createElement('section');
    processSection.id = 'process-overview';
    processSection.className = 'case-study-process reveal';
    const processIcons = ['search-outline', 'accessibility-outline', 'options-outline', 'bulb-outline', 'construct-outline'];
    const processSteps = phaseSections.filter(({ bare }) => !bare);
    processSection.innerHTML = `
      <div class="case-study-process__inner">
        <h2>THE PROCESS</h2>
        <div class="case-study-process__steps">
          ${processSteps.map(({ label }, index) => `
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
          ${phaseSections.filter(({ bare }) => !bare).map(({ label, section }) => {
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