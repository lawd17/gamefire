import { registerLocaleData } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import localeEs from '@angular/common/locales/es';
import { ProductoVenta } from 'src/app/model/data/ProductoVenta';
import { Venta } from 'src/app/model/data/Venta';
import { DetalleVentaService } from 'src/app/services/detalle-venta.service';
import { VentaService } from 'src/app/services/venta.service';
import { Usuario } from 'src/app/model/data/Usuario';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-detalle-pedido',
  templateUrl: './detalle-pedido.component.html',
  styleUrls: ['./detalle-pedido.component.scss']
})

export class DetallePedidoComponent implements OnInit {

  venta!: Venta
  productosVenta: ProductoVenta[] = []
  usuario!: Usuario

  constructor(
    private ventaService: VentaService,
    private detalleVentaService: DetalleVentaService,
    private usuarioService: UsuarioService,
    private route: ActivatedRoute,
    private router: Router)
  {}


  ngOnInit(): void {
    registerLocaleData(localeEs, 'es')
    this.validate()
    this.getPedido()
  }

  /**
   * Metodo que se encarga de obtener todos los productos de una venta a partir
   * del id_venta
   * @param id_venta
   */
  obtenerProductosVenta(id_venta: number) {
    this.detalleVentaService.getProductoVenta(id_venta)
      .subscribe(data => {
        data.forEach(element => {
          var productoVenta =
            new ProductoVenta(
              element.id,
              element.id_producto,
              element.id_venta,
              element.nombre,
              element.imagen,
              element.descripcion,
              element.precio_venta,
              element.id_categoria,
              element.cantidad
            )

          this.productosVenta.push(productoVenta);
        });
      })
  }

  /**
   * Metodo que se encargar de obtener una venta, en caso de que no existiera, se redirige al home
   */
  getPedido(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.ventaService.getVenta(id)
      .subscribe(data => {
        if (data == null) {
          this.router.navigate(['/', 'home']);
        } else {
          this.venta =
            new Venta(
              parseInt(data.id),
              data.fecha,
              data.impuesto,
              parseFloat(data.total),
              parseInt(data.id_usuario))
          this.obtenerUsuario()
          this.obtenerProductosVenta(this.venta.id)
        }
      })
  }

  /**
   * Metodo que comprueba si el usuario esta logueado y sino
   * redirige a home
   */
  validate() {
    if (!this.usuarioService.autenticado) {
      this.router.navigate(['/', 'home']);
    }
  }

  /**
   * Comprueba si el pedido solicitod pertenece al usuario
   */
  pedidoEsDeUsuario() {
    if (this.venta.id_usuario !== this.usuario.id) {
      this.router.navigate(['/', 'home']);
    }
  }

  /**
   * Metodo que se encaga de obtener el usuarios logueado
   */
  obtenerUsuario() {
    this.usuarioService.getUserAuthenticated()
      .subscribe(data => {
        this.usuario =
          new Usuario(
            parseInt(data.id),
            data.email,
            data.username,
            data.password,
            data.nombre,
            data.apellidos,
            data.telefono)
        this.pedidoEsDeUsuario()
      })

  }

}
