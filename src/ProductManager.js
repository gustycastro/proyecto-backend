import fs from 'fs';

class ProductManager {
    constructor(path) {
      this.path = path;
      this.products = [];
      this.loadProducts();
    }

  async loadProducts() {
      try {
        const data = await fs.promises.readFile(this.path, 'utf-8');
        this.products = JSON.parse(data);
      } catch (error) {
        this.products = [];
        await this.saveProducts();
      }
  }

  async saveProducts() {
      try {
        await fs.promises.writeFile(this.path, JSON.stringify(this.products), 'utf-8');
      } catch (error) {
      
      }
  }

  generateId() {
      return this.products.length > 0 ? this.products[this.products.length - 1].id + 1 : 1;
  }

  async addProduct(product) {
      if (this.products.some(p => p.code === product.code)) {
        return '¡Dato code repetido! Deberá ingresar otro.';
      }
      if (product.title && product.description && product.price && product.code && product.thumbnail && product.stock >= 0) {
        const id = this.generateId();
        const newProduct = { id, ...product };
        this.products.push(newProduct);
        await this.saveProducts();
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

  async updateProduct(id, updatedFields) {
      const productIndex = this.products.findIndex(p => p.id === id);
      if (productIndex !== -1) {
        const updatedProduct = { ...this.products[productIndex], ...updatedFields };
        this.products[productIndex] = updatedProduct;
        await this.saveProducts();
        return 'Producto actualizado con éxito.';
      } else {
        return `ID: ${id} Not found`;
      }
  }

  async deleteProduct(id) {
      const productIndex = this.products.findIndex(p => p.id === id);
      if (productIndex !== -1) {
        this.products.splice(productIndex, 1);
        await this.saveProducts();
        return 'Producto eliminado con éxito.';
      } else {
        return `ID: ${id} Not found`;
      }
  }
}

export default ProductManager;

// async function ejemplo() {
//   const productManager = new ProductManager('src/products.json');

//   await productManager.loadProducts();

//   console.log(productManager.getProducts()); // Devuelve array vacío

//   const producto = await productManager.addProduct({
//     title: 'PC',
//     description: 'AMD Ryzen 8',
//     price: 250000,
//     thumbnail: 'Sin imagen',
//     code: 'cabj1',
//     stock: 30,
    
//   });

  // console.log(producto); // Agrega el producto con éxito

//   console.log(productManager.getProducts()); // Devuelve el producto en un array

//   console.log(productManager.getProductById(1)); // Encuentra el producto por su ID

//   console.log(productManager.getProductById(2)); // Error: Producto no encontrado

// console.log(await productManager.updateProduct(5, { title: 'Microfono', price: 15000, description: 'NZXT Capsule', stock: 20 })); // Actualiza el producto

//   console.log(await productManager.updateProduct(2, { price: 150000 })); // Error: Producto no encontrado

// console.log(await productManager.deleteProduct(6)); // Elimina el producto devolviendo array vacío

//   console.log(await productManager.deleteProduct(2)); // Error: Producto no encontrado

// }

// ejemplo();