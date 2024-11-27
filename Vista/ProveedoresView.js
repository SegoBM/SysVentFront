export class ProveedorView {
    constructor() {
        this.providerForm = document.getElementById('providerForm');
        this.providerTableBody = document.getElementById('providerTableBody');
    }

    renderProviders(providers) {
        this.providerTableBody.innerHTML = '';

        providers.forEach(provider => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${provider.nombre}</td>
                <td>${provider.telefono}</td>
                <td>${provider.correo}</td>
                <td>${provider.direccion}</td>
                <td>
                    <button class="btn btn-warning btn-sm btn-edit" data-id="${provider.proveedorId}">Editar</button>
                    <button class="btn btn-danger btn-sm" data-id="${provider.proveedorId}">Eliminar</button>
                </td>
            `;
            this.providerTableBody.appendChild(row);
        });
    }

    clearProviderForm() {
        this.providerForm.reset();
        document.getElementById('providerId').value = '';
    }

    fillProviderForm(provider) {
        document.getElementById('providerId').value = provider.proveedorId;
        document.getElementById('providerName').value = provider.nombre;
        document.getElementById('providerPhone').value = provider.telefono;
        document.getElementById('providerEmail').value = provider.correo;
        document.getElementById('providerAddress').value = provider.direccion;
    }

    showAlert(message) {
        alert(message);
    }

    showModal() {
        $('#providerModal').modal('show');
    }

    hideModal() {
        $('#providerModal').modal('hide');
    }
}