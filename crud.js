const storageKey = "products";
let products = [];
let filteredProducts = [];

document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;
    const themeToggleBtn = document.getElementById('themeToggle');

    // Load saved theme from localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        body.classList.add(savedTheme);
    }

    // Toggle theme and icon
    themeToggleBtn.addEventListener('click', () => {
        body.classList.toggle('dark-theme');
        const currentTheme = body.classList.contains('dark-theme') ? 'dark-theme' : '';
        localStorage.setItem('theme', currentTheme);
    });
});


// Utility to save and retrieve products
function saveProducts() {
    localStorage.setItem(storageKey, JSON.stringify(products));
}

function fetchProducts() {
    products = JSON.parse(localStorage.getItem(storageKey)) || [];
    // Do not reset filteredProducts here
}

// Render functions
function renderDashboard() {
    // No need to call fetchProducts() here if already called during initialization
    const totalProducts = products.length;
    const lowStockCount = products.filter(product => product.stock <= 5).length;
    const categories = [...new Set(products.map(product => product.category))].length;

    document.getElementById("total-products").innerText = `Total Products: ${totalProducts}`;
    document.getElementById("low-stock").innerText = `Low Stock: ${lowStockCount}`;
    document.getElementById("categories").innerText = `Categories: ${categories}`;
}

function renderProductList() {
    const tableBody = document.getElementById("product-list-body");
    tableBody.innerHTML = "";

    filteredProducts.forEach((product, index) => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td><img src="${product.image}" alt="Product Image"></td>
            <td>${product.name}</td>
            <td>${product.category}</td>
            <td>${product.price.toFixed(2)}</td>
            <td>${product.stock}</td>
            <td>
                <button class="edit-btn" onclick="editProduct(${index})">Edit</button>
                <button class="delete-btn" onclick="deleteProduct(${index})">Delete</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}


// CRUD Operations
function addProduct(event) {
    event.preventDefault();
    // Fetch existing products first
    fetchProducts();
    // Then proceed to collect form data
    const name = document.getElementById("product-name").value.trim();
    const category = document.getElementById("product-category").value;
    const price = parseFloat(document.getElementById("product-price").value);
    const stock = parseInt(document.getElementById("product-stock").value);
    const imageFile = document.getElementById("product-image").files[0];
    let image;

    if (imageFile) {
        // Read the image file as a data URL
        const reader = new FileReader();
        reader.onload = function(e) {
            image = e.target.result;
            // Now that we have the image data, proceed to add the product
            addProductToList({ name, category, price, stock, image });
        };
        reader.readAsDataURL(imageFile);
    } else {
        image = "https://via.placeholder.com/50"; // Placeholder image
        addProductToList({ name, category, price, stock, image });
    }
}

function addProductToList(product) {
    if (product.name && product.category && !isNaN(product.price) && !isNaN(product.stock)) {
        products.push(product);
        saveProducts();
        fetchProducts(); // Fetch updated products
        alert("Product added successfully!");
        document.getElementById("add-product-form").reset();
    } else {
        alert("Please fill all fields correctly!");
    }
}


function editProduct(index) {
    const product = filteredProducts[index]; // Use filteredProducts here
    const actualIndex = products.findIndex(p => p.name === product.name && p.category === product.category);
    const newName = prompt("Enter new name:", product.name);
    const newCategory = prompt("Enter new category (baby, regular, giant):", product.category);
    const newPrice = parseFloat(prompt("Enter new price:", product.price));
    const newStock = parseInt(prompt("Enter new stock:", product.stock));

    if (newName && newCategory && !isNaN(newPrice) && !isNaN(newStock)) {
        products[actualIndex] = { ...product, name: newName, category: newCategory, price: newPrice, stock: newStock };
        saveProducts();
        fetchProducts(); // Update products array
        alert("Product updated successfully!");
        applyFilters(); // Re-apply filters to update the list
    } else {
        alert("Invalid input!");
    }
}

function deleteProduct(index) {
    const product = filteredProducts[index]; // Use filteredProducts here
    const actualIndex = products.findIndex(p => p.name === product.name && p.category === product.category);

    if (confirm("Are you sure you want to delete this product?")) {
        products.splice(actualIndex, 1);
        saveProducts();
        fetchProducts(); // Update products array
        alert("Product deleted successfully!");
        applyFilters(); // Re-apply filters to update the list
    }
}

// Filter and Search
function applyFilters() {
    const searchQuery = document.getElementById("search-bar").value.toLowerCase();
    const categoryFilter = document.getElementById("filter-category").value;
    const priceFilter = document.getElementById("filter-price").value;

    filteredProducts = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchQuery);
        const matchesCategory = categoryFilter === "all" || product.category === categoryFilter;
        return matchesSearch && matchesCategory;
    });

    if (priceFilter === "low-to-high") {
        filteredProducts.sort((a, b) => a.price - b.price);
    } else if (priceFilter === "high-to-low") {
        filteredProducts.sort((a, b) => b.price - a.price);
    }

    renderProductList();
}

// Attach event listeners
document.getElementById("add-product-form")?.addEventListener("submit", addProduct);
document.getElementById("search-bar")?.addEventListener("input", applyFilters);
document.getElementById("filter-category")?.addEventListener("change", applyFilters);
document.getElementById("filter-price")?.addEventListener("change", applyFilters);

// Initialize pages
if (document.getElementById("dashboardSection")) {
    fetchProducts();
    renderDashboard();
}
if (document.getElementById("productListSection")) {
    fetchProducts();
    applyFilters(); // Initialize filteredProducts and render the list
}

// JavaScript to handle active nav button
document.addEventListener('DOMContentLoaded', (event) => {
    const navButtons = document.querySelectorAll('#navButtons .nav-button');

    // Retrieve the active nav button from localStorage
    const activeNavId = localStorage.getItem('activeNavId');
    if (activeNavId) {
        const activeNav = document.getElementById(activeNavId);
        if (activeNav) {
            activeNav.classList.add('active');
        }
    }

    navButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove 'active' class from all buttons
            navButtons.forEach(btn => btn.classList.remove('active'));
            // Add 'active' class to the clicked button
            this.classList.add('active');

            // Store the active button's ID in localStorage
            localStorage.setItem('activeNavId', this.id);
        });
    });
});