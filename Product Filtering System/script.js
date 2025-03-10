let cart = [];
let cartCount = document.getElementById("cart-count");
let cartItems = document.getElementById("cart-items");
let cartTotal = document.getElementById("cart-total");

// Filter and display products based on selected filter
function filterProducts() {
    const categoryFilter = document.getElementById("category-filter").value;
    const priceFilter = document.getElementById("price-filter").value;
    const products = document.querySelectorAll(".product");

    products.forEach(product => {
        const category = product.getAttribute("data-category");
        const price = parseFloat(product.querySelector("p").innerText.replace('$', ''));

        let showProduct = true;

        // Category filter
        if (categoryFilter !== "all" && category !== categoryFilter) {
            showProduct = false;
        }

        // Price filter
        if (priceFilter !== "all") {
            if (priceFilter === "low" && price >= 20) {
                showProduct = false;
            } else if (priceFilter === "mid" && (price < 20 || price > 50)) {
                showProduct = false;
            } else if (priceFilter === "high" && price <= 50) {
                showProduct = false;
            }
        }

        // Toggle visibility of the product
        product.style.display = showProduct ? "block" : "none";
    });
}

// Listen for changes in the filter dropdowns
document.getElementById("category-filter").addEventListener("change", filterProducts);
document.getElementById("price-filter").addEventListener("change", filterProducts);

// Add to cart functionality
function addToCart(id, name, price) {
    const item = { id, name, price };
    cart.push(item);
    updateCart();
}

function updateCart() {
    const total = cart.reduce((acc, item) => acc + item.price, 0);
    cartCount.textContent = cart.length;
    cartTotal.textContent = total.toFixed(2);
    
    // Update cart items
    cartItems.innerHTML = "";
    cart.forEach(item => {
        const li = document.createElement("li");
        li.innerHTML = `${item.name} - $${item.price.toFixed(2)} <button onclick="removeFromCart(${item.id})">Remove</button>`;
        cartItems.appendChild(li);
    });
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    updateCart();
}

function toggleCart() {
    const cartPopup = document.getElementById("cart-popup");
    cartPopup.style.display = cartPopup.style.display === "block" ? "none" : "block";
}

function checkout() {
    alert("Proceeding to checkout...");
    cart = [];
    updateCart();
    toggleCart();
}

// Initial load to show all products
filterProducts();