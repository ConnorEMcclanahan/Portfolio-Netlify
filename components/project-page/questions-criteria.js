(function () {
  const api = window.ProjectPageComponents = window.ProjectPageComponents || {};

  api.renderQuestionsCriteria = function renderQuestionsCriteria(targetSelector, data) {
    const target = document.querySelector(targetSelector);
    if (!target || !data) {
      return;
    }

    const escapeHtml = api.escapeHtml || ((v) => String(v));
    const questions = (data.questions || [])
      .map((item) => `<li class="question-item">${escapeHtml(item)}</li>`)
      .join('');
    const criteria = (data.criteria || [])
      .map((item) => `<li>${escapeHtml(item)}</li>`)
      .join('');

    target.innerHTML = `
      <div class="snippet">
        <h4>${escapeHtml(data.questionsTitle || 'Project Questions')}</h4>
        <ul>${questions}</ul>
      </div>
      <div class="text-column">
        <h3>${escapeHtml(data.criteriaTitle || 'Questions and Criteria')}</h3>
        <p>${escapeHtml(data.criteriaLead || '')}</p>
        <ul>${criteria}</ul>
      </div>
    `;
  };
})();
