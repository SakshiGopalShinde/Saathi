// resources.js - Tab Switching and Horizontal Slider Logic

document.addEventListener('DOMContentLoaded', () => {
    // 1. Tab Switching Logic
    const tabs = document.querySelectorAll('.tab-button');
    const contents = document.querySelectorAll('.step-content'); // Use step-content class for tab content

    function switchTab(targetId) {
        tabs.forEach(tab => {
            const isTarget = tab.id === `tab-${targetId}`;
            tab.classList.toggle('active', isTarget);
            tab.setAttribute('aria-selected', isTarget);
        });

        contents.forEach(content => {
            const isTarget = content.id === targetId;
            content.hidden = !isTarget;
            content.classList.toggle('active', isTarget);
            content.setAttribute('aria-hidden', !isTarget);
        });
    }

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetId = tab.getAttribute('aria-controls');
            switchTab(targetId);
        });
    });

    // 2. Meditation Player Logic (Simulation)
    const toggleButton = document.getElementById('meditation-toggle');
    const toggleIcon = document.getElementById('meditation-icon');
    const playerStatus = document.getElementById('player-status');
    const waveAnimation = document.querySelector('.wave-animation');
    let isPlaying = false;
    let barElements = [];

    // Dynamically create the wave bars
    for (let i = 0; i < 25; i++) {
        const bar = document.createElement('div');
        bar.className = 'wave-animation-bar';
        bar.style.animationDelay = `${i * 0.05}s`;
        bar.style.height = `${Math.floor(Math.random() * 80) + 20}%`;
        waveAnimation.appendChild(bar);
        barElements.push(bar);
    }
    waveAnimation.style.display = 'none';

    toggleButton.addEventListener('click', () => {
        isPlaying = !isPlaying;

        if (isPlaying) {
            toggleIcon.textContent = 'pause';
            playerStatus.textContent = 'Session in progress... (4:32 remaining)';
            waveAnimation.style.display = 'flex';
            barElements.forEach(bar => bar.style.animationPlayState = 'running');
            toggleButton.style.backgroundColor = 'var(--color-success)';
        } else {
            toggleIcon.textContent = 'play_arrow';
            playerStatus.textContent = 'Paused';
            barElements.forEach(bar => bar.style.animationPlayState = 'paused');
            toggleButton.style.backgroundColor = 'var(--color-accent-primary)';
            // Keep wave visible but paused for a more dynamic look
        }
    });

    // 3. Horizontal E-Book Slider (Unique 3D Look)
    const slider = document.getElementById('book-slider');
    const prevButton = document.getElementById('slider-prev');
    const nextButton = document.getElementById('slider-next');

    const bookData = [
        { title: "Student Anxiety", subtitle: "Conquer Exam Stress", imgText: "Stress" },
        { title: "The Deep Focus", subtitle: "Mindfulness for Study", imgText: "Focus" },
        { title: "Emotional Resilience", subtitle: "Building Mental Strength", imgText: "Resilience" },
        { title: "Sleep Smarter", subtitle: "Restorative Sleep Habits", imgText: "Sleep" },
        { title: "Digital Wellness", subtitle: "A Balanced Life", imgText: "Digital" },
        { title: "Mind over Mood", subtitle: "Cognitive Techniques", imgText: "CBT" }
    ];

    bookData.forEach((data, index) => {
        const card = document.createElement('div');
        card.className = 'book-card';
        card.setAttribute('data-index', index);
        card.innerHTML = `
            <img src="https://via.placeholder.com/280x180/110D2C/8C8CFF?text=${data.imgText}" alt="${data.title} cover">
            <h4 style="color: var(--color-accent-primary);">${data.title}</h4>
            <p>${data.subtitle}</p>
        `;
        slider.appendChild(card);
    });

    // Slider navigation function
    const scrollAmount = 300; // Pixels to scroll

    nextButton.addEventListener('click', () => {
        slider.scrollLeft += scrollAmount;
    });

    prevButton.addEventListener('click', () => {
        slider.scrollLeft -= scrollAmount;
    });
});