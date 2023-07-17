import express from 'express';
import handlebars from "express-handlebars";
import { Server } from "socket.io";
import ProductManager from './manager/ProductManager.js';
import productRouter from './routes/productRoutes.js';
import CartManager from './manager/CartManager.js';
import cartRouter from './routes/cartRoutes.js';
import viewsRouter from "./routes/views.router.js";
import __dirname from "./utils.js";

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

const productManager = new ProductManager('products.json');
const cartManager = new CartManager('carts.json');

app.use("/", viewsRouter);
app.use('/api/products', productRouter(productManager));
app.use('/api/carts', cartRouter(cartManager));

const httpServer = app.listen(8080);
const io = new Server(httpServer);

io.on("connection", (socket) => {
  socket.on("new-product", async (data) => {
    await producto.addProduct(
      data.title,
      data.description,
      data.price,
      data.thumbnail
    );
    console.log(data);

    const products = await producto.getProducts();
    io.emit("update-products", products);
  });
});