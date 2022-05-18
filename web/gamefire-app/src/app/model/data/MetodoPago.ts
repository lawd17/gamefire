//Clase que representa los datos de programa
export class MetodoPago {
  id: number;
  tipo_pago: string;
  titular: string;
  numero_cuenta: number;
  expiracion: string;
  cvv: number;
  id_usuario: number;

  constructor(id: number
    , tipo_pago: string
    , titular: string
    , numero_cuenta: number
    , expiracion: string
    , cvv: number
    , id_usuario: number) {
    this.id = id;
    this.tipo_pago = tipo_pago;
    this.titular = titular;
    this.numero_cuenta = numero_cuenta;
    this.expiracion = expiracion;
    this.cvv = cvv;
    this.id_usuario = id_usuario;
  }
}
