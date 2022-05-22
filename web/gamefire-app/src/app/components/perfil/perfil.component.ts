import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Direccion } from 'src/app/model/data/Direccion';
import { MetodoPago } from 'src/app/model/data/MetodoPago';
import { Usuario } from 'src/app/model/data/Usuario';
import { Venta } from 'src/app/model/data/Venta';
import { DireccionService } from 'src/app/services/direccion.service';
import { MetodoPagoService } from 'src/app/services/metodo-pago.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { VentaService } from 'src/app/services/venta.service';
import localeEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})

export class PerfilComponent implements OnInit {
  opcionSeleccionada = "misDatos"
  message = ""
  error = ""
  metodoPago!: MetodoPago
  direccion!: Direccion
  usuario!: Usuario
  readonly = true
  pedidos: Venta[] = []

  constructor(
    private usuarioService: UsuarioService,
    private direccionService: DireccionService,
    private metdoPagoService: MetodoPagoService,
    private ventaService: VentaService)
  {}

  ngOnInit(): void {
    registerLocaleData(localeEs, 'es')
    this.obtenerUsuario();
  }

  /**
   * Metodo que obtiene el elemento seleccionado, lo activa y activa el
   * mode readonly
   * @param element
   */
  seleccionado(element: HTMLAnchorElement) {
    this.opcionSeleccionada = element.id;
    this.readonly = true;
    this.limpiarMensajes()
  }

  /**
   * Metodo que desactiva el modo readonly
   */
  desactivarReadonly() {
    this.readonly = false;
  }

  /**
   * Metodo que obtiene todos los pedidos del usuario
   * @param id_usuario
   */
  obtenerPedidos(id_usuario: number) {
    this.ventaService.getVentaByUserId(id_usuario)
      .subscribe(data => {
        data.forEach(element => {
          let venta =
            new Venta(
              parseInt(element.id),
              element.fecha,
              element.impuesto,
              parseFloat(element.total),
              parseInt(element.id_usuario))
          this.pedidos.push(venta);
        });

      }, (error: HttpErrorResponse) => this.controlError(error))
  }

  /**
   * Metodo que obtiene el usuario autenticado
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
        this.obtenerPedidos(this.usuario.id);
      }, (error: HttpErrorResponse) => this.controlError(error))

  }

  /**
   * Metodo que obtiene el metodo de pago del usuario que tenga el id
   * que se pasa por parametros
   * @param id_usuario
   */
  obtenerMetodoPago(id_usuario: number) {
    this.metdoPagoService.getMetodoPago(id_usuario)
      .subscribe(data => {
        if (data.toString() != "false") {
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
        } else {
          this.metodoPago = new MetodoPago(0, "", "", 0, "", 0, id_usuario);
        }

      }, (error: HttpErrorResponse) => this.controlError(error))

  }

  /**
   * Metodo que obtiene la direccion del usuario que tenga el id
   * que se pasa por parametros
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
   * Metodo que se encarga de actualizar los datos
   * del usuario
   */
  editarUsuario() {
    this.limpiarMensajes();


    var response = this.usuarioService.postUser(this.usuario)
      .subscribe(data => {
        this.message = "Guardado correctamente.";
        this.readonly = true;
      }, (error: HttpErrorResponse) => this.controlError(error))

  }

  /**
   * Metodo que se encarga de actualizar la direccion
   * del usuario
   */
  editarDireccion() {
    this.limpiarMensajes()
    var response = this.direccionService.postDireccion(this.direccion)
      .subscribe(data => {
        this.message = "Guardado correctamente.";
        this.readonly = true;
      }, (error: HttpErrorResponse) => this.controlError(error))

  }

  /**
   * Metodo que se encarga de actualizar el metodo de pago
   * del usuario
   */
  editarMetodoPago() {
    this.limpiarMensajes()
    if (this.metodoPago.tipo_pago != 'CREDIT_CARD') {
      this.metodoPago.numero_cuenta = 0;
      this.metodoPago.titular = "";
      this.metodoPago.expiracion = "";
      this.metodoPago.cvv = 0;
    }

    var response = this.metdoPagoService.postMetodoPago(this.metodoPago)
      .subscribe(data => {
        this.message = "Guardado correctamente.";
        this.readonly = true;
      }, (error: HttpErrorResponse) => this.controlError(error))

  }

  /**
   * Metodo que cambiar el metodo de pago
   * @param selected
   */
  termsChange(selected: any): void {
    this.metodoPago.tipo_pago = selected.target.value;
  }

  /**
   * Funcion que comprueba si emtodo de pago es igual al pasado
   * @param value
   * @returns
   */
  validarTipoPago(value: string): boolean {
    return value == this.metodoPago.tipo_pago;
  }

  controlError(error: HttpErrorResponse) {
    if (error.status == 400) {
      this.error = "Ha ocurrido un error con los datos para la solicitud, intentelo de nuevo"
    }

    if (error.status == 500) {
      this.error = "Ha ocurrido un error con el servidor, intentelo de nuevo mas tarde."
    }
  }

  limpiarMensajes(){
    this.error = ""
    this.message = ""
  }

}
