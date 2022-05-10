import { Component, Input, OnInit } from '@angular/core';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { Categoria } from 'src/app/model/data/Categoria';
import { Producto } from 'src/app/model/data/Producto';
import { ProductosApiService } from 'src/app/services/productos-api.service';
import { UsuarioApiService } from 'src/app/services/usuario-api.service';

@Component({
  selector: 'app-cards-productos',
  templateUrl: './cards-productos.component.html',
  styleUrls: ['./cards-productos.component.scss']
})
export class CardsProductosComponent implements OnInit {
  @Input() categoria!: Categoria; // decorate the property with @Input()
  public productos: Producto[] = [];

  constructor(private router: AppRoutingModule,
    private poductosService: ProductosApiService,
    private usuarioService: UsuarioApiService) {

  }

  ngOnInit(): void {
    this.obtenerTodosProductos();

  }

  obtenerTodosProductos() {
    if (this.categoria != null) {
      this.obtenerTodosProductosPorCategoria();
    } else {
      this.poductosService.getAll()
      .subscribe(data => {
        data.forEach(element => {
          let id = parseInt(element.id) ;
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

  obtenerTodosProductosPorCategoria() {
      this.poductosService.getPorductosForCategory(this.categoria, 10).subscribe(data => {
        data.forEach(element => {
          let id = parseInt(element.id) ;
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
