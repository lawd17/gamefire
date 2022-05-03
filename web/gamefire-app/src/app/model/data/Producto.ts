export class Producto {
    id: number;
    nombre: string;
    imagen: string;
    descripcion: string;
    precio_venta: number;
    stock: number;
    id_categoria: number;

    constructor(id: number, nombre: string, imagen: string, descripcion: string, precio_venta: number, stock: number, id_categoria: number) {
      this.id = id;
      this.nombre = nombre;
      this.imagen = imagen;
      this.descripcion = descripcion;
      this.precio_venta = precio_venta;
      this.stock = stock;
      this.id_categoria = id_categoria;
    }


}
