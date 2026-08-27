(function () {
  const api = window.ProjectPageComponents = window.ProjectPageComponents || {};

  api.renderIntroSummary = function renderIntroSummary(targetSelector, data) {
    const target = document.querySelector(targetSelector);
    if (!target || !data) {
      return;
    }

    const escapeHtml = api.escapeHtml || ((v) => String(v));

    const metaLabels = [
      ['Role', /role/i],
      ['Timeline', /duration|timeline/i],
      ['Tools Used', /tools|tech|stack|design/i]
    ];
    const metaItems = metaLabels
      .map(([label, matcher]) => {
        const item = (data.meta || []).find((candidate) => matcher.test(candidate.label));
        return item ? `<li class="intro-meta-item"><strong>${escapeHtml(label)}</strong><span>${escapeHtml(item.value)}</span></li>` : '';
      })
      .join('');

    const heroImage = data.image
      ? `
        <div class="IntroPic reveal intro-image-wrap">
          <img src="${escapeHtml(data.image.src)}" alt="${escapeHtml(data.image.alt || '')}" class="intro-image" />
        </div>
      `
      : '';

    const story = data.story || {};
    const storyBlocks = [
      ['Background', story.background],
      ['Problem', story.problem],
      ['Project Goals', story.goals]
    ]
      .filter(([, copy]) => copy)
      .map(([title, copy]) => `
        <div class="intro-story-block">
          <h2>${escapeHtml(title)}</h2>
          <p>${escapeHtml(copy)}</p>
        </div>
      `)
      .join('');

    target.classList.add('section-intro');
    target.innerHTML = `
      <div class="intro-heading">
        <h1 class="intro-title">${escapeHtml(data.title || 'Project Overview')}</h1>
        ${data.subtitle ? `<p class="intro-subtitle">${escapeHtml(data.subtitle)}</p>` : ''}
        <p class="intro-lead">${escapeHtml(data.lead || '')}</p>
      </div>
      <div class="intro-summary-grid">
        <div class="intro-summary-left">
          <h2 class="intro-overview-title">Overview</h2>
          <div class="intro-meta">
            <ul>${metaItems}</ul>
          </div>
        </div>
        <div class="intro-summary-right">
          ${storyBlocks}
        </div>
      </div>
    `;

    const finalContainer = document.querySelector('#final-container');
    if (heroImage && finalContainer) {
      finalContainer.insertAdjacentHTML('beforebegin', heroImage);
    } else if (heroImage) {
      target.insertAdjacentHTML('beforeend', heroImage);
    }
  };
})();
