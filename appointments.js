// appointments.js - Multi-Step Booking Logic

document.addEventListener('DOMContentLoaded', () => {
    const steps = document.querySelectorAll('.step');
    const stepContents = document.querySelectorAll('.step-content');
    const counselorCards = document.querySelectorAll('.counselor-card');
    const timeSlots = document.querySelectorAll('.time-slot');
    const dateInput = document.getElementById('date-input');
    const prevButton = document.getElementById('prev-step');
    const nextButton = document.getElementById('next-step');

    let currentStep = 1;
    let bookingData = {
        counsellor: null,
        specialty: null,
        date: null,
        time: null,
    };

    function updateUI() {
        // Update Step Indicators
        steps.forEach(step => {
            const stepNum = parseInt(step.getAttribute('data-step'));
            step.classList.remove('active', 'completed');
            if (stepNum < currentStep) {
                step.classList.add('completed');
            } else if (stepNum === currentStep) {
                step.classList.add('active');
            }
        });

        // Update Step Content
        stepContents.forEach(content => {
            content.classList.remove('active');
        });
        document.getElementById(`step-${currentStep}`).classList.add('active');

        // Update Buttons
        prevButton.disabled = currentStep === 1;
        
        if (currentStep === 1) {
            nextButton.textContent = 'Next';
            nextButton.disabled = bookingData.counsellor === null;
        } else if (currentStep === 2) {
            document.getElementById('counsellor-details').textContent = `Counsellor: ${bookingData.counsellor} (${bookingData.specialty})`;
            nextButton.textContent = 'Next';
            nextButton.disabled = bookingData.date === null || bookingData.time === null;
        } else if (currentStep === 3) {
            document.getElementById('confirm-counsellor').textContent = bookingData.counsellor;
            document.getElementById('confirm-specialty').textContent = bookingData.specialty;
            document.getElementById('confirm-date').textContent = bookingData.date;
            document.getElementById('confirm-time').textContent = bookingData.time;
            nextButton.textContent = 'Confirm Booking';
        }
    }

    // Handlers for Step 1: Counselor Selection
    counselorCards.forEach(card => {
        card.addEventListener('click', () => {
            counselorCards.forEach(c => c.classList.remove('selected'));
            card.classList.add('selected');
            
            bookingData.counsellor = card.getAttribute('data-counselor-name');
            bookingData.specialty = card.getAttribute('data-specialty');
            nextButton.disabled = false;
        });
    });

    // Handlers for Step 2: Date & Time Selection
    dateInput.addEventListener('change', (e) => {
        bookingData.date = e.target.value;
        updateUI();
    });

    timeSlots.forEach(slot => {
        slot.addEventListener('click', (e) => {
            timeSlots.forEach(s => s.classList.remove('selected'));
            e.target.classList.add('selected');
            bookingData.time = e.target.getAttribute('data-time');
            updateUI();
        });
    });

    // Navigation Logic
    prevButton.addEventListener('click', () => {
        if (currentStep > 1) {
            currentStep--;
            updateUI();
        }
    });

    nextButton.addEventListener('click', () => {
        if (currentStep < 3) {
            currentStep++;
            updateUI();
        } else if (currentStep === 3) {
            // Final Confirmation/Submission
            alert(`Booking confirmed! You booked ${bookingData.counsellor} on ${bookingData.date} at ${bookingData.time}. A link will be emailed.`);
            
            // Reset for a fresh booking experience
            currentStep = 1;
            bookingData = { counsellor: null, specialty: null, date: null, time: null };
            counselorCards.forEach(c => c.classList.remove('selected'));
            timeSlots.forEach(s => s.classList.remove('selected'));
            dateInput.value = '';
            
            updateUI();
        }
    });

    // Initial setup
    updateUI();
});