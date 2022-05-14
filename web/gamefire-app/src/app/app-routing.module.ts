import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuscarComponent } from './components/buscar/buscar.component';
import { CarritoComponent } from './components/carrito/carrito.component';
import { DetallePedidoComponent } from './components/detalle-pedido/detalle-pedido.component';
import { DetalleProductoComponent } from './components/detalle-producto/detalle-producto.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [
  {path: "", redirectTo: "/home", pathMatch: "full"},
  {path: 'home', component:  HomeComponent},
  {path: 'register', component:  RegisterComponent},
  {path: "producto/:id", component: DetalleProductoComponent},
  {path: "buscar", component: BuscarComponent, pathMatch: "full"},
  {path: "login", component: LoginComponent, pathMatch: "full" },
  {path: "register", component: RegisterComponent, pathMatch: "full" },
  {path: "carrito", component: CarritoComponent, pathMatch: "full" },
  {path: "perfil", component: PerfilComponent, pathMatch: "full" },
  {path: "detallePedido/:id", component: DetallePedidoComponent, pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
