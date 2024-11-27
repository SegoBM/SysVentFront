export class ProveedorModel {
    constructor() {
        this.providersUrl = 'https://www.sysventapi.somee.com/api/Proveedores';
    }

    async fetchProviders() {
        const response = await fetch(this.providersUrl);
        if (!response.ok) {
            throw new Error('Error al obtener los proveedores');
        }
        return await response.json();
    }

    async saveProvider(proveedor, providerId = null) {
        const method = providerId ? 'PUT' : 'POST';
        const url = providerId ? `${this.providersUrl}/${providerId}` : this.providersUrl;
        const response = await fetch(url, {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(proveedor)
        });
        if (!response.ok) {
            const errorResponse = await response.json();
            throw new Error(errorResponse.title || 'Error al guardar el proveedor');
        }
        return response;
    }

    async deleteProvider(providerId) {
        const response = await fetch(`${this.providersUrl}/${providerId}`, { method: 'DELETE' });
        if (!response.ok) {
            const errorResponse = await response.json();
            throw new Error(errorResponse.title || 'Error al eliminar el proveedor');
        }
        return response;
    }

    async fetchProvider(providerId) {
        const response = await fetch(`${this.providersUrl}/${providerId}`);
        if (!response.ok) {
            throw new Error('Error al obtener el proveedor');
        }
        return await response.json();
    }
}