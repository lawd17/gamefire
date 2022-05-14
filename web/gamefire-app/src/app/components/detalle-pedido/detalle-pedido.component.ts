import { registerLocaleData } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import localeEs from '@angular/common/locales/es';
import { ProductoVenta } from 'src/app/model/data/ProductoVenta';
import { Venta } from 'src/app/model/data/Venta';
import { DetalleVentaService } from 'src/app/services/detalle-venta.service';
import { ProductosApiService } from 'src/app/services/productos-api.service';
import { UsuarioApiService } from 'src/app/services/usuario-api.service';
import { VentaService } from 'src/app/services/venta.service';

@Component({
  selector: 'app-detalle-pedido',
  templateUrl: './detalle-pedido.component.html',
  styleUrls: ['./detalle-pedido.component.scss']
})
export class DetallePedidoComponent implements OnInit {

  venta!: Venta
  productosVenta: ProductoVenta[] = [];

  constructor(
    private ventaService: VentaService,
    private detalleVentaService: DetalleVentaService,
    private productoService: ProductosApiService,
    private usuarioService: UsuarioApiService,
    private route: ActivatedRoute,
    private router: Router) {
  }

  ngOnInit(): void {
    registerLocaleData(localeEs, 'es')
    this.validate();
    this.getPedido();
  }

  obtenerProductosVenta(id_venta: number){
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


  getPedido(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.ventaService.getVenta(id)
    .subscribe( data => {
      this.venta =
      new Venta(
        parseInt(data.id),
        data.fecha,
        data.impuesto,
        parseFloat(data.total),
        parseInt(data.id_usuario))
        this.obtenerProductosVenta(this.venta.id);
    });
  }

    validate() {
      if (!this.usuarioService.autenticado) {
        this.router.navigate(['/', 'home']);
      }
    }

}
