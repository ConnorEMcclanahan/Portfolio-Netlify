(function () {
  const api = window.ProjectPageComponents = window.ProjectPageComponents || {};

  api.renderPovHmw = function renderPovHmw(targetSelector, data) {
    const target = document.querySelector(targetSelector);
    if (!target || !data) {
      return;
    }

    const escapeHtml = api.escapeHtml || ((v) => String(v));
    const headers = data.headers || ['Users', 'Need', 'Insight'];
    const row = data.povRow || { users: '', need: '', insight: '' };
    const hmwItems = (data.hmwItems || []).map((item) => `<li class="pov-item">${escapeHtml(item)}</li>`).join('');

    target.classList.add('pov-hmw');
    target.innerHTML = `
      <div class="pov-hmw-col">
        <h3 class="pov-hmw-heading">${escapeHtml(data.povTitle || 'POV')}</h3>
        <table class="pov-table">
          <thead>
            <tr>
              <th>${escapeHtml(headers[0] || 'Users')}</th>
              <th>${escapeHtml(headers[1] || 'Need')}</th>
              <th>${escapeHtml(headers[2] || 'Insight')}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>${escapeHtml(row.users || '')}</td>
              <td>${escapeHtml(row.need || '')}</td>
              <td>${escapeHtml(row.insight || '')}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="pov-hmw-col">
        <h3 class="pov-hmw-heading">${escapeHtml(data.hmwTitle || 'HMW')}</h3>
        <ul class="pov-container">${hmwItems}</ul>
      </div>
    `;
  };
})();
