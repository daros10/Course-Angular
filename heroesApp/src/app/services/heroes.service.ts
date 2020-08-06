import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HeroeModel } from '../models/heroe.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class HeroesService {
  private url = 'https://angular-projects-247bc.firebaseio.com';

  constructor(private http: HttpClient) {}

  crearHeroe(heroe: HeroeModel) {
    return this.http.post(`${this.url}/heroes.json`, heroe).pipe(
      map((respuesta: any) => {
        heroe.id = respuesta.name;
        return heroe;
      })
    );
  }

  actualizarHeroe(heroe: HeroeModel) {
    // primera opcion para no mandar el ID en el objeto heroe
    // const { nombre, poder, vivo } = heroe;
    // const heroeUpdate = {
    //   nombre,
    //   poder,
    //   vivo,
    // };
    // segunda opcion para eliminar el ID del objeto hero
    const heroeUpdate = {
      ...heroe,
    };

    delete heroeUpdate.id;
    return this.http.put(`${this.url}/heroes/${heroe.id}.json`, heroeUpdate);
  }

  borrarHeroe(id: string) {
    return this.http.delete(`${this.url}/heroes/${id}.json`);
  }

  getHeroe(id: string) {
    return this.http.get(`${this.url}/heroes/${id}.json`);
  }

  getHeroes() {
    return this.http
      .get(`${this.url}/heroes.json`)
      .pipe(map((respuesta) => this.crearArregloDeHeroes(respuesta)));
  }

  crearArregloDeHeroes(heroesOj: object) {
    const heroes: HeroeModel[] = [];
    if (heroesOj === null) {
      return [];
    }

    Object.keys(heroesOj).forEach((key) => {
      const heroe: HeroeModel = heroesOj[key];
      heroe.id = key;
      heroes.push(heroe);
    });

    return heroes;
  }
}
