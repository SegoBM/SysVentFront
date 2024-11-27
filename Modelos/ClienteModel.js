export class ClienteModel {
    constructor() {
        this.clientsUrl = 'https://www.sysventapi.somee.com/api/Clientes';
    }

    async fetchClients() {
        const response = await fetch(this.clientsUrl);
        if (!response.ok) {
            throw new Error('Error al obtener los clientes');
        }
        return await response.json();
    }

    async fetchClient(clientId) {
        const response = await fetch(`${this.clientsUrl}/${clientId}`);
        if (!response.ok) {
            throw new Error('Error al obtener el cliente');
        }
        return await response.json();
    }

    async saveClient(cliente, clientId = null) {
        const method = clientId ? 'PUT' : 'POST';
        const url = clientId ? `${this.clientsUrl}/${clientId}` : this.clientsUrl;
        console.log('URL:', url);
        console.log('Método:', method);
        console.log('Datos a enviar:', JSON.stringify(cliente));
        const response = await fetch(url, {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(cliente)
        });
        if (!response.ok) {
            const errorResponse = await response.json();
            console.error('Error en la respuesta del servidor:', errorResponse);
            throw new Error(errorResponse.title || 'Error al guardar el cliente');
        }
        return await response.json();
    }

    async deleteClient(clientId) {
        const response = await fetch(`${this.clientsUrl}/${clientId}`, { method: 'DELETE' });
        if (!response.ok) {
            const errorResponse = await response.json();
            throw new Error(errorResponse.title || 'Error al eliminar el cliente');
        }
        return response;
    }
}