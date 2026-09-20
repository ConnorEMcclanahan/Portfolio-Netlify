(function () {
  const api = window.ProjectPageComponents = window.ProjectPageComponents || {};

  // Scroll-linked reveal for the cascade hero.
  // The CSS reads --cascade-reveal (0 -> 1) to sink the tablets slightly and
  // lift the phones by more, so scrolling pulls more of every phone out from
  // under the tablet edges. The hero owns the first slice of the scroll, so
  // the effect lands right around the point the scroll cue fades out.
  function initCascadeReveal(section) {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (reducedMotion.matches) {
      return;
    }

    let ticking = false;

    const update = () => {
      ticking = false;
      const viewport = window.innerHeight || 0;
      const progress = viewport > 0
        ? Math.min(1, Math.max(0, window.scrollY / (viewport * 0.45)))
        : 0;
      section.style.setProperty('--cascade-reveal', progress.toFixed(3));
    };

    const request = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', request, { passive: true });
    window.addEventListener('resize', request);
  }

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
    const itemsHtml = data.items.map((item, index) => {
      const isTablet = item.device === 'tablet';
      const isPhone = !isTablet;
      let frameClass = isTablet ? 'device-cascade__frame--tablet' : 'device-cascade__frame--phone';
      
      // Phone roles: every phone is the same width — the two phones that
      // overlap the tablets just carry a softer shadow so the middle phone
      // still reads as the focus. Mirrored, so the cascade stays symmetrical.
      if (isPhone) {
        if (index === 1 || index === 4) {
          frameClass += ' device-cascade__frame--phone-back';
        } else if (index === 2) {
          frameClass += ' device-cascade__frame--phone-front';
        }
      }
      
      return `
        <figure class="device-cascade__item">
          <div class="${frameClass}">
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
          <a href="../index.html" class="navbar-logo"><img src="../images-optimized/logo.webp" alt="logo" class="navbar-logo-img" /></a>
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

    initCascadeReveal(target);
  };
})();