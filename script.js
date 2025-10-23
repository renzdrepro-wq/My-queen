document.addEventListener('DOMContentLoaded', function() {
    initializePage();
    createHearts();
    createStars();
    startCounter();
});

function initializePage() {
    const currentDate = new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    document.getElementById('currentDate').textContent = currentDate;
    setupEventListeners();
}

function setupEventListeners() {
    const memoryCards = document.querySelectorAll('.memory-card');
    memoryCards.forEach(card => {
        card.addEventListener('click', function() {
            const memoryId = this.getAttribute('data-memory');
            showMemoryMessage(memoryId);
        });
    });

    const messageButtons = document.querySelectorAll('.message-btn');
    messageButtons.forEach(button => {
        button.addEventListener('click', function() {
            const message = this.getAttribute('data-message');
            displayMessage(message);
        });
    });

    document.getElementById('affirmationBtn').addEventListener('click', showAffirmation);
    document.getElementById('secretTrigger').addEventListener('click', showSecretMessage);
    document.getElementById('closeSecret').addEventListener('click', hideSecretMessage);
    document.getElementById('floatingHeart').addEventListener('click', createHeartExplosion);
}

function createHearts() {
    const heartsContainer = document.getElementById('heartsContainer');
    const heartCount = 20;

    for (let i = 0; i < heartCount; i++) {
        setTimeout(() => {
            createHeart(heartsContainer);
        }, i * 300);
    }
}

function createHeart(container) {
    const heart = document.createElement('div');
    heart.className = 'heart';
    heart.innerHTML = '💖';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDelay = Math.random() * 2 + 's';
    heart.style.fontSize = (Math.random() * 20 + 15) + 'px';
    
    container.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 6000);
}

function createStars() {
    const starsContainer = document.getElementById('stars');
    const starCount = 100;

    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = Math.random() * 100 + 'vw';
        star.style.top = Math.random() * 100 + 'vh';
        star.style.width = (Math.random() * 3 + 1) + 'px';
        star.style.height = star.style.width;
        star.style.animationDelay = Math.random() * 4 + 's';
        
        starsContainer.appendChild(star);
    }
}

function showMemoryMessage(memoryId) {
    const messages = {
        '1': "I'll never forget our first conversation. From that moment, I knew you were someone special. 💕",
        '2': "Your smile is the most beautiful thing I've ever seen. It can light up the darkest days. ✨",
        '3': "Our late night talks are my favorite moments. I feel closest to you when the world is asleep. 🌙",
        '4': "You will always be my queen. No distance can change how deeply I love you. 👑"
    };

    displayMessage(messages[memoryId]);
}

function displayMessage(message) {
    const messageDisplay = document.getElementById('messageDisplay');
    messageDisplay.textContent = message;
    messageDisplay.style.animation = 'fadeInUp 0.5s ease-out';
    
    setTimeout(() => {
        messageDisplay.style.animation = '';
    }, 500);
}

function showAffirmation() {
    const affirmations = [
        "You are worthy of all the love and happiness in the world. 🌍",
        "Your strength amazes me every single day. 💪",
        "You are beautiful inside and out, never doubt that. 🌸",
        "This difficult time is just a chapter, not your whole story. 📖",
        "You have the power to overcome anything life throws at you. ⚡",
        "Your heart is your greatest strength, never stop loving. ❤️",
        "You are enough, just as you are in this moment. 🌟",
        "Every day you're getting stronger and more resilient. 💫",
        "Your journey is unique and beautiful, embrace it. 🦋",
        "You are surrounded by love, even when you can't see it. ✨"
    ];

    const randomAffirmation = affirmations[Math.floor(Math.random() * affirmations.length)];
    const affirmationDisplay = document.getElementById('affirmationDisplay');
    
    affirmationDisplay.innerHTML = `"${randomAffirmation}"`;
    affirmationDisplay.style.animation = 'fadeInUp 0.5s ease-out';
    
    setTimeout(() => {
        affirmationDisplay.style.animation = '';
    }, 500);
}

function startCounter() {
    const counter = document.getElementById('counter');
    const startTime = new Date();
    
    setInterval(() => {
        const now = new Date();
        const diff = now - startTime;
        
        const seconds = Math.floor(diff / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
        
        const displaySeconds = seconds % 60;
        const displayMinutes = minutes % 60;
        const displayHours = hours % 24;
        
        counter.innerHTML = `
            <div style="font-size: 0.8em; margin-bottom: 5px; color: #666;">Thinking of you for:</div>
            <div style="font-size: 1.2em;">
                ${days}d ${displayHours}h ${displayMinutes}m ${displaySeconds}s
            </div>
            <div style="font-size: 0.7em; margin-top: 5px; color: #888;">
                Every second brings us closer together 💕
            </div>
        `;
    }, 1000);
}

function showSecretMessage() {
    document.getElementById('secretMessage').classList.add('active');
}

function hideSecretMessage() {
    document.getElementById('secretMessage').classList.remove('active');
}

function createHeartExplosion() {
    const floatingHeart = document.getElementById('floatingHeart');
    const rect = floatingHeart.getBoundingClientRect();
    
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            createExplodingHeart(rect.left + 25, rect.top + 25);
        }, i * 100);
    }
}

function createExplodingHeart(x, y) {
    const heart = document.createElement('div');
    heart.className = 'heart';
    heart.innerHTML = '💖';
    heart.style.position = 'fixed';
    heart.style.left = x + 'px';
    heart.style.top = y + 'px';
    heart.style.fontSize = '25px';
    heart.style.zIndex = '1000';
    heart.style.animation = 'explode 1s ease-out forwards';
    
    document.body.appendChild(heart);
    
    setTimeout(() => {
        heart.remove();
    }, 1000);
}

const style = document.createElement('style');
style.textContent = `
    @keyframes explode {
        0% {
            transform: translate(0, 0) scale(1);
            opacity: 1;
        }
        100% {
            transform: translate(${Math.random() * 200 - 100}px, ${Math.random() * 200 - 100}px) scale(0);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

setInterval(() => {
    createHeart(document.getElementById('heartsContainer'));
}, 2000);