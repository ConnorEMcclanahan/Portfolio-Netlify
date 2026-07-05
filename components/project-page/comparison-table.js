(function () {
  const api = window.ProjectPageComponents = window.ProjectPageComponents || {};

  api.renderComparisonTable = function renderComparisonTable(targetSelector, data) {
    const target = document.querySelector(targetSelector);
    if (!target || !data || !Array.isArray(data.rows)) {
      return;
    }

    const escapeHtml = api.escapeHtml || ((v) => String(v));

    const rowMarkup = data.rows
      .map((row, index) => {
        const rowClass = index < data.rows.length - 1 ? ' comparison-row comparison-row--border' : ' comparison-row';

        const strengths = (row.strengths || [])
          .map((item, itemIndex, list) => {
            const borderClass = itemIndex < list.length - 1 ? ' comparison-item--border' : '';
            return `<li class="comparison-item${borderClass}">${escapeHtml(item)}</li>`;
          })
          .join('');

        const weaknesses = (row.weaknesses || [])
          .map((item, itemIndex, list) => {
            const borderClass = itemIndex < list.length - 1 ? ' comparison-item--border' : '';
            return `<li class="comparison-item${borderClass}">${escapeHtml(item)}</li>`;
          })
          .join('');

        return `
          <div class="${rowClass}">
            <div class="comparison-name">${escapeHtml(row.name || '')}</div>
            <div class="comparison-col">
              <ul class="comparison-list">${strengths}</ul>
            </div>
            <div class="comparison-col">
              <ul class="comparison-list">${weaknesses}</ul>
            </div>
          </div>
        `;
      })
      .join('');

    const focusItems = (data.focusItems || [])
      .map((item) => `<li>${escapeHtml(item)}</li>`)
      .join('');

    target.innerHTML = `
      <div class="comparison-layout">
        <div class="comparison-table-shell">
          <div class="comparison-row comparison-row--header">
            <div class="comparison-head">${escapeHtml(data.columns?.[0] || 'Platform')}</div>
            <div class="comparison-head">${escapeHtml(data.columns?.[1] || 'Strengths')}</div>
            <div class="comparison-head">${escapeHtml(data.columns?.[2] || 'Weaknesses')}</div>
          </div>
          ${rowMarkup}
        </div>
        <div class="text-column">
          <h3>${escapeHtml(data.title || 'Competitor Analysis')}</h3>
          <p>${escapeHtml(data.copy || '')}</p>
          <h4 class="comparison-focus-title">${escapeHtml(data.focusTitle || 'Analysis Focus Areas')}</h4>
          <ul class="comparison-focus-list">${focusItems}</ul>
        </div>
      </div>
    `;
  };
})();
