//Clase de tabla temporal que representa los datos de cada producto comrprado

export class ProductoVenta {
  id: number;
  id_producto: number;
  id_venta: number;
  nombre: string;
  imagen: string;
  descripcion: string;
  precio_venta: number
  id_categoria: number
  cantidad: number;

  constructor(
    id: number
    , id_producto: number
    , id_venta: number
    , nombre: string
    , imagen: string
    , descripcion: string
    , precio_venta: number
    , id_categoria: number
    , cantidad: number
    ) {
      this.id = id;
      this.id_producto = id_producto;
      this.id_venta = id_venta;
      this.nombre = nombre;
      this.imagen = imagen;
      this.descripcion = descripcion;
      this.precio_venta = precio_venta
      this.id_categoria = id_categoria
      this.cantidad = cantidad;
  }
}
