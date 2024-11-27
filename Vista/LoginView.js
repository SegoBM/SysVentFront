export class AuthView {
    constructor() {
        this.loginForm = document.getElementById('loginForm');
        this.registerForm = document.getElementById('registerForm');
        this.loginUsername = document.getElementById('loginUsername');
        this.loginPassword = document.getElementById('loginPassword');
        this.username = document.getElementById('username');
        this.password = document.getElementById('password');
        this.userType = document.getElementById('userType');
    }

    toggleForms() {
        const loginForm = document.getElementById('login-form');
        const registerForm = document.getElementById('register-form');
        if (loginForm.style.display === 'none') {
            loginForm.style.display = 'block';
            registerForm.style.display = 'none';
        } else {
            loginForm.style.display = 'none';
            registerForm.style.display = 'block';
        }
    }

    showAlert(message) {
        alert(message);
    }

    redirectToDashboard() {
        window.location.href = '/HTML/Dashboard.html';
    }
}