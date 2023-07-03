import express from 'express';
import ProductManager from './manager/ProductManager.js';
import productRouter from './routes/productRoutes.js';
import CartManager from './manager/CartManager.js';
import cartRouter from './routes/cartRoutes.js';

const app = express();
const PORT = 8080;

app.use(express.json());

const productManager = new ProductManager('products.json');
const cartManager = new CartManager('carts.json');

app.use('/api/products', productRouter(productManager));
app.use('/api/carts', cartRouter(cartManager));

app.listen(PORT, () => {
  console.log(`Servidor Express escuchando en el puerto ${PORT}`);
});
