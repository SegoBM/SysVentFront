export class ProductoModel {
    constructor() {
        this.providersUrl = 'https://www.sysventapi.somee.com/api/Proveedores';
        this.productUrl = 'https://www.sysventapi.somee.com/api/Productos';
    }

    async fetchProviders() {
        const response = await fetch(this.providersUrl);
        if (!response.ok) {
            throw new Error('Error al obtener los proveedores');
        }
        return await response.json();
    }

    async fetchProducts() {
        const response = await fetch(this.productUrl);
        if (!response.ok) {
            throw new Error('Error al obtener los productos');
        }
        return await response.json();
    }

    async saveProduct(producto, productId = null) {
        const method = productId ? 'PUT' : 'POST';
        const url = productId ? `${this.productUrl}/${productId}` : this.productUrl;
        const response = await fetch(url, {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(producto)
        });
        if (!response.ok) {
            const errorResponse = await response.json();
            throw new Error(errorResponse.title || 'Error al guardar el producto');
        }
        return response;
    }

    async deleteProduct(productId) {
        const response = await fetch(`${this.productUrl}/${productId}`, { method: 'DELETE' });
        if (!response.ok) {
            const errorResponse = await response.json();
            throw new Error(errorResponse.title || 'Error al eliminar el producto');
        }
        return response;
    }

    async fetchProduct(productId) {
        const response = await fetch(`${this.productUrl}/${productId}`);
        if (!response.ok) {
            throw new Error('Error al obtener el producto');
        }
        return await response.json();
    }
}