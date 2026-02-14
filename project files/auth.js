// auth.js - 3D Form Flip Logic

document.addEventListener('DOMContentLoaded', () => {
    const authContainer = document.getElementById('auth-container');
    const switchToRegisterButton = document.getElementById('switch-to-register');
    const switchToLoginButton = document.getElementById('switch-to-login');
    
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');

    function updateContainerHeight(isRegister) {
        // Wait for CSS transition to settle before adjusting height
        setTimeout(() => {
            const height = isRegister ? registerForm.offsetHeight : loginForm.offsetHeight;
            authContainer.style.height = height + 'px';
        }, 500); 
    }

    switchToRegisterButton.addEventListener('click', () => {
        authContainer.classList.add('flip-active');
        updateContainerHeight(true);
    });

    switchToLoginButton.addEventListener('click', () => {
        authContainer.classList.remove('flip-active');
        updateContainerHeight(false);
    });

    // Initial height setting
    window.addEventListener('load', () => {
        authContainer.style.height = loginForm.offsetHeight + 'px';
    });
});