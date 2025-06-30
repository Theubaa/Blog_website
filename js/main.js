// Mobile Menu Toggle
const menuToggle = document.getElementById('menu-toggle');
const mobileMenu = document.querySelector('.mobile-menu');

if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        menuToggle.classList.toggle('active');
        
        // Add animation class
        mobileMenu.classList.add('slide-in');
        setTimeout(() => {
            mobileMenu.classList.remove('slide-in');
        }, 300);
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!menuToggle.contains(e.target) && !mobileMenu.contains(e.target)) {
            mobileMenu.classList.remove('active');
            menuToggle.classList.remove('active');
            
            // Add animation class
            mobileMenu.classList.add('slide-out');
            setTimeout(() => {
                mobileMenu.classList.remove('slide-out');
            }, 300);
        }
    });
}

// Theme toggle functionality
document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const isDarkMode = localStorage.getItem('theme') === 'dark';
    
    // Set initial theme
    if (isDarkMode) {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeToggle.querySelector('.moon').style.display = 'none';
    } else {
        themeToggle.querySelector('.sun').style.display = 'none';
    }

    // Toggle theme
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Toggle sun/moon icons
        themeToggle.querySelector('.sun').style.display = newTheme === 'dark' ? 'none' : 'flex';
        themeToggle.querySelector('.moon').style.display = newTheme === 'dark' ? 'flex' : 'none';
        
        // Add theme transition animation
        document.body.classList.add('theme-transition');
        setTimeout(() => {
            document.body.classList.remove('theme-transition');
        }, 500);
    });

    // Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        // Add scroll animation
        target.style.animation = 'fadeInUp 0.8s ease-out';
        target.style.animationFillMode = 'forwards';
        
        window.scrollTo({
            top: target.offsetTop - 80,
            behavior: 'smooth'
        });
    });
});

    // Initialize Prism.js for code highlighting
    if (typeof Prism !== 'undefined') {
        Prism.highlightAll();
    }

    // Add hover effects to interactive elements
    document.querySelectorAll('button, a').forEach(element => {
        element.addEventListener('mouseenter', () => {
            element.style.transform = 'scale(1.02)';
            element.style.transition = 'transform 0.2s ease-out';
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.transform = 'scale(1)';
        });
    });

    // Add scroll reveal animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, {
        threshold: 0.1
    });

    // Observe elements that should animate on scroll
    document.querySelectorAll('.blog-card, .category-card').forEach(element => {
        element.classList.add('scroll-reveal');
        observer.observe(element);
    });
});
