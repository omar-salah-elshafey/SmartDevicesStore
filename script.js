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

//Handling the watches items
function renderWatches() {
  const container = document.querySelector(".watches");
  if (!container) return;
  container.innerHTML = "";
  const watches = [
    {
      category: "Apple Watches",
      items: [
        {
          name: "Apple Watch Ultra",
          image: "../images/applewatchultra.jpg",
          price: "$799",
          description:
            "The Apple Watch Ultra is built for extreme adventures with a rugged titanium case, a brighter display, a new Action button, and longer battery life.",
        },
        {
          name: "Apple Watch 8",
          image: "../images/applewatch8.jpg",
          price: "$399",
          description:
            "The Apple Watch 8 offers advanced health and fitness features, including a temperature sensor, crash detection, and a new dual-core processor.",
        },
        {
          name: "Apple Watch 7",
          image: "../images/applewatch7.jpg",
          price: "$299",
          description:
            "The Apple Watch 7 features a larger display, faster charging, and improved durability.",
        },
      ],
    },
    {
      category: "Samsung Watches",
      items: [
        {
          name: "Samsung Watch 5",
          image: "../images/samWatch5.jpg",
          price: "$279",
          description:
            "The Samsung Watch 5 offers advanced health and fitness tracking, a rotating bezel, and a durable design.",
        },
        {
          name: "Samsung Watch 4",
          image: "../images/samWatch4.jpg",
          price: "$249",
          description:
            "The Samsung Watch 4 is a powerful smartwatch with a sleek design, built-in GPS, and a variety of fitness features.",
        },
        {
          name: "Samsung Watch 3",
          image: "../images/samWatch3.jpg",
          price: "$199",
          description:
            "The Samsung Watch 3 offers a classic smartwatch experience with a rotating bezel and a focus on health and fitness.",
        },
      ],
    },
    {
      category: "Huawei Watches",
      items: [
        {
          name: "Huawei Watch GT 3",
          image: "../images/HUAWEIWATCHGT3.jpg",
          price: "$199",
          description:
            "The Huawei Watch GT 3 is a stylish and long-lasting smartwatch with advanced health and fitness tracking features.",
        },
        {
          name: "Huawei Watch GT 3 se",
          image: "../images/HUAWEIWATCHGT3se.jpg",
          price: "$169",
          description:
            "The Huawei Watch GT 3 se offers a more affordable option with key features like heart rate monitoring and activity tracking.",
        },
        {
          name: "Huawei Watch GT 2",
          image: "../images/HUAWEIWATCHGT2.jpg",
          price: "$149",
          description:
            "The Huawei Watch GT 2 is a popular choice with a long battery life and a focus on fitness tracking.",
        },
      ],
    },
    {
      category: "Xiaomi Watches",
      items: [
        {
          name: "Xiaomi Smart Band 7",
          image: "../images/XiaomiSmartBand7.jpg",
          price: "$49",
          description:
            "The Xiaomi Smart Band 7 is a budget-friendly fitness tracker with a large AMOLED display and comprehensive health and fitness tracking features.",
        },
        {
          name: "Xiaomi Band 5",
          image: "../images/XiaomiBand5.jpg",
          price: "$39",
          description:
            "The Xiaomi Band 5 is a popular and affordable fitness tracker with basic health and fitness tracking features.",
        },
        {
          name: "Xiaomi Band 2",
          image: "../images/RedmiBand2.jpg",
          price: "$29",
          description:
            "The Xiaomi Redmi Band 2 is an entry-level fitness tracker with basic features at a very affordable price.",
        },
      ],
    },
  ];
  watches.forEach((category) => {
    const categorySection = document.createElement("div");
    categorySection.classList.add("product-category");

    const categoryTitle = document.createElement("h2");
    categoryTitle.textContent = category.category;
    categorySection.appendChild(categoryTitle);

    const productGrid = document.createElement("div");
    productGrid.classList.add("product-grid");

    category.items.forEach((item) => {
      const productItem = document.createElement("div");
      productItem.classList.add("product-item");

      productItem.innerHTML = `
        <img src="${item.image}" alt="${item.name}" />
        <h3>${item.name}</h3>
        <p>${item.price}</p>
        <button class="btn" onclick="quickView('${item.name}', '${item.image}', '${item.price}', '${item.description}')">
          Quick View
        </button>
      `;

      productGrid.appendChild(productItem);
    });

    categorySection.appendChild(productGrid);
    container.appendChild(categorySection);
  });
}
// Call the function when the page loads
renderWatches();

