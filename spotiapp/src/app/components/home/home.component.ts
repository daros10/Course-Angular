import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent  {

  loading: boolean;
  nuevasCanciones: any[] = [];
  errorService: boolean;
  mensajeError: string;

  constructor( private spotify: SpotifyService ) {

    this.loading = true;
    this.errorService = false;

    spotify.getNewReleases().subscribe( (data: any) => {
      console.log(data);
      this.nuevasCanciones = data;
      this.loading = false;
     }, (  error ) => {
       this.loading = false;
       this.errorService = true;
       this.mensajeError = error.error.error.message;
     });
   }

}
