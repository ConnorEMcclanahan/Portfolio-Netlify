(function () {
  const api = window.ProjectPageComponents = window.ProjectPageComponents || {};

  api.renderPovGrid = function renderPovGrid(targetSelector, data) {
    const target = document.querySelector(targetSelector);
    if (!target || !Array.isArray(data)) {
      return;
    }

    const escapeHtml = api.escapeHtml || ((v) => String(v));

    target.innerHTML = data
      .map((card) => {
        const subtitle = card.subtitle ? `<div class="pov-subtitle">${escapeHtml(card.subtitle)}</div>` : '';
        const body = Array.isArray(card.list)
          ? `<ul class="pov-list">${card.list.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ul>`
          : `<p class="pov-copy">${escapeHtml(card.copy || '')}</p>`;

        return `
          <article class="pov-card">
            <div class="pov-title">${escapeHtml(card.title || '')}</div>
            ${subtitle}
            ${body}
          </article>
        `;
      })
      .join('');
  };
})();
