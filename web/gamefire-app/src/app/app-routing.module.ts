import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuscarComponent } from './components/buscar/buscar.component';
import { CarritoComponent } from './components/carrito/carrito.component';
import { DetalleProductoComponent } from './components/detalle-producto/detalle-producto.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [
  {path: "", redirectTo: "/home", pathMatch: "full"},
  {path: 'home', component:  HomeComponent},
  {path: 'register', component:  RegisterComponent},
  {path: "producto/:id", component: DetalleProductoComponent},
  {path: "buscar/:nombre", component: BuscarComponent},
  {path: "login", component: LoginComponent, pathMatch: "full" },
  {path: "register", component: RegisterComponent, pathMatch: "full" },
  {path: "carrito", component: CarritoComponent, pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
