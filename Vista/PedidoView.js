export class PedidoView {
    constructor() {
        this.orderForm = document.getElementById('orderForm');
        this.orderTableBody = document.getElementById('orderTableBody');
        this.clientSelect = document.getElementById('orderClientId');
        this.productSelect = document.getElementById('orderProductId');
    }

    renderOrders(orders) {
        this.orderTableBody.innerHTML = '';

        orders.forEach(order => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${order.clienteNombre || 'Cliente desconocido'}</td>
                <td>${order.productoNombre || 'Producto desconocido'}</td>
                <td>${order.cantidad}</td>
                <td>$ ${order.precio}</td>
                <td>${new Date(order.fecha).toLocaleDateString()}</td>
            `;
            this.orderTableBody.appendChild(row);
        });
    }

    renderClients(clients) {
        this.clientSelect.innerHTML = '<option value="">Selecciona el cliente</option>';

        clients.forEach(client => {
            const option = document.createElement('option');
            option.value = client.clienteId;
            option.textContent = client.nombre;
            this.clientSelect.appendChild(option);
        });
    }

    renderProducts(products, productsMap) {
        this.productSelect.innerHTML = '<option value="">Selecciona el producto</option>';

        products.forEach(product => {
            const option = document.createElement('option');
            option.value = product.productoId;
            option.textContent = product.nombre;
            this.productSelect.appendChild(option);
            productsMap[product.productoId] = product.precio;
        });
    }

    clearOrderForm() {
        this.orderForm.reset();
    }

    showAlert(message) {
        alert(message);
    }

    showModal() {
        $('#orderModal').modal('show');
    }

    hideModal() {
        $('#orderModal').modal('hide');
    }
}