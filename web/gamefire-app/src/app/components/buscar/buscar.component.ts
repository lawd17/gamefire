import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/model/data/Producto';
import { ProductoService } from 'src/app/services/producto.service';
import { HttpErrorResponse } from '@angular/common/http';
import localeEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.scss']
})
export class BuscarComponent implements OnInit {

  productos: Producto[] = [];
  message: string = ""
  error: string = ""
  searchValue: string = "";
  spinner = false;

  constructor(public productoService: ProductoService, private router: Router) {}

  ngOnInit(): void {
    registerLocaleData(localeEs, 'es')

    this.searchValue = this.productoService.searchValue;
    this.obtenerTodosProductosPorNombre(this.searchValue);
  }

  ngDoCheck(): void {
    this.error
    if (this.searchValue == "") {
      this.router.navigate(['/', 'home'])
    }

    if (this.searchValue != this.productoService.searchValue) {
      this.productos = [];
      this.searchValue = this.productoService.searchValue;
      this.obtenerTodosProductosPorNombre(this.searchValue);
    }

    if (this.productos.length == 0) {
      this.message = "No hay productos con ese nombre."
      this.productos = []
      this.ocultSpinner()
    } else {
      this.message = "";
    }

  }

  /**
   * Metodo que se encarga de obtener la lista de productos a partir
   * del valor introducido en el buscador
   * @param name
   */
  obtenerTodosProductosPorNombre(name: string) {
      this.showSpinner();
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

        //al acabar oculta el spinner
        this.ocultSpinner();

      }, (error:HttpErrorResponse) => this.controlError(error))
    }

    //activa el spinner
    showSpinner(){
      this.spinner = true;
    }

    //activa el desactiva el spinner
    ocultSpinner(){
      this.spinner = false;
    }

    controlError( error: HttpErrorResponse ){
      if (error.status == 400) {
        this.error = "Ha ocurrido un error con los datos para la solicitud, intentelo de nuevo"
      }

      if (error.status == 500) {
        this.error =  "Ha ocurrido un error con el servidor, intentelo de nuevo mas tarde."
      }
    }
}

