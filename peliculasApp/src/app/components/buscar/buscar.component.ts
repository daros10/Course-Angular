import { Router } from '@angular/router';
import { PeliculasService } from './../../services/peliculas.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.css'],
})
export class BuscarComponent implements OnInit {
  peliculaBuscar: string;
  resultadosBusqueda: [] = [];

  constructor(
    private peliculasService: PeliculasService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  buscarPelicula(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.peliculaBuscar = form.controls.buscar.value;
    this.peliculasService
      .buscarPelicula(this.peliculaBuscar)
      .subscribe((response) => {
        this.resultadosBusqueda = response;
      });
  }

  verDetalles(id: string) {
    this.router.navigate(['detalle', id]);
  }
}
