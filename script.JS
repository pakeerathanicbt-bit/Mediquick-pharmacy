// MediQuick Pharmacy - JavaScript

// Add products to shopping cart
function addToCart(productName, productPrice) {

    // Get existing cart items
    let cart = JSON.parse(localStorage.getItem("mediQuickCart")) || [];

    // Check whether product already exists
    let existingProduct = cart.find(
        item => item.name === productName
    );

    if (existingProduct) {

        // Increase quantity
        existingProduct.quantity += 1;

    } else {

        // Add new product
        cart.push({
            name: productName,
            price: productPrice,
            quantity: 1
        });

    }

    // Save cart items
    localStorage.setItem("mediQuickCart", JSON.stringify(cart));

    // Show confirmation
    alert(productName + " added to cart successfully!");

    // Update cart count
    updateCartCount();
}


// Update shopping cart count
function updateCartCount() {

    let cart = JSON.parse(localStorage.getItem("mediQuickCart")) || [];

    let totalItems = cart.reduce(
        (total, item) => total + item.quantity,
        0
    );

    let cartLink = document.querySelector('nav a[href="cart.html"]');

    if (cartLink) {
        cartLink.textContent = "Cart (" + totalItems + ")";
    }
}


// Run when page loads
document.addEventListener("DOMContentLoaded", function () {

    updateCartCount();

});

// Product Search and Category Filtering

let selectedCategory = "All";

function filterProducts(category) {

    selectedCategory = category;

    displayProducts();
}


function displayProducts() {

    let searchInput = document.getElementById("searchInput");

    if (!searchInput) return;

    let searchValue = searchInput.value.toLowerCase();

    let products = document.querySelectorAll(".product-card");

    let visibleCount = 0;

    products.forEach(function(product) {

        let productName = product.querySelector("h3").textContent.toLowerCase();

        let productCategory = product.dataset.category;

        let matchesSearch = productName.includes(searchValue);

        let matchesCategory =
            selectedCategory === "All" ||
            productCategory === selectedCategory;

        if (matchesSearch && matchesCategory) {

            product.style.display = "block";
            visibleCount++;

        } else {

            product.style.display = "none";

        }

    });

    let noProducts = document.getElementById("noProducts");

    if (noProducts) {
        noProducts.style.display =
            visibleCount === 0 ? "block" : "none";
    }
}


// Search while typing
document.addEventListener("DOMContentLoaded", function() {

    let searchInput = document.getElementById("searchInput");

    if (searchInput) {
        searchInput.addEventListener("input", displayProducts);
    }

});

// LOGIN FORM VALIDATION
document.addEventListener("DOMContentLoaded", function () {

    const loginForm = document.getElementById("loginForm");

    if (loginForm) {
        loginForm.addEventListener("submit", function (event) {
            event.preventDefault();

            alert("Login form submitted successfully!");
        });
    }

    // REGISTER FORM VALIDATION
    const registerForm = document.getElementById("registerForm");

    if (registerForm) {
        registerForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const password =
                document.getElementById("registerPassword").value;

            const confirmPassword =
                document.getElementById("confirmPassword").value;

            if (password !== confirmPassword) {
                alert("Passwords do not match!");
                return;
            }

            alert("Registration form submitted successfully!");
        });
    }

});

// SHOPPING CART DISPLAY

function displayCart() {
    const cart = getCart();

    const cartItems = document.getElementById("cartItems");
    const emptyCart = document.getElementById("emptyCart");
    const cartSummary = document.getElementById("cartSummary");
    const cartTotal = document.getElementById("cartTotal");

    // Stop if this is not the cart page
    if (!cartItems) return;

    cartItems.innerHTML = "";

    if (cart.length === 0) {
        emptyCart.style.display = "block";
        cartSummary.style.display = "none";
        cartTotal.textContent = "0.00";
        updateCartCount();
        return;
    }

    emptyCart.style.display = "none";
    cartSummary.style.display = "block";

    let total = 0;

    cart.forEach(function(item, index) {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        cartItems.innerHTML += `
            <div class="cart-item">
                <div>
                    <h3>${item.name}</h3>
                    <p>Price: Rs. ${item.price.toFixed(2)}</p>
                    <p>Subtotal: Rs. ${itemTotal.toFixed(2)}</p>
                </div>

                <div class="cart-actions">
                    <button onclick="changeCartQuantity(${index}, -1)">-</button>
                    <span>${item.quantity}</span>
                    <button onclick="changeCartQuantity(${index}, 1)">+</button>
                    <button class="remove-btn"
                        onclick="removeCartItem(${index})">
                        Remove
                    </button>
                </div>
            </div>
        `;
    });

    cartTotal.textContent = total.toFixed(2);
    updateCartCount();
}

// CHANGE PRODUCT QUANTITY

function changeCartQuantity(index, change) {
    let cart = getCart();

    if (!cart[index]) return;

    cart[index].quantity += change;

    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }

    saveCart(cart);
    displayCart();
}

// REMOVE PRODUCT FROM CART

function removeCartItem(index) {
    let cart = getCart();

    cart.splice(index, 1);

    saveCart(cart);
    displayCart();
}

// CHECKOUT BUTTON

function checkout() {
    const cart = getCart();

    if (cart.length === 0) {
        alert("Your shopping cart is empty!");
        return;
    }

    window.location.href = "checkout.html";
}

