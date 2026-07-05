function initSmoothAnchorLinks() {
  const links = document.querySelectorAll('a[href^="#"]');
  links.forEach((link) => {
    link.addEventListener('click', (event) => {
      const href = link.getAttribute('href');
      if (!href || href === '#') {
        return;
      }

      const target = document.querySelector(href);
      if (!target) {
        return;
      }

      event.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    });
  });
}

function initRevealOnScroll() {
  const reveals = document.querySelectorAll('.reveal');
  if (!reveals.length) {
    return;
  }

  const reveal = () => {
    const windowHeight = window.innerHeight;
    const elementVisible = 150;

    reveals.forEach((element) => {
      const elementTop = element.getBoundingClientRect().top;
      if (elementTop < windowHeight - elementVisible) {
        element.classList.add('active');
      } else {
        element.classList.remove('active');
      }
    });
  };

  reveal();
  window.addEventListener('scroll', reveal, { passive: true });
}

function initDataLinkCards() {
  const cards = document.querySelectorAll('[data-link]');
  cards.forEach((card) => {
    card.addEventListener('click', () => {
      const link = card.getAttribute('data-link');
      if (link) {
        window.location.href = link;
      }
    });
  });
}

function initRotatingSquareIcon() {
  const icon = document.querySelector('.square_icon');
  if (!icon) {
    return;
  }

  let rotation = 90;
  icon.addEventListener('click', () => {
    icon.style.transform = `rotate(${rotation}deg)`;
    rotation += 90;
    if (rotation > 360) {
      rotation = 90;
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initSmoothAnchorLinks();
  initRevealOnScroll();
  initDataLinkCards();
  initRotatingSquareIcon();
});