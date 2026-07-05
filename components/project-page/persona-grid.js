(function () {
  const api = window.ProjectPageComponents = window.ProjectPageComponents || {};

  api.renderPersonaGrid = function renderPersonaGrid(targetSelector, data) {
    const target = document.querySelector(targetSelector);
    if (!target || !Array.isArray(data)) {
      return;
    }

    const escapeHtml = api.escapeHtml || ((v) => String(v));

    target.innerHTML = data
      .map((persona) => {
        const facts = (persona.facts || [])
          .map(
            (fact) => `
            <div>
              <span class="persona-fact-key">${escapeHtml(fact.key)}</span><br>
              <strong class="persona-fact-val">${escapeHtml(fact.value)}</strong>
            </div>
          `
          )
          .join('');

        const needs = (persona.needs || []).map((item) => `<li>${escapeHtml(item)}</li>`).join('');
        const frustrations = (persona.frustrations || []).map((item) => `<li>${escapeHtml(item)}</li>`).join('');

        return `
          <article class="persona-col">
            <div class="persona-card">
              <div class="persona-top">
                <img src="${escapeHtml(persona.image)}" alt="${escapeHtml(persona.alt || '')}" class="persona-photo">
                <div class="persona-meta">
                  <div class="mini-label">Goal</div>
                  <p class="persona-goal">${escapeHtml(persona.goal || '')}</p>
                  <div class="persona-facts">${facts}</div>
                </div>
              </div>
              <div class="persona-bottom">
                <div class="persona-col-split left">
                  <div class="accent-label">Needs</div>
                  <ul class="persona-list">${needs}</ul>
                </div>
                <div class="persona-col-split">
                  <div class="accent-label">Frustrations</div>
                  <ul class="persona-list">${frustrations}</ul>
                </div>
              </div>
              <div class="persona-quote">${escapeHtml(persona.quote || '')}</div>
            </div>
            <div>
              <p class="persona-caption-title">${escapeHtml(persona.captionTitle || '')}</p>
              <p class="persona-caption-copy">${escapeHtml(persona.captionCopy || '')}</p>
            </div>
          </article>
        `;
      })
      .join('');
  };
})();
