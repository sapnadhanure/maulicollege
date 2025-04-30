// Toggle mobile menu
const menuToggle = document.getElementById('menuToggle');
const offcanvasMenu = document.getElementById('offcanvasMenu');
const closeMenu = document.getElementById('closeMenu');
const overlay = document.getElementById('overlay');

menuToggle.addEventListener('click', function() {
  offcanvasMenu.classList.add('active');
  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
});

closeMenu.addEventListener('click', function() {
  offcanvasMenu.classList.remove('active');
  overlay.classList.remove('active');
  document.body.style.overflow = '';
});

overlay.addEventListener('click', function() {
  offcanvasMenu.classList.remove('active');
  overlay.classList.remove('active');
  document.body.style.overflow = '';
});

// Mobile Submenu Toggles
const submenuToggles = document.querySelectorAll('.submenu-toggle');

submenuToggles.forEach(toggle => {
  toggle.addEventListener('click', function(e) {
    const parent = this.parentNode;
    const dropdown = parent.querySelector('.mobile-dropdown');
    
    if (dropdown.classList.contains('active')) {
      dropdown.classList.remove('active');
      this.textContent = '+';
    } else {
      // Close other open dropdowns
      document.querySelectorAll('.mobile-dropdown.active').forEach(item => {
        item.classList.remove('active');
        item.previousElementSibling.previousElementSibling.nextElementSibling.textContent = '+';
      });
      
      dropdown.classList.add('active');
      this.textContent = '-';
    }
  });
});

// Set active page based on current URL
function setActivePage() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  
  // For desktop nav
  const desktopLinks = document.querySelectorAll('.navbar a');
  desktopLinks.forEach(link => {
    if (link.getAttribute('href') === currentPage) {
      link.classList.add('active');
      
      // If it's in a dropdown, make parent active too
      const parentDropdown = link.closest('.dropdown');
      if (parentDropdown) {
        parentDropdown.querySelector('.dropbtn').classList.add('active');
      }
    }
  });
  
  // For mobile nav
  const mobileLinks = document.querySelectorAll('.mobile-nav a');
  mobileLinks.forEach(link => {
    if (link.getAttribute('href') === currentPage) {
      link.classList.add('active');
      
      // If it's in a dropdown, expand it and make parent active
      const parentDropdown = link.closest('.mobile-dropdown');
      if (parentDropdown) {
        parentDropdown.classList.add('active');
        parentDropdown.previousElementSibling.textContent = '-';
        parentDropdown.previousElementSibling.previousElementSibling.classList.add('active');
      }
    }
  });
}

// Run when DOM is loaded
document.addEventListener('DOMContentLoaded', setActivePage);

// For demo purposes - manually setting active page
// Remove this in production and use the setActivePage function above
function setDemoActivePage(pageId) {
  // Remove all active classes first
  document.querySelectorAll('.navbar a, .mobile-nav a').forEach(link => {
    link.classList.remove('active');
  });
  
  // Set active class for specified page
  if (document.getElementById('nav-' + pageId)) {
    document.getElementById('nav-' + pageId).classList.add('active');
  }
  
  if (document.getElementById('mobile-' + pageId)) {
    document.getElementById('mobile-' + pageId).classList.add('active');
    
    // If in dropdown, expand
    const mobileLink = document.getElementById('mobile-' + pageId);
    const parentDropdown = mobileLink.closest('.mobile-dropdown');
    if (parentDropdown) {
      parentDropdown.classList.add('active');
      parentDropdown.previousElementSibling.textContent = '-';
      parentDropdown.previousElementSibling.previousElementSibling.classList.add('active');
    }
  }
}

// For demo, set Home as active by default
setDemoActivePage('home');



// Back to top button functionality
// const backToTopButton = document.querySelector('.back-to-top');
        
// window.addEventListener('scroll', () => {
//     if (window.pageYOffset > 300) {
//         backToTopButton.classList.add('visible');
//     } else {
//         backToTopButton.classList.remove('visible');
//     }
// });

// backToTopButton.addEventListener('click', () => {
//     window.scrollTo({
//         top: 0,
//         behavior: 'smooth'
//     });
// });


// Add animation to social icons
const socialIcons = document.querySelectorAll('.social-icons a');

socialIcons.forEach(icon => {
    icon.addEventListener('mouseover', () => {
        icon.style.transform = 'translateY(-5px)';
    });
    
    icon.addEventListener('mouseout', () => {
        icon.style.transform = 'translateY(0)';
    });
});


