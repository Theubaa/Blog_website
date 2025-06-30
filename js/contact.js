// Contact form handling
const contact = {
    // Google Apps Script Web App URL - Replace with your published web app URL
    scriptURL: 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec',
    
    // Form validation
    validateForm: (formData) => {
        if (!formData.name) {
            alert('Please enter your name');
            return false;
        }
        if (!formData.email) {
            alert('Please enter your email');
            return false;
        }
        if (!formData.subject) {
            alert('Please enter a subject');
            return false;
        }
        if (!formData.message) {
            alert('Please enter a message');
            return false;
        }
        return true;
    },

    // Handle form submission
    handleSubmit: async (e) => {
        e.preventDefault();
        
        const form = e.target;
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.textContent;
        
        try {
            // Disable submit button and show loading state
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';
            
            const formData = new FormData(form);
            const formDataObj = Object.fromEntries(formData.entries());
            
            // Add timestamp
            formDataObj.timestamp = new Date().toISOString();
            
            if (!contact.validateForm(formDataObj)) {
                return;
            }
            
            // Send data to Google Sheets
            const response = await fetch(contact.scriptURL, {
                method: 'POST',
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formDataObj)
            });
            
            // Show success message
            alert('Thank you for your message! We will get back to you soon.');
            form.reset();
            
        } catch (error) {
            console.error('Error!', error.message);
            alert('There was an error sending your message. Please try again later.');
        } finally {
            // Re-enable submit button
            submitBtn.disabled = false;
            submitBtn.textContent = originalBtnText;
        }
    }
};

// Initialize form submission
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => contact.handleSubmit(e));
    }
});
