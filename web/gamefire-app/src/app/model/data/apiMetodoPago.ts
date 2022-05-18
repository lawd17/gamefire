// Formato de los datos como llegan da la api
export interface apiMetodoPago {
  id: string;
  tipo_pago: string;
  titular: string;
  numero_cuenta: string;
  expiracion: string;
  cvv: string;
  id_usuario: string;
}
