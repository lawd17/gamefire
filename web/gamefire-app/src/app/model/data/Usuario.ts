export class Usuario {
  id: number;
  username: string;
  password: string;
  nombre: string;
  apellidos: string;
  telefono: string;

  constructor(id: number, username: string, password: string, nombre: string, apellidos: string, telefono: string) {
    this.id = id;
    this.username = username;
    this.password = password;
    this.nombre = nombre;
    this.apellidos = apellidos;
    this.telefono = telefono;
  }
}
