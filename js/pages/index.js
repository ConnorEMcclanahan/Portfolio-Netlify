function initVantaBackground() {
  if (!window.VANTA || !window.VANTA.GLOBE) {
    return;
  }

  window.VANTA.GLOBE({
    el: '#top',
    mouseControls: true,
    touchControls: true,
    gyroControls: false,
    minHeight: 200,
    minWidth: 200,
    scale: 1,
    scaleMobile: 1,
    color: 0x6e07f3,
    backgroundColor: 0x0,
  });
}

function initReveal() {
  const revealElements = document.querySelectorAll('.reveal');
  if (!revealElements.length) {
    return;
  }

  const revealPoint = 150;

  const checkReveal = () => {
    const windowHeight = window.innerHeight;

    revealElements.forEach((element) => {
      const elementTop = element.getBoundingClientRect().top;
      if (elementTop < windowHeight - revealPoint) {
        element.classList.add('active');
      } else {
        element.classList.remove('active');
      }
    });
  };

  checkReveal();
  window.addEventListener('scroll', checkReveal, { passive: true });
}

document.addEventListener('DOMContentLoaded', () => {
  initVantaBackground();
  initReveal();
});
