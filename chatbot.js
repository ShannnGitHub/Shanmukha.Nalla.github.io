// Chatbot configuration
const chatbotConfig = {
    botName: "ShanBot",
    botAvatar: "🤖",
    userAvatar: "👤",
    initialGreeting: "Hi! I'm ShanBot, your friendly guide to Shanmukha's portfolio. How can I help you today?",
    responses: {
        greeting: ["Hello! 👋", "Hi there! 😊", "Hey! How can I help? 🤗"],
        about: ["Shanmukha is a Salesforce Marketing Cloud Developer with 4+ years of experience.", 
                "He specializes in email marketing and automation.", 
                "He's currently pursuing his Master's in Computer Science at Marist College."],
        skills: ["Shanmukha's key skills include Salesforce Marketing Cloud, Email Development, and Marketing Automation.",
                "He's proficient in HTML, CSS, JavaScript, Python, and SQL.",
                "He has expertise in data analytics and cloud integration."],
        projects: ["He's worked on projects like Bus Transportation System, Age Sign Detection, and Dynamic Email Development.",
                  "His projects showcase his skills in Python, Machine Learning, and Email Marketing."],
        contact: ["You can reach Shanmukha at nshanmukha.c@gmail.com",
                 "Connect with him on LinkedIn: https://www.linkedin.com/in/shanmukha-nalla/",
                 "Check out his GitHub: https://github.com/ShannnGitHub",
                 ],
        default: ["I'm not sure I understand. Could you rephrase that?",
                 "I'm still learning! Try asking about Shanmukha's skills, projects, or experience.",
                 "Let me help you better. You can ask about skills, projects, or how to contact Shanmukha."]
    }
};

// Chatbot UI elements
const chatContainer = document.createElement('div');
chatContainer.className = 'chatbot-container';
chatContainer.innerHTML = `
    <div class="chatbot-header">
        <div class="chatbot-title">
            <span class="chatbot-avatar">${chatbotConfig.botAvatar}</span>
            <span>${chatbotConfig.botName}</span>
        </div>
        <button class="chatbot-close">×</button>
    </div>
    <div class="chatbot-messages"></div>
    <div class="chatbot-input-container">
        <input type="text" class="chatbot-input" placeholder="Type your message...">
        <button class="chatbot-send">Send</button>
    </div>
`;

// Add chatbot to the page
document.body.appendChild(chatContainer);
chatContainer.style.display = 'none'; // Ensure hidden on load

// Chatbot toggle button
const chatbotToggle = document.createElement('button');
chatbotToggle.className = 'chatbot-toggle';
chatbotToggle.innerHTML = `${chatbotConfig.botAvatar} Chat`;
document.body.appendChild(chatbotToggle);

// Chatbot state
let isChatbotOpen = false;
let isTyping = false;
let hasGreeted = false; // Track if greeting has been shown

// Toggle chatbot visibility
function toggleChatbot() {
    isChatbotOpen = !isChatbotOpen;
    chatContainer.style.display = isChatbotOpen ? 'block' : 'none';
    chatbotToggle.style.display = isChatbotOpen ? 'none' : 'block';
    
    if (isChatbotOpen) {
        // Show greeting only the first time
        if (!hasGreeted) {
            setTimeout(() => {
                addMessage(chatbotConfig.initialGreeting, 'bot');
            }, 400);
            hasGreeted = true;
        }
        // Focus input when opening
        setTimeout(() => {
            document.querySelector('.chatbot-input').focus();
        }, 300);
    }
}

// Add event listeners
chatbotToggle.addEventListener('click', toggleChatbot);
document.querySelector('.chatbot-close').addEventListener('click', toggleChatbot);

// Show typing indicator
function showTypingIndicator() {
    if (isTyping) return;
    isTyping = true;
    
    const messagesContainer = document.querySelector('.chatbot-messages');
    const typingElement = document.createElement('div');
    typingElement.className = 'typing-indicator';
    typingElement.innerHTML = `
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
    `;
    messagesContainer.appendChild(typingElement);
    scrollToBottom();
}

// Remove typing indicator
function removeTypingIndicator() {
    isTyping = false;
    const typingElement = document.querySelector('.typing-indicator');
    if (typingElement) {
        typingElement.remove();
    }
}

// Scroll to bottom of messages
function scrollToBottom() {
    const messagesContainer = document.querySelector('.chatbot-messages');
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Handle user input
function handleUserInput() {
    const input = document.querySelector('.chatbot-input');
    const message = input.value.trim();
    
    if (message) {
        addMessage(message, 'user');
        input.value = '';
        
        // Show typing indicator
        showTypingIndicator();
        
        // Simulate typing delay
        setTimeout(() => {
            removeTypingIndicator();
            const response = getBotResponse(message);
            addMessage(response, 'bot');
        }, 1000 + Math.random() * 1000); // Random delay between 1-2 seconds
    }
}

// Add message to chat
function addMessage(text, sender) {
    const messagesContainer = document.querySelector('.chatbot-messages');
    const messageElement = document.createElement('div');
    messageElement.className = `chatbot-message ${sender}-message`;
    
    const avatar = sender === 'user' ? chatbotConfig.userAvatar : chatbotConfig.botAvatar;
    messageElement.innerHTML = `
        <span class="message-avatar">${avatar}</span>
        <span class="message-text">${text}</span>
    `;
    
    messagesContainer.appendChild(messageElement);
    scrollToBottom();
}

// Update getBotResponse to match more keywords and synonyms
function getBotResponse(message) {
    const lowerMessage = message.toLowerCase();
    if (/(hello|hi|hey|greetings|yo|sup|good morning|good evening)/.test(lowerMessage)) {
        return getRandomResponse(chatbotConfig.responses.greeting);
    } else if (/(about|who|yourself|background|bio|introduction)/.test(lowerMessage)) {
        return getRandomResponse(chatbotConfig.responses.about);
    } else if (/(skill|expert|proficient|tools|technologies|languages|strength)/.test(lowerMessage)) {
        return getRandomResponse(chatbotConfig.responses.skills);
    } else if (/(project|work|portfolio|built|created|developed|showcase)/.test(lowerMessage)) {
        return getRandomResponse(chatbotConfig.responses.projects);
    } else if (/(contact|reach|email|connect|linkedin|github|social)/.test(lowerMessage)) {
        return getRandomResponse(chatbotConfig.responses.contact);
    } else if (/(experience|job|career|work history|employment)/.test(lowerMessage)) {
        return "Shanmukha has 4+ years of experience in software development and 3+ years in Salesforce Marketing Cloud.";
    } else if (/(education|study|college|university|degree|school)/.test(lowerMessage)) {
        return "He holds a Bachelor's from IIITDM Jabalpur and is pursuing a Master's at Marist College.";
    } else {
        return getRandomResponse(chatbotConfig.responses.default);
    }
}

// Get random response from array
function getRandomResponse(responses) {
    return responses[Math.floor(Math.random() * responses.length)];
}

// Event listeners for input
document.querySelector('.chatbot-send').addEventListener('click', handleUserInput);
document.querySelector('.chatbot-input').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        handleUserInput();
    }
});

// Add smooth scroll behavior
document.querySelector('.chatbot-messages').style.scrollBehavior = 'smooth';

// Add hover effects to messages
document.addEventListener('mouseover', (e) => {
    if (e.target.classList.contains('message-text')) {
        e.target.style.transform = 'scale(1.02)';
    }
});

document.addEventListener('mouseout', (e) => {
    if (e.target.classList.contains('message-text')) {
        e.target.style.transform = 'scale(1)';
    }
}); 