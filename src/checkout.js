import {products} from './products.js';

let cart = JSON.parse(localStorage.getItem('cart'));

let cartSummaryHTML = '';
updateCartSummary()

function updateCartSummary() {
  cartSummaryHTML = '';

  cart.forEach((cartItem) => {
    const productId = cartItem.productId;

    let matchingProduct;

    products.forEach((product) => {
      if (product.id == productId) {
        matchingProduct = product;
      }
    });

    cartSummaryHTML += `
      <div class="checkout-item-container flex justify-between bg-secondary py-1 md:py-3 px-1 md:px-5 rounded-md max-w-[500px] min-w-[400px] w-full my-2 text-sm md:text-md shadow-black shadow-md">

        <div class="checkout-item flex">

          <div>
            <img class="w-30 rounded-sm" src="${matchingProduct.image}">
          </div>

        </div>

        <div class="shipping-options flex flex-col place-self-center m-3">

          <div class="my-2">
            <input class="mr-5" type="checkbox"></input>1 day shipping
          </div>

          <div class="my-2">
            <input class="mr-5" type="checkbox"></input>2 day shipping
          </div>

          <div class="my-2">
            <input class="mr-5" type="checkbox"></input>FREE 7 day shipping
          </div>

        </div>

      </div>
    `;
  });

  document.querySelector('.cart-checkout-items').innerHTML = cartSummaryHTML;

  /* document.querySelectorAll('.js-delete-link').forEach((link) => {
    link.addEventListener('click', () => {
      const productId = link.dataset.productId;
      removeFromCart(productId);

      const container = document.querySelector(`.cart-item-${productId}`);
      container.remove;
      updateCart();
    });
  }); */
}