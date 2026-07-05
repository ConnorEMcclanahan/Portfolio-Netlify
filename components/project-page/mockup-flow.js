(function () {
  const api = window.ProjectPageComponents = window.ProjectPageComponents || {};

  api.renderMockupFlow = function renderMockupFlow(targetSelector, data) {
    const target = document.querySelector(targetSelector);
    if (!target || !data || !Array.isArray(data.items)) {
      return;
    }

    const escapeHtml = api.escapeHtml || ((v) => String(v));

    target.innerHTML = data.items
      .map((item) => {
        const imageClass = item.device === 'tablet' ? 'mockup-visual mockup-visual--tablet' : 'mockup-visual';
        return `
          <article class="mockup-step reveal">
            <div class="mockup-step-text">
              <h3 class="mockup-step-title">${escapeHtml(item.title || '')}</h3>
              <p class="mockup-step-copy">${escapeHtml(item.copy || '')}</p>
            </div>
            <div class="${imageClass}">
              <img src="${escapeHtml(item.image || '')}" alt="${escapeHtml(item.alt || '')}" class="mockup-step-image" />
            </div>
          </article>
        `;
      })
      .join('');
  };
})();
