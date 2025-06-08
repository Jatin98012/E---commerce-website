const products = [
  { id: 1, name: "Sneakers", price: 2500, image: "https://via.placeholder.com/200x150?text=Sneakers" },
  { id: 2, name: "Headphones", price: 1999, image: "https://via.placeholder.com/200x150?text=Headphones" },
  { id: 3, name: "Watch", price: 1499, image: "https://via.placeholder.com/200x150?text=Watch" },
  { id: 4, name: "Backpack", price: 899, image: "https://via.placeholder.com/200x150?text=Backpack" }
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function renderProducts() {
  const productList = document.getElementById("product-list");
  productList.innerHTML = "";
  products.forEach(product => {
    const div = document.createElement("div");
    div.className = "product";
    div.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>₹${product.price}</p>
      <button onclick="addToCart(${product.id})">Add to Cart</button>
    `;
    productList.appendChild(div);
  });
}

function addToCart(productId) {
  const item = products.find(p => p.id === productId);
  cart.push(item);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCart();
}

function updateCart() {
  const cartItems = document.getElementById("cart-items");
  const cartCount = document.getElementById("cart-count");
  const cartTotal = document.getElementById("cart-total");

  cartItems.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    const li = document.createElement("li");
    li.innerHTML = `${item.name} - ₹${item.price} <button onclick="removeFromCart(${index})">❌</button>`;
    cartItems.appendChild(li);
    total += item.price;
  });

  cartCount.textContent = cart.length;
  cartTotal.textContent = total;
}

function removeFromCart(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCart();
}

function clearCart() {
  cart = [];
  localStorage.removeItem("cart");
  updateCart();
}

renderProducts();
updateCart();
