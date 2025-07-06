// Component utilities for RunLemonade website

// Function to include HTML components
function includeHTML(elementId, componentPath) {
    fetch(componentPath)
        .then(response => response.text())
        .then(data => {
            document.getElementById(elementId).innerHTML = data;
        })
        .catch(error => {
            console.error('Error loading component:', error);
        });
}

// Function to handle navigation highlighting
function highlightCurrentPage() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPath || 
            (currentPath.includes('extension') && link.getAttribute('href').includes('extension'))) {
            link.classList.add('active');
        }
    });
}

// Function to handle mobile menu toggle
function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('mobile-active');
}

// Initialize common functionality
document.addEventListener('DOMContentLoaded', function() {
    highlightCurrentPage();
    
    // Add mobile menu button if needed
    const nav = document.querySelector('.nav');
    if (nav && !document.querySelector('.mobile-menu-btn')) {
        const mobileBtn = document.createElement('button');
        mobileBtn.className = 'mobile-menu-btn';
        mobileBtn.innerHTML = '☰';
        mobileBtn.onclick = toggleMobileMenu;
        nav.appendChild(mobileBtn);
    }
});

// Utility function to update CSS variables dynamically
function updateTheme(theme) {
    const root = document.documentElement;
    if (theme === 'dark') {
        root.style.setProperty('--background-light', '#1a1a1a');
        root.style.setProperty('--background-white', '#2d2d2d');
        root.style.setProperty('--text-primary', '#ffffff');
        root.style.setProperty('--text-secondary', '#cccccc');
        root.style.setProperty('--text-muted', '#999999');
    } else {
        root.style.setProperty('--background-light', '#f2f2f7');
        root.style.setProperty('--background-white', '#ffffff');
        root.style.setProperty('--text-primary', '#1a1a1a');
        root.style.setProperty('--text-secondary', '#4a5568');
        root.style.setProperty('--text-muted', '#8e8e93');
    }
} 