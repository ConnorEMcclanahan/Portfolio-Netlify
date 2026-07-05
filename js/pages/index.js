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

function initProjectPreview() {
  const projectItems = document.querySelectorAll('.project-item');
  const previewImages = document.querySelectorAll('.preview-image');
  const previewContainer = document.querySelector('.project-preview');

  if (!projectItems.length || !previewImages.length || !previewContainer) {
    return;
  }

  let hideTimeout;

  const hidePreview = () => {
    previewContainer.style.display = 'none';
    previewImages.forEach((img) => img.classList.remove('active'));
  };

  projectItems.forEach((item) => {
    item.addEventListener('mouseenter', function () {
      clearTimeout(hideTimeout);
      const projectId = this.getAttribute('data-project-id');

      const itemRect = this.getBoundingClientRect();
      const previewHeight = previewContainer.offsetHeight || (520 * 9) / 16;
      let top = itemRect.top + itemRect.height / 2 - previewHeight / 2;
      const left = itemRect.right + 24;

      const viewportHeight = window.innerHeight;
      if (top + previewHeight > viewportHeight - 16) {
        top = viewportHeight - previewHeight - 16;
      }
      if (top < 8) {
        top = 8;
      }

      previewContainer.style.top = `${top}px`;
      previewContainer.style.left = `${left}px`;
      previewContainer.style.display = 'block';

      previewImages.forEach((img) => img.classList.remove('active'));
      const matchingImage = document.querySelector(`.preview-image[data-project-id="${projectId}"]`);
      if (matchingImage) {
        matchingImage.classList.add('active');
      }
    });

    item.addEventListener('mouseleave', () => {
      hideTimeout = setTimeout(hidePreview, 100);
    });
  });

  previewContainer.addEventListener('mouseenter', () => {
    clearTimeout(hideTimeout);
  });

  previewContainer.addEventListener('mouseleave', () => {
    hideTimeout = setTimeout(hidePreview, 100);
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
  initProjectPreview();
  initReveal();
});
