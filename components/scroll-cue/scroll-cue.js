/* Scroll cue that auto-hides after 30% of the viewport. */

function initScrollCue(options = {}) {
  const mountPoint = document.getElementById('scroll-cue-mount');
  if (!mountPoint) {
    return;
  }

  const target = options.target || '#intro-summary';
  const threshold = options.threshold || 0.3;

  mountPoint.innerHTML = `
    <a href="${target}" class="scroll-cue" aria-label="Scroll down to content">
      <ion-icon name="chevron-down-outline" aria-hidden="true"></ion-icon>
    </a>
  `;

  const scrollCue = document.querySelector('.scroll-cue');
  if (!scrollCue) {
    return;
  }

  const toggleCue = () => {
    scrollCue.style.opacity = window.scrollY > window.innerHeight * threshold ? '0' : '1';
  };

  toggleCue();
  window.addEventListener('scroll', toggleCue, { passive: true });
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { initScrollCue };
}