export class Direccion {
  id: number;
  direccion: string;
  ciudad: string;
  codigo_postal: string;
  pais: string;
  id_usuario: number;


  constructor(id: number,
    direccion: string,
    ciudad: string,
    codigo_postal: string,
    pais: string,
    id_usuario: number,
    ) {
    this.id = id;
    this.direccion = direccion;
    this.ciudad = ciudad;
    this.codigo_postal = codigo_postal;
    this.pais = pais;
    this.id_usuario = id_usuario;

  }
}
