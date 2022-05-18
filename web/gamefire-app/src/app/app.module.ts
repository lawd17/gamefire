import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CardsProductosComponent } from './components/home/cards-productos/cards-productos.component';
import { DetalleProductoComponent } from './components/detalle-producto/detalle-producto.component';
import { BuscarComponent } from './components/buscar/buscar.component';
import { AddBarPipe } from './pipe/add-bar.pipe';
import { CarritoComponent } from './components/carrito/carrito.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { DetallePedidoComponent } from './components/detalle-pedido/detalle-pedido.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    FooterComponent,
    RegisterComponent,
    HomeComponent,
    CardsProductosComponent,
    DetalleProductoComponent,
    BuscarComponent,
    AddBarPipe,
    CarritoComponent,
    PerfilComponent,
    DetallePedidoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule {
}
