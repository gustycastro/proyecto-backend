
import { Router } from "express";

const cartRouter = Router();

const cartRoutes = (cartManager) => {
  cartRouter.post('/', async (req, res) => {
    try {
      const cartId = await cartManager.createCart();
      return res.status(200).json({ cartId });
    } catch (error) {
      return res.status(500).json({ error: 'Error al crear el carrito' });
    }
  });

  cartRouter.get('/:cid', (req, res) => {
    const cartId = parseInt(req.params.cid);
    const cart = cartManager.getCartById(cartId);
    if (cart) {
      return res.status(200).json(cart.products);
    } else {
      return res.status(404).json({ error: 'Carrito no encontrado' });
    }
  });

  cartRouter.post('/:cid/product/:pid', async (req, res) => {
    const cartId = parseInt(req.params.cid);
    const productId = parseInt(req.params.pid);
    const quantity = req.body.quantity || 1;
    try {
      const result = await cartManager.updateCart(cartId, productId, quantity);
      if (result) {
        return res.status(200).json({ message: 'Producto agregado al carrito con éxito' });
      } else {
        return res.status(404).json({ error: 'Carrito no encontrado' });
      }
    } catch (error) {
      return res.status(500).json({ error: 'Error al agregar el producto al carrito' });
    }
  });

  return cartRouter;
};

export default cartRoutes;
