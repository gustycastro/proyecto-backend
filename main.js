class ProductManager {
  constructor() {
    this.products = [];
    this.primerID = 1;
  }

  generarID() {
    const ID = "Products" + this.primerID;
    this.primerID++;
    return ID;
  }

  addProduct = (title, description, price, thumbnail, stock) => {
    if (!title || !description || !price || !thumbnail) return "Todos los campos tienen que ser obligatorios."
    const codeExiste = this.products.some((producto) => producto.code === this.generarID());
    if (codeExiste) return "El ID del producto ya existe";

    const producto = {
      title,
      description,
      price,
      thumbnail,
      stock: stock || 80,
      code: this.generarID(),
    };

    this.products.push(producto);
    return "Producto agregado con exitos.";
  };

  getProducts = () => {
    return this.products;
  };

  getProductsById = (ingresarID) => {
    let encontrado = this.products.filter((producto) => producto.code === ingresarID);
    if (encontrado.length > 0) {
      return encontrado;
    } else {
      return "Not found.";
    }
  };
}

const producto = new ProductManager();
console.log(producto.addProduct("PC", "AMD Ryzen 8", 250000, "Sin imagen", "15"));
console.log(producto.addProduct("Mouse", "Corsair Ironclaw RGB", 80000, "Sin imagen", "10")); 
console.log(producto.addProduct("Monitor", "27¨ MSI Optix G27C4", 50000, "Sin imagen", "20")); 
console.log(producto.addProduct("Microfono", "NZXT Capsule", 15000, "Sin imagen", "25"));
console.log(producto.addProduct("Teclado", "", "","", "Sin imagen", "25")); 


console.log("Listado de Productos:", producto.getProducts());
console.log("----------------------------------------------");
console.log("Producto encontrado:", producto.getProductsById("Products1"));
console.log("Producto encontrado:", producto.getProductsById("Products7"));
