import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from '../model/data/Producto';
import { Usuario } from '../model/data/Usuario';

@Injectable({
  providedIn: 'root'
})

export class UsuarioApiService {
  carrito: Producto[] = [];
  autenticado: boolean = false;

  baseURL: string = "http://192.168.1.43/API/gamefire/api/login.php";

  constructor(private http: HttpClient) {
  }

  getAllUsers(): Observable<Usuario[]> {
    console.log('getAllUser '+ this.baseURL)
    return this.http.get<Usuario[]>(this.baseURL)
  }

  getOneUsers(id: number): Observable<Usuario[]> {
    console.log('getUser '+ this.baseURL)
    return this.http.get<Usuario[]>(this.baseURL + "?id=" + id)
  }

  login(username: string, password: string) {
    console.log('getUser '+ this.baseURL)
    var json: any = {"username": username, "password": password};
    this.http.post<boolean>(this.baseURL, JSON.stringify(json))
    .subscribe(data => {
      if (data) {
        this.autenticado = data;
      }
    });
  }

  logout(){
    this.autenticado = false;
  }

  addUser( usuario: Usuario): Observable<boolean> {
    const headers = { 'content-type': 'application/json'}
    const body = JSON.stringify(usuario);
    console.log(body)
    return this.http.post<boolean>(this.baseURL, body,{'headers':headers})
  }

  deleteUser (id: number):Observable<number>{
    let httpheaders= new HttpHeaders()
    .set('Content-type','application/Json');
    let options = {
      headers:httpheaders
    };
    return this.http.delete<number>(this.baseURL+"?id=" + id);
  }

  putUsuario (usuario: Usuario): Observable<boolean>{
    const headers = { 'content-type': 'application/json'}
    const body = JSON.stringify(usuario);
    console.log(body)
    return this.http.put<boolean>(this.baseURL, body, {'headers':headers})
  }
}
