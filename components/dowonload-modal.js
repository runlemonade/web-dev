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
        // Wait for Ghost form to load and then monitor for submission
        const checkForForm = setInterval(() => {
            const ghostForm = document.querySelector('.gh-portal-form form');
            if (ghostForm) {
                clearInterval(checkForForm);
                
                // Monitor form submission
                ghostForm.addEventListener('submit', (e) => {
                    // Wait a moment for the form to process
                    setTimeout(() => {
                        this.handleFormSubmission();
                    }, 1000);
                });
            }
        }, 100);

        // Fallback: Stop checking after 10 seconds
        setTimeout(() => {
            clearInterval(checkForForm);
        }, 10000);
    }

    handleFormSubmission() {
        // Show success message
        const emailForm = document.getElementById('emailForm');
        const downloadSuccess = document.getElementById('downloadSuccess');
        
        if (emailForm) emailForm.style.display = 'none';
        if (downloadSuccess) downloadSuccess.classList.add('show');
        
        // Start download after a brief delay
        setTimeout(() => {
            this.downloadExtension();
            // Close modal after download starts
            setTimeout(() => {
                this.close();
            }, 2000);
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