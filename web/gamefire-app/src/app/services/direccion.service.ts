import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { apiDireccion } from '../model/data/apiDireccion';
import { Direccion } from '../model/data/Direccion';

@Injectable({
  providedIn: 'root'
})
export class DireccionService {

  baseURL: string = "http://192.168.1.43/API/gamefire/api/model/usuario/direccion.php";

  constructor(private http: HttpClient) {
  }

  public getDireccion(id: number): Observable<apiDireccion> {
    console.log('getDireccion '+ this.baseURL);
    return this.http.get<apiDireccion>(this.baseURL + "?id_usuario=" + id);
  }

  postDireccion(direccion: Direccion): Observable<string> {
    return this.http.post<string>(this.baseURL, JSON.stringify(direccion))
  }

}
