import {products} from './products.js';

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




// Create the elements for each section of the products
function createItemElements(product) {

  let productHTML = '';

  productHTML += 
  `
    <a class="carousel-item flex flex-col mx-1 py-4 px-5 bg-[#b5b5b5] rounded-xl">
      <img class="w-60 shadow-black drop-shadow-md rounded-sm" src="${product.image}">
      <div class="p-2 font-semibold text-md">${product.name}</div>
      <div class="mt-4 flex flex-row justify-between px-1">
        <p class="font-semibold text-xl">$${product.price}</p>
        <button class="py-1 px-4 bg-[#450d0d] text-white rounded-full cursor-pointer shadow-[#7b7b7b] shadow-sm js-add-to-cart"
        data-product-id="${product.id}">
          Add
        </button>
      </div>
    </a>
  `
  return productHTML;
}

let featuredHTML = '';
let accessoriesHTML = '';
let mensHTML = '';
let womensHTML = '';

products.forEach((product) => {

  if (product.section === 'featured') {
    featuredHTML += createItemElements(product);
    document.querySelector('.featured-carousel').innerHTML = featuredHTML;
  } else if (product.section === 'accessories') {
    accessoriesHTML += createItemElements(product);
    document.querySelector('.accessories-carousel').innerHTML = accessoriesHTML;
  } else if (product.section === 'mens') {
    mensHTML += createItemElements(product);
    document.querySelector('.mens-carousel').innerHTML = mensHTML;
  } else if (product.section === 'womens') {
    womensHTML += createItemElements(product);
    document.querySelector('.womens-carousel').innerHTML = womensHTML;
  }
  
});



// Cart Sidebar
const cartButton = document.querySelector('.cart-js');
const cartMenu = document.querySelector('.cart-sidebar');

cartButton.addEventListener('click', () => {
  cartMenu.classList.toggle('hidden');
  cartMenu.classList.toggle('menu-transition');
});



// Generate Cart HTML
let cart = JSON.parse(localStorage.getItem('cart'));

if (!cart) {
  cart = [];
}

function saveToStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

function addToCart(productId) {
  let matchingItem;

  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  if (matchingItem) {
    matchingItem.quantity++
  } else {
    cart.push({
      productId: productId,
      quantity: 1
    });
  }

  saveToStorage();
}

function removeFromCart(productId) {
  const newCart = [];

  cart.forEach((cartItem) => {
    if (cartItem.productId !== productId) {
      newCart.push(cartItem);
    }
  });

  cart = newCart;

  saveToStorage();
}

let cartHTML = '';
updateCart();

function updateCart() {
  cartHTML = '';

  cart.forEach((cartItem) => {
    const productId = cartItem.productId;

    let matchingProduct;

    products.forEach((product) => {
      if (product.id == productId) {
        matchingProduct = product;
      }
    });

    cartHTML += `
      <div class="cart-item-${matchingProduct.id} flex bg-[#b5b5b5] justify-between place-items-center my-2 p-1 rounded-md w-full shadow-[#a5a5a5] shadow-md">
        <img class="w-30 min-w-30 h-45 object-left rounded-sm" src="${matchingProduct.image}">
        <div class="cart-item-details h-30 flex-[100%] object-right flex flex-col justify-between ml-5 p-2">
          <div class="text-center text-wrap text-md">${matchingProduct.name}</div>
          <div class="text-right text-lg font-bold">$${matchingProduct.price}</div>
          <div class="flex justify-between">
            <button class="cursor-pointer w-fit text-gray-500 text-sm text-left js-delete-link" data-product-id="${matchingProduct.id}">Remove</button>
            <div class="text-right">Qty: ${cartItem.quantity}</div>
          </div>
        </div>
      </div>
    `;
  });

  document.querySelector('.cart-items').innerHTML = cartHTML;

  document.querySelectorAll('.js-delete-link').forEach((link) => {
    link.addEventListener('click', () => {
      const productId = link.dataset.productId;
      removeFromCart(productId);

      const container = document.querySelector(`.cart-item-${productId}`);
      container.remove;
      updateCart();
    });
  });
}

document.querySelectorAll('.js-add-to-cart')
  .forEach((button) => {
    button.addEventListener('click', () => {
      const productId = button.dataset.productId;
      addToCart(productId);
      updateCart();
    });
  });