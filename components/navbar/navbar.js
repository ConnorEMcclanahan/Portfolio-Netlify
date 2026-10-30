// Navbar burger menu toggle
document.addEventListener('DOMContentLoaded', function() {
  const burger = document.querySelector('.navbar-burger');
  const menu = document.querySelector('.navbar-menu');

  if (burger && menu) {
    function closeMenu() {
      menu.classList.remove('active');
      burger.classList.remove('active');
    }

    burger.addEventListener('click', function(event) {
      event.stopPropagation();
      menu.classList.toggle('active');
      burger.classList.toggle('active');
    });

    // Close menu when a link is clicked
    const links = menu.querySelectorAll('a');
    links.forEach(link => {
      link.addEventListener('click', closeMenu);
    });

    // Close menu when clicking/tapping outside the navbar
    document.addEventListener('click', function(event) {
      if (!menu.contains(event.target) && !burger.contains(event.target)) {
        closeMenu();
      }
    });

    // Close menu when resizing above the mobile breakpoint so it can't stay
    // stuck open on tablet/desktop.
    window.addEventListener('resize', function() {
      if (window.innerWidth > 768) {
        closeMenu();
      }
    });
  }
});
