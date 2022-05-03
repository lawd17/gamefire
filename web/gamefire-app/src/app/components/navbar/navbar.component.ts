import { Component, OnInit } from '@angular/core';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { UsuarioApiService } from 'src/app/services/usuario-api.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit {

  constructor(private router: AppRoutingModule, private userService: UsuarioApiService) {}

  ngOnInit(): void {
  }

  logout(){
    this.userService.logout();
  }

  autenticado(){
    return this.userService.autenticado;
  }

}
