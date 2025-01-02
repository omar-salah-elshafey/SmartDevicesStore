// toggle the nav menu
document.getElementById("menu-icon").addEventListener("click", function () {
  const menu = document.getElementById("nav-menu");
  menu.classList.toggle("show");
});
//toggle the producs list
document
  .querySelector(".dropdown-toggle > a")
  .addEventListener("click", function (event) {
    event.preventDefault();
    const dropdownMenu = document.querySelector(".dropdown-menu");
    dropdownMenu.classList.toggle("show");
  });

// quich view modal
function quickView(name, image, price, description) {
  const modal = document.createElement("div");
  modal.classList.add("quick-view-modal");
  modal.innerHTML = `
    <div class="quick-view-content">
      <span class="close-btn" onclick="closeModal()">&times;</span>
      <img src="${image}" alt="${name}">
      <h2>${name}</h2>
      <p>${description}</p>
      <p>Price: ${price}</p>
      <label for="quantity">Quantity:</label>
      <input type="number" id="quantity" name="quantity" value="1" min="1">
      <button class="btn-add-to-cart" onclick="addToCart('${name}', '${image}', '${price}', document.getElementById('quantity').value)">Add to Cart</button>
    </div>
  `;
  document.body.appendChild(modal);
  // Add event listener to close modal when clicking outside of the modal content
  modal.addEventListener("click", function (event) {
    if (event.target === modal) {
      closeModal();
    }
  });
}

function closeModal() {
  const modal = document.querySelector(".quick-view-modal");
  if (modal) {
    modal.remove();
  }
}
// Load cart from localStorage when the page loads
document.addEventListener("DOMContentLoaded", loadCartFromStorage);

// Cart object to store cart items
let cart = [];

// Function to add item to cart
function addToCart(name, image, price, quantity) {
  const itemIndex = cart.findIndex((item) => item.name === name);
  if (itemIndex !== -1) {
    // Item already exists, update the quantity
    cart[itemIndex].quantity += parseInt(quantity, 10);
  } else {
    // Item does not exist, add new item
    const item = { name, image, price, quantity: parseInt(quantity, 10) };
    cart.push(item);
  }
  updateCartCount();
  saveCartToStorage();
  closeModal();
}

// Function to update cart count
function updateCartCount() {
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  document.getElementById("cart-count").textContent = cartCount;
}

// Function to display cart items (example function for your cart page)
function displayCartItems() {
  const cartTable = document.querySelector(".cart-table tbody");
  if (!cartTable) {
    // Exit the function if the cart table doesn't exist (not on the cart page)
    return;
  }
  cartTable.innerHTML = "";
  cart.forEach((item) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td><img src="${item.image}" alt="${item.name}"><br>${item.name}</td>
      <td>${item.price}</td>
      <td><input type="number" value="${
        item.quantity
      }" min="1" onchange="updateItemQuantity('${item.name}', this.value)"></td>
      <td>${(parseFloat(item.price.substring(1)) * item.quantity).toFixed(
        2
      )}</td>
      <td><button class="btn-remove" onclick="removeItem('${
        item.name
      }')">Remove</button></td>
    `;
    cartTable.appendChild(row);
  });
  updateCartTotal();
}

// Function to update item quantity
function updateItemQuantity(name, quantity) {
  const item = cart.find((item) => item.name === name);
  if (item) {
    item.quantity = parseInt(quantity, 10);
    updateCartCount();
    displayCartItems();
    saveCartToStorage();
  }
}

// Function to remove item from cart
function removeItem(name) {
  cart = cart.filter((item) => item.name !== name);
  updateCartCount();
  displayCartItems();
  saveCartToStorage();
}

// Function to update cart total
function updateCartTotal() {
  const total = cart
    .reduce(
      (sum, item) => sum + parseFloat(item.price.substring(1)) * item.quantity,
      0
    )
    .toFixed(2);
  document.getElementById("cart-total").textContent = total;
}

// Function to save cart to localStorage
function saveCartToStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Function to load cart from localStorage
function loadCartFromStorage() {
  const savedCart = localStorage.getItem("cart");
  if (savedCart) {
    cart = JSON.parse(savedCart);
    updateCartCount();
    displayCartItems();
  }
}

// Function to display order summary
function displayOrderSummary() {
  const orderSummary = document.getElementById("order-summary");
  if (!orderSummary) {
    // Exit the function if order summary doesn't exist (not on the checkout page)
    return;
  }

  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  orderSummary.innerHTML = ""; // Clear the previous content

  if (cart.length === 0) {
    orderSummary.innerHTML = "<p>Your cart is empty.</p>";
    return; // Exit early if cart is empty
  }

  cart.forEach((item) => {
    const itemSummary = document.createElement("div");
    itemSummary.classList.add("order-item");
    itemSummary.innerHTML = `
      <p><strong>${item.name}</strong></p>
      <p>Price: $${item.price}</p>
      <p>Quantity: ${item.quantity}</p>
      <p>Total: ${(parseFloat(item.price.substring(1)) * item.quantity).toFixed(
        2
      )}</p>
    `;
    orderSummary.appendChild(itemSummary);
  });

  const total = cart
    .reduce(
      (sum, item) => sum + parseFloat(item.price.substring(1)) * item.quantity,
      0
    )
    .toFixed(2);
  const totalSummary = document.createElement("div");
  totalSummary.classList.add("order-total");
  totalSummary.innerHTML = `<p><strong>Order Total: $${total}</strong></p>`;
  orderSummary.appendChild(totalSummary);
}

// Call this function when the page loads to display the order summary
window.onload = function () {
  displayOrderSummary();
};

// Handle the checkout button click to prevent proceeding if the cart is empty
const checkoutButton = document.getElementById("checkout-btn");
if (checkoutButton) {
  checkoutButton.addEventListener("click", function (event) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (cart.length === 0) {
      event.preventDefault(); // Prevent the redirect
      alert(
        "Your cart is empty! Please add items to your cart before proceeding to checkout."
      );
    } else {
      // Route to the checkout.html page
      window.location.href = "checkout.html";
    }
  });
}

// Submit order and clear the cart
function submitOrder() {
  const name = document.getElementById("name").value;
  const address = document.getElementById("address").value;
  const city = document.getElementById("city").value;
  const state = document.getElementById("state").value;
  const zip = document.getElementById("zip").value;
  const country = document.getElementById("country").value;
  const cardName = document.getElementById("card-name").value;
  const cardNumber = document.getElementById("card-number").value;
  const expiry = document.getElementById("expiry").value;
  const cvv = document.getElementById("cvv").value;

  if (
    !name ||
    !address ||
    !city ||
    !state ||
    !zip ||
    !country ||
    !cardName ||
    !cardNumber ||
    !expiry ||
    !cvv
  ) {
    alert("Please fill in all the required fields.");
    return;
  }

  alert("Thank you! Your order has been placed successfully.");

  // Clear the cart in localStorage
  localStorage.removeItem("cart");

  // Update the cart count on the page
  document.getElementById("cart-count").textContent = "0";

  // Redirect to homepage or another page
  window.location.href = "index.html"; // Change this if you want to redirect elsewhere
}
