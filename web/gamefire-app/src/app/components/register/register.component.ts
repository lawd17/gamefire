import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioApiService } from 'src/app/services/usuario-api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  email!: string;
  password!: string;
  confirmPassword!: string;
  errorText = "";

  constructor(private userService: UsuarioApiService, private router: Router) {}

  ngOnInit(): void {

  }

  register() {

  }



}
