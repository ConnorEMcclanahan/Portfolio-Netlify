(function () {
  const api = window.ProjectPageComponents = window.ProjectPageComponents || {};

  api.renderDeviceCascade = function renderDeviceCascade(targetSelector, data) {
    const target = document.querySelector(targetSelector);
    if (!target || !data || !Array.isArray(data.items)) {
      return;
    }

    const escapeHtml = api.escapeHtml || ((v) => String(v));

    // Build title HTML
    const titleHtml = data.title ? `<h2 class="device-cascade__title">${escapeHtml(data.title)}</h2>` : '';
    const subtitleHtml = data.subtitle ? `<p class="device-cascade__subtitle">${escapeHtml(data.subtitle)}</p>` : '';

    // Build items HTML - cascade order: back to front
    const itemsHtml = data.items.map((item) => {
      const deviceClass = item.device === 'tablet' ? 'device-cascade__frame--tablet' : 'device-cascade__frame--phone';
      return `
        <figure class="device-cascade__item">
          <div class="${deviceClass}">
            <img src="${escapeHtml(item.src)}" alt="${escapeHtml(item.alt || '')}" loading="lazy" />
          </div>
        </figure>
      `;
    }).join('');

    // Add modifier class
    if (data.noText) target.classList.add('device-cascade--no-text');

    target.innerHTML = `
      <nav class="navbar">
        <div class="navbar-container">
          <a href="../index.html" class="navbar-logo"><img src="../images/logo.png" alt="logo" class="navbar-logo-img" /></a>
          <button class="navbar-burger" aria-label="Toggle navigation menu"><span></span><span></span><span></span></button>
          <ul class="navbar-menu">
            <li><a href="../index.html#about">About</a></li>
            <li><a href="../index.html#projects">Projects</a></li>
            <li><a href="../pdfs/resume.pdf">Resume</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>
      </nav>
      <div class="device-cascade__content">
        ${titleHtml}
        ${subtitleHtml}
      </div>
      <div class="device-cascade__row" aria-label="${escapeHtml(data.ariaLabel || 'App screens')}">
        <div class="device-cascade__track">
          ${itemsHtml}
        </div>
      </div>
      <div id="scroll-cue-mount"></div>
    `;
  };
})();