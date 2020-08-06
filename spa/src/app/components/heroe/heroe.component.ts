import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HeroesService } from '../../services/heroes.service';



@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
})
export class HeroeComponent  {

  heroe: any = {};
  constructor( private activaredRoute: ActivatedRoute, private heroService: HeroesService ) {
    this.activaredRoute.params.subscribe( params => {
      this.heroe = heroService.getHeroe( params.id );
      console.log(this.heroe);
    });
   }

}
