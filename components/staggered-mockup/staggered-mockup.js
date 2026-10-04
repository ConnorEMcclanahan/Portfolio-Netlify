(function () {
  const api = window.ProjectPageComponents = window.ProjectPageComponents || {};

  api.renderStaggeredMockup = function renderStaggeredMockup(targetSelector, data) {
    const target = document.querySelector(targetSelector);
    if (!target || !data || !Array.isArray(data.items)) {
      return;
    }

    const escapeHtml = api.escapeHtml || ((v) => String(v));

    if (data.bg) {
      target.style.setProperty('--staggered-bg', data.bg);
    }

    if (data.titleColor) {
      target.style.setProperty('--staggered-title-color', data.titleColor);
    }
    if (data.subtitleColor) {
      target.style.setProperty('--staggered-subtitle-color', data.subtitleColor);
    }
    if (data.labelColor) {
      target.style.setProperty('--staggered-label-color', data.labelColor);
    }

    if (data.staggers) {
      data.staggers.forEach((stagger, index) => {
        target.style.setProperty(`--stagger-${index + 1}`, stagger);
      });
    }

    const itemsHtml = data.items.map((item, index) => {
      const deviceClass = item.device === 'tablet' ? 'staggered-mockup__frame--tablet' : '';
      const staggerValue = item.stagger || (data.staggers ? data.staggers[index] : '0');
      return `
        <figure class="staggered-mockup__item" style="--stagger: ${staggerValue};">
          <div class="staggered-mockup__frame ${deviceClass}">
            <img src="${escapeHtml(item.src)}" alt="${escapeHtml(item.alt || '')}" loading="lazy" />
          </div>
          ${item.label ? `<figcaption class="staggered-mockup__label">${escapeHtml(item.label)}</figcaption>` : ''}
        </figure>
      `;
    }).join('');

    const titleHtml = data.title ? `<h2 class="staggered-mockup__title">${escapeHtml(data.title)}</h2>` : '';
    const subtitleHtml = data.subtitle ? `<p class="staggered-mockup__subtitle">${escapeHtml(data.subtitle)}</p>` : '';

    if (data.noLabels) target.classList.add('staggered-mockup--no-labels');
    if (data.noText) target.classList.add('staggered-mockup--no-text');

    // Find or create the row container (leave the navbar alone).
    let rowContainer = target.querySelector('.staggered-mockup__row');
    if (!rowContainer) {
      rowContainer = document.createElement('div');
      rowContainer.className = 'staggered-mockup__row';
      rowContainer.setAttribute('aria-label', data.ariaLabel || 'App screens');
      target.appendChild(rowContainer);
    }
    
    let contentContainer = target.querySelector('.staggered-mockup__content');
    if (!contentContainer) {
      contentContainer = document.createElement('div');
      contentContainer.className = 'staggered-mockup__content';
      target.insertBefore(contentContainer, rowContainer);
    }

    contentContainer.innerHTML = `${titleHtml}${subtitleHtml}`;
    rowContainer.innerHTML = `
      <div class="staggered-mockup__track">
        ${itemsHtml}
      </div>
    `;

    if (!target.querySelector('#scroll-cue-mount')) {
      const mount = document.createElement('div');
      mount.id = 'scroll-cue-mount';
      target.appendChild(mount);
    }
  };
})();