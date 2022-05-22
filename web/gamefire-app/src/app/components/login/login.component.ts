import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  email!: string;
  password!: string;
  error = "";

  constructor(private userService: UsuarioService, private route: Router) { }

  ngOnInit(): void {}

  ngDoCheck(): void {
    //control de url para el caso de ir la login si ya esta logueado
    if (this.userService.autenticado) {
      this.route.navigate(["/", "home"])
    }
  }

  /**
   * Metodo que se encarga de realizar el login
   */
  login() {
    this.error = "";

    this.userService.login(this.email, this.password)
      .subscribe(
        data => {
          if (data) {
            this.userService.setLocalSotorageData(this.userService.userVarStorage, data)
            this.userService.emailUserAutenticado = data
            this.userService.autenticado = true;
          } else {
            this.error = "El email o password son incorrectos.";
          }
        }, (error: HttpErrorResponse) => this.controlError(error))

  }

  controlError(error: HttpErrorResponse) {
    if (error.status == 400) {
      this.error = "El email o la contrañase no tienen el formato adecuado"
    }

    if (error.status == 500) {
      this.error = "Ha ocurrido un error con el servidor, intentelo de nuevo mas tarde."
    }
  }

}
