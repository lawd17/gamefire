import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiCategoria } from '../model/data/apiCategoria';

@Injectable({
  providedIn: 'root'
})
export class CategoriaApiService {

  baseURL: string = "http://192.168.1.43/API/gamefire/api/model/producto/categoria.php";

  constructor(private http: HttpClient) {
  }

  public obtenerTodasCategoria(): Observable<apiCategoria[]> {
    console.log('getCategoria '+ this.baseURL)
    return this.http.get<apiCategoria[]>(this.baseURL)
  }

  public getCategoria(id: number): Observable<apiCategoria>{
    console.log('getCategoria '+ this.baseURL)
    return this.http.get<apiCategoria>(this.baseURL + "?id=" + id)
  }

}
