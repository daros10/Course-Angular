import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PeliculasService {
  url = 'https://api.themoviedb.org/3';
  apiKey = '9d196f8c20b022980b09178390d7a56f';

  constructor(private http: HttpClient) {}

  getPopulares() {
    return this.http
      .get(
        `${this.url}/discover/movie?sort_by=popularity.desc&language=es&api_key=${this.apiKey}`
      )
      .pipe(
        map((response) => {
          let contenido: [] = response['results'];
          let sixResults: [] = [];
          for (let i = 0; i <= 5; i++) {
            sixResults.push(contenido[i]);
          }
          return sixResults;
        })
      );
  }

  getEnCArtelera() {
    return this.http
      .get(`${this.url}/movie/now_playing?api_key=${this.apiKey}&language=es`)
      .pipe(
        map((response) => {
          let contenido: [] = response['results'];
          let sixResults: [] = [];
          for (let i = 0; i <= 5; i++) {
            sixResults.push(contenido[i]);
          }
          return sixResults;
        })
      );
  }

  masValorados() {
    return this.http
      .get(`${this.url}/movie/top_rated?api_key=${this.apiKey}&language=es`)
      .pipe(
        map((response) => {
          let contenido: [] = response['results'];
          let sixResults: [] = [];
          for (let i = 0; i <= 5; i++) {
            sixResults.push(contenido[i]);
          }
          return sixResults;
        })
      );
  }

  detallePelicula(id: string) {
    return this.http.get(
      `${this.url}/movie/${id}?api_key=${this.apiKey}&language=es`
    );
  }

  buscarPelicula(titulo: string) {
    return this.http
      .get(
        `${this.url}/search/movie?api_key=${this.apiKey}&language=es&query=${titulo}&page=1`
      )
      .pipe(
        map((response) => {
          return response['results'];
        })
      );
  }
}

//https://api.themoviedb.org/3/search/movie?api_key=9d196f8c20b022980b09178390d7a56f&language=es&query=up&page=1
