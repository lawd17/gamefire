import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductoService } from 'src/app/services/producto.service';
import {  UsuarioService } from 'src/app/services/usuario.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit {
  searchValue: string = "";

  constructor(private userService: UsuarioService,
    private productoService: ProductoService,
    private router: Router)
  { }

  ngOnInit(): void { }

  ngDoCheck(): void {

    if (this.searchValue != this.productoService.searchValue) {
      this.productoService.searchValue = this.searchValue;
      this.router.navigate(['/', 'buscar'])
    }
  }

  /**
   * Metodo para relizar el logout
   */
  logout() {
    this.userService.logout();
  }

  /**
   * Funcion que comprueba si el usuario esta logueado
   */
  autenticado() {
    return this.userService.autenticado;
  }

}
