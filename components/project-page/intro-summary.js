(function () {
  const api = window.ProjectPageComponents = window.ProjectPageComponents || {};

  api.renderIntroSummary = function renderIntroSummary(targetSelector, data) {
    const target = document.querySelector(targetSelector);
    if (!target || !data) {
      return;
    }

    const escapeHtml = api.escapeHtml || ((v) => String(v));

    const metaItems = (data.meta || [])
      .map((item) => `<li class="intro-meta-item"><span>${escapeHtml(item.label)}:</span> ${escapeHtml(item.value)}</li>`)
      .join('');

    const heroImage = data.image
      ? `
        <div class="IntroPic reveal intro-image-wrap">
          <img src="${escapeHtml(data.image.src)}" alt="${escapeHtml(data.image.alt || '')}" class="intro-image" />
        </div>
      `
      : '';

    target.classList.add('section-intro');
    target.innerHTML = `
      <div class="intro-summary-grid">
        <div class="intro-summary-left reveal">
          <h1 class="intro-title">${escapeHtml(data.title || '')}</h1>
          <p class="intro-lead">${escapeHtml(data.lead || '')}</p>
        </div>
        <div class="intro-summary-right reveal">
          <ul>${metaItems}</ul>
        </div>
      </div>
      ${heroImage}
    `;
  };
})();
