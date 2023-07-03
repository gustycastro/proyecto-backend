import fs from 'fs';

class CartManager {
    constructor(path) {
        this.path = path;
        this.carts = [];
        this.loadCarts();
  }

  async loadCarts() {
    try {
      const data = await fs.promises.readFile(this.path, 'utf-8');
      this.carts = JSON.parse(data);
    } catch (error) {
      this.carts = [];
      await this.saveCarts();
    }
  }

  async saveCarts() {
    try {
      await fs.promises.writeFile(this.path, JSON.stringify(this.carts), 'utf-8');
    } catch (error) {
      throw new Error('Error al guardar los carritos');
    }
  }

  generateId() {
    return this.carts.length > 0 ? this.carts[this.carts.length - 1].id + 1 : 1;
  }

  createCart() {
    const id = this.generateId();
    const newCart = { id, products: [] };
    this.carts.push(newCart);
    return id;
  }

  getCartById(id) {
    const cart = this.carts.find(c => c.id === id);
    return cart ? cart : null;
  }

  async updateCart(id, productId, quantity) {
    const cart = this.getCartById(id);
    if (cart) {
      const existingProduct = cart.products.find(p => p.product === productId);
      if (existingProduct) {
        existingProduct.quantity += quantity;
      } else {
        cart.products.push({ product: productId, quantity });
      }
      await this.saveCarts();
      return true;
    } else {
      return false;
    }
  }
}

export default CartManager;
