export class ClienteView {
    constructor() {
        this.clientTableBody = document.getElementById('clientTableBody');
        this.clientForm = document.getElementById('clientForm');
    }

    renderClients(clients) {
        this.clientTableBody.innerHTML = '';
        clients.forEach(client => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${client.nombre}</td>
                <td>${client.correo}</td>
                <td>${client.telefono}</td>
                <td>${client.direccion}</td>
                <td>
                    <button class="btn btn-warning btn-sm btn-edit" data-id="${client.clienteId}">Editar</button>
                    <button class="btn btn-danger btn-sm" data-id="${client.clienteId}">Eliminar</button>
                </td>
            `;
            this.clientTableBody.appendChild(row);
        });
    }

    clearClientForm() {
        this.clientForm.reset();
    }

    fillClientForm(client) {
        document.getElementById('clientId').value = client.clienteId;
        document.getElementById('clientName').value = client.nombre;
        document.getElementById('clientEmail').value = client.correo;
        document.getElementById('clientPhone').value = client.telefono;
        document.getElementById('clientAddress').value = client.direccion;
    }
}