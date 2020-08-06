import { PeliculasService } from './../../services/peliculas.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css'],
})
export class DetalleComponent implements OnInit {
  detallePelicula = {};
  constructor(
    private activatedRroute: ActivatedRoute,
    private route: Router,
    private peliculaService: PeliculasService
  ) {
    const id: string = this.activatedRroute.snapshot.paramMap.get('id');
    this.peliculaService.detallePelicula(id).subscribe((respuesta) => {
      this.detallePelicula = respuesta;
    });
  }

  ngOnInit(): void {}

  regresar() {
    this.route.navigateByUrl('/home');
  }
}
