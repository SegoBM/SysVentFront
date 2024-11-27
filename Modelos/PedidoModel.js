export class PedidoModel {
    constructor() {
        this.ordersUrl = 'https://www.sysventapi.somee.com/api/Pedidos';
        this.clientsUrl = 'https://www.sysventapi.somee.com/api/Clientes';
        this.productsUrl = 'https://www.sysventapi.somee.com/api/Productos';
    }

    async fetchOrders() {
        const response = await fetch(this.ordersUrl);
        if (!response.ok) {
            throw new Error('Error al obtener los pedidos');
        }
        return await response.json();
    }

    async fetchClients() {
        const response = await fetch(this.clientsUrl);
        if (!response.ok) {
            throw new Error('Error al obtener los clientes');
        }
        return await response.json();
    }

    async fetchProducts() {
        const response = await fetch(this.productsUrl);
        if (!response.ok) {
            throw new Error('Error al obtener los productos');
        }
        return await response.json();
    }

    async saveOrder(pedido) {
        const response = await fetch(this.ordersUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(pedido)
        });
        if (!response.ok) {
            const errorResponse = await response.json();
            throw new Error(errorResponse.title || 'Error al guardar el pedido');
        }
        return await response.json();
    }
}