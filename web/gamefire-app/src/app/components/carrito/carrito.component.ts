import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioApiService } from 'src/app/services/usuario-api.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.sass']
})
export class CarritoComponent implements OnInit {

  constructor(private usuarioService: UsuarioApiService, private route: Router) { }

  ngOnInit(): void {
    this.validate()
  }

  validate() {
    if (!this.usuarioService.autenticado) {
      this.route.navigate(['/', 'home']);
    }
  }

}
