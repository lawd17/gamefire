import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiVenta } from '../model/data/apiVenta';
import { Venta } from '../model/data/Venta';

@Injectable({
  providedIn: 'root'
})
export class VentaService {

  baseURL: string = "http://192.168.1.45/API/model/venta/venta.php";

  constructor(private http: HttpClient) {
  }

  public getVenta(id: number){
    console.log('getVenta '+ this.baseURL);
    return this.http.get<apiVenta>(this.baseURL + "?id=" + id);
  }

  public getVentaByUserId(id_usuario: number): Observable<apiVenta[]> {
    console.log('getVentas '+ this.baseURL);
    return this.http.get<apiVenta[]>(this.baseURL + "?id_usuario=" + id_usuario);
  }

  postVenta(venta: Venta): Observable<string> {
    return this.http.post<string>(this.baseURL, JSON.stringify(venta))
  }

}
