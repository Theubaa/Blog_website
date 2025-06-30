// Contact form handling
const contact = {
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
    handleSubmit: (e) => {
        e.preventDefault();
        
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value
        };

        if (!contact.validateForm(formData)) {
            return;
        }

        // In a real application, this would make an API call
        // For now, we'll just show a success message
        alert('Thank you for your message! We will get back to you soon.');
        
        // Clear the form
        e.target.reset();
    }
};

// Initialize contact form
document.addEventListener('DOMContentLoaded', () => {
    // Add form submission handler
    document.getElementById('contact-form').addEventListener('submit', contact.handleSubmit);
});
