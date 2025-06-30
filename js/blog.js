// Blog helper functions
const blog = {
    // Get all blogs from localStorage
    getAllBlogs: () => {
        return JSON.parse(localStorage.getItem('blogs') || '[]');
    },

    // Add new blog
    addBlog: (blogData) => {
        const blogs = blog.getAllBlogs();
        blogData.id = Date.now().toString();
        blogData.date = new Date().toISOString();
        blogs.push(blogData);
        localStorage.setItem('blogs', JSON.stringify(blogs));
        
        // Add animation to new blog card
        const blogCard = document.querySelector(`.blog-card[data-id="${blogData.id}"]`);
        if (blogCard) {
            blogCard.style.animation = 'fadeInUp 0.8s ease-out';
            blogCard.style.animationFillMode = 'forwards';
        }
        return blogData;
    },

    // Update blog
    updateBlog: (id, updates) => {
        const blogs = blog.getAllBlogs();
        const index = blogs.findIndex(b => b.id === id);
        if (index !== -1) {
            blogs[index] = { ...blogs[index], ...updates };
            localStorage.setItem('blogs', JSON.stringify(blogs));
            
            // Add update animation
            const blogCard = document.querySelector(`.blog-card[data-id="${id}"]`);
            if (blogCard) {
                blogCard.style.animation = 'pulse 0.5s ease-out';
                blogCard.style.animationFillMode = 'forwards';
            }
            return blogs[index];
        }
        return null;
    },

    // Delete blog
    deleteBlog: (id) => {
        const blogs = blog.getAllBlogs();
        const updatedBlogs = blogs.filter(b => b.id !== id);
        localStorage.setItem('blogs', JSON.stringify(updatedBlogs));
        
        // Add delete animation
        const blogCard = document.querySelector(`.blog-card[data-id="${id}"]`);
        if (blogCard) {
            blogCard.style.animation = 'fadeOut 0.5s ease-out';
            blogCard.style.animationFillMode = 'forwards';
            setTimeout(() => {
                blogCard.remove();
            }, 500);
        }
    },

    // Search blogs
    searchBlogs: (query) => {
        const blogs = blog.getAllBlogs();
        const filteredBlogs = blogs.filter(blog => 
            blog.title.toLowerCase().includes(query.toLowerCase()) ||
            blog.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
        );
        
        // Add search animation
        const blogGrid = document.getElementById('blog-grid');
        if (blogGrid) {
            blogGrid.style.opacity = '0.5';
            setTimeout(() => {
                blogGrid.style.opacity = '1';
            }, 200);
        }
        
        return filteredBlogs;
    },

    // Filter blogs by category
    filterByCategory: (category) => {
        const blogs = blog.getAllBlogs();
        const filteredBlogs = blogs.filter(blog => blog.category.toLowerCase() === category.toLowerCase());
        
        // Add filter animation
        const blogGrid = document.getElementById('blog-grid');
        if (blogGrid) {
            blogGrid.style.transform = 'scale(0.95)';
            setTimeout(() => {
                blogGrid.style.transform = 'scale(1)';
            }, 200);
        }
        
        return filteredBlogs;
    },

    // Create blog card HTML
    createBlogCard: (blog) => {
        return `
            <div class="blog-card" data-id="${blog.id}">
                <img src="${blog.thumbnail || 'https://via.placeholder.com/800x400'}" alt="${blog.title}">
                <div class="blog-card-content">
                    <h3>${blog.title}</h3>
                    <p>${blog.excerpt || blog.content.substring(0, 150)}...</p>
                    <div class="blog-meta">
                        <span>${new Date(blog.date).toLocaleDateString()}</span>
                        <span>${blog.tags.join(', ')}</span>
                    </div>
                    <div class="blog-actions">
                        <a href="post.html?id=${blog.id}" class="read-more">Read More</a>
                        ${auth.isLoggedIn() && auth.getCurrentUser().id === blog.authorId ? `
                            <button class="edit-btn" onclick="editBlog('${blog.id}')">Edit</button>
                            <button class="delete-btn" onclick="deleteBlog('${blog.id}')">Delete</button>
                        ` : ''}
                    </div>
                </div>
            </div>
        `;
    },

    // Initialize blog grid
    initializeBlogGrid: () => {
        const blogGrid = document.getElementById('blog-grid');
        const blogs = blog.getAllBlogs();
        
        if (blogGrid) {
            blogGrid.innerHTML = blogs.map(blog.createBlogCard).join('');
            
            // Add staggered animation to blog cards
            const cards = blogGrid.querySelectorAll('.blog-card');
            cards.forEach((card, index) => {
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, index * 100);
            });
        }
    }
};

// Search functionality
document.getElementById('search-input')?.addEventListener('input', (e) => {
    const query = e.target.value;
    const filteredBlogs = blog.searchBlogs(query);
    const blogGrid = document.getElementById('blog-grid');
    
    if (blogGrid) {
        blogGrid.innerHTML = filteredBlogs.map(blog.createBlogCard).join('');
        
        // Add search results animation
        const cards = blogGrid.querySelectorAll('.blog-card');
        cards.forEach((card, index) => {
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }
});

// Category filtering
document.querySelectorAll('.category-card').forEach(card => {
    card.addEventListener('click', (e) => {
        const category = e.currentTarget.dataset.category;
        const filteredBlogs = blog.filterByCategory(category);
        const blogGrid = document.getElementById('blog-grid');
        
        if (blogGrid) {
            blogGrid.innerHTML = filteredBlogs.map(blog.createBlogCard).join('');
            
            // Add filter results animation
            const cards = blogGrid.querySelectorAll('.blog-card');
            cards.forEach((card, index) => {
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, index * 100);
            });
        }
    });
});

// Initialize blog grid when page loads
document.addEventListener('DOMContentLoaded', () => {
    blog.initializeBlogGrid();
});
