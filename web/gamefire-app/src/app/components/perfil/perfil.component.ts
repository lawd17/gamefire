import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Direccion } from 'src/app/model/data/Direccion';
import { MetodoPago } from 'src/app/model/data/MetodoPago';
import { Usuario } from 'src/app/model/data/Usuario';
import { Venta } from 'src/app/model/data/Venta';
import { DireccionService } from 'src/app/services/direccion.service';
import { MetodoPagoService } from 'src/app/services/metodo-pago.service';
import { UsuarioApiService } from 'src/app/services/usuario-api.service';
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
  textMessage = ""
  textError = ""
  metodoPago!: MetodoPago
  direccion!: Direccion
  usuario!: Usuario
  readonly = true
  pedidos: Venta[] = []

  constructor(
    private usuarioService: UsuarioApiService,
    private direccionService: DireccionService,
    private metdoPagoService: MetodoPagoService,
    private ventaService: VentaService,
  ) {}

  ngOnInit(): void {
    registerLocaleData(localeEs, 'es')
    this.obtenerUsuario();
  }

  seleccionado(element: HTMLAnchorElement){
    this.opcionSeleccionada = element.id;
    this.readonly = true;
  }

  desactivarReadonly(){
    this.readonly = false;
  }

  obtenerPedidos(id_usuario: number){
    this.ventaService.getVentaByUserId(id_usuario)
    .subscribe( data => {
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

    });
  }

  obtenerUsuario(){
    this.usuarioService.getUserAuthenticated()
    .subscribe( data => {
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
      }),(error:HttpErrorResponse) => {
        if (error.status == 400) {
          //controlar que ha ocurrido un error en la api
        }
      }
  }

  obtenerMetodoPago(id_usuario: number){
    this.metdoPagoService.getMetodoPago(id_usuario)
    .subscribe( data => {
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
      }),
      (error:HttpErrorResponse) => {
        if (error.status == 200) {
          //controlar que ha ocurrido un error en la api
        }
      }
  }

  obtenerDireccion(id_usuario: number){
    this.direccionService.getDireccion(id_usuario)
    .subscribe( data => {
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

   }),
   (error:HttpErrorResponse) => {
     if (error.status == 400) {
      //controlar que ha ocurrido un error en la api
     }
   }
  }

  editarUsuario(){
    this.textError = "";
    this.textMessage = "";

    var response = this.usuarioService.postUser(this.usuario)
    .subscribe(data => {
      this.textMessage = "Guardado correctamente.";
      this.readonly = true;
    },
    (error:HttpErrorResponse) => {
      if (error.status == 400) {
        this.textError = "Error en alguno de los datos introducido.";

      }
    });
  }

  editarDireccion(){
    this.textError = "";
    this.textMessage = "";
    var response = this.direccionService.postDireccion(this.direccion)
    .subscribe(data => {
      this.textMessage = "Guardado correctamente.";
      this.readonly = true;
    },
    (error:HttpErrorResponse) => {
      if (error.status == 400) {
        this.textError = "Error en alguno de los datos introducido.";
      }
    });
  }

  editarMetodoPago() {
    this.textError = "";
    this.textMessage = "";
    if (this.metodoPago.tipo_pago != 'CREDIT_CARD') {
      this.metodoPago.numero_cuenta = 0;
      this.metodoPago.titular = "";
      this.metodoPago.expiracion = "";
      this.metodoPago.cvv = 0;
    }

    var response = this.metdoPagoService.postMetodoPago(this.metodoPago)
    .subscribe(data => {
        this.textMessage = "Guardado correctamente.";
        this.readonly = true;
    },
    (error:HttpErrorResponse) => {
      if (error.status == 400) {
        this.textError = "Error en alguno de los datos introducido.";
      }
    });
  }

  termsChange(selected: any): void {
    this.metodoPago.tipo_pago = selected.target.value;
  }

  validarTipoPago(value: string): boolean{
    return value == this.metodoPago.tipo_pago;
  }

}
