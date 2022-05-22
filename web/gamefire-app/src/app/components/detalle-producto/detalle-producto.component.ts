import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Producto } from 'src/app/model/data/Producto';
import { itemCarrito } from 'src/app/model/data/itemCarrito';
import { Categoria } from 'src/app/model/data/Categoria';
import { CategoriaService } from 'src/app/services/categoria.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-detalle-producto',
  templateUrl: './detalle-producto.component.html',
  styleUrls: ['./detalle-producto.component.scss']
})

export class DetalleProductoComponent implements OnInit {
  producto!: Producto
  categoria!: Categoria

  constructor(
    private productoService: ProductoService,
    private categoriaService: CategoriaService,
    private usuarioService: UsuarioService,
    private route: ActivatedRoute,
    private location: Location)
  {}

  ngOnInit(): void {
    this.getProducto()
  }

  /**
   * Metodo que se encgar de obtener el producto a paritr del id en la url, tras
   * acabar llama a obtenerCategoria
   */
  getProducto(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.productoService.getProducto(id)
      .subscribe(producto => {
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

  /**
   * Metodo que se encarga de obtener la categoria a partir del id_categoria
   * del producto actual
   */
  getCategoria() {
    this.categoriaService.getCategoria(this.producto.id_categoria)
      .subscribe(categoria => {
        this.categoria = new Categoria(
          parseInt(categoria.id),
          categoria.nombre,
          categoria.descripcion
        );
      })
  }

  /**
   * Metodo que añade el producto actual al carrito
   * @param producto
   */
  addCarrito(producto: Producto) {
    if (this.usuarioService.getAutenticado()) {
      this.usuarioService.addProductInCart(new itemCarrito(producto))
    }
  }

  /**
   * Funcion que valida si el usuario esta autenticado
   * @returns true/false
   */
  autenticado() {
    return this.usuarioService.getAutenticado();
  }

}
