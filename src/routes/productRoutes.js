
import { Router } from "express";

const productRouter = Router();

const productRoutes = (productManager) => {
  productRouter.get('/', async (req, res) => {
    const limit = parseInt(req.query.limit);
    if (limit) {
      try {
        const products = await productManager.getProducts();
        const limitedProducts = products.slice(0, limit);
        return res.status(200).json(limitedProducts);
      } catch (error) {
        return res.status(404).json({ error: 'Error al obtener los productos' });
      }
    } else {
      const products = await productManager.getProducts();
      return res.status(200).json(products);
    }
  });

  productRouter.get('/:pid', async (req, res) => {
    const productId = parseInt(req.params.pid);
    try {
      const product = await productManager.getProductById(productId);
      return res.json(product);
    } catch (error) {
      return res.status(404).json({ error: 'Error al obtener el producto' });
    }
  });

  productRouter.post('/', async (req, res) => {
    const product = req.body;
    try {
      const result = await productManager.addProduct(product);
      return res.status(200).json({ message: result });
    } catch (error) {
      return res.status(500).json({ error: 'Error al agregar el producto' });
    }
  });

  productRouter.put('/:pid', async (req, res) => {
    const productId = parseInt(req.params.pid);
    const updatedFields = req.body;
    if (updatedFields.id !== undefined) {
      return res.status(400).json({ error: 'No se permite actualizar el ID del producto' });
    }
    try {
      const result = await productManager.updateProduct(productId, updatedFields);
      return res.status(200).json({ message: result });
    } catch (error) {
      return res.status(500).json({ error: 'Error al actualizar el producto' });
    }
  });

  productRouter.delete('/:pid', async (req, res) => {
    const productId = parseInt(req.params.pid);
    try {
      const result = await productManager.deleteProduct(productId);
      return res.status(200).json({ message: result });
    } catch (error) {
      return res.status(500).json({ error: 'Error al eliminar el producto' });
    }
  });

  return productRouter;
};

export default productRoutes;
