import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiMetodoPago } from '../model/data/apiMetodoPago';
import { MetodoPago } from '../model/data/MetodoPago';

@Injectable({
  providedIn: 'root'
})
export class MetodoPagoService {

  baseURL: string = "http://gamefire.com/API/model/usuario/metodo_pago.php";

  constructor(private http: HttpClient) {
  }

  public getMetodoPago(id_usuario: number): Observable<apiMetodoPago> {
    console.log('getMetodoPago '+ this.baseURL);
    return this.http.get<apiMetodoPago>(this.baseURL + "?id_usuario=" + id_usuario);
  }

  postMetodoPago(metodoPago: MetodoPago): Observable<string> {
    return this.http.post<string>(this.baseURL, JSON.stringify(metodoPago))
  }

}
