/* General Reset */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

/* Theme Variables */
:root {
    --bg-color: #f9f9f9;
    --text-color: #333;
    --header-bg: #000000;
    --header-text: #b12252;
    --primary-color: #b12252;
    --secondary-color: #ff81ab;
    --button-hover-bg: #8d1942;
    --footer-bg: #b12252;
    --table-hover-bg: #ddd;
    --box-color: 0 0 10px rgba(0, 0, 0, 0.5);
}

/* Dark Theme Variables */
body.dark-theme {
    --bg-color: #121212;
    --text-color: #e0e0e0;
    --header-bg: #333333;
    --header-text: #ff81ab;
    --primary-color: #ff81ab;
    --secondary-color: #b12252;
    --button-hover-bg: #ff3366;
    --footer-bg: #222;
    --table-hover-bg: #555;
    --box-color: 0 0 10px rgba(255, 255, 255, 0.5);
}

/* Body and Main Layout */
body {
    font-family: 'Arial', sans-serif;
    background-color: var(--bg-color); /* Light gray background */
    color: var(--text-color);
}

/* Header with title and navigation */
#header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: var(--header-bg); /* Black background for header */
    color: var(--header-text);
    padding: 20px;
    position: sticky;
    top: 0;
    z-index: 1000;
}

#header h1 {
    font-size: 2rem;
    letter-spacing: 1px;
    margin: 0;
}

/* Style for the title link */
#title-link {
    text-decoration: none; /* Remove underline */
    color: var(--header-text); /* Match the text color of the header */
}

/* Ensure the link color remains the same even when visited */
#title-link:visited {
    color: var(--header-text); /* Match the text color */
}

/* Optional: Add hover effects */
#title-link:hover {
    text-decoration: underline; /* Optional underline on hover */
}

#navButtons {
    display: flex;
    gap: 15px;
    justify-content: flex-end; /* Aligns the buttons to the right */
    width: 800px;
}

#navButtons a { 
    color: white; 
    text-decoration: none; 
    font-size: 0.8rem; 
    font-weight: bold; 
    text-transform: uppercase; 
    padding: 10px; 
    border-radius: 5px; 
    transition: background-color 0.3s; 
} 
/* Hover effect */ 
#navButtons a:hover { 
    background-color: var(--primary-color); /* Pink Hover Color */ 
} 
/* Active nav button */ 
#navButtons a.active { 
    background-color: var(--primary-color); /* Keep the pink color for the active button */ }

/* Home Section */
#homeSection {
    padding: 50px 10px;
    background-color: var(--bg-color); /* Light background for home */
    text-align: center;
    background-size: cover;
    background-position: center;
    color: var(--text-color); /* Changed from white to black for text color */
    box-shadow: var(--box-color);
    margin-top: 50px;
    position: relative;
}

#homeSection h2 {
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 10px;
    color: var(--text-color); /* Ensure heading text is black */
}

#homeSection p {
    font-size: 1.2rem;
    margin-bottom: 30px;
    line-height: 1.5;
    color: var(--text-color); /* Ensure paragraph text is black */
}

/* Image Slider Styles */
.slider {
    position: relative;
    width: 400px;
    height: 400px;
    margin: 0 auto;
    overflow: hidden;
    border: 2px solid #ccc;
    border-radius: 10px;
}

.slider-track {
    display: flex;
    transition: transform 1s ease-in-out;
}

.slider img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

/* Animation for automatic sliding with 9 pictures */
@keyframes slide {
    0% {
        transform: translateX(0);
    }
    11.11% {
        transform: translateX(-100%);
    }
    22.22% {
        transform: translateX(-200%);
    }
    33.33% {
        transform: translateX(-300%);
    }
    44.44% {
        transform: translateX(-400%);
    }
    55.55% {
        transform: translateX(-500%);
    }
    66.66% {
        transform: translateX(-600%);
    }
    77.77% {
        transform: translateX(-700%);
    }
    88.88% {
        transform: translateX(-800%);
    }
    100% {
        transform: translateX(0);
    }
}

/* Apply the animation to the slider track */
.slider-track {
    animation: slide 27s infinite; /* 3 seconds per image, total 27 seconds */
}


/* Dashboard Section */
#dashboardSection {
    padding: 100px 20px;
    text-align: center;
    background-color: var(--bg-color);;
    box-shadow: var(--box-color);
    margin-top: 50px;
}

#dashboardSection h2 {
    font-size: 2rem;
    margin-bottom: 20px;
    color: var(--text-color); /* Black header text */
    font-weight: bold;
}

#dashboardSection ul {
    list-style: none;
    font-size: 1.2rem;
}

#dashboardSection li {
    margin: 20px 0;
}

.chart-canvas {
    width: 80% !important; /* Adjust as needed */
    height: 400px !important; /* Adjust as needed */
    max-width: 400px; /* Ensure charts don't exceed this width */
    margin: 0 auto; /* Center the charts */
}

/* Product List Section */
#productListSection {
    padding: 30px 20px; /* Increase padding at the top for more space */
    background-color: var(--bg-color);
    display: flex;
    flex-direction: column;
    align-items: center; /* Center content horizontally */
    margin-top: 50px;
    box-shadow: var(--box-color);
    position: relative;
}

/* Title */
#productListSection h2 {
    font-size: 2rem;
    margin-bottom: 20px;
    color: var(--primary-color); /* Pink color for heading */
    text-align: center;
}


/* Filters Section aligned to the upper-right corner */
#productListSection .filters {
    display: flex;
    gap: 0px; /* Space between each filter */
    position: absolute; /* Absolute positioning */
    top: 20px; /* Adjusted to align below the title */
    right: 20px; /* Distance from the right */
    align-items: center; /* Align items horizontally */
}

