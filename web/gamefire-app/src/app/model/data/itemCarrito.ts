import { Producto } from "./Producto";

export class itemCarrito {
  producto: Producto;
  cantidad: number;

  constructor(producto: Producto, cantidad: number = 1) {
    this.producto = producto;
    this.cantidad = cantidad;
  }

  
}
