export class AuthModel {
    constructor() {
        this.providersUrl = 'https://www.sysventapi.somee.com/api/Proveedores';
        this.usersUrl = 'https://www.sysventapi.somee.com/api/Usuarios';
    }

    async fetchProviders() {
        const response = await fetch(this.providersUrl);
        if (!response.ok) {
            throw new Error('Error al obtener proveedores');
        }
        return await response.json();
    }

    async registerUser(nombre, contraseña, rol) {
        const response = await fetch(this.usersUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nombre, contraseña, rol })
        });
        if (!response.ok) {
            const errorResponse = await response.json();
            throw new Error(errorResponse.title || 'Error al registrar el usuario');
        }
        return await response.json();
    }

    async loginUser(nombre, contraseña) {
        const response = await fetch(`${this.usersUrl}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nombre, contraseña })
        });
        if (!response.ok) {
            const errorResponse = await response.json();
            throw new Error(errorResponse.message || 'Error al iniciar sesión');
        }
        return await response.json();
    }
}