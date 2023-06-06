class ProductManager {
  constructor() {
    this.products = [];
  }

  #id= 0
  addProduct = (title, description, price, thumbnail, code, stock) => {
    this.title = title
    this.description = description  
    this.price = price              
    this.thumbnail = thumbnail      
    this.code = code                
    this.stock = stock

    if ( ( this.products.some( p => p.code !== code) ) || this.products.length === 0 ) {
      if ( !!title && !!description && !!price && !!code && !!thumbnail && !!stock ) {
          this.#id++
          this.products.push( { id: this.#id, title, description, price, thumbnail, code, stock } )
          return "Producto agregado con exitos."
      } else {
          return "Todos los campos tienen que ser obligatorios.";
      }
  } else {
      return "¡Dato code repetido! Deberá ingresar otro.";
  }
}

getProducts() {
  return this.products;
}
getProductsById(ID) {
  let filtro = 0
  if ( this.products.some( p => p.id === ID) ) {
      filtro = this.products.find(p => p.id === ID)
      return filtro
  } else {
      return `ID: ${ID} Not found`
  }
}
}


const producto = new ProductManager();

//Productos cargados
console.log("----------------------------------------------");
console.log(producto.addProduct("PC", "AMD Ryzen 8", 250000, "Sin imagen", "cabj1", 15));
console.log(producto.addProduct("PC", "AMD Ryzen 8", 250000, "Sin imagen", "cabj1", 15));
console.log(producto.addProduct("Mouse", "Corsair Ironclaw RGB", 80000, "Sin imagen", "cabj2", 10)); 
console.log(producto.addProduct("Monitor", "27¨ MSI Optix G27C4", 50000, "Sin imagen", "cabj3", 20)); 
console.log(producto.addProduct("Microfono", "NZXT Capsule", 15000, "Sin imagen", "cabj4", 25));
console.log(producto.addProduct("Teclado", "", "","", "Sin imagen", "cabj5", 25));

//Listado de los productos
console.log("----------------------------------------------");
console.log("Listado de Productos:", producto.getProducts());
console.log("----------------------------------------------");

//ID existente
console.log("Producto encontrado:", producto.getProductsById(1));

//ID inexistente
console.log("----------------------------------------------");
console.log("Producto encontrado:", producto.getProductsById(5));
