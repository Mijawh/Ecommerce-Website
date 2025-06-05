import {products} from './products.js';

let cart = JSON.parse(localStorage.getItem('cart'));

let cartSummaryHTML = '';
let cartSummaryTotalHTML = '';
updateCartSummary();

function saveToStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

function updateCartSummary() {
  cartSummaryHTML = '';
  cartSummaryTotalHTML = '';

  cart.forEach((cartItem) => {
    const productId = cartItem.productId;

    let matchingProduct;

    products.forEach((product) => {
      if (product.id == productId) {
        matchingProduct = product;
      }
    });

    cartSummaryHTML += `
      <div class="checkout-item-container-${matchingProduct.id} flex bg-secondary py-1 md:py-3 px-1 md:px-5 rounded-md max-w-[500px] max-h-[260px] min-w-[400px] w-full my-2 text-sm md:text-md shadow-black shadow-md">

        <div class="checkout-item flex w-fit min-w-fit">

          <div class="w-fit min-w-fit">
            <img class="w-30 rounded-sm" src="${matchingProduct.image}">
          </div>

        </div>

        <div class="shipping-options flex flex-col place-self-center place-content-start m-3 w-full">

          <div class="place-items-center font-bold text-[20px] mb-3">
            ${matchingProduct.name}
          </div>

          <div class="my-2 text-[10px]">
            <input class="mr-3 ml-3" type="checkbox"></input>1 day shipping
          </div>

          <div class="my-2 text-[10px]">
            <input class="mr-3 ml-3" type="checkbox"></input>2 day shipping
          </div>

          <div class="my-2 text-[10px]">
            <input class="mr-3 ml-3" type="checkbox"></input>FREE 7 day shipping
          </div>

          <button class="js-delete-summary-item cursor-pointer text-gray-500 text-sm text-left" data-product-id="${matchingProduct.id}">
            Remove
          </button>

        </div>

      </div>
    `;

    cartSummaryTotalHTML += `
      <div class="flex justify-between py-3 px-[1%] w-full max-w-[600px]">
        <div>${matchingProduct.name} (${cartItem.quantity})</div>
        <div>$${matchingProduct.price * cartItem.quantity}</div>
      </div>
    `;
  });

  document.querySelector('.cart-checkout-items').innerHTML = cartSummaryHTML;
  

  document.querySelectorAll('.js-delete-summary-item').forEach((link) => {
    link.addEventListener('click', () => {
      const productId = link.dataset.productId;
      removeFromCart(productId);

      const container = document.querySelector(`.checkout-item-container-${productId}`);
      container.remove;
      updateCartSummary();
    });
  });

  cartSummaryTotalHTML += `
    <div class="bg-black w-[98%] h-0.5 place-self-center my-2"></div>

    <div class="flex justify-between py-3 px-[1%] w-full max-w-[600px]">
      <div>Total</div>
      <div>$${calculateTotalCost()}</div>
    </div>
  `
  
  document.querySelector('.checkout-item-prices').innerHTML = cartSummaryTotalHTML;
  
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

function calculateTotalCost() {
  
  let totalCost = 0;

  cart.forEach((cartItem) => {
    const productId = cartItem.productId;

    let matchingProduct;

    products.forEach((product) => {
      if (product.id == productId) {
        matchingProduct = product;
      }
    });

    totalCost += (matchingProduct.price * cartItem.quantity);
  });
  
  return totalCost;

}

document.querySelector('.purchase-button').addEventListener('click', () => {
  cart = [];
  saveToStorage();
});