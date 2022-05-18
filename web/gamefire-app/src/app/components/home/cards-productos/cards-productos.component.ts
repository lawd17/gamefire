import { Component, Input, OnInit } from '@angular/core';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { Categoria } from 'src/app/model/data/Categoria';
import { Producto } from 'src/app/model/data/Producto';
import { ProductosApiService } from 'src/app/services/productos-api.service';
import localeEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';

@Component({
  selector: 'app-cards-productos',
  templateUrl: './cards-productos.component.html',
  styleUrls: ['./cards-productos.component.scss']
})
export class CardsProductosComponent implements OnInit {
  @Input() categoria!: Categoria; // decorate the property with @Input()
  public productos: Producto[] = [];

  constructor( private router: AppRoutingModule, private poductosService: ProductosApiService) { }

  ngOnInit(): void {
    registerLocaleData(localeEs, 'es')
    this.obtenerTodosProductos();
  }

  /**
   * Metodo que valida si la categoria es null en ese caso llama para obtener todos los productos, si no llama a
   * obtenerlos por categoria
   */
  obtenerTodosProductos() {
    if (this.categoria != null) {
      this.obtenerTodosProductosPorCategoria();
    } else {
      this.poductosService.getAll()
        .subscribe(data => {
          data.forEach(element => {
            let id = parseInt(element.id);
            let nombre = element.nombre;
            let descripcion = element.descripcion;
            let imagen = element.imagen;
            let precio_venta = parseFloat(element.precio_venta);
            let stock = parseInt(element.stock);
            let id_categoria = parseInt(element.id_categoria)
            this.productos.push(new Producto(id, nombre, imagen, descripcion, precio_venta, stock, id_categoria));
          });
        });
    }
  }

  /**
   * Metodo que obteiene todos los productos por categoria
   */
  obtenerTodosProductosPorCategoria() {
    this.poductosService.getPorductosForCategory(this.categoria, 10).subscribe(data => {
      data.forEach(element => {
        let id = parseInt(element.id);
        let nombre = element.nombre;
        let descripcion = element.descripcion;
        let imagen = element.imagen;
        let precio_venta = parseFloat(element.precio_venta);
        let stock = parseInt(element.stock);
        let id_categoria = parseInt(element.id_categoria)
        this.productos.push(new Producto(id, nombre, imagen, descripcion, precio_venta, stock, id_categoria));
      });
    });
  }

}
