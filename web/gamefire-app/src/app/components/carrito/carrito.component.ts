import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { itemCarrito } from 'src/app/model/data/itemCarrito';
import { UsuarioApiService } from 'src/app/services/usuario-api.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.scss']
})
export class CarritoComponent implements OnInit {
  carrito: Array<itemCarrito> = [];
  varLocalSotorage = "myCart"
  total: number = 0;
  metodoPagoSelected: String = "";


  constructor(private usuarioService: UsuarioApiService, private route: Router) { }

  ngOnInit(): void {
    registerLocaleData(localeEs, 'es')
    this.total = this.getTotal();
    this.validate()
    this.usuarioService.reloadCartStorage()
    this.carrito = this.usuarioService.getCarrito()
  }

  ngDoCheck(): void {
    this.total = this.getTotal();
    this.usuarioService.reloadCartStorage();
    this.carrito = this.usuarioService.getCarrito()
  }

  getTotal() {
    this.total = 0;
    this.carrito.forEach(element => {
      this.total += element.producto.precio_venta * element.cantidad;
    })

    return this.total;
  }

  cambiarCantidad(item: itemCarrito, cantidad: string){
    this.usuarioService.changeQunatityCart(item, cantidad);
  }

  deleteProductInCart(item: itemCarrito){
    this.usuarioService.deleteProductInCart(item)
  }

  validate() {
    if (!this.usuarioService.autenticado) {
      this.route.navigate(['/', 'home']);
    }
  }

  termsChange(selected: any): void {
    this.metodoPagoSelected = selected.target.value;
  }

}
