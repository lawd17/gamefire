import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
    private router: Router) {}

  ngOnInit(): void {
  }

  ngDoCheck(): void {

  }

  logout(){
    this.userService.logout();
  }

  autenticado(){
    return this.userService.autenticado;
  }

}
