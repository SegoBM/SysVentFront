import { AuthModel } from '../Modelos/LoginModel.js';
import { AuthView } from '../Vista/LoginView.js';

class AuthController {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        document.addEventListener('DOMContentLoaded', () => this.init());
        window.toggleForms = this.view.toggleForms.bind(this.view);
    }

    async init() {
        console.log('DOM fully loaded and parsed');
        this.checkSession();
        await this.fetchProviders();
        this.addEventListeners();
    }

    addEventListeners() {
        this.view.registerForm.addEventListener('submit', (event) => this.registerUser(event));
        this.view.loginForm.addEventListener('submit', (event) => this.loginUser(event));
    }

    async fetchProviders() {
        try {
            const providers = await this.model.fetchProviders();
            console.log(providers);
            // Aquí puedes agregar código para manejar los proveedores obtenidos
        } catch (error) {
            console.error('Error al obtener proveedores:', error);
        }
    }

    async registerUser(event) {
        event.preventDefault();
        const nombre = this.view.username.value;
        const contraseña = this.view.password.value;
        const rol = this.view.userType.value;

        try {
            await this.model.registerUser(nombre, contraseña, rol);
            this.view.showAlert('Usuario registrado con éxito');
            this.view.toggleForms();
        } catch (error) {
            console.error('Error:', error);
            this.view.showAlert('Error al registrar el usuario: ' + error.message);
        }
    }

    async loginUser(event) {
        event.preventDefault();
        const nombre = this.view.loginUsername.value;
        const contraseña = this.view.loginPassword.value;

        try {
            const result = await this.model.loginUser(nombre, contraseña);
            sessionStorage.setItem('user', JSON.stringify(result));
            this.view.showAlert('Inicio de sesión exitoso');
            this.view.redirectToDashboard();
        } catch (error) {
            console.error('Error:', error);
            this.view.showAlert('Error al iniciar sesión: ' + error.message);
        }
    }

    checkSession() {
        const user = sessionStorage.getItem('user');
        if (user) {
            this.view.redirectToDashboard();
        }
    }
}

const authApp = new AuthController(new AuthModel(), new AuthView());