// Registration form handling
const register = {
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
        if (!formData.password) {
            alert('Please enter a password');
            return false;
        }
        if (formData.password !== formData.confirmPassword) {
            alert('Passwords do not match');
            return false;
        }
        return true;
    },

    // Handle registration form submission
    handleSubmit: (e) => {
        e.preventDefault();
        
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            password: document.getElementById('password').value,
            confirmPassword: document.getElementById('confirm-password').value,
            id: Date.now().toString()
        };

        if (!register.validateForm(formData)) {
            return;
        }

        // Register user
        if (auth.register(formData)) {
            alert('Registration successful! Please login.');
            location.href = 'login.html';
        } else {
            alert('Email already registered. Please login or use a different email.');
        }
    }
};

// Initialize registration form
document.addEventListener('DOMContentLoaded', () => {
    // Add form submission handler
    document.getElementById('register-form').addEventListener('submit', register.handleSubmit);

    // If user is already logged in, redirect to home
    if (auth.isLoggedIn()) {
        location.href = 'index.html';
    }
});
