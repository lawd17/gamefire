import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/model/data/Producto';
import { ProductosApiService } from 'src/app/services/productos-api.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.scss']
})
export class BuscarComponent implements OnInit {

  productos: Producto[] = [];
  textError = ""
  nameActual: string = "";
  constructor(public productoService: ProductosApiService) {
  }

  ngOnInit(): void {
    this.nameActual = this.productoService.searchName;
  }


  obtenerTodosProductosPorNombre(name: string) {
      //var nombre = String(this.route.snapshot.paramMap.get('nombre'));
      //nombre = nombre.replace("-", " ");

      this.productoService.getPorductosForNombre(name)
      .subscribe(data => {
        data.forEach(element => {
          let id = parseInt(element.id);
          let nombre = element.nombre;
          let descripcion = element.descripcion;
          let imagen = element.imagen;
          let precio_venta = parseFloat(element.precio_venta);
          let stock = parseInt(element.stock);
          let id_categoria = parseInt(element.id_categoria);
          this.productos.push(new Producto(id, nombre, imagen, descripcion, precio_venta, stock, id_categoria));
        })
      },
      (error:HttpErrorResponse) => {
        if (error.status == 400) {
          this.textError = "Error en contra la API"
        }
      });
    }
}

