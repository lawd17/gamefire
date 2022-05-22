import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit {

  confirmPassword!: string;
  error: string = "";
  message: string = ""
  usuario!: FormGroup;


  constructor(private userService: UsuarioService, private router: Router) { }

  ngOnInit(): void {
    this.createFormulario();
  }

  /**
   *  Metodo que genera el formgrup con los pattern y los campos requeridos
   */
  createFormulario() {
    this.usuario = new FormGroup({
      email: new FormControl('', [Validators.email, Validators.required]),
      nombre: new FormControl('', [Validators.required, Validators.pattern(/^([A-ZÁÉÍÓÚ]{1}[a-zñáéíóú]+[\s]*)$/)]),
      apellidos: new FormControl('', [Validators.required, Validators.pattern(/^(([A-ZÁÉÍÓÚ]{1}[a-zñáéíóú]+[\s]?){1,5})$/)]),
      username: new FormControl('', [Validators.required, Validators.pattern(/^[a-z0-9_-]{3,15}$/)]),
      password: new FormControl('', [Validators.required, Validators.pattern(/^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z]?)\S{8,25}$/)]),
      telefono: new FormControl('', [])
    });
  }

  /**
   * Metodo que realiza el registro del usaurio con los datos del formulario
   */
  register() {
    this.error = "";
    this.userService.registerUser(this.usuario)
      .subscribe(data => {
        if (data) {
          this.userService.setLocalSotorageData(this.userService.userVarStorage, data)
          this.userService.autenticado = data
          this.router.navigate(['/login'])
        } else {
          this.error = "Error en alguno de los datos introducido.";
        }
      }, (error: HttpErrorResponse) => this.controlError(error))
  }

  controlError(error: HttpErrorResponse) {
    if (error.status == 400) {
      this.error = "Ha ocurrido un error con los datos para la solicitud, intentelo de nuevo"
    }

    if (error.status == 500) {
      this.error = "Ha ocurrido un error con el servidor, intentelo de nuevo mas tarde."
    }
  }
}
