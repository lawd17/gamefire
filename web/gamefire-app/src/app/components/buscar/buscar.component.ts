import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Producto } from 'src/app/model/data/Producto';
import { Location } from '@angular/common';
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
  
  constructor(public productoService: ProductosApiService, private route: ActivatedRoute, private location: Location) {
  }

  ngOnInit(): void {
    this.obtenerTodosProductosPorNombre();
  }


  obtenerTodosProductosPorNombre() {
      var nombre = String(this.route.snapshot.paramMap.get('nombre'));
      nombre = nombre.replace("-", " ");

      this.productoService.getPorductosForNombre(nombre)
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

