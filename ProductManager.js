
const fs = require('fs');

class ProductManager {
    constructor(path) {
        this.path = path;
        this.products = [];
        this.loadProducts();
    }

    loadProducts() {
    try {
        const data = fs.readFileSync(this.path, 'utf-8');
        this.products = JSON.parse(data);
    } catch (error) {
        this.products = [];
        this.saveProducts();
        }
    }

    saveProducts() {
        fs.writeFileSync(this.path, JSON.stringify(this.products), 'utf-8');
    }

    generateId() {
        return this.products.length > 0 ? this.products[this.products.length - 1].id + 1 : 1;
    }

    addProduct(product) {
        if (this.products.some(p => p.code === product.code)) {
            return '¡Dato code repetido! Deberá ingresar otro.';
        }
        if (product.title && product.description && product.price && product.code && product.thumbnail && product.stock >= 0){
            const id = this.generateId();
            const newProduct = { id, ...product };
            this.products.push(newProduct);
            this.saveProducts();
        return 'Producto agregado con éxito.';
    } else {
        return 'Todos los campos tienen que ser obligatorios.';
        }
    }

    getProducts() {
        return this.products;
    }

    getProductById(id) {
        const product = this.products.find(p => p.id === id);
        return product ? product : `ID: ${id} Not found`;
    }

    updateProduct(id, updatedFields) {
        const productIndex = this.products.findIndex(p => p.id === id);
        if (productIndex !== -1) {
            const updatedProduct = { ...this.products[productIndex], ...updatedFields };
            this.products[productIndex] = updatedProduct;
            this.saveProducts();
        return 'Producto actualizado con éxito.';
        } else {
        return `ID: ${id} Not found`;
        }
    }

    deleteProduct(id) {
        const productIndex = this.products.findIndex(p => p.id === id);
        if (productIndex !== -1) {
            this.products.splice(productIndex, 1);
            this.saveProducts();
            return 'Producto eliminado con éxito.';
        } else {
        return `ID: ${id} Not found`;
        }
    }
}


const productManager = new ProductManager('products.json');

console.log(productManager.getProducts()); //Devuelve array vacio

const producto = productManager.addProduct({
    title: 'PC',
    description: 'AMD Ryzen 8',
    price: 250000,
    thumbnail: 'Sin imagen',
    code: 'cabj1',
    stock: 15,
},
);

console.log(producto); //Agrega el producto con exitos

console.log(productManager.getProducts()); //Devuelve el producto en un array

console.log(productManager.getProductById(1)); //Encuentra el producto por su ID

console.log(productManager.getProductById(2)); //Error: Producto no encontrado

console.log(productManager.updateProduct(1, { price: 150000 })); //Actualiza el producto

console.log(productManager.updateProduct(2,{ price: 150000 })) // Error: Producto no encontrado

console.log(productManager.deleteProduct(1)); //Elimna el producto devolviendo array vacio

console.log(productManager.deleteProduct(2)); // Error: Producto no encontrado
