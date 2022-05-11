import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductosApiService } from 'src/app/services/productos-api.service';
import { Location }from '@angular/common';
import { Producto } from 'src/app/model/data/Producto';
import { UsuarioApiService } from 'src/app/services/usuario-api.service';
import { itemCarrito } from 'src/app/model/data/itemCarrito';
import { Categoria } from 'src/app/model/data/Categoria';
import { CategoriaApiService } from 'src/app/services/categoria-api.service';

@Component({
  selector: 'app-detalle-producto',
  templateUrl: './detalle-producto.component.html',
  styleUrls: ['./detalle-producto.component.scss']
})
export class DetalleProductoComponent implements OnInit {
  producto!: Producto
  categoria!: Categoria

  constructor(
    private productoService: ProductosApiService,
    private categoriaService: CategoriaApiService,
    private usuarioService: UsuarioApiService,
    private route: ActivatedRoute,
    private location: Location) {
  }

  ngOnInit(): void {
    this.getProducto()
  }


   /**
   * Metodo asincrono para obtener la pelicula seleccionada
   */
     getProducto(): void {
      const id = Number(this.route.snapshot.paramMap.get('id'));
      this.productoService.getProducto(id)
      .subscribe( producto => {
        this.producto =
        new Producto(
          parseInt(producto.id),
          producto.nombre,
          producto.imagen,
          producto.descripcion,
          parseFloat(producto.precio_venta),
          parseInt(producto.stock),
          parseInt(producto.id_categoria))
        this.getCategoria();
     });

    }

    getCategoria(){
      this.categoriaService.getCategoria(this.producto.id_categoria)
      .subscribe( categoria => {
        this.categoria = new Categoria(
          parseInt(categoria.id),
          categoria.nombre,
          categoria.descripcion
        );
      })
    }

    addCarrito(producto: Producto){
      if(this.usuarioService.getAutenticado()){
        this.usuarioService.addProductInCart(new itemCarrito(producto))
      }
    }

    autenticado(){
      return this.usuarioService.getAutenticado();
    }

}
