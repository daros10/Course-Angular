import { Component, OnInit } from '@angular/core';
import { HeroesService, Heroe } from '../../../services/heroes.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent implements OnInit {

  heroes: Heroe[] = [];

  constructor( private heroesService: HeroesService, private router: Router ) { }

  ngOnInit() {
    this.heroes = this.heroesService.getHeroes();
  }

  buscarHeroe( termino: any ) {
    console.log(termino);
    this.router.navigate(['/result', termino]);
  }

}