// CHECKOUT PAGE - DISPLAY ORDER TOTAL

document.addEventListener("DOMContentLoaded", function () {

    const checkoutTotal = document.getElementById("checkoutTotal");

    if (checkoutTotal) {
        const cart = getCart();

        const total = cart.reduce(function(sum, item) {
            return sum + (item.price * item.quantity);
        }, 0);

        checkoutTotal.textContent = total.toFixed(2);
    }

    // PLACE ORDER FORM

    const checkoutForm = document.getElementById("checkoutForm");

    if (checkoutForm) {
        checkoutForm.addEventListener("submit", function(event) {
            event.preventDefault();

            const cart = getCart();

            if (cart.length === 0) {
                alert("Your shopping cart is empty!");
                return;
            }

            const paymentMethod =
                document.querySelector('input[name="payment"]:checked');

            if (!paymentMethod) {
                alert("Please select a payment method.");
                return;
            }

            alert("Your order has been placed successfully!");

            // Clear cart after demo order
            saveCart([]);
            updateCartCount();

            window.l
// PRODUCT DETAILS - ADD TO CART

function addProductToCart() {
    const quantity = parseInt(
        document.getElementById("productQuantity").value
    );

    if (isNaN(quantity) || quantity < 1 || quantity > 10) {
        alert("Please enter a quantity between 1 and 10.");
        return;
    }

    for (let i = 0; i < quantity; i++) {
        addToCart("Panadol", 150);
    }

    alert(quantity + " Panadol item(s) added to cart!");
}

// PRESCRIPTION UPLOAD FORM VALIDATION

document.addEventListener("DOMContentLoaded", function () {

    const prescriptionForm =
        document.getElementById("prescriptionForm");

    if (prescriptionForm) {

        prescriptionForm.addEventListener("submit", function(event) {

            event.preventDefault();

            const name =
                document.getElementById("prescriptionName").value.trim();

            const email =
                document.getElementById("prescriptionEmail").value.trim();

            const fileInput =
                document.getElementById("prescriptionFile");

            const file = fileInput.files[0];

            const notes =
                document.getElementById("prescriptionNotes").value.trim();

            if (!name || !email || !file) {
                alert("Please complete all required fields.");
                return;
            }

            // Check file type
            const allowedTypes = [
                "image/jpeg",
                "image/png",
                "application/pdf"
            ];

            if (!allowedTypes.includes(file.type)) {
                alert("Please upload a JPG, PNG or PDF file.");
                return;
            }

            // Check file size (5 MB maximum)
            if (file.size > 5 * 1024 * 1024) {
                alert("File size must be less than 5 MB.");
                return;
            }

            alert(
                "Prescription form submitted successfully! " +
                "Our pharmacy team will review your submission."
            );

            prescriptionForm.reset();

        });

    }

});
ocation.href = "index.html";
        });
    }

});

// CONTACT US FORM VALIDATION

document.addEventListener("DOMContentLoaded", function () {

    const contactForm = document.getElementById("contactForm");

    if (contactForm) {

        contactForm.addEventListener("submit", function(event) {

            event.preventDefault();

            const name = document.getElementById("contactName").value.trim();
            const email = document.getElementById("contactEmail").value.trim();
            const subject = document.getElementById("contactSubject").value.trim();
            const message = document.getElementById("contactMessage").value.trim();

            if (!name || !email || !subject || !message) {
                alert("Please complete all fields.");
                return;
            }

            alert("Thank you, " + name + "! Your message has been submitted successfully.");

            contactForm.reset();

        });

    }

});

/* =================================
   MEDIQUICK LOGIN & REGISTER
================================= */

// Display Login Form
function showLogin() {

    document.getElementById("loginForm")
        .classList.remove("hidden");

    document.getElementById("registerForm")
        .classList.add("hidden");

    document.getElementById("formTitle").textContent =
        "Welcome Back!";

    document.getElementById("formDescription").textContent =
        "Login to your MediQuick account";

    document.getElementById("registerButton")
        .classList.remove("hidden");

    document.getElementById("loginButton")
        .classList.add("hidden");
}


// Display Register Form
function showRegister() {

    document.getElementById("registerForm")
        .classList.remove("hidden");

    document.getElementById("loginForm")
        .classList.add("hidden");

    document.getElementById("formTitle").textContent =
        "Create Account";

    document.getElementById("formDescription").textContent =
        "Register for your MediQuick account";

    document.getElementById("registerButton")
        .classList.add("hidden");

    document.getElementById("loginButton")
        .classList.remove("hidden");
}


// Login Form Validation
const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", function(event) {

        event.preventDefault();

        document.getElementById("loginMessage").textContent =
            "Login form validated. Backend authentication is not connected yet.";

    });

}


// Registration Form Validation
const registerForm = document.getElementById("registerForm");

if (registerForm) {

    registerForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const password =
            document.getElementById("registerPassword").value;

        const confirmPassword =
            document.getElementById("confirmPassword").value;

        if (password !== confirmPassword) {

            document.getElementById("registerMessage").textContent =
                "Passwords do not match!";

            return;
        }

        document.getElementById("registerMessage").textContent =
            "Registration form validated. Backend is not connected yet.";

    });

}


