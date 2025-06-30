// Login form handling
const login = {
    // Handle login form submission
    handleSubmit: (e) => {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        
        if (!email || !password) {
            alert('Please fill in all fields');
            return;
        }

        // Attempt login
        if (auth.login(email, password)) {
            // Login successful
            alert('Login successful!');
            location.href = 'index.html';
        } else {
            // Login failed
            alert('Invalid email or password');
        }
    }
};

// Initialize login form
document.addEventListener('DOMContentLoaded', () => {
    // Add form submission handler
    document.getElementById('login-form').addEventListener('submit', login.handleSubmit);

    // If user is already logged in, redirect to home
    if (auth.isLoggedIn()) {
        location.href = 'index.html';
    }
});
