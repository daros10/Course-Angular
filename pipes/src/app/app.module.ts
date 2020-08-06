import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// para poder observar la informacion de las fechas en espanol
import { LOCALE_ID } from '@angular/core';
import localeEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
registerLocaleData(localeEs);


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { CapitalizadoPipe } from './pipes/capitalizado.pipe';
import { DomseguroPipe } from './pipes/domseguro.pipe';
import { OcultarcontrasenaPipe } from './pipes/ocultarcontrasena.pipe';


@NgModule({
  declarations: [
    AppComponent,
    CapitalizadoPipe,
    DomseguroPipe,
    OcultarcontrasenaPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    // para poder observar la informacion de las fechas en espanol
    { provide: LOCALE_ID, useValue: 'es' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
