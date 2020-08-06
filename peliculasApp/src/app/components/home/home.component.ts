import { PeliculasService } from './../../services/peliculas.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  peliculas: [] = [];
  populares: [] = [];
  estrenos: [] = [];
  constructor(private peliculasService: PeliculasService) {
    this.peliculasService.getPopulares().subscribe((response) => {
      this.peliculas = response;
    });

    this.peliculasService.getEnCArtelera().subscribe((response) => {
      this.populares = response;
    });

    this.peliculasService.masValorados().subscribe((response) => {
      this.estrenos = response;
    });
  }

  ngOnInit(): void {}
}
