import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductosApiService } from 'src/app/services/productos-api.service';
import { Location }from '@angular/common';
import { Producto } from 'src/app/model/data/Producto';

@Component({
  selector: 'app-detalle-producto',
  templateUrl: './detalle-producto.component.html',
  styleUrls: ['./detalle-producto.component.scss']
})
export class DetalleProductoComponent implements OnInit {
  producto!: Producto;

  constructor(public productoService: ProductosApiService, private route: ActivatedRoute, private location: Location) {

  }

  ngOnInit(): void {
    this.getProducto();
  }


   /**
   * Metodo asincrono para obtener la pelicula seleccionada
   */
     getProducto(): void {
      const id = Number(this.route.snapshot.paramMap.get('id'));
      this.productoService.getProducto(id)
      .subscribe( producto =>
        this.producto =
        new Producto(
          parseInt(producto.id),
          producto.nombre,
          producto.imagen,
          producto.descripcion,
          parseFloat(producto.precio_venta),
          parseInt(producto.stock),
          parseInt(producto.id_categoria)));
    }

}
