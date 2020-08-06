import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { BuscarComponent } from './components/buscar/buscar.component';
import { HomeComponent } from './components/home/home.component';
import { CardsCarouselComponent } from './components/cards-carousel/cards-carousel.component';
import { DetalleComponent } from './components/detalle/detalle.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    BuscarComponent,
    HomeComponent,
    CardsCarouselComponent,
    DetalleComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
