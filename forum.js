// forum.js - Forum Submission and Animation

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('new-post-form');
    const forumFeed = document.getElementById('forum-feed');

    form.addEventListener('submit', addNewPost);

    function addNewPost(e) {
        e.preventDefault();

        const title = document.getElementById('post-title').value;
        const content = document.getElementById('post-content').value;

        if (!title || !content) return;

        // 1. Create the new post element
        const newPost = document.createElement('div');
        newPost.className = 'forum-post new-post-animated'; // Apply animation class
        newPost.innerHTML = `
            <div class="post-header">
                <div class="anonymous-icon"><span class="material-icons">person</span></div>
                <div class="post-meta">
                    <h3 class="post-title">${title}</h3>
                    <p>Posted by Anonymous Student • Just now</p>
                </div>
            </div>
            <p class="post-snippet">${content.substring(0, 100)}...</p>
        `;

        // 2. Insert the new post at the top of the feed (prepend)
        forumFeed.prepend(newPost);

        // 3. Clean up the form and animation class
        form.reset();
        
        // Remove animation class after it completes to allow future animations
        setTimeout(() => {
            newPost.classList.remove('new-post-animated');
        }, 600); 
    }
});