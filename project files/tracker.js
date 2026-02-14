// tracker.js - Habit Tracker with Progress Ring and LocalStorage

document.addEventListener('DOMContentLoaded', () => {
    const habitGrid = document.getElementById('habit-grid');
    const summaryDisplay = document.getElementById('tracker-summary');
    const progressBar = document.getElementById('progress-bar');
    const progressPercent = document.getElementById('progress-percent');
    
    const HABITS = [
        { id: 'h1', title: 'Meditate', target: '10 Minutes', icon: 'self_improvement' },
        { id: 'h2', title: 'Deep Work', target: '60 Minutes', icon: 'laptop_chromebook' },
        { id: 'h3', title: 'Hydrate', target: '8 Glasses', icon: 'local_drink' },
        { id: 'h4', title: 'Journaling', target: 'Daily Entry', icon: 'edit_note' },
        { id: 'h5', title: 'Movement', target: '30 Minutes', icon: 'fitness_center' },
    ];
    
    const RADIUS = 70;
    const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
    progressBar.style.strokeDasharray = `${CIRCUMFERENCE} ${CIRCUMFERENCE}`;

    let completedHabits = getCompletedHabits();

    function getCompletedHabits() {
        const stored = localStorage.getItem('saathiHabits');
        if (stored) {
            const data = JSON.parse(stored);
            const today = new Date().toDateString();
            if (data.date === today) {
                return data.habits;
            }
        }
        return [];
    }

    function saveCompletedHabits(habits) {
        const data = {
            date: new Date().toDateString(),
            habits: habits
        };
        localStorage.setItem('saathiHabits', JSON.stringify(data));
    }

    function updateProgressRing(percent) {
        const offset = CIRCUMFERENCE - (percent / 100) * CIRCUMFERENCE;
        progressBar.style.strokeDashoffset = offset;
        progressPercent.textContent = `${Math.floor(percent)}%`;
    }

    function renderHabits() {
        habitGrid.innerHTML = '';
        const totalHabits = HABITS.length;
        let completedCount = 0;

        HABITS.forEach(habit => {
            const isCompleted = completedHabits.includes(habit.id);
            if (isCompleted) completedCount++;

            const card = document.createElement('div');
            card.className = `habit-card ${isCompleted ? 'completed' : ''}`;
            card.setAttribute('data-id', habit.id);
            card.innerHTML = `
                <span class="material-icons" style="font-size: 2.5rem; color: ${isCompleted ? 'var(--color-success)' : 'var(--color-accent-primary)'};">${habit.icon}</span>
                <h4 style="margin-top: 0.8rem; font-size: 1.3rem;">${habit.title}</h4>
                <p style="color: var(--color-text-secondary);">${habit.target}</p>
            `;
            
            habitGrid.appendChild(card);
            card.addEventListener('click', toggleHabit);
        });

        const progressPercentValue = (completedCount / totalHabits) * 100;
        summaryDisplay.textContent = `${completedCount}/${totalHabits} Habits Tracked`;
        updateProgressRing(progressPercentValue);
    }

    function toggleHabit(e) {
        const card = e.currentTarget;
        const id = card.getAttribute('data-id');

        if (card.classList.contains('completed')) {
            // Unmark habit
            completedHabits = completedHabits.filter(hid => hid !== id);
        } else {
            // Mark habit
            completedHabits.push(id);
            
            // Temporary Checkmark Animation
            const overlay = document.createElement('div');
            overlay.className = 'checkmark-overlay checkmark-pulse';
            overlay.innerHTML = '<span class="material-icons">check_circle</span>';
            card.appendChild(overlay);

            setTimeout(() => {
                overlay.remove();
            }, 600);
        }

        saveCompletedHabits(completedHabits);
        renderHabits(); // Re-render to update the state and progress
    }

    // Initial render
    renderHabits();
});