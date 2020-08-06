import { Component, OnInit } from '@angular/core';
import { HeroesService } from 'src/app/services/heroes.service';
import { HeroeModel } from 'src/app/models/heroe.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-heros',
  templateUrl: './heros.component.html',
  styleUrls: ['./heros.component.css'],
})
export class HerosComponent implements OnInit {
  heroes: HeroeModel[] = [];
  cargando = false;

  constructor(private heroesService: HeroesService) {}

  ngOnInit(): void {
    this.cargando = true;
    this.heroesService.getHeroes().subscribe((resp) => {
      this.heroes = resp;
      this.cargando = false;
    });
  }

  borrarHeroe(heroe: HeroeModel, index: number) {
    Swal.fire({
      title: 'Esta seguro?',
      text: `Esta seguro que desea borrar a ${heroe.nombre}`,
      icon: 'warning',
      showConfirmButton: true,
      showCancelButton: true,
    }).then((result) => {
      if (result.value) {
        this.heroesService.borrarHeroe(heroe.id).subscribe((respuesta) => {
          this.heroes.splice(index, 1);
        });
        Swal.fire(
          'Eliminado',
          'Heroe eliminado satisfactoriamente.',
          'success'
        );
      }
    });
  }
}