/* Input and Select Fields in Filters */
#productListSection input,
#productListSection select {
    padding: 7px;
    font-size: 1rem;
    border-radius: 10px;
    border: 4px solid #ddd;
    width: 300px; /* Set a fixed width for the filter fields */
    background-color: var(--bg-color); /* White background for input fields */
    color: var(--text-color);
}


/* Product Table Container */
#productListSection .table-container {
    display: flex;
    justify-content: center; /* Center the table horizontally */
    margin-top: 20px; /* Space between filters and the table */
    width: 100%; /* Ensure the container takes up the full width */
}

/* Product Table */
#productListSection table {
    width: 80%; /* Table takes 80% of the width */
    border-collapse: collapse;
    border-radius: 10px;
    overflow: hidden;
}

/* Table Headers and Cells */
table th,
table td {
    padding: 10px;
    text-align: center;
    border: 5px solid #ddd;
    font-size: 1rem;
    color: var(--text-color);
}

table th {
    background-color: var(--primary-color); /* Pink Table Header */
    color: white;
    text-transform: uppercase;
    font-weight: bold;
}

table td {
    background-color: var(--bg-color);
    transition: background-color 0.3s ease;
}

/* Hover effect for table rows */
table tr:hover td {
    background-color: var(--table-hover-bg);
}

/* Image Styling in Table */
table img {
    width: 100px;
    height: 100px;
    object-fit: cover;
    border-radius: 3px;
}

/* Product Actions Buttons */
button.edit-btn,
button.delete-btn {
    padding: 5px 15px;
    margin: 5px;
    border: none;
    background-color: var(--primary-color); /* Pink button */
    color: white;
    cursor: pointer;
    border-radius: 5px;
    font-weight: bold;
    transition: background-color 0.3s ease;
}

button.edit-btn:hover,
button.delete-btn:hover {
    background-color: #000000; /* Darker pink */
}

button.delete-btn {
    background-color: var(--secondary-color); /* Red color for delete button */
}

button.delete-btn:hover {
    background-color: #000000; /* Darker red */
}


/* Add Product Section */
#addProductSection {
    padding: 30px 20px;
    background-color: var(--bg-color);
    margin-top: 50px;
    box-shadow: var(--box-color);
}

#addProductSection h2 {
    font-size: 2rem;
    margin-bottom: 20px;
    color: var(--primary-color); /* Pink color for heading */
    text-align: center;
}

#add-product-form {
    display: flex;
    flex-direction: column;
    align-items: center;
}

#add-product-form input,
#add-product-form select {
    padding: 10px;
    margin: 10px 0;
    font-size: 1rem;
    width: 700px;  /* Increased width to make input bar wider */
    border-radius: 5px;
    border: 4px solid #ddd;
    background-color: var(--bg-color); /* White background for input fields */
    color: var(--text-color);
}

#add-product-form button {
    padding: 12px 20px;
    margin-top: 15px;
    background-color: var(--primary-color); /* Pink background for button */
    color: white;
    border: none;
    cursor: pointer;
    border-radius: 5px;
    font-weight: bold;
    width: 700px; /* Same width as the input fields */
}

#add-product-form button:hover {
    background-color: #000000; /* Darker pink on hover */
}

/* Footer */
footer {
    text-align: center;
    padding: 10px;
    background-color: var(--footer-bg); /* Pink footer */
    color: rgb(255, 255, 255);
    margin-top: 50px;
}

footer p {
    font-size: 1rem;
}

/* Login Page */
#login {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: var(--bg-color);/* White background for login */
}

.login-container {
    text-align: center; /* Center logo, title, and form */
}

.logo img {
    width: 150px; /* Adjust width to your preferred size */
    height: 150px; /* Ensure it's a square */
    border-radius: 50%; /* Makes the image circular */
    object-fit: cover; /* Ensures the image fits within the circle */
    margin-bottom: 10px;
    border: 3px solid var(--primary-color);/* Optional: Add a border to match the theme */
}

.header h1 {
    font-size: 1.5rem;
    color: var(--primary-color); /* Pink color */
    margin-bottom: 10px;
    text-align: center;
}

.login-form {
    background-color: var(--bg-color);
    padding: 40px;
    border-radius: 10px;
    box-shadow: var(--box-color);
    width: 300px;
    margin: 0 auto;
}

input[type="text"],
input[type="password"] {
    width: 100%;
    padding: 12px;
    margin: 10px 0;
    font-size: 1rem;
    border-radius: 5px;
    border: 1px solid #ddd;
}

button[type="submit"] {
    width: 100%;
    padding: 12px;
    background-color: var(--primary-color);/* Pink button */
    color: white;
    border: none;
    border-radius: 5px;
    font-weight: bold;
    cursor: pointer;
    margin-top: 10px;
}

button[type="submit"]:hover {
    background-color: #8d1942; /* Darker pink on hover */
}

/* Theme Toggle Button with Icon */
#themeToggle {
    background-color: var(--primary-color);
    color: white;
    padding: 10px;
    border: none;
    cursor: pointer;
    border-radius: 50%;
    margin-top: 1px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.2rem; /* Adjust the font size for the icon */
    transition: background-color 0.3s ease;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
}

#themeToggle:hover {
    background-color: #8d1942;
}

/* Dark Theme Icon Styles */
body.dark-theme #themeToggle::before {
    content: "\f186"; /* Unicode for Font Awesome moon icon */
    font-family: "Font Awesome 5 Free"; 
    font-weight: 900;
}

/* Light Theme Icon Styles */
#themeToggle::before {
    content: "\f185"; /* Unicode for Font Awesome sun icon */
    font-family: "Font Awesome 5 Free"; 
    font-weight: 900;
}