//Handling the tablets items
function renderTablets() {
  const container = document.querySelector(".tablets");

  if (!container) return;

  container.innerHTML = "";

  const tablets = [
    {
      category: "Samsung Tablets",
      items: [
        {
          name: "Samsung Tab S8 Ultra",
          image: "../images/samTabS8Ultra.jpg",
          price: "$1299",
          description:
            "The Samsung Tab S8 Ultra features a stunning 14.6-inch Super AMOLED display, Snapdragon 8 Gen 1 processor, and up to 12GB of RAM for unparalleled performance.",
        },
        {
          name: "Samsung Tab S8 Plus",
          image: "../images/samTabS8Plus.jpg",
          price: "$999",
          description:
            "The Samsung Tab S8 Plus offers a 12.4-inch Super AMOLED display, Snapdragon 8 Gen 1 processor, and up to 8GB of RAM for a great balance of performance and portability.",
        },
        {
          name: "Samsung Tab A7 Lite",
          image: "../images/samTabA7lite.jpg",
          price: "$199",
          description:
            "The Samsung Tab A7 Lite features an 8.7-inch display, Mediatek Helio P22T processor, and 3GB of RAM for everyday entertainment and browsing.",
        },
      ],
    },
    {
      category: "Ipads",
      items: [
        {
          name: "Ipad 12 Pro 6",
          image: "../images/ipad12pro6.jpg",
          price: "$1199",
          description:
            "The iPad 12 Pro 6 features a 12.9-inch Liquid Retina XDR display, M1 chip, and up to 1TB of storage for professional-grade performance and creativity.",
        },
        {
          name: "Ipad 12 Pro 5",
          image: "../images/ipad12pro5.jpg",
          price: "$1099",
          description:
            "The iPad 12 Pro 5 offers a 12.9-inch Liquid Retina XDR display, A14 Bionic chip, and up to 512GB of storage for powerful performance and versatility.",
        },
        {
          name: "Ipad 11 Pro",
          image: "../images/ipad11pro.jpg",
          price: "$799",
          description:
            "The iPad 11 Pro features an 11-inch Liquid Retina display, M1 chip, and up to 512GB of storage for a compact yet powerful tablet experience.",
        },
      ],
    },
  ];

  tablets.forEach((category) => {
    const categorySection = document.createElement("div");
    categorySection.classList.add("product-category");

    const categoryTitle = document.createElement("h2");
    categoryTitle.textContent = category.category;
    categorySection.appendChild(categoryTitle);

    const productGrid = document.createElement("div");
    productGrid.classList.add("product-grid");

    category.items.forEach((item) => {
      const productItem = document.createElement("div");
      productItem.classList.add("product-item");

      productItem.innerHTML = `
        <img src="${item.image}" alt="${item.name}" />
        <h3>${item.name}</h3>
        <p>${item.price}</p>
        <button class="btn" onclick="quickView('${item.name}', '${item.image}', '${item.price}', '${item.description}')">
          Quick View
        </button>
      `;

      productGrid.appendChild(productItem);
    });

    categorySection.appendChild(productGrid);
    container.appendChild(categorySection);
  });
}
// Call the function when the page loads
renderTablets();

