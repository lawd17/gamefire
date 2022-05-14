export class Venta {
  id: number;
  fecha: string;
  impuesto: string;
  total: number;
  id_usuario: number;


  constructor(id: number
    , fecha: string
    , impuesto: string
    , total: number
    , id_usuario: number) {
    this.id = id;
    this.fecha = fecha;
    this.impuesto = impuesto;
    this.total = total;
    this.id_usuario = id_usuario;
  }
}
