(function () {
  const api = window.ProjectPageComponents = window.ProjectPageComponents || {};

  api.renderComparisonMatrix = function renderComparisonMatrix(targetSelector, data) {
    const target = document.querySelector(targetSelector);
    if (!target || !data || !Array.isArray(data.columns) || !Array.isArray(data.rows)) {
      return;
    }

    const escapeHtml = api.escapeHtml || ((v) => String(v));

    const header = data.columns
      .map((column) => `<div class="matrix-head">${escapeHtml(column)}</div>`)
      .join('');

    const rows = data.rows
      .map((row, rowIndex) => {
        const rowClass = rowIndex < data.rows.length - 1 ? ' matrix-row matrix-row--border' : ' matrix-row';
        const cells = row
          .map((cell, cellIndex) => {
            const cellClass = cellIndex === 0 ? 'matrix-cell matrix-cell--name' : 'matrix-cell';
            return `<div class="${cellClass}">${escapeHtml(cell)}</div>`;
          })
          .join('');

        return `<div class="${rowClass}">${cells}</div>`;
      })
      .join('');

    target.innerHTML = `
      <div class="text-column">
        <h3>${escapeHtml(data.title || '')}</h3>
        <p class="matrix-copy">${escapeHtml(data.copy || '')}</p>
      </div>
      <div class="matrix-shell">
        <div class="matrix-row matrix-row--header">${header}</div>
        ${rows}
      </div>
    `;
  };
})();
