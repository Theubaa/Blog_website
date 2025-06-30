// Authentication helper functions
const auth = {
    // Check if user is logged in
    isLoggedIn: () => {
        return localStorage.getItem('user') !== null;
    },

    // Get current user
    getCurrentUser: () => {
        return JSON.parse(localStorage.getItem('user') || '{}');
    },

    // Login user
    login: (email, password) => {
        // In a real app, this would make an API call
        // For demo, we'll use localStorage
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const user = users.find(u => u.email === email && u.password === password);
        
        if (user) {
            localStorage.setItem('user', JSON.stringify(user));
            return true;
        }
        return false;
    },

    // Register user
    register: (userData) => {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const existingUser = users.find(u => u.email === userData.email);
        
        if (existingUser) {
            return false;
        }
        
        users.push(userData);
        localStorage.setItem('users', JSON.stringify(users));
        localStorage.setItem('user', JSON.stringify(userData));
        return true;
    },

    // Logout user
    logout: () => {
        localStorage.removeItem('user');
    },

    // Update UI based on login status
    updateAuthUI: () => {
        const writeBtn = document.getElementById('write-blog-btn');
        const loginBtn = document.getElementById('login-btn');
        const user = auth.getCurrentUser();

        if (auth.isLoggedIn()) {
            writeBtn.style.display = 'block';
            loginBtn.textContent = 'Logout';
            loginBtn.onclick = () => {
                auth.logout();
                location.reload();
            };
        } else {
            writeBtn.style.display = 'none';
            loginBtn.textContent = 'Login';
            loginBtn.onclick = () => {
                location.href = 'login.html';
            };
        }
    }
};

// Initialize auth when page loads
document.addEventListener('DOMContentLoaded', () => {
    auth.updateAuthUI();
});
