import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable, retry } from 'rxjs';
import { apiUsuario } from '../model/data/apiUsuario';
import { itemCarrito } from '../model/data/itemCarrito';
import { Usuario } from '../model/data/Usuario';

@Injectable({
  providedIn: 'root'
})

export class UsuarioApiService {
  carrito: Array<itemCarrito> = [];
  autenticado: boolean = false;
  userVarStorage = "authenticated"
  emailUserAutenticado: string = "";

  loginUrl: string = "http://192.168.1.43/API/gamefire/api/login.php";
  baseUserUrl: string = "http://192.168.1.43/API/gamefire/api/model/usuario/usuario.php";

  constructor(private http: HttpClient) {
    this.reloadAthenticatedStorage();
    this.reloadCartStorage();
  }

  reloadCartStorage() {
    var localSotrageData = this.getLocalStorageData(this.emailUserAutenticado);
    if (localSotrageData != null) {
      this.carrito = localSotrageData
    }
  }

  reloadAthenticatedStorage(): void {
    var localSotrageData = this.getLocalStorageData(this.userVarStorage);
    if (localSotrageData != null) {
      this.emailUserAutenticado = this.getLocalStorageData(this.userVarStorage)
      this.autenticado = true;
    }
  }

  getCarrito(){
    return this.carrito;
  }

  getAutenticado(){
    return this.autenticado;
  }

  login(email: string, password: string): Observable<string> {
    console.log('getUser ' + this.loginUrl)
    var json: any = { "email": email, "password": password };
    return this.http.post<string>(this.loginUrl, JSON.stringify(json));
  }

  logout() {
    this.removeLocalStorageData(this.userVarStorage)
  }
  
  //TODO MIRAR SI ESTAS DOS FUNCIONES TIENEN SENTIDO
  postUser(usuario: Usuario): Observable<boolean> {
    return this.http.post<boolean>(this.baseUserUrl, JSON.stringify(usuario))
  }

  registerUser(usuario: FormGroup): Observable<boolean> {
    return this.http.post<boolean>(this.baseUserUrl, JSON.stringify(usuario))
  }

  public getUserAuthenticated(): Observable<apiUsuario> {
    console.log('getUser'+ this.baseUserUrl);
    return this.http.get<apiUsuario>(this.baseUserUrl + "?email=" + this.emailUserAutenticado);
  }

  addProductInCart(item: itemCarrito) {
    var encontrado = false;
    this.carrito.forEach(element => {
      if (element.producto.id == item.producto.id && element.cantidad < 10) {
        element.cantidad += 1;
        encontrado = true;
      }
    });

    if (!encontrado) {
      this.carrito.push(item);
    }

    this.setLocalSotorageData(this.emailUserAutenticado, this.carrito);
  }

  deleteProductInCart(item: itemCarrito) {
    var index = this.carrito.indexOf(item);
    if (index > -1) {
      this.carrito.splice(index, 1);
    }

    this.setLocalSotorageData(this.emailUserAutenticado, this.carrito);
  }

  changeQunatityCart(item: itemCarrito, cantidad: string) {
    this.carrito.forEach(element => {
      if (element === item) {
        element.cantidad = parseInt(cantidad);
      }
    })

    this.setLocalSotorageData(this.emailUserAutenticado, this.carrito)
  }

  setLocalSotorageData(key: string, data: any) {
    const jsonData = JSON.stringify(data)
    localStorage.setItem(key, jsonData)
  }

  getLocalStorageData(key: string): any {
    var result = localStorage.getItem(key)

    if (result != null) {
      return JSON.parse(result)
    }

    return null;
  }

  removeLocalStorageData(key: string) {
    localStorage.removeItem(key)
  }
}
