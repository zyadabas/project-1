


// start landing
var words = ['Hi Iam Zyad', 'Iam FreeLancer', 'Iam Web Developer'],
  part,
  i = 0,
  offset = 0,
  len = words.length,
  forwards = true,
  skip_count = 0,
  skip_delay = 15,
  speed = 70;

var wordflick = function () {
  setInterval(function () {
    if (forwards) {
      if (offset >= words[i].length) {
        ++skip_count;
        if (skip_count == skip_delay) {
          forwards = false;
          skip_count = 0;
        }
      }
    } else {
      if (offset == 0) {
        forwards = true;
        i++;
        offset = 0;
        if (i >= len) {
          i = 0;
        }
      }
    }
    part = words[i].substr(0, offset);
    if (skip_count == 0) {
      if (forwards) {
        offset++;
      } else {
        offset--;
      }
    }
    $('.word').text(part);
  }, speed);
};

$(document).ready(function () {
  wordflick();
});

// Check If There's Local Storage Color Option
let mainColors = localStorage.getItem("color_option");

// If There's Color Item In Local Storage
if (mainColors !== null) {
  document.documentElement.style.setProperty('--main-color', mainColors);

  // Remove Active Class From All Colors List Item
  document.querySelectorAll(".colors-list li a").forEach(element => {
    element.classList.remove("active");
    // Add Active Class On Element With Data-Color === Local Storage Item
    if (element.dataset.color === mainColors) {
      // Add Active Class
      element.classList.add("active");
    }
  });
}

// Click On Toggle Settings Gear
document.querySelector(".toggle-settings .fa-gear").onclick = function () {
  this.classList.toggle("fa-spin");
  document.querySelector(".settings-box").classList.toggle("open");
};

// Switch Colors
const colorsLi = document.querySelectorAll(".colors-list li");

colorsLi.forEach(li => {
  li.addEventListener("click", (e) => {
    document.documentElement.style.setProperty('--main-color', e.target.dataset.color);
    localStorage.setItem("color_option", e.target.dataset.color);
    handleActive(e);
  });
});

// Handle Active State
function handleActive(ev) {
  ev.target.parentElement.querySelectorAll(".active").forEach(element => {
    element.classList.remove("active");
  });
  ev.target.classList.add("active");
}

// Scroll To Section
const allLinks = document.querySelectorAll(".links a");

function ScrollToSection(elements) {
  elements.forEach(ele => {
    ele.addEventListener("click", (e) => {
      e.preventDefault(); // Prevent default link behavior

      // Remove active class from all other navigation links
      allLinks.forEach(link => {
        link.classList.remove("active");
      });

      // Add active class to the clicked navigation link
      e.target.classList.add("active");

      // Scroll to the corresponding section
      document.querySelector(e.target.dataset.section).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });
}

ScrollToSection(allLinks);

// Function to handle intersection observer callback
function handleIntersection(entries, observer) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const sectionId = entry.target.getAttribute('id');
      const correspondingLink = document.querySelector(`.links a[data-section="#${sectionId}"]`);
      if (correspondingLink) {
        // Remove active class from all other navigation links
        allLinks.forEach(link => {
          link.classList.remove("active");
        });
        // Add active class to the corresponding navigation link
        correspondingLink.classList.add("active");
      }
    }
  });
}

// Create an IntersectionObserver instance
const observer = new IntersectionObserver(handleIntersection, {
  root: null,
  rootMargin: '0px',
  threshold: 0.5 // Adjust threshold as needed
});

// Observe each section
document.querySelectorAll('.section').forEach(section => {
  observer.observe(section);
});

// Function to check if a section is currently in view
function isSectionInView(section) {
  const bounding = section.getBoundingClientRect();
  return (
    bounding.top >= 0 &&
    bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight)
  );
}

// Function to handle scroll event and update active section accordingly
function handleScroll() {
  allLinks.forEach(link => {
    const sectionId = link.getAttribute('data-section').substring(1);
    const section = document.getElementById(sectionId);
    if (section && isSectionInView(section)) {
      // Remove active class from all other navigation links
      allLinks.forEach(navLink => {
        navLink.classList.remove("active");
      });
      // Add active class to the corresponding navigation link
      link.classList.add("active");
    }
  });
}

// Add scroll event listener to the window
window.addEventListener('scroll', handleScroll);



// Function to check if a section is currently in view
function isSectionInView(section) {
  const bounding = section.getBoundingClientRect();
  return (
    bounding.top >= 0 &&
    bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight)
  );
}

// Function to handle scroll event and update active section accordingly
function handleScroll() {
  document.querySelectorAll('.section').forEach(section => {
    const sectionId = section.getAttribute('id');
    const correspondingLink = document.querySelector(`.links a[data-section="#${sectionId}"]`);
    if (isSectionInView(section)) {
      // Remove active class from all other navigation links
      document.querySelectorAll('.links a').forEach(navLink => {
        navLink.classList.remove("active");
      });
      // Add active class to the corresponding navigation link
      correspondingLink.classList.add("active");
    }
  });
}

// Add scroll event listener to the window
window.addEventListener('scroll', handleScroll);



