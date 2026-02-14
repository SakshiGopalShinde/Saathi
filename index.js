// index.js (Cleaned for non-multilingual support)

document.addEventListener('DOMContentLoaded', () => {
    
    // --- AI Chat Mockup Logic ---
    const chatMessages = document.getElementById('chat-messages');
    
    // Initial dummy messages for the mockup
    const initialMessages = [
        { sender: 'ai', text: "Hello! I'm here to listen, without judgment. What’s been on your mind today?" },
        { sender: 'user', text: "I feel really stressed about my upcoming exams and assignments." },
        { sender: 'ai', text: "That sounds like a heavy burden. It’s completely normal to feel that way. Can you tell me one specific thing that is causing the most stress right now?" }
    ];

    const addMessage = (sender, text) => {
        const bubble = document.createElement('div');
        bubble.className = `message-bubble ${sender}-message`;
        bubble.textContent = text;
        chatMessages.appendChild(bubble);
        chatMessages.scrollTop = chatMessages.scrollHeight; // Scroll to bottom
    };

    // Populate initial messages on load
    if (chatMessages) {
        // Clear any existing messages before adding the simulation
        chatMessages.innerHTML = ''; 
        initialMessages.forEach(msg => addMessage(msg.sender, msg.text));
        chatMessages.scrollTop = chatMessages.scrollHeight; // Ensure scroll on load
    }
});