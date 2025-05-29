// Hero Image Automatic Carousel
document.addEventListener("DOMContentLoaded", function () {
  const images = [
    "./src/images/hero-photo-1.webp",
    "./src/images/hero-photo-2.png",
    "./src/images/hero-photo-3.jpg"
  ];

  let currentIndex = 0;
  let intervalId = null;
  const heroImage = document.getElementById("heroImage");

  // Media query object for screens < 960px (Tailwind 'md')
  const mediaQuery = window.matchMedia("(max-width: 960px)");

  function showImage(index) {
    heroImage.src = images[index];
  }

  function startSlideshow() {
    if (intervalId === null) {
      intervalId = setInterval(() => {
        currentIndex = (currentIndex + 1) % images.length;
        showImage(currentIndex);
      }, 3000);
      console.log("Slideshow started");
    }
  }

  function stopSlideshow() {
    if (intervalId !== null) {
      clearInterval(intervalId);
      intervalId = null;
      console.log("Slideshow stopped");
    }
  }

  function handleScreenSizeChange(e) {
    if (e.matches) {
      // Small screen: start slideshow
      startSlideshow();
    } else {
      // Medium and up: stop slideshow
      stopSlideshow();
      currentIndex = 0;
      showImage(currentIndex);
    }
  }

  // Run once on load
  handleScreenSizeChange(mediaQuery);

  // Listen for screen size changes
  mediaQuery.addEventListener("change", handleScreenSizeChange);
});





// Carousel for each store item
document.addEventListener("DOMContentLoaded", () => {
  const carousels = document.querySelectorAll(".carousel");

  carousels.forEach(carousel => {
    const prevBtn = carousel.parentElement.querySelector(".prevBtn");
    const nextBtn = carousel.parentElement.querySelector(".nextBtn");

    const getVisibleCount = () => window.innerWidth < 768 ? 1 : 4;

    const updateVisibility = () => {
      const items = carousel.querySelectorAll(".carousel-item");
      const visibleCount = getVisibleCount();

      items.forEach((item, index) => {
        if (index < visibleCount) {
          item.classList.remove("hidden");
          item.classList.add("flex");
        } else {
          item.classList.add("hidden");
          item.classList.remove("flex");
        }
      });
    };

    // Initial setup
    updateVisibility();
    window.addEventListener("resize", updateVisibility);

    // Animate and shift
    const animateShift = (direction) => {
      const items = carousel.querySelectorAll(".carousel-item");
      const visibleCount = getVisibleCount();
      const itemWidth = items[0].offsetWidth + 40; // 40px for combined horizontal padding (px-5)

      // Set transition
      carousel.style.transition = "transform 0.5s ease";
      carousel.style.transform = `translateX(${direction === 'next' ? -itemWidth : itemWidth}px)`;

      // After transition ends, reorder items
      setTimeout(() => {
        carousel.style.transition = "none";
        carousel.style.transform = "translateX(0)";

        if (direction === 'next') {
          carousel.appendChild(items[0]);
        } else {
          carousel.insertBefore(items[items.length - 1], items[0]);
        }

        updateVisibility();
      }, 500);
    };

    nextBtn.addEventListener("click", () => animateShift('next'));
    prevBtn.addEventListener("click", () => animateShift('prev'));
  });
});

// Hamburger Menu
const hamburger = document.querySelector('.hamburger');
const offScreenMenu = document.querySelector('.off-screen-menu');
const hamburgerItems = document.querySelectorAll('.hamburger-item');

hamburger.addEventListener('click', () => {
  offScreenMenu.classList.toggle('hidden');
  offScreenMenu.classList.toggle('menu-transition');
});

hamburgerItems.forEach((item) => {
  item.addEventListener('click', () => {
    offScreenMenu.classList.toggle('hidden');
    offScreenMenu.classList.toggle('menu-transition');
  });
});