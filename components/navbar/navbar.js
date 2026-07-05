// Navbar burger menu toggle
document.addEventListener('DOMContentLoaded', function() {
  const burger = document.querySelector('.navbar-burger');
  const menu = document.querySelector('.navbar-menu');

  if (burger) {
    burger.addEventListener('click', function() {
      menu.classList.toggle('active');
      burger.classList.toggle('active');
    });

    // Close menu when a link is clicked
    const links = menu.querySelectorAll('a');
    links.forEach(link => {
      link.addEventListener('click', function() {
        menu.classList.remove('active');
        burger.classList.remove('active');
      });
    });
  }
});
