import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HeroesService, Heroe } from '../../services/heroes.service';

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
})
export class BuscadorComponent implements OnInit {
  heroeResult: any[] = [];
  termino: string;

  constructor( private activaredRoute: ActivatedRoute , private heroService: HeroesService ) {

   }

   ngOnInit() {
    this.activaredRoute.params.subscribe( params => {
      this.termino = params.nombre;
      this.heroeResult = this.heroService.buscarHeroe( params.nombre );
      console.log(this.heroeResult);
    });
   }


}
