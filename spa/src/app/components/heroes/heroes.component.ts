import { Component, OnInit } from '@angular/core';
import { HeroesService, Heroe } from '../../services/heroes.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styles: []
})
export class HeroesComponent implements OnInit {

  heroes: Heroe[] = [];

  constructor( private heroesService: HeroesService, private router: Router ) {
    // console.log('====== constructor ======');
  }

  // el ngOnInit se dispara cuando la pagina ya esta cargada
  // mucho despues que el contructor, ya que este es el primero
  // que se ejecuta.
  ngOnInit() {
    // console.log('====== ngOnInit ======');
    this.heroes = this.heroesService.getHeroes();
    // console.log(this.heroes);
  }

  verHeroe( idx: number ) {
    console.log('Id heroe:', idx);
    this.router.navigate( ['/heroe', idx] );
  }

}
