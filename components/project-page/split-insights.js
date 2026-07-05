(function () {
  const api = window.ProjectPageComponents = window.ProjectPageComponents || {};

  api.renderSplitInsights = function renderSplitInsights(targetSelector, data) {
    const target = document.querySelector(targetSelector);
    if (!target || !data) {
      return;
    }

    const escapeHtml = api.escapeHtml || ((v) => String(v));
    const panels = (data.panels || [])
      .map((panel) => {
        const body = Array.isArray(panel.list)
          ? `<ul class="split-list">${panel.list.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ul>`
          : `<p class="split-copy">${escapeHtml(panel.copy || '')}</p>`;

        return `
          <article class="split-card">
            <h4 class="split-card-title">${escapeHtml(panel.title || '')}</h4>
            ${body}
          </article>
        `;
      })
      .join('');

    target.innerHTML = `
      <div class="split-insights reveal active">
        <div class="split-left">
          <h3 class="split-main-title">${escapeHtml(data.title || '')}</h3>
          <p class="split-main-copy">${escapeHtml(data.copy || '')}</p>
        </div>
        <div class="split-right">${panels}</div>
      </div>
    `;
  };
})();
