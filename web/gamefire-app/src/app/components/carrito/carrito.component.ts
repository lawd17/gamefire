import { registerLocaleData } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import localeEs from '@angular/common/locales/es';

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DetalleVenta } from 'src/app/model/data/DetalleVenta';
import { Direccion } from 'src/app/model/data/Direccion';
import { itemCarrito } from 'src/app/model/data/itemCarrito';
import { MetodoPago } from 'src/app/model/data/MetodoPago';
import { Usuario } from 'src/app/model/data/Usuario';
import { Venta } from 'src/app/model/data/Venta';
import { DetalleVentaService } from 'src/app/services/detalle-venta.service';
import { DireccionService } from 'src/app/services/direccion.service';
import { MetodoPagoService } from 'src/app/services/metodo-pago.service';
import { UsuarioApiService } from 'src/app/services/usuario-api.service';
import { VentaService } from 'src/app/services/venta.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.scss']
})

export class CarritoComponent implements OnInit {
  carrito: Array<itemCarrito> = [];
  impuesto = "IGIC"
  total: number = 0;
  metodoPagoSelected: string = "";
  metodoPago!: MetodoPago
  direccion!: Direccion
  usuario!: Usuario
  venta!: Venta
  error = ""
  message = ""
  readonly = true;

  constructor(
    private usuarioService: UsuarioApiService,
    private route: Router,
    private direccionService: DireccionService,
    private metdoPagoService: MetodoPagoService,
    private ventaService: VentaService,
    private detalleVentaService: DetalleVentaService)
  { }

  ngOnInit(): void {
    registerLocaleData(localeEs, 'es')//para poder poner la maneda en euros
    this.total = this.getTotal();
    this.validate()
    this.usuarioService.reloadCartStorage()
    this.carrito = this.usuarioService.getCarrito()
    this.obtenerUsuario();
  }

  ngDoCheck(): void {
    this.total = this.getTotal()
    this.usuarioService.reloadCartStorage()
    this.carrito = this.usuarioService.getCarrito()
  }

  /**
   * Metodo que se encarga de obtener el usuario y llamar a
   * otros metodos para obtemer el metodo de pago y la direccion
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

        this.obtenerDireccion(this.usuario.id);
        this.obtenerMetodoPago(this.usuario.id);
      }, (error: HttpErrorResponse) => this.controlError(error))

  }

  /**
   * Metodo que obtiene una direccion de un usuario por su id
   * @param id_usuario
   */
  obtenerDireccion(id_usuario: number) {
    this.direccionService.getDireccion(id_usuario)
      .subscribe(data => {
        if (data.toString() != "false") {
          this.direccion =
            new Direccion(
              parseInt(data.id),
              data.direccion,
              data.ciudad,
              data.codigo_postal,
              data.pais,
              parseInt(data.id_usuario));
        } else {
          this.direccion = new Direccion(0, "", "", "", "", id_usuario);
        }

      }, (error: HttpErrorResponse) => this.controlError(error))

  }

  /**
   * Metodo que obtiene el metodo de pago de un usuario por su id
   * @param id_usuario
   */
  obtenerMetodoPago(id_usuario: number) {
    this.metdoPagoService.getMetodoPago(id_usuario)
      .subscribe(data => {
        var numero_cuenta = parseInt(data.numero_cuenta);
        var cvv = parseInt(data.cvv);

        if (isNaN(numero_cuenta)) {
          numero_cuenta = 0;
        }

        if (isNaN(cvv)) {
          cvv = 0;
        }

        this.metodoPago =
          new MetodoPago(
            parseInt(data.id),
            data.tipo_pago,
            data.titular,
            numero_cuenta,
            data.expiracion,
            cvv,
            parseInt(data.id_usuario))
      }, (error: HttpErrorResponse) => this.controlError(error))
  }

  /**
   *Funcion que se encarga de calcular y devolver el tota
   * @returns
   */
  getTotal() {
    this.total = 0;
    this.carrito.forEach(element => {
      this.total += element.producto.precio_venta * element.cantidad;
    })

    return this.total;
  }

  /**
   * Funcion que se encarga de cambiar la cantidad de un producto
   * del carrito
   * @param item producto del carro
   * @param cantidad nueva cantidad
   */
  cambiarCantidad(item: itemCarrito, cantidad: string) {
    this.usuarioService.changeQunatityCart(item, cantidad);
  }

  /**
   * Funcion que borra un producto del carrito
   * @param item
   */
  deleteProductInCart(item: itemCarrito) {
    this.usuarioService.deleteProductInCart(item)
  }

  /**
   * Metodo que compruba que el usurio este logueado en caso de que no
   * redirige al home
   */
  validate() {
    if (!this.usuarioService.autenticado) {
      this.route.navigate(['/', 'home']);
    }
  }

  /**
   * Metodo que cambiar el metodo de pago al seleccionado
   * @param selected
   */
  termsChange(selected: any): void {
    this.metodoPago.tipo_pago = selected.target.value;
  }

  /**
   * Funcion que comprueba si el tipo de pago actual coincide
   * con el que se pasa por parametos
   * @param value tipo de pago que se va a comprobar
   * @returns true/false
   */
  validarTipoPago(value: string): boolean {
    return value == this.metodoPago.tipo_pago;
  }

  /**
   * Metodo que realiza un llamada para un nuevo insert contra la api
   * @param detalleVenta
   */
  añadirDetalleVentas(detalleVenta: DetalleVenta) {
    this.detalleVentaService.postDetalleVenta(detalleVenta)
      .subscribe(data => {

      }, (error: HttpErrorResponse) => this.controlError(error))
  }

  /**
   * Esto metodo se encarga de realizar todos las actualizaciones e insert para poder realizar
   * un pedido nuevo, debido a es asincrono todos los pasos se van realizando segun terminar
   * las peticiones hacia la api
   */
  realizarPedido() {
    this.error = "";

    this.direccionService.postDireccion(this.direccion).subscribe(data => {
      if (this.metodoPago.tipo_pago != 'CREDIT_CARD') {
        this.metodoPago.numero_cuenta = 0
        this.metodoPago.titular = ""
        this.metodoPago.expiracion = ""
        this.metodoPago.cvv = 0
      }

      this.metdoPagoService.postMetodoPago(this.metodoPago).subscribe(data => {
        this.aplicarImpuesto(this.impuesto);
        let date = new Date()
        this.venta = new Venta(0, date.toLocaleDateString(), this.impuesto, this.total, this.usuario.id)

        this.ventaService.postVenta(this.venta)
          .subscribe(data => {
            var id_venta = parseInt(data);
            if (!isNaN(id_venta)) {
              this.carrito.forEach(item => {
                let detalleVenta = new DetalleVenta(0, id_venta, item.producto.id, item.cantidad)
                this.añadirDetalleVentas(detalleVenta)
                this.usuarioService.removeCartLocalStorage()
                this.usuarioService.reloadCartStorage()
                this.carrito = this.usuarioService.getCarrito()
                this.route.navigate(['/', 'detallePedido', id_venta]);
              })

              this.message = "Pedido realizado correctamente"
            }
          }, (error: HttpErrorResponse) => this.controlError(error))
      }, (error: HttpErrorResponse) => this.controlError(error))
    }, (error: HttpErrorResponse) => this.controlError(error))

  }

  /**
   * Funcion que aplica el impuesto al total
   * @param impuesto
   */
  aplicarImpuesto(impuesto: string) {
    switch (impuesto) {
      case "IVA":
        this.total *= 1.21
        break
      case "IGIC":
        this.total *= 1.07
        break
      default:
        break
    }

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


