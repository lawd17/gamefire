import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiProducto } from '../model/data/apiProducto';
import { Categoria } from '../model/data/Categoria';
import { Producto } from '../model/data/Producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  searchProductos: Producto[] = [];
  searchValue: string = "";

  baseURL: string = "http://192.168.1.45/API/model/producto/producto.php";

  constructor(private http: HttpClient) {
  }

  public getAll(): Observable<apiProducto[]> {
    console.log('getProductos '+ this.baseURL);
    return this.http.get<apiProducto[]>(this.baseURL);
  }

  public getProducto(id: number): Observable<apiProducto> {
    console.log('getUnProducto'+ this.baseURL);
    return this.http.get<apiProducto>(this.baseURL + "?id=" + id);
  }

  public getPorductosForCategory(categoria: Categoria, limit: number = 10){
    console.log('getProductoPorCategoria '+ this.baseURL);
    return this.http.get<apiProducto[]>(this.baseURL + "?id_categoria=" + categoria.id + "&limit=" + limit);
  }

  public getPorductosForNombre(nombre: string, limit: number = 30){
    console.log('getProductosPorNombre '+ this.baseURL);
    return this.http.get<apiProducto[]>(this.baseURL + "?nombre=" + nombre + "&limit=" + limit);
  }

}
