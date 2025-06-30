// Blog post display functionality
const post = {
    // Get blog post by ID
    getBlogById: (id) => {
        const blogs = blog.getAllBlogs();
        return blogs.find(b => b.id === id);
    },

    // Create blog post HTML
    createPostHTML: (blog) => {
        return `
            <article class="blog-post">
                <header class="post-header">
                    <h1>${blog.title}</h1>
                    <div class="post-meta">
                        <span>By ${blog.authorName}</span>
                        <span>${new Date(blog.date).toLocaleDateString()}</span>
                        <span>${blog.tags.join(', ')}</span>
                    </div>
                </header>

                <div class="post-main">
                    <img src="${blog.thumbnail || 'https://via.placeholder.com/800x400'}" alt="${blog.title}" class="post-thumbnail">
                    
                    <div class="post-content">
                        ${blog.content}
                    </div>
                </div>

                <footer class="post-footer">
                    <div class="post-actions">
                        <button class="like-btn" onclick="toggleLike('${blog.id}')">
                            <span class="like-count">${blog.likes || 0}</span>
                            <span class="like-text">Like</span>
                        </button>
                        
                        <div class="share-buttons">
                            <button onclick="shareOnTwitter('${blog.title}', '${window.location.href}')">Twitter</button>
                            <button onclick="shareOnLinkedIn('${blog.title}', '${window.location.href}')">LinkedIn</button>
                        </div>
                    </div>
                </footer>
            </article>
        `;
    },

    // Initialize post page
    initialize: () => {
        const urlParams = new URLSearchParams(window.location.search);
        const postId = urlParams.get('id');
        
        if (!postId) {
            location.href = '404.html';
            return;
        }

        const blog = post.getBlogById(postId);
        if (!blog) {
            location.href = '404.html';
            return;
        }

        const postContent = document.getElementById('post-content');
        postContent.innerHTML = post.createPostHTML(blog);

        // Initialize Prism.js for code highlighting
        Prism.highlightAll();
    },

    // Toggle like functionality
    toggleLike: (postId) => {
        const blogs = blog.getAllBlogs();
        const blogIndex = blogs.findIndex(b => b.id === postId);
        if (blogIndex === -1) return;

        const blog = blogs[blogIndex];
        const user = auth.getCurrentUser();
        
        if (!user.likes) user.likes = [];
        
        if (user.likes.includes(postId)) {
            user.likes = user.likes.filter(id => id !== postId);
            blog.likes = (blog.likes || 0) - 1;
        } else {
            user.likes.push(postId);
            blog.likes = (blog.likes || 0) + 1;
        }

        localStorage.setItem('user', JSON.stringify(user));
        blog.updateBlog(postId, { likes: blog.likes });
        
        // Update UI
        const likeBtn = document.querySelector(`.like-btn[onclick*="'${postId}'"]`);
        if (likeBtn) {
            likeBtn.querySelector('.like-count').textContent = blog.likes;
        }
    },

    // Social sharing functions
    shareOnTwitter: (title, url) => {
        const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;
        window.open(tweetUrl, '_blank');
    },

    shareOnLinkedIn: (title, url) => {
        const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
        window.open(linkedinUrl, '_blank');
    }
};

// Initialize post page when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    post.initialize();
});
