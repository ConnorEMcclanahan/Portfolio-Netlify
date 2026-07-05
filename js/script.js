const links = document.querySelectorAll('nav a');

links.forEach((link) => {
  const href = link.getAttribute('href');
  
  // If the link is internal
  if (href.startsWith('#')) {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      const targetElement = document.querySelector(href);
      targetElement.scrollIntoView({ behavior: 'smooth' });
    });
  }
  // No need to add an event listener for external links
});
onclick="document.querySelector('.navbar-menu').classList.toggle('is-active');"
document.addEventListener('DOMContentLoaded', () => {

    // Get all "navbar-burger" elements
    const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
  
    // Add a click event on each of them
    $navbarBurgers.forEach( el => {
      el.addEventListener('click', () => {
  
        // Get the target from the "data-target" attribute
        const target = el.dataset.target;
        const $target = document.getElementById(target);
  
        // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
        el.classList.toggle('is-active');
        $target.classList.toggle('is-active');
  
      });
    });
  
  });

 


  function displayData(data) {
    // Get the "data" element
    const dataElement = document.getElementById('data');
  
    // Update the contents of the element with the data from the server
    dataElement.innerHTML = data;
  }

  // links the php file to html
  $.ajax({
    url: 'config.php',
    type: 'get',
    success: function(data) {
      displayData(data);
    }
  });
  const projects = document.querySelectorAll('.project');

  projects.forEach((project) => {
    project.addEventListener('click', (event) => {
      // get the link from the database
      const link = project.dataset.link;
      // redirect the user to the link
      window.location.href = link;
    });
  });

  //rotating icon in nav bar

const icon = document.querySelector('.square_icon');
let rotation = 90;
icon.addEventListener('click', function() {
  icon.style.transform = `rotate(${rotation}deg)`;
  rotation += 90;
  if(rotation > 360) {
    rotation = 90;
  }
});




//Reveal
function reveal() {
  var reveals = document.querySelectorAll(".reveal");
  for (var i = 0; i < reveals.length; i++) {
      var windowHeight = window.innerHeight;
      var elementTop = reveals[i].getBoundingClientRect().top;
      var elementVisible = 150;

      if (elementTop < windowHeight - elementVisible) {
          reveals[i].classList.add("active");
      } else {
          reveals[i].classList.remove("active");
      }
  }
}
window.addEventListener("scroll", reveal);
const sections = document.querySelectorAll("section");
const navLi = document.querySelectorAll("nav .container ul li");
window.onscroll = () => {
  var current = "";
  sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      if (pageYOffset >= sectionTop - 60) {
          current = section.getAttribute("id");
      }
  });
  navLi.forEach((li) => {
      li.classList.remove("active");
      if (li.classList.contains(current)) {
          li.classList.add("active");
      }
  });
};