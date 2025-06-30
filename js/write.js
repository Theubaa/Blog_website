// Blog submission form handling
const write = {
    // Form validation
    validateForm: (formData) => {
        if (!formData.title) {
            alert('Please enter a title');
            return false;
        }
        if (!formData.category) {
            alert('Please select a category');
            return false;
        }
        if (!formData.tags) {
            alert('Please enter tags');
            return false;
        }
        if (!formData.content) {
            alert('Please enter content');
            return false;
        }
        return true;
    },

    // Format tags
    formatTags: (tagsString) => {
        return tagsString.split(',').map(tag => tag.trim());
    },

    // Handle form submission
    handleSubmit: (e) => {
        e.preventDefault();
        
        const formData = {
            title: document.getElementById('title').value,
            category: document.getElementById('category').value,
            tags: write.formatTags(document.getElementById('tags').value),
            thumbnail: document.getElementById('thumbnail').value,
            content: document.getElementById('content').value,
            excerpt: document.getElementById('excerpt').value,
            authorId: auth.getCurrentUser().id,
            authorName: auth.getCurrentUser().name
        };

        if (!write.validateForm(formData)) {
            return;
        }

        // Add blog to storage
        const blogData = blog.addBlog(formData);
        
        // Redirect to blog post
        location.href = `post.html?id=${blogData.id}`;
    }
};

// Initialize form
document.addEventListener('DOMContentLoaded', () => {
    // Check if user is logged in
    if (!auth.isLoggedIn()) {
        location.href = 'login.html';
    }

    // Add form submission handler
    document.getElementById('blog-form').addEventListener('submit', write.handleSubmit);

    // Add code block support
    const contentTextarea = document.getElementById('content');
    contentTextarea.addEventListener('input', (e) => {
        // Add code block support (basic implementation)
        const content = e.target.value;
        const hasCodeBlock = /```[\s\S]*```/.test(content);
        if (hasCodeBlock) {
            // In a real implementation, you would add proper code block UI
            // This is just a placeholder
            e.target.classList.add('has-code-block');
        } else {
            e.target.classList.remove('has-code-block');
        }
    });
});
