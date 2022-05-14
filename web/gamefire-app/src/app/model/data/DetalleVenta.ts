export class DetalleVenta {
  id: number;
  id_venta: number;
  id_producto: number;
  cantidad: number;


  constructor(id: number
    , id_venta: number
    , id_producto: number
    , cantidad: number
    ) {
    this.id = id;
    this.id_venta = id_venta;
    this.id_producto = id_producto;
    this.cantidad = cantidad;
  }
}