//Handling the airpods items
function renderAirpods() {
  const container = document.querySelector(".airpods");
  if (!container) return;
  container.innerHTML = "";

  const airpods = [
    {
      category: "Huawei Airpods",
      items: [
        {
          name: "Huawei FreeBuds 5",
          image: "../images/HUAWEIFreeBuds5.jpg",
          price: "$199",
          description:
            "Open-fit design for comfortable and immersive sound. Intelligent Dynamic Audio Adjustment for personalized listening.",
        },
        {
          name: "Huawei FreeBuds 5i",
          image: "../images/HUAWEIFreeBuds5i.jpg",
          price: "$99",
          description:
            "Excellent sound quality and active noise cancellation at an affordable price. Comfortable and secure fit.",
        },
        {
          name: "Honor Choice Earbuds X",
          image: "../images/HonorChoiceEarbudsX.jpg",
          price: "$25",
          description:
            "Budget-friendly earbuds with decent sound quality and comfortable fit. Ideal for everyday use.",
        },
      ],
    },
    {
      category: "Xiaomi Airpods",
      items: [
        {
          name: "Xiaomi Redmi Buds 4 Pro",
          image: "../images/RedmiBuds4Pro.jpg",
          price: "$70",
          description:
            "High-fidelity audio with active noise cancellation and long battery life. Comfortable and secure fit.",
        },
        {
          name: "Xiaomi Redmi Buds 3 Pro",
          image: "../images/RedmiBuds3Pro.jpg",
          price: "$50",
          description:
            "Good balance of sound quality, features, and price. Comfortable and secure fit.",
        },
        {
          name: "Xiaomi Redmi Buds 4 Lite",
          image: "../images/RedmiBuds4Lite.jpg",
          price: "$20",
          description:
            "Budget-friendly earbuds with decent sound and basic features. Ideal for casual listening.",
        },
      ],
    },
  ];

  airpods.forEach((category) => {
    const categorySection = document.createElement("div");
    categorySection.classList.add("product-category");

    const categoryTitle = document.createElement("h2");
    categoryTitle.textContent = category.category;
    categorySection.appendChild(categoryTitle);

    const productGrid = document.createElement("div");
    productGrid.classList.add("product-grid");

    category.items.forEach((item) => {
      const productItem = document.createElement("div");
      productItem.classList.add("product-item");

      productItem.innerHTML = `
        <img src="${item.image}" alt="${item.name}" />
        <h3>${item.name}</h3>
        <p>${item.price}</p>
        <button class="btn" onclick="quickView('${item.name}', '${item.image}', '${item.price}', '${item.description}')">
          Quick View
        </button>
      `;

      productGrid.appendChild(productItem);
    });

    categorySection.appendChild(productGrid);
    container.appendChild(categorySection);
  });
}
// Call the function to render the airpods section
renderAirpods();

