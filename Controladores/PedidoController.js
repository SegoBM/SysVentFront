import { PedidoModel } from '../Modelos/PedidoModel.js';
import { PedidoView } from '../Vista/PedidoView.js';

class PedidoController {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.productsMap = {};

        document.addEventListener('DOMContentLoaded', () => this.init());
    }

    async init() {
        await this.fetchOrders();
        await this.fetchClients();
        await this.fetchProducts();
        this.view.orderForm.addEventListener('submit', (event) => this.submitOrderForm(event));
        this.view.productSelect.addEventListener('change', () => this.updatePrice());
        document.getElementById('orderQuantity').addEventListener('input', () => this.updatePrice());
        document.querySelector('[data-target="#orderModal"]').addEventListener('click', () => this.view.clearOrderForm());
    }

    async fetchOrders() {
        try {
            const orders = await this.model.fetchOrders();
            this.view.renderOrders(orders);
        } catch (error) {
            console.error('Error:', error);
            this.view.showAlert('Error al obtener los pedidos');
        }
    }

    async fetchClients() {
        try {
            const clients = await this.model.fetchClients();
            this.view.renderClients(clients);
        } catch (error) {
            console.error('Error:', error);
            this.view.showAlert('Error al obtener los clientes');
        }
    }

    async fetchProducts() {
        try {
            const products = await this.model.fetchProducts();
            this.view.renderProducts(products, this.productsMap);
        } catch (error) {
            console.error('Error:', error);
            this.view.showAlert('Error al obtener los productos');
        }
    }

    updatePrice() {
        const productId = this.view.productSelect.value;
        const quantity = parseInt(document.getElementById('orderQuantity').value);
        const price = this.productsMap[productId] || 0;
        document.getElementById('orderPrice').value = (price * quantity).toFixed(2);
    }

    async submitOrderForm(event) {
        event.preventDefault();
        const clienteId = document.getElementById('orderClientId').value;
        const fecha = document.getElementById('orderDate').value;
        const productoId = document.getElementById('orderProductId').value;
        const cantidad = parseInt(document.getElementById('orderQuantity').value);
        const precio = parseFloat(document.getElementById('orderPrice').value);

        const pedido = { clienteId, fecha, productoId, cantidad, precio };

        try {
            await this.model.saveOrder(pedido);
            this.view.showAlert('Pedido registrado con éxito');
            this.view.clearOrderForm();
            this.view.hideModal();
            await this.fetchOrders();
        } catch (error) {
            console.error('Error:', error);
            this.view.showAlert('Error al registrar el pedido producto excede el limite de stock');
        }
    }
}

const app = new PedidoController(new PedidoModel(), new PedidoView());