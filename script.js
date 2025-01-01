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
      <button class="btn-add-to-cart">Add to Cart</button>
    </div>
  `;
  document.body.appendChild(modal);
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
      <td><img src="${item.image}" alt="${item.name}"> ${item.name}</td>
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

// Function to handle Quick View
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
}

// Function to close modal
function closeModal() {
  const modal = document.querySelector(".quick-view-modal");
  if (modal) {
    modal.remove();
  }
}

// // Toggle the nav menu
// document.getElementById("menu-icon").addEventListener("click", function () {
//   const menu = document.getElementById("nav-menu");
//   menu.classList.toggle("show");
// });

// // Toggle the products list dropdown
// document
//   .querySelector(".dropdown-toggle > a")
//   .addEventListener("click", function (event) {
//     event.preventDefault();
//     const dropdownMenu = this.nextElementSibling;
//     dropdownMenu.classList.toggle("show");
//   });

// // Handle Quick View modal
// function quickView(name, image, price, description) {
//   closeModal(); // Close any existing modal before creating a new one
//   const modal = document.createElement("div");
//   modal.classList.add("quick-view-modal");
//   modal.innerHTML = `
//     <div class="quick-view-content">
//       <span class="close-btn" onclick="closeModal()">&times;</span>
//       <img src="${image}" alt="${name}">
//       <h2>${name}</h2>
//       <p>${description}</p>
//       <p>Price: ${price}</p>
//       <label for="quantity">Quantity:</label>
//       <input type="number" id="quantity" name="quantity" value="1" min="1">
//       <button class="btn-add-to-cart" onclick="addToCart('${name}', '${image}', '${price}', document.getElementById('quantity').value)">Add to Cart</button>
//     </div>
//   `;
//   document.body.appendChild(modal);
// }

// // Close the modal
// function closeModal() {
//   const modal = document.querySelector(".quick-view-modal");
//   if (modal) modal.remove();
// }

// // Load cart from localStorage when the page loads
// document.addEventListener("DOMContentLoaded", loadCartFromStorage);

// // Cart object to store cart items
// let cart = [];

// // Function to add item to cart
// function addToCart(name, image, price, quantity) {
//   const itemIndex = cart.findIndex((item) => item.name === name);
//   if (itemIndex !== -1) {
//     cart[itemIndex].quantity += parseInt(quantity, 10);
//   } else {
//     const item = { name, image, price, quantity: parseInt(quantity, 10) };
//     cart.push(item);
//   }
//   updateCartCount();
//   saveCartToStorage();
//   closeModal();
// }

// // Function to update cart count
// function updateCartCount() {
//   const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
//   document.getElementById("cart-count").textContent = cartCount;
// }

// // Function to display cart items
// function displayCartItems() {
//   const cartTable = document.querySelector(".cart-table tbody");
//   cartTable.innerHTML = "";
//   cart.forEach((item) => {
//     const row = document.createElement("tr");
//     row.innerHTML = `
//       <td><img src="${item.image}" alt="${item.name}"> ${item.name}</td>
//       <td>${item.price}</td>
//       <td><input type="number" value="${
//         item.quantity
//       }" min="1" onchange="updateItemQuantity('${item.name}', this.value)"></td>
//       <td>${(
//         parseFloat(item.price.replace(/[^0-9.]/g, "")) * item.quantity
//       ).toFixed(2)}</td>
//       <td><button class="btn-remove" onclick="removeItem('${
//         item.name
//       }')">Remove</button></td>
//     `;
//     cartTable.appendChild(row);
//   });
//   updateCartTotal();
// }

// // Function to update item quantity
// function updateItemQuantity(name, quantity) {
//   if (quantity < 1) {
//     removeItem(name);
//     return;
//   }
//   const item = cart.find((item) => item.name === name);
//   if (item) {
//     item.quantity = parseInt(quantity, 10);
//     updateCartCount();
//     displayCartItems();
//     saveCartToStorage();
//   }
// }

// // Function to remove item from cart
// function removeItem(name) {
//   cart = cart.filter((item) => item.name !== name);
//   updateCartCount();
//   displayCartItems();
//   saveCartToStorage();
// }

// // Function to update cart total
// function updateCartTotal() {
//   const total = cart
//     .reduce(
//       (sum, item) =>
//         sum + parseFloat(item.price.replace(/[^0-9.]/g, "")) * item.quantity,
//       0
//     )
//     .toFixed(2);
//   document.getElementById("cart-total").textContent = total;
// }

// // Function to save cart to localStorage
// function saveCartToStorage() {
//   localStorage.setItem("cart", JSON.stringify(cart));
// }

// // Function to load cart from localStorage
// function loadCartFromStorage() {
//   try {
//     const savedCart = localStorage.getItem("cart");
//     if (savedCart) {
//       cart = JSON.parse(savedCart);
//       updateCartCount();
//       displayCartItems();
//     }
//   } catch (error) {
//     console.error("Error loading cart from storage:", error);
//     cart = [];
//   }
// }
