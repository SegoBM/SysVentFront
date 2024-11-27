import { ProductoModel } from '../Modelos/ProductoModel.js';
import { ProductoView } from '../Vista/ProductoView.js';

class ProductoController {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.providerMap = {};

        document.addEventListener('DOMContentLoaded', () => this.init());
    }

    async init() {
        await this.fetchProviders();
        await this.fetchProducts();
        this.view.productForm.addEventListener('submit', (event) => this.submitProductForm(event));
        document.querySelector('[data-target="#productModal"]').addEventListener('click', () => this.view.clearProductForm());
        this.view.productTableBody.addEventListener('click', (event) => this.handleTableClick(event));
    }

    async fetchProviders() {
        try {
            const providers = await this.model.fetchProviders();
            providers.forEach(provider => {
                this.providerMap[provider.proveedorId] = provider.nombre;
            });
            this.view.renderProviders(providers);
        } catch (error) {
            console.error('Error:', error);
            this.view.showAlert('Error al obtener los proveedores');
        }
    }

    async fetchProducts() {
        try {
            const products = await this.model.fetchProducts();
            this.view.renderProducts(products, this.providerMap);
        } catch (error) {
            console.error('Error:', error);
            this.view.showAlert('Error al obtener los productos');
        }
    }

    async submitProductForm(event) {
        event.preventDefault();
        const productId = document.getElementById('productId').value;
        const nombre = document.getElementById('productName').value;
        const descripcion = document.getElementById('productDescription').value;
        const precio = parseFloat(document.getElementById('productPrice').value);
        const cantidad = parseInt(document.getElementById('productQuantity').value);
        const proveedorId = document.getElementById('productProviderId').value;

        const producto = { nombre, descripcion, precio, cantidad, proveedorId };
        if (productId) producto.productoId = productId;

        try {
            await this.model.saveProduct(producto, productId);
            this.view.showAlert(productId ? 'Producto actualizado con éxito' : 'Producto registrado con éxito');
            this.view.clearProductForm();
            this.view.hideModal();
            await this.fetchProducts();
        } catch (error) {
            console.error('Error:', error);
            this.view.showAlert('Error al registrar el producto');
        }
    }

    async handleTableClick(event) {
        const target = event.target;
        const productId = target.dataset.id;
        if (target.classList.contains('btn-edit')) {
            await this.editProduct(productId);
        } else if (target.classList.contains('btn-danger')) {
            await this.deleteProduct(productId);
        }
    }

    async editProduct(productId) {
        try {
            const product = await this.model.fetchProduct(productId);
            this.view.fillProductForm(product);
            this.view.showModal();
        } catch (error) {
            console.error('Error al cargar el producto:', error);
            this.view.showAlert('Error al cargar el producto');
        }
    }

    async deleteProduct(productId) {
        if (!confirm('¿Estás seguro de que deseas eliminar este producto?')) return;
        try {
            await this.model.deleteProduct(productId);
            this.view.showAlert('Producto eliminado con éxito');
            await this.fetchProducts();
        } catch (error) {
            console.error('Error:', error);
            this.view.showAlert('Error al eliminar el producto');
        }
    }
}

const app = new ProductoController(new ProductoModel(), new ProductoView());