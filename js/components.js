// Component Loader for runLemonade Website
// Handles loading shared header and footer components

class ComponentLoader {
    constructor() {
        this.headerPlaceholder = document.getElementById('header-placeholder');
        this.footerPlaceholder = document.getElementById('footer-placeholder');
        this.init();
    }

    init() {
        if (this.headerPlaceholder) {
            this.loadHeader();
        }
        if (this.footerPlaceholder) {
            this.loadFooter();
        }
    }

    async loadHeader() {
        try {
            console.log('Loading header component...');
            // Try multiple possible paths
            const paths = [
                'components/header.html',
                '/components/header.html',
                './components/header.html',
                '../components/header.html'
            ];
            
            let headerHtml = null;
            for (const path of paths) {
                try {
                    console.log('Trying path:', path);
                    const response = await fetch(path);
                    if (response.ok) {
                        headerHtml = await response.text();
                        console.log('Header loaded from:', path);
                        break;
                    }
                } catch (e) {
                    console.log('Failed to load from:', path, e);
                }
            }
            
            if (headerHtml) {
                this.headerPlaceholder.innerHTML = headerHtml;
                console.log('Header component loaded successfully');
                this.initializeHeader();
            } else {
                throw new Error('Could not load header from any path');
            }
        } catch (error) {
            console.warn('Could not load header component:', error);
            this.createDefaultHeader();
        }
    }

    async loadFooter() {
        try {
            console.log('Loading footer component...');
            // Try multiple possible paths
            const paths = [
                'components/footer.html',
                '/components/footer.html',
                './components/footer.html',
                '../components/footer.html'
            ];
            
            let footerHtml = null;
            for (const path of paths) {
                try {
                    console.log('Trying path:', path);
                    const response = await fetch(path);
                    if (response.ok) {
                        footerHtml = await response.text();
                        console.log('Footer loaded from:', path);
                        break;
                    }
                } catch (e) {
                    console.log('Failed to load from:', path, e);
                }
            }
            
            if (footerHtml) {
                this.footerPlaceholder.innerHTML = footerHtml;
                console.log('Footer component loaded successfully');
            } else {
                throw new Error('Could not load footer from any path');
            }
        } catch (error) {
            console.warn('Could not load footer component:', error);
            this.createDefaultFooter();
        }
    }

    createDefaultHeader() {
        const headerHtml = `
            <header class="header">
                <nav class="nav">
                    <a href="/" class="logo">runLemonade</a>
                    <ul class="nav-links">
                        <li><a href="/" class="nav-link">Home</a></li>
                        <li><a href="/extensions.html" class="nav-link">Extensions</a></li>
                        <li><a href="/resources.html" class="nav-link">Resources</a></li>
                    </ul>
                    <a href="#download" class="cta-button">Download FORM</a>
                </nav>
            </header>
        `;
        this.headerPlaceholder.innerHTML = headerHtml;
        this.initializeHeader();
    }

    createDefaultFooter() {
        const footerHtml = `
            <footer class="footer">
                <div class="container">
                    <div class="footer-content">
                        <div class="footer-section">
                            <h4>Product</h4>
                            <a href="/extensions.html">FORM Extension</a>
                            <a href="/extensions.html">All Extensions</a>
                            <a href="/resources.html">Documentation</a>
                        </div>
                        <div class="footer-section">
                            <h4>Resources</h4>
                            <a href="/resources.html">Tutorials</a>
                            <a href="/resources.html">Support</a>
                            <a href="https://www.youtube.com/@runlemonade">YouTube</a>
                        </div>
                        <div class="footer-section">
                            <h4>Company</h4>
                            <a href="#developer">About</a>
                            <a href="mailto:support@runlemonade.com">Contact</a>
                        </div>
                    </div>
                    <div class="footer-bottom">
                        <p>&copy; 2025 runLemonade. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        `;
        this.footerPlaceholder.innerHTML = footerHtml;
    }

    initializeHeader() {
        // Header scroll effect
        const header = document.querySelector('.header');
        if (header) {
            window.addEventListener('scroll', () => {
                if (window.scrollY > 100) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }
            });
        }

        // Set active navigation link
        this.setActiveNavLink();
        
        // Initialize Buy Licence button
        this.initializeBuyLicenceButton();
        
        // Initialize Download button
        this.initializeDownloadButton();
    }

    initializeBuyLicenceButton() {
        const buyLicenceBtn = document.getElementById('buyLicenceBtn');
        console.log('Looking for buyLicenceBtn:', buyLicenceBtn);
        if (buyLicenceBtn) {
            console.log('Buy Licence button found, adding event listener');
            buyLicenceBtn.addEventListener('click', () => {
                console.log('Buy Licence button clicked');
                // Check if we're on the extensions page
                if (window.location.pathname.includes('extensions.html')) {
                    console.log('On extensions page, opening FORM modal');
                    // If on extensions page, open FORM modal with subscriptions
                    if (typeof openModal === 'function' && typeof extensionData !== 'undefined') {
                        const formExtension = extensionData.form;
                        if (formExtension) {
                            openModal(formExtension, 'subscriptions');
                        } else {
                            console.warn('FORM extension data not found');
                        }
                    } else {
                        console.warn('openModal function or extensionData not available');
                    }
                } else {
                    console.log('Not on extensions page, navigating to extensions page');
                    // If not on extensions page, navigate to extensions page with modal parameter
                    window.location.href = '/extensions.html?openModal=form&scrollTo=subscriptions';
                }
            });
        } else {
            console.warn('Buy Licence button not found');
        }
    }

    initializeDownloadButton() {
        const downloadFormBtn = document.getElementById('headerDownloadBtn');
        console.log('Looking for headerDownloadBtn:', downloadFormBtn);
        if (downloadFormBtn && !downloadFormBtn.hasAttribute('data-listener-added')) {
            console.log('Download button found, adding event listener');
            downloadFormBtn.addEventListener('click', (e) => {
                console.log('Download button clicked');
                e.preventDefault();
                // Check if we're on the extensions page
                if (window.location.pathname.includes('extensions.html')) {
                    console.log('On extensions page, opening download modal');
                    // If on extensions page, open download modal
                    const downloadModal = document.getElementById('downloadModal');
                    if (downloadModal) {
                        downloadModal.style.display = 'block';
                    } else {
                        console.warn('Download modal not found');
                    }
                } else {
                    console.log('Not on extensions page, navigating to extensions page');
                    // If not on extensions page, navigate to extensions page with download modal parameter
                    window.location.href = '/extensions.html?openDownloadModal=true';
                }
            });
            downloadFormBtn.setAttribute('data-listener-added', 'true');
        } else {
            console.warn('Download button not found or already has listener');
        }
    }

    setActiveNavLink() {
        const currentPath = window.location.pathname;
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href === currentPath || 
                (currentPath === '/' && href === '/') ||
                (currentPath.includes('extensions') && href.includes('extensions')) ||
                (currentPath.includes('resources') && href.includes('resources'))) {
                link.classList.add('active');
            }
        });
    }
}

// Initialize component loader when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing component loader...');
    const loader = new ComponentLoader();
    
    // Fallback: If header still not loaded after 3 seconds, create default
    setTimeout(() => {
        const headerPlaceholder = document.getElementById('header-placeholder');
        if (headerPlaceholder && !headerPlaceholder.innerHTML.trim()) {
            console.log('Header still empty after 3 seconds, creating default header');
            loader.createDefaultHeader();
        }
    }, 3000);
}); 