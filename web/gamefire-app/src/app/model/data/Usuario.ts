//Clase que representa los datos de programa
export class Usuario {
  id: number;
  email: string;
  username: string;
  password: string;
  nombre: string;
  apellidos: string;
  telefono: string;

  constructor(id: number, email: string, username: string, password: string, nombre: string, apellidos: string, telefono: string) {
    this.id = id;
    this.email = email;
    this.username = username;
    this.password = password;
    this.nombre = nombre;
    this.apellidos = apellidos;
    this.telefono = telefono;
  }
}
