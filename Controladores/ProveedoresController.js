import { ProveedorModel } from '../Modelos/ProveedoresModel.js';
import { ProveedorView } from '../Vista/ProveedoresView.js';

class ProveedorController {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        document.addEventListener('DOMContentLoaded', () => this.init());
    }

    async init() {
        await this.fetchProviders();
        this.view.providerForm.addEventListener('submit', (event) => this.submitProviderForm(event)); // Corrige 'sfubmit' a 'submit'
        document.querySelector('[data-target="#providerModal"]').addEventListener('click', () => this.view.clearProviderForm());
        this.view.providerTableBody.addEventListener('click', (event) => this.handleTableClick(event));
    }

    async fetchProviders() {
        try {
            const providers = await this.model.fetchProviders();
            this.view.renderProviders(providers);
        } catch (error) {
            console.error('Error:', error);
            this.view.showAlert('Error al obtener los proveedores');
        }
    }

    async submitProviderForm(event) {
        event.preventDefault();
        const providerId = document.getElementById('providerId').value;
        const nombre = document.getElementById('providerName').value;
        const telefono = document.getElementById('providerPhone').value;
        const correo = document.getElementById('providerEmail').value;
        const direccion = document.getElementById('providerAddress').value;

        const proveedor = { nombre, telefono, correo, direccion };
        if (providerId) proveedor.proveedorId = providerId;

        try {
            await this.model.saveProvider(proveedor, providerId);
            this.view.showAlert(providerId ? 'Proveedor actualizado con éxito' : 'Proveedor registrado con éxito');
            this.view.clearProviderForm();
            this.view.hideModal();
            await this.fetchProviders();
        } catch (error) {
            console.error('Error:', error);
            this.view.showAlert('Error al registrar el proveedor');
        }
    }

    async handleTableClick(event) {
        const target = event.target;
        const providerId = target.dataset.id;
        if (target.classList.contains('btn-edit')) {
            await this.editProvider(providerId);
        } else if (target.classList.contains('btn-danger')) {
            await this.deleteProvider(providerId);
        }
    }

    async editProvider(providerId) {
        try {
            const provider = await this.model.fetchProvider(providerId);
            this.view.fillProviderForm(provider);
            this.view.showModal();
        } catch (error) {
            console.error('Error al cargar el proveedor:', error);
            this.view.showAlert('Error al cargar el proveedor');
        }
    }

    async deleteProvider(providerId) {
        if (!confirm('¿Estás seguro de que deseas eliminar este proveedor?')) return;
        try {
            await this.model.deleteProvider(providerId);
            this.view.showAlert('Proveedor eliminado con éxito');
            await this.fetchProviders();
        } catch (error) {
            console.error('Error:', error);
            this.view.showAlert('Error al eliminar el proveedor tiene uno o más productos asociados');
        }
    }
}

const app = new ProveedorController(new ProveedorModel(), new ProveedorView());