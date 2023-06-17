import express from 'express';
import ProductManager from './ProductManager.js';

const app = express();
const productManager = new ProductManager('src/products.json');
const PORT = 8080;

app.get("/products", async (req, res) => {
    const limit = parseInt(req.query.limit);
    if (limit) {
        try {
            const products = await productManager.getProducts();
            const limitedProducts = products.slice(0, limit); // Agregar límite acá
            return res.status(200).json(limitedProducts); 
        } catch (error) {
            return res.status(404).json({ error: "Error al obtener los productos" });
        }
    } else {
        const products = await productManager.getProducts();
        return res.status(200).json(products);
    }
});

app.get('/products/:pid', async (req, res) => {
    try {
        const productId = parseInt(req.params.pid);
        const product = await productManager.getProductById(productId);
        res.json(product);
    } catch (error) {
        res.status(404).json({ error: 'Error al obtener el producto' });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor Express escuchando en el puerto ${PORT}`);
});
