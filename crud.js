const storageKey = "products";
let products = [];
let filteredProducts = [];

// Variables to track edit mode
let isEditMode = false;
let editProductIndex = null;

// DOM Elements
const modal = document.getElementById('product-modal');
const openAddModalBtn = document.getElementById('open-add-modal');
const closeModalBtn = document.getElementById('close-modal');
const productForm = document.getElementById('product-form');
const modalTitle = document.getElementById('modal-title');
const modalSubmitButton = document.getElementById('modal-submit-button');

// Filter Elements
const searchBar = document.getElementById("search-bar");
const filterCategory = document.getElementById("filter-category");
const filterPrice = document.getElementById("filter-price");

document.addEventListener('DOMContentLoaded', () => {
    // Handle login form submission
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', (event) => {
            event.preventDefault(); // Prevent the default form submission

            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            // Perform validation or authentication here (if any)
            // For now, we'll just log the credentials and redirect
            console.log(`Username: ${username}, Password: ${password}`);

            // Redirect to home.html
            window.location.href = 'home.html';
        });
    }

    const body = document.body;
    const themeToggleBtn = document.getElementById('themeToggle');

    // Load saved theme from localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        body.classList.add(savedTheme);
    }

    // Toggle theme and icon
    themeToggleBtn?.addEventListener('click', () => {
        body.classList.toggle('dark-theme');
        const currentTheme = body.classList.contains('dark-theme') ? 'dark-theme' : '';
        localStorage.setItem('theme', currentTheme);
    });

    // Initialize the dashboard 
    if (document.getElementById("dashboardSection")) { 
        fetchProducts(); 
        renderDashboard(); 
        renderCharts(); 
    } 

    if (document.getElementById("productListSection")) { 
        fetchProducts(); 
        applyFilters(); // Initialize filteredProducts and render the list 

        // **Attach event listeners for filters**
        searchBar?.addEventListener("input", applyFilters);
        filterCategory?.addEventListener("change", applyFilters);
        filterPrice?.addEventListener("change", applyFilters);
    }

    // Open Add Product Modal
    openAddModalBtn?.addEventListener('click', () => {
        isEditMode = false;
        modalTitle.innerText = 'Add New Product';
        modalSubmitButton.innerText = 'Add Product';
        productForm.reset();
        modal.style.display = 'block';
    });

    // Close Modal
    closeModalBtn?.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Close modal when clicking outside the content
    window.addEventListener('click', (event) => {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    });

    // Handle Form Submission (Add or Edit)
    productForm?.addEventListener('submit', (event) => {
        event.preventDefault();

        const name = document.getElementById("modal-product-name").value.trim();
        const category = document.getElementById("modal-product-category").value;
        const price = parseFloat(document.getElementById("modal-product-price").value);
        const stock = parseInt(document.getElementById("modal-product-stock").value);
        const imageFile = document.getElementById("modal-product-image").files[0];
        let image;

        if (imageFile) {
            const reader = new FileReader();
            reader.onload = function(e) {
                image = e.target.result;
                processFormData({ name, category, price, stock, image });
            };
            reader.readAsDataURL(imageFile);
        } else {
            image = "https://via.placeholder.com/100"; // Placeholder image
            processFormData({ name, category, price, stock, image });
        }
    });

    // JavaScript to handle active nav button
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

// Utility to save and retrieve products
function saveProducts() {
    localStorage.setItem(storageKey, JSON.stringify(products));
}

function fetchProducts() {
    products = JSON.parse(localStorage.getItem(storageKey)) || [];
}

// Render functions
function renderDashboard() {
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

function renderCharts() { 
    // Product Category Distribution Chart 
    const categoryCounts = {}; 
    products.forEach(product => { 
        categoryCounts[product.category] = (categoryCounts[product.category] || 0) + 1; 
    }); 
    const categoryLabels = Object.keys(categoryCounts); 
    const categoryData = Object.values(categoryCounts); 
    
    const productCategoryCtx = document.getElementById('productCategoryChart').getContext('2d'); 
    new Chart(productCategoryCtx, { 
        type: 'pie', 
        data: { 
            labels: categoryLabels, 
            datasets: [{ 
                data: categoryData, 
                backgroundColor: ['#ff6384', '#36a2eb', '#cc65fe', '#ffce56', '#4bc0c0'], 
                hoverOffset: 4 
            }] 
        } 
    });  
}

// Process Form Data for Add or Edit
function processFormData(product) {
    if (product.name && product.category && !isNaN(product.price) && !isNaN(product.stock)) {
        if (isEditMode) {
            // Update existing product
            products[editProductIndex] = { ...products[editProductIndex], ...product };
            alert("Product updated successfully!");
        } else {
            // Add new product
            products.push(product);
            alert("Product added successfully!");
        }
        saveProducts();
        fetchProducts();
        applyFilters();
        modal.style.display = 'none';
    } else {
        alert("Please fill all fields correctly!");
    }
}

// Edit Product Function
function editProduct(index) {
    isEditMode = true;
    const product = filteredProducts[index];
    const actualIndex = products.findIndex(p => p.name === product.name && p.category === product.category && p.price === product.price && p.stock === product.stock);
    editProductIndex = actualIndex; // Store the actual index in the products array

    modalTitle.innerText = 'Edit Product';
    modalSubmitButton.innerText = 'Update Product';

    // Pre-fill the form with existing product data
    document.getElementById("modal-product-name").value = product.name;
    document.getElementById("modal-product-category").value = product.category;
    document.getElementById("modal-product-price").value = product.price;
    document.getElementById("modal-product-stock").value = product.stock;
    // Note: For security reasons, file inputs cannot be pre-filled

    modal.style.display = 'block';
}

// Delete Product Function
function deleteProduct(index) {
    const product = filteredProducts[index];
    const actualIndex = products.findIndex(p => p.name === product.name && p.category === product.category && p.price === product.price && p.stock === product.stock);

    if (confirm("Are you sure you want to delete this product?")) {
        products.splice(actualIndex, 1);
        saveProducts();
        fetchProducts();
        alert("Product deleted successfully!");
        applyFilters();
    }
}

// Filter and Search
function applyFilters() {
    const searchQuery = searchBar?.value.toLowerCase() || "";
    const categoryFilterValue = filterCategory?.value || "all";
    const priceFilterValue = filterPrice?.value || "none";

    filteredProducts = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchQuery);
        const matchesCategory = categoryFilterValue === "all" || product.category === categoryFilterValue;
        return matchesSearch && matchesCategory;
    });

    if (priceFilterValue === "low-to-high") {
        filteredProducts.sort((a, b) => a.price - b.price);
    } else if (priceFilterValue === "high-to-low") {
        filteredProducts.sort((a, b) => b.price - a.price);
    }

    renderProductList();
}