document.addEventListener('DOMContentLoaded', function() {
      // For the timer progress circle
      const progressCircle = document.querySelector('.autoplay-progress svg');
      const progressContent = document.querySelector('.autoplay-progress span');
      
      // Initialize Swiper
      const swiper = new Swiper('.swiper-container', {
        // Optional parameters
        direction: 'horizontal',
        loop: true,
        speed: 1000, // transition speed in ms
        grabCursor: true,
        
        // Enable autoplay with 5 seconds delay
        autoplay: {
          delay: 5000,
          disableOnInteraction: false
        },
        
        // Fancy fade effect
        effect: 'fade',
        fadeEffect: {
          crossFade: true
        },
        
        // Pagination
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
          dynamicBullets: true
        },
        
        // Navigation arrows
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        
        // Keyboard control
        keyboard: {
          enabled: true,
          onlyInViewport: true,
        },
        
        // Progress bar
        on: {
          autoplayTimeLeft(s, time, progress) {
            progressCircle.style.setProperty("--progress", 1 - progress);
            progressContent.textContent = `${Math.ceil(time / 1000)}s`;
          }
        }
      });
      
      // Add touch swiping for mobile
      swiper.on('touchStart', function() {
        // Optional: add any special handling for touch events
      });
    });




function loadPage(page) {
  fetch(page)
    .then(response => response.text())
    .then(html => {
      document.getElementById('content').innerHTML = html;
    });
}

// Load home page by default
window.onload = () => loadPage('index.html');
function loadPage(pageName) {
  fetch(`pages/${pageName}.html`)
    .then(response => response.text())
    .then(data => {
      document.getElementById('content').innerHTML = data;
    })
    .catch(error => {
      document.getElementById('content').innerHTML = "<h2>Page Not Found</h2>";
    });
}

function router() {
  let hash = location.hash.replace('#', '');
  if (hash === "") {
    hash = "home";
  }
  loadPage(hash);
}

// Call router when page loads
window.addEventListener('load', router);
// Call router when hash changes
window.addEventListener('hashchange', router);

// window.addEventListener("DOMContentLoaded", () => {
//     const header = document.getElementById("collegeHeader");

  
//     let i = 0;
  
//     setInterval(() => {
//       i = (i + 1) % gradients.length;
//       header.style.background = gradients[i];
//     }, 5000); // change every 5 seconds
//   });
  
let slides = document.querySelectorAll(".slide");
let index = 0;

function showSlide(i) {
  slides.forEach((slide, idx) => {
    slide.classList.remove("active");
    if (idx === i) slide.classList.add("active");
  });
}

function autoSlide() {
  index = (index + 1) % slides.length;
  showSlide(index);
}
setInterval(autoSlide, 4000); // Change every 4s
// function toggleDetails(card) {
//   const details = card.querySelector(".details");
//   details.style.display = details.style.display === "block" ? "none" : "block";
// }
// function toggleSyllabus(element) {
//   const list = element.querySelector('.syllabus-list');
//   const isVisible = list.style.display === 'block';

//   // Close all lists
//   document.querySelectorAll('.syllabus-list').forEach(el => el.style.display = 'none');

//   // Toggle clicked one
//   if (!isVisible) {
//     list.style.display = 'block';
//   }
// }
// function toggleTable() {
//   const table = document.getElementById("syllabusTable");
//   table.style.display = (table.style.display === "none") ? "table" : "none";
// }

  function toggleSyllabus(card) {
    // Close all other cards
    const allCards = document.querySelectorAll('.syllabus-card');
    allCards.forEach(c => {
      if (c !== card) {
        c.classList.remove('active');
        c.querySelector('.syllabus-list').style.display = 'none';
      }
    });

    // Toggle current card
    const list = card.querySelector('.syllabus-list');
    const isVisible = list.style.display === 'block';
    list.style.display = isVisible ? 'none' : 'block';
    card.classList.toggle('active');
  }


// testomonial 

document.addEventListener('DOMContentLoaded', () => {
  const slider = document.querySelector('.testimonial-slider');
  const dots = document.querySelectorAll('.slider-dot');
  const prevBtn = document.querySelector('.prev-arrow');
  const nextBtn = document.querySelector('.next-arrow');
  const testimonials = document.querySelectorAll('.testimonial-container');
  
  let currentIndex = 0;
  const totalSlides = testimonials.length;
  
  // Function to update slide position
  function updateSlider() {
    slider.style.transform = `translateX(-${currentIndex * 100}%)`;
    
    // Update active dot
    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === currentIndex);
    });
  }
  
  // Event listeners for dots
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      currentIndex = index;
      updateSlider();
    });
  });
  
  // Event listeners for arrows
  prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    updateSlider();
  });
  
  nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % totalSlides;
    updateSlider();
  });
  
  // Auto slide functionality
  let autoSlideInterval;
  
  function startAutoSlide() {
    autoSlideInterval = setInterval(() => {
      currentIndex = (currentIndex + 1) % totalSlides;
      updateSlider();
    }, 7000); // Change slide every 7 seconds
  }
  
  function stopAutoSlide() {
    clearInterval(autoSlideInterval);
  }
  
  // Start auto sliding
  startAutoSlide();
  
  // Pause auto sliding when user interacts with controls
  prevBtn.addEventListener('click', () => {
    stopAutoSlide();
    setTimeout(startAutoSlide, 10000);
  });
  
  nextBtn.addEventListener('click', () => {
    stopAutoSlide();
    setTimeout(startAutoSlide, 10000);
  });
  
  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      stopAutoSlide();
      setTimeout(startAutoSlide, 10000);
    });
  });
});
