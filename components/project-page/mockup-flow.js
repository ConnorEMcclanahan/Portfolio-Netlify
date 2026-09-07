(function () {
  const api = window.ProjectPageComponents = window.ProjectPageComponents || {};

  api.renderMockupFlow = function renderMockupFlow(targetSelector, data) {
    const target = document.querySelector(targetSelector);
    if (!target || !data || !Array.isArray(data.items)) {
      return;
    }

    const escapeHtml = api.escapeHtml || ((v) => String(v));
    if (data.layout) {
      target.classList.add(`mockup-flow--${data.layout}`);
    }
    const renderCopy = (copy) => {
      const paragraphs = Array.isArray(copy) ? copy : [copy || ''];
      return paragraphs.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join('');
    };
    const slugify = (value) => String(value || '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');

    target.innerHTML = data.items
      .map((item) => {
        const images = Array.isArray(item.images) ? item.images : [{ src: item.image, alt: item.alt }];
        const imageClass = item.device === 'tablet' ? 'mockup-visual mockup-visual--tablet' : 'mockup-visual';
        return `
          <article class="mockup-step mockup-step--${slugify(item.title)} reveal">
            <div class="mockup-step-text">
              <h3 class="mockup-step-title">${escapeHtml(item.title || '')}</h3>
              <h4 class="mockup-step-inline-title">${escapeHtml(item.title || '')}</h4>
              <div class="mockup-step-copy">${renderCopy(item.copy)}</div>
            </div>
            <div class="${imageClass}">
              ${images.map((image) => `<img src="${escapeHtml(image.src || '')}" alt="${escapeHtml(image.alt || item.alt || '')}" class="mockup-step-image" />`).join('')}
            </div>
          </article>
        `;
      })
      .join('');
  };
})();
