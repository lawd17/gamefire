import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductosApiService } from 'src/app/services/productos-api.service';
import { UsuarioApiService } from 'src/app/services/usuario-api.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit {
  searchValue: string = "";

  constructor(private userService: UsuarioApiService,
    private productoService: ProductosApiService,
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
