import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiDetallesVenta } from '../model/data/apiDetallesVenta';
import { apiProductoVenta } from '../model/data/apiProductoVenta';
import { DetalleVenta } from '../model/data/DetalleVenta';

@Injectable({
  providedIn: 'root'
})
export class DetalleVentaService {

  baseURL: string = "http://gamefire.com/API/model/venta/detalle_venta.php";

  constructor(private http: HttpClient) {
  }

  public getDetalleVenta(id_venta: number): Observable<apiDetallesVenta> {
    console.log('getDireccion '+ this.baseURL);
    return this.http.get<apiDetallesVenta>(this.baseURL + "?id_venta=" + id_venta);
  }

  public getProductoVenta(id_venta: number){
    console.log('getDireccion '+ this.baseURL);
    return this.http.get<apiProductoVenta[]>(this.baseURL + "?id_venta=" + id_venta + "&productos="+ "");
  }

  postDetalleVenta(detalle_venta: DetalleVenta): Observable<string> {
    return this.http.post<string>(this.baseURL, JSON.stringify(detalle_venta))
  }

}
