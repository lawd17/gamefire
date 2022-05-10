import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioApiService } from 'src/app/services/usuario-api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email!: string;
  password!: string;
  errorText = "";
  constructor(private userService: UsuarioApiService, private route: Router) {}

  ngOnInit(): void {

  }

  ngDoCheck(): void {
    //Called every time that the input properties of a component or a directive are checked. Use it to extend change detection by performing a custom check.
    //Add 'implements DoCheck' to the class.
    if (this.userService.autenticado) {
      this.route.navigate(["/", "home"])
    }
  }

  login() {
    this.errorText = "";

    this.userService.login(this.email, this.password)
    .subscribe(
        data => {
          if (data) {
            this.userService.setLocalSotorageData(this.userService.userVarStorage, data)
            this.userService.emailUserAutenticado = data
            this.userService.autenticado = true;
          } else {
            this.errorText = "El email o password son incorrectos.";
          }
        },
        (error:HttpErrorResponse) => {
          //error en el formato de la contraseña o el correo
          if (error.status == 400) {
            this.errorText = "El email o password son incorrectos.";
          }
        });

  }

}
