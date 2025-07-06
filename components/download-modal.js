/**
 * RunLemonade Download Modal
 * Handles email signup and automatic extension download
 */

class DownloadModal {
    constructor(options = {}) {
        this.downloadUrl = options.downloadUrl || 'https://github.com/runlemonade/web-dev/releases/download/Public_Web_releaseV1.0.6/runlemonade-extension.zip';
        this.filename = options.filename || 'runlemonade-pro-v1.0.6.zip';
        this.modalId = options.modalId || 'downloadModal';
        
        this.init();
    }

    init() {
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Close modal when clicking outside
        document.addEventListener('click', (e) => {
            const modal = document.getElementById(this.modalId);
            if (e.target === modal) {
                this.close();
            }
        });

        // Close modal with Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.close();
            }
        });
    }

    open() {
        const modal = document.getElementById(this.modalId);
        if (!modal) {
            console.error('Download modal not found');
            return;
        }

        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
        
        // Setup form listener for email submission
        this.setupFormListener();
    }

    close() {
        const modal = document.getElementById(this.modalId);
        if (!modal) return;

        modal.classList.remove('show');
        document.body.style.overflow = 'auto';
        
        // Reset modal state after animation
        setTimeout(() => {
            const emailForm = document.getElementById('emailForm');
            const downloadSuccess = document.getElementById('downloadSuccess');
            
            if (emailForm) emailForm.style.display = 'block';
            if (downloadSuccess) downloadSuccess.classList.remove('show');
        }, 300);
    }

    setupFormListener() {
        console.log('Setting up form listener for download modal');
        
        // Wait for Ghost form to load and then monitor for submission
        const checkForForm = setInterval(() => {
            // Try to find any form inside the modal
            const modal = document.getElementById(this.modalId);
            const ghostForm = modal ? modal.querySelector('form') : null;
            if (ghostForm) {
                console.log('Ghost form found in download modal');
                clearInterval(checkForForm);
                
                // Monitor form submission
                ghostForm.addEventListener('submit', (e) => {
                    console.log('Form submitted in download modal');
                    setTimeout(() => {
                        this.handleFormSubmission();
                    }, 1000);
                });
                
                // Manual fallback: also trigger on subscribe button click
                const subscribeBtn = Array.from(ghostForm.querySelectorAll('button, input[type="submit"]')).find(btn => btn.textContent.trim().toLowerCase().includes('subscribe'));
                if (subscribeBtn) {
                    console.log('Subscribe button found in download modal');
                    subscribeBtn.addEventListener('click', (e) => {
                        console.log('Subscribe button clicked in download modal');
                        setTimeout(() => {
                            this.handleFormSubmission();
                        }, 1000);
                    });
                }
            }
        }, 100);

        // Fallback: Stop checking after 10 seconds
        setTimeout(() => {
            clearInterval(checkForForm);
            console.log('Form listener setup timeout reached');
        }, 10000);
    }

    handleFormSubmission() {
        console.log('Handling form submission in download modal');
        
        // Show success message
        const emailForm = document.getElementById('emailForm');
        const downloadSuccess = document.getElementById('downloadSuccess');
        const downloadButton = document.getElementById('downloadButton');
        
        console.log('Elements found:', { emailForm: !!emailForm, downloadSuccess: !!downloadSuccess, downloadButton: !!downloadButton });
        
        if (emailForm) emailForm.style.display = 'none';
        if (downloadSuccess) downloadSuccess.classList.add('show');
        
        // Show download button after a brief delay
        setTimeout(() => {
            if (downloadButton) {
                console.log('Showing download button');
                downloadButton.style.display = 'inline-block';
                downloadButton.addEventListener('click', () => {
                    console.log('Download button clicked');
                    this.downloadExtension();
                    // Close modal after download starts
                    setTimeout(() => {
                        this.close();
                    }, 2000);
                });
            } else {
                console.log('Download button not found');
            }
        }, 1500);
    }

    downloadExtension() {
        try {
            // Create temporary link and trigger download
            const link = document.createElement('a');
            link.href = this.downloadUrl;
            link.download = this.filename;
            link.style.display = 'none';
            
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            console.log('Download initiated:', this.filename);
        } catch (error) {
            console.error('Download failed:', error);
            
            // Fallback: Open download URL in new tab
            window.open(this.downloadUrl, '_blank');
        }
    }
}

// Global functions for backward compatibility
function openDownloadModal() {
    if (window.downloadModalInstance) {
        window.downloadModalInstance.open();
    } else {
        console.error('Download modal not initialized');
    }
}

function closeDownloadModal() {
    if (window.downloadModalInstance) {
        window.downloadModalInstance.close();
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the download modal
    window.downloadModalInstance = new DownloadModal({
        downloadUrl: 'https://github.com/runlemonade/web-dev/releases/download/Public_Web_releaseV1.0.6/runlemonade-extension.zip',
        filename: 'runlemonade-pro-v1.0.6.zip'
    });
});

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DownloadModal;
}


