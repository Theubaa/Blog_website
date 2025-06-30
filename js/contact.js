const contact = {
    // Google Apps Script Web App URL - Will be updated after deployment
    scriptURL: '', // Will be set after deploying the script
    
    // Form validation
    validateForm: (formData) => {
        if (!formData.name) return showPopup('Please enter your name', 'error');
        if (!formData.email) return showPopup('Please enter your email', 'error');
        if (!formData.subject) return showPopup('Please enter a subject', 'error');
        if (!formData.message) return showPopup('Please enter a message', 'error');
        return true;
    },

    handleSubmit: async (e) => {
        e.preventDefault();
        const form = e.target;
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.textContent;

        try {
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';

            const formData = new FormData(form);
            const formDataObj = Object.fromEntries(formData.entries());
            formDataObj.timestamp = new Date().toISOString();

            if (!contact.validateForm(formDataObj)) {
                submitBtn.disabled = false;
                submitBtn.textContent = originalBtnText;
                return;
            }

            await fetch(contact.scriptURL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formDataObj)
            });

            showPopup('Message sent successfully!', 'success');
            form.reset();
        } catch (err) {
            console.error('Submit error:', err);
            showPopup('Something went wrong. Try again later.', 'error');
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = originalBtnText;
        }
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', contact.handleSubmit);
    }
});
