export class ProductoView {
    constructor() {
        this.productForm = document.getElementById('productForm');
        this.productTableBody = document.getElementById('productTableBody');
        this.providerSelect = document.getElementById('productProviderId');
    }

    renderProviders(providers) {
        this.providerSelect.innerHTML = '';

        const defaultOption = document.createElement('option');
        defaultOption.value = '';
        defaultOption.textContent = 'Seleccionar el proveedor';
        defaultOption.disabled = true;
        defaultOption.selected = true;
        this.providerSelect.appendChild(defaultOption);

        providers.forEach(provider => {
            const option = document.createElement('option');
            option.value = provider.proveedorId;
            option.textContent = provider.nombre;
            this.providerSelect.appendChild(option);
        });
    }

    renderProducts(products, providerMap) {
        this.productTableBody.innerHTML = '';

        products.forEach(product => {
            const providerName = providerMap[product.proveedorId] || 'Proveedor desconocido';
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${product.nombre}</td>
                <td>${product.descripcion}</td>
                <td>$ ${product.precio}</td>
                <td>${product.cantidad}</td>
                <td>${providerName}</td>
                <td>
                    <button class="btn btn-warning btn-sm btn-edit" data-id="${product.productoId}">Editar</button>
                    <button class="btn btn-danger btn-sm" data-id="${product.productoId}">Eliminar</button>
                </td>
            `;
            this.productTableBody.appendChild(row);
        });
    }

    clearProductForm() {
        this.productForm.reset();
    }

    fillProductForm(product) {
        document.getElementById('productId').value = product.productoId;
        document.getElementById('productName').value = product.nombre;
        document.getElementById('productDescription').value = product.descripcion;
        document.getElementById('productPrice').value = product.precio;
        document.getElementById('productQuantity').value = product.cantidad;
        document.getElementById('productProviderId').value = product.proveedorId;
    }

    showAlert(message) {
        alert(message);
    }

    showModal() {
        $('#productModal').modal('show');
    }

    hideModal() {
        $('#productModal').modal('hide');
    }
}