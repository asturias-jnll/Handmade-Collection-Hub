const storageKey = "products";
let products = [];
let filteredProducts = [];

// Variables to track edit mode
let isEditMode = false;
let editProductIndex = null;

// DOM Elements
const modal = document.getElementById('product-modal');
const openAddModalBtn = document.getElementById('open-add-modal');
const productForm = document.getElementById('product-form');
const modalTitle = document.getElementById('modal-title');
const modalSubmitButton = document.getElementById('modal-submit-button');
const modalCancelButton = document.getElementById('modal-cancel-button');
const removeImageIcon = document.getElementById('remove-image-icon'); // New "X" icon over the image
const imagePreview = document.getElementById("image-preview");

// Filter Elements
const searchBar = document.getElementById("search-bar");
const filterCategory = document.getElementById("filter-category");
const filterPrice = document.getElementById("filter-price");

document.addEventListener('DOMContentLoaded', () => {
    // Handle login form submission
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            console.log(`Username: ${username}, Password: ${password}`);
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

        // Attach event listeners for filters
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
        imagePreview.style.display = "none";
        removeImageIcon.style.display = "none";
        modal.style.display = 'block';
    });

    // Cancel Button Handler
    modalCancelButton?.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Remove Image Icon Handler
    removeImageIcon?.addEventListener('click', () => {
        imagePreview.src = "#";
        imagePreview.style.display = "none";
        document.getElementById("modal-product-image").value = "";
        removeImageIcon.style.display = "none";
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

        // Validation Checks Before Processing
        if (!imageFile && !isEditMode) {
            alert("Please upload an image!");
            return;
        }

        if (price <= 0) {
            alert("Price must be greater than 0!");
            return;
        }

        if (stock <= 0) {
            alert("Stock must be greater than 0!");
            return;
        }

        if (imageFile) {
            let image;
            const reader = new FileReader();
            reader.onload = function(e) {
                image = e.target.result;
                processFormData({ name, category, price, stock, image });
            };
            reader.readAsDataURL(imageFile);
        } else {
            // Use existing image if editing and no new image is provided
            processFormData({ name, category, price, stock });
        }
    });

    // JavaScript to handle active nav button
    const navButtons = document.querySelectorAll('#navButtons .nav-button');
    const activeNavId = localStorage.getItem('activeNavId');
    if (activeNavId) {
        const activeNav = document.getElementById(activeNavId);
        if (activeNav) {
            activeNav.classList.add('active');
        }
    }

    navButtons.forEach(button => {
        button.addEventListener('click', function() {
            navButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            localStorage.setItem('activeNavId', this.id);
        });
    });

    // JavaScript to handle image preview
    document.getElementById("modal-product-image")?.addEventListener("change", function(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                if (imagePreview) {
                    imagePreview.src = e.target.result;
                    imagePreview.style.display = "block";
                    removeImageIcon.style.display = "block";
                }
            };
            reader.readAsDataURL(file);
        }
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
    const categoryCounts = {}; 
    products.forEach(product => { 
        categoryCounts[product.category] = (categoryCounts[product.category] || 0) + 1; 
    }); 
    const categoryLabels = Object.keys(categoryCounts); 
    const categoryData = Object.values(categoryCounts); 
    
    const productCategoryCtx = document.getElementById('productCategoryChart')?.getContext('2d'); 
    if (productCategoryCtx) {
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
}

// Process Form Data for Add or Edit
function processFormData(product) {
    if (product.name && product.category && !isNaN(product.price) && !isNaN(product.stock)) {
        if (isEditMode) {
            products[editProductIndex] = { ...products[editProductIndex], ...product };
            alert("Product updated successfully!");
        } else {
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
    const actualIndex = products.findIndex(p => 
        p.name === product.name && 
        p.category === product.category && 
        p.price === product.price && 
        p.stock === product.stock
    );
    editProductIndex = actualIndex; // Store the actual index in the products array

    modalTitle.innerText = 'Edit Product';
    modalSubmitButton.innerText = 'Update Product';

    document.getElementById("modal-product-name").value = product.name;
    document.getElementById("modal-product-category").value = product.category;
    document.getElementById("modal-product-price").value = product.price;
    document.getElementById("modal-product-stock").value = product.stock;

    if (product.image) {
        imagePreview.src = product.image;
        imagePreview.style.display = "block";
        removeImageIcon.style.display = "block";
    } else {
        imagePreview.style.display = "none";
        removeImageIcon.style.display = "none";
    }

    modal.style.display = 'block';
}

// Delete Product Function
function deleteProduct(index) {
    const product = filteredProducts[index];
    const actualIndex = products.findIndex(p => 
        p.name === product.name && 
        p.category === product.category && 
        p.price === product.price && 
        p.stock === product.stock
    );

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