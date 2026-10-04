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

  // IntersectionObserver reveals elements once and leaves them revealed.
  // getBoundingClientRect() over every .reveal element on every scroll frame
  // forces synchronous layout, which is what made scrolling feel laggy.
  if (!('IntersectionObserver' in window)) {
    reveals.forEach((el) => el.classList.add('active'));
    return;
  }

  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        io.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px -12% 0px', threshold: 0 });

  reveals.forEach((el) => io.observe(el));
}

document.addEventListener('DOMContentLoaded', () => {
  initSmoothAnchorLinks();
  initRevealOnScroll();
});