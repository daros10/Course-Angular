import { Marcador } from './../../classes/marcador.class';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css'],
})
export class MapaComponent implements OnInit {
  marcadores: Marcador[] = [];
  lat = 51.678418;
  lng = 7.809007;

  constructor() {
    const nuevoMarcador = new Marcador(51.678418, 7.809007);
    this.marcadores.push(nuevoMarcador);
  }

  ngOnInit(): void {}

  agregarMarcador(lat: number, lng: number): void {
    const nuevoMarcador = new Marcador(lat, lng);
    this.marcadores.push(nuevoMarcador);
    console.log(this.marcadores);
  }
}