//Handling the phones items
function renderPhones() {
  const container = document.querySelector(".phones");
  if (!container) return;
  container.innerHTML = "";
  const phones = [
    {
      category: "Samsung Phones",
      items: [
        {
          name: "Samsung S23 Ultra",
          image: "../images/samS23Ultra.jpg",
          price: "$999",
          description:
            "A powerful smartphone with a 108MP camera, 5000mAh battery, and 12GB RAM.",
        },
        {
          name: "Samsung A73",
          image: "../images/samA73.jpg",
          price: "$999",
          description:
            "A sleek smartphone with a 64MP camera, 4500mAh battery, and 8GB RAM.",
        },
        {
          name: "Samsung A53",
          image: "../images/samA53.jpg",
          price: "$999",
          description:
            "A mid-range smartphone with a 48MP camera, 4000mAh battery, and 6GB RAM.",
        },
        {
          name: "Samsung M33",
          image: "../images/samM33.jpg",
          price: "$999",
          description:
            "An affordable smartphone with a 32MP camera, 3500mAh battery, and 4GB RAM.",
        },
        {
          name: "Samsung A23",
          image: "../images/samA23.jpg",
          price: "$999",
          description:
            "A budget-friendly smartphone with a 16MP camera, 3000mAh battery, and 3GB RAM.",
        },
        {
          name: "Samsung A04s",
          image: "../images/samA04s.jpg",
          price: "$999",
          description:
            "An entry-level smartphone with an 8MP camera, 2500mAh battery, and 2GB RAM.",
        },
      ],
    },
    {
      category: "IPhones",
      items: [
        {
          name: "Iphone 14 pro max",
          image: "../images/ip14promax.jpg",
          price: "$999",
          description:
            "The iPhone 14 Pro Max features a stunning Super Retina XDR display, A16 Bionic chip, and an advanced triple-camera system.",
        },
        {
          name: "Iphone 14 plus",
          image: "../images/ip14plus.jpg",
          price: "$999",
          description:
            "The iPhone 14 Plus offers a larger display and enhanced battery life, along with the powerful A16 Bionic chip.",
        },
        {
          name: "Iphone 14 pro",
          image: "../images/ip14pro.jpg",
          price: "$999",
          description:
            "The iPhone 14 Pro includes advanced features such as a ProMotion display, improved camera capabilities, and the A16 Bionic chip.",
        },
        {
          name: "Iphone 14",
          image: "../images/ip14.jpg",
          price: "$999",
          description:
            "The iPhone 14 combines elegant design with powerful performance, featuring the A16 Bionic chip and a dual-camera system.",
        },
        {
          name: "Iphone 13 pro max",
          image: "../images/ip13promax.jpg",
          price: "$999",
          description:
            "The iPhone 13 Pro Max boasts a ProMotion display, A15 Bionic chip, and an improved triple-camera system.",
        },
        {
          name: "Iphone 13",
          image: "../images/ip13.jpg",
          price: "$999",
          description:
            "The iPhone 13 offers powerful performance with the A15 Bionic chip and a dual-camera system in a sleek design.",
        },
      ],
    },
    {
      category: "Huawei Phones",
      items: [
        {
          name: "Huawei Nova Y70",
          image: "../images/huaweinovaY70.jpg",
          price: "$600",
          description:
            "The Huawei Nova Y70 features a sleek design, a powerful Kirin processor, and an advanced camera system.",
        },
        {
          name: "Huawei Nova Y70",
          image: "../images/huaweinovaY70.jpg",
          price: "$600",
          description:
            "The Huawei Nova Y70 features a sleek design, a powerful Kirin processor, and an advanced camera system.",
        },
        {
          name: "Huawei Nova Y70",
          image: "../images/huaweinovaY70.jpg",
          price: "$600",
          description:
            "The Huawei Nova Y70 features a sleek design, a powerful Kirin processor, and an advanced camera system.",
        },
        {
          name: "Huawei Nova Y70",
          image: "../images/huaweinovaY70.jpg",
          price: "$600",
          description:
            "The Huawei Nova Y70 features a sleek design, a powerful Kirin processor, and an advanced camera system.",
        },
        {
          name: "Huawei Nova Y70",
          image: "../images/huaweinovaY70.jpg",
          price: "$600",
          description:
            "The Huawei Nova Y70 features a sleek design, a powerful Kirin processor, and an advanced camera system.",
        },
        {
          name: "Huawei Nova Y70",
          image: "../images/huaweinovaY70.jpg",
          price: "$600",
          description:
            "The Huawei Nova Y70 features a sleek design, a powerful Kirin processor, and an advanced camera system.",
        },
      ],
    },
    {
      category: "Oppo Phones",
      items: [
        {
          name: "Oppo Reno 8 pro",
          image: "../images/opporeno8pro.jpg",
          price: "$1499",
          description:
            "The Oppo Reno 8 Pro features a high-end Snapdragon processor, 120Hz AMOLED display, and an impressive quad-camera setup.",
        },
        {
          name: "Oppo Reno 8 pro",
          image: "../images/opporeno8pro.jpg",
          price: "$1499",
          description:
            "The Oppo Reno 8 Pro features a high-end Snapdragon processor, 120Hz AMOLED display, and an impressive quad-camera setup.",
        },
        {
          name: "Oppo Reno 8 pro",
          image: "../images/opporeno8pro.jpg",
          price: "$1499",
          description:
            "The Oppo Reno 8 Pro features a high-end Snapdragon processor, 120Hz AMOLED display, and an impressive quad-camera setup.",
        },
        {
          name: "Oppo Reno 8 pro",
          image: "../images/opporeno8pro.jpg",
          price: "$1499",
          description:
            "The Oppo Reno 8 Pro features a high-end Snapdragon processor, 120Hz AMOLED display, and an impressive quad-camera setup.",
        },
        {
          name: "Oppo Reno 8 pro",
          image: "../images/opporeno8pro.jpg",
          price: "$1499",
          description:
            "The Oppo Reno 8 Pro features a high-end Snapdragon processor, 120Hz AMOLED display, and an impressive quad-camera setup.",
        },
        {
          name: "Oppo Reno 8 pro",
          image: "../images/opporeno8pro.jpg",
          price: "$1499",
          description:
            "The Oppo Reno 8 Pro features a high-end Snapdragon processor, 120Hz AMOLED display, and an impressive quad-camera setup.",
        },
      ],
    },
    {
      category: "Realme Phones",
      items: [
        {
          name: "Realme 11 pro plus",
          image: "../images/realme11proplus.jpg",
          price: "$699",
          description:
            "The Realme 11 Pro Plus offers a 108MP camera, 5000mAh battery, and 8GB RAM, making it a great choice for photography enthusiasts.",
        },
        {
          name: "Realme 11 pro plus",
          image: "../images/realme11proplus.jpg",
          price: "$699",
          description:
            "The Realme 11 Pro Plus offers a 108MP camera, 5000mAh battery, and 8GB RAM, making it a great choice for photography enthusiasts.",
        },
        {
          name: "Realme 11 pro plus",
          image: "../images/realme11proplus.jpg",
          price: "$699",
          description:
            "The Realme 11 Pro Plus offers a 108MP camera, 5000mAh battery, and 8GB RAM, making it a great choice for photography enthusiasts.",
        },
        {
          name: "Realme 11 pro plus",
          image: "../images/realme11proplus.jpg",
          price: "$699",
          description:
            "The Realme 11 Pro Plus offers a 108MP camera, 5000mAh battery, and 8GB RAM, making it a great choice for photography enthusiasts.",
        },
        {
          name: "Realme 11 pro plus",
          image: "../images/realme11proplus.jpg",
          price: "$699",
          description:
            "The Realme 11 Pro Plus offers a 108MP camera, 5000mAh battery, and 8GB RAM, making it a great choice for photography enthusiasts.",
        },
        {
          name: "Realme 11 pro plus",
          image: "../images/realme11proplus.jpg",
          price: "$699",
          description:
            "The Realme 11 Pro Plus offers a 108MP camera, 5000mAh battery, and 8GB RAM, making it a great choice for photography enthusiasts.",
        },
      ],
    },
    {
      category: "Xiaomi Phones",
      items: [
        {
          name: "Xiaomi 13 Pro",
          image: "../images/Xiaomi13Pro.jpg",
          price: "$1499",
          description: "Details of Xiaomi 13 Pro can be added here.",
        },
        {
          name: "Xiaomi 13 Pro",
          image: "../images/Xiaomi13Pro.jpg",
          price: "$1499",
          description: "Details of Xiaomi 13 Pro can be added here.",
        },
        {
          name: "Xiaomi 13 Pro",
          image: "../images/Xiaomi13Pro.jpg",
          price: "$1499",
          description: "Details of Xiaomi 13 Pro can be added here.",
        },
        {
          name: "Xiaomi 13 Pro",
          image: "../images/Xiaomi13Pro.jpg",
          price: "$1499",
          description: "Details of Xiaomi 13 Pro can be added here.",
        },
        {
          name: "Xiaomi 13 Pro",
          image: "../images/Xiaomi13Pro.jpg",
          price: "$1499",
          description: "Details of Xiaomi 13 Pro can be added here.",
        },
        {
          name: "Xiaomi 13 Pro",
          image: "../images/Xiaomi13Pro.jpg",
          price: "$1499",
          description: "Details of Xiaomi 13 Pro can be added here.",
        },
      ],
    },
  ];

  phones.forEach((category) => {
    const categorySection = document.createElement("div");
    categorySection.classList.add("product-category");

    const categoryTitle = document.createElement("h2");
    categoryTitle.textContent = category.category;
    categorySection.appendChild(categoryTitle);

    const productGrid = document.createElement("div");
    productGrid.classList.add("product-grid");

    category.items.forEach((item) => {
      const productItem = document.createElement("div");
      productItem.classList.add("product-item");

      productItem.innerHTML = `
        <img src="${item.image}" alt="${item.name}" />
        <h3>${item.name}</h3>
        <p>${item.price}</p>
        <button class="btn" onclick="quickView('${item.name}', '${item.image}', '${item.price}', '${item.description}')">
          Quick View
        </button>
      `;

      productGrid.appendChild(productItem);
    });

    categorySection.appendChild(productGrid);
    container.appendChild(categorySection);
  });
}
// Call the function to render the airpods section
renderPhones();

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
