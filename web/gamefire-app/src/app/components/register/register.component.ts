import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validator, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioApiService } from 'src/app/services/usuario-api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  confirmPassword!: string;
  errorText = "";
  usuario!: FormGroup;


  constructor(private userService: UsuarioApiService, private router: Router) {}

  ngOnInit(): void {
    this.createFormulario();
  }

  createFormulario(){
    this.usuario = new FormGroup({
      email: new FormControl('', [Validators.email, Validators.required]),
      nombre: new FormControl('', [Validators.required, Validators.pattern(/^([A-ZÁÉÍÓÚ]{1}[a-zñáéíóú]+[\s]*)$/)]),
      apellidos: new FormControl('', [Validators.required, Validators.pattern(/^(([A-ZÁÉÍÓÚ]{1}[a-zñáéíóú]+[\s]?){1,5})$/)]),
      username: new FormControl('', [Validators.required, Validators.pattern(/^[a-z0-9_-]{3,15}$/)]),
      password: new FormControl('', [Validators.required, Validators.pattern(/^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z]?)\S{8,25}$/)]),
      telefono: new FormControl('', [])
    });
  }

  register() {
    this.errorText = "";
    var response = this.userService.registerUser(this.usuario)
    .subscribe(data => {
      if (data) {
        this.userService.setLocalSotorageData(this.userService.userVarStorage, data)
        this.userService.autenticado = data
        this.router.navigate(['/home'])
      } else {
        this.errorText = "Error en alguno de los datos introducido.";
      }
    },
    (error:HttpErrorResponse) => {
      if (error.status == 400) {
        this.errorText = "Ha ocurrido un erro inesperado, vuelva a intentarlo.";
      }
    });
  }
}
