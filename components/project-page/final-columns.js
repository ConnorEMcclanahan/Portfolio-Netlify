(function () {
  const api = window.ProjectPageComponents = window.ProjectPageComponents || {};

  api.renderFinalColumns = function renderFinalColumns(targetSelector, data) {
    const target = document.querySelector(targetSelector);
    if (!target || !data || !Array.isArray(data.columns)) {
      return;
    }

    const escapeHtml = api.escapeHtml || ((v) => String(v));
    target.classList.add('final-section');

    const cols = data.columns
      .map((column, columnIndex) => {
        const items = (column.items || [])
          .map((item, itemIndex, arr) => {
            const spacedClass = itemIndex < arr.length - 1 ? ' final-item-copy--spaced' : '';
            return `
              <h4 class="final-item-title">${escapeHtml(item.title)}</h4>
              <p class="final-item-copy${spacedClass}">${escapeHtml(item.copy)}</p>
            `;
          })
          .join('');

        const borderClass = columnIndex > 0 ? ' final-col--border' : '';
        return `
          <div class="final-col${borderClass}">
            <h3 class="final-title">${escapeHtml(column.title)}</h3>
            <div class="final-items">${items}</div>
          </div>
        `;
      })
      .join('');

    target.innerHTML = cols;
  };
})();
