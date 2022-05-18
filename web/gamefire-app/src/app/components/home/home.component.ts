import { Component, OnInit } from '@angular/core';
import { Categoria } from 'src/app/model/data/Categoria';
import { CategoriaApiService } from 'src/app/services/categoria-api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  public categorias: Categoria[] = [];

  constructor( public categoriaService: CategoriaApiService) {}

  ngOnInit(): void {
    this.obtenerTodasCategorias();
  }

  obtenerTodasCategorias(){
    this.categoriaService.obtenerTodasCategoria()
    .subscribe(data => {
      data.forEach(element => {
        let id = parseInt(element.id) ;
        let nombre = element.nombre;
        let descripcion = element.descripcion;
        this.categorias.push(new Categoria(id, nombre, descripcion));
      });
    });
  }
}
