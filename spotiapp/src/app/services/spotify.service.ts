import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class SpotifyService {
  constructor(private http: HttpClient) {
    console.log("Spotify listo para usar");
  }

  getQuery(query: string) {
    const url = `https://api.spotify.com/v1/${query}`;
    const headers = new HttpHeaders({
      Authorization:
        "Bearer QAxMeLabY7_pph7CINWaxeXZePTLF-5LV9R5Bhzul7rLUgOvfhzAq72xjH6JrCmvt1E4CqLmL6Zvhmat4E"
    });
    return this.http.get(url, { headers });
  }

  getNewReleases() {
    return this.getQuery( 'browse/new-releases?limit=20' )
    .pipe(
        map(data => {return data["albums"].items;})
      );
  }

  getArtistas(termino: string) {
    return this.getQuery(`search?q=${termino}&type=artist&limit=15`)
      .pipe(
        map(data => {
          return data["artists"].items;
        })
      );
  }

  getArtista(id: string) {
    return this.getQuery(`artists/${id}`);
      // .pipe(
      //   map(data => {
      //     return data["artists"].items;
      //   })
      // );
  }

  getTopTrack(id: string) {
    return this.getQuery(`artists/${id}/top-tracks?country=us`)
          .pipe(
        map(data => {
          return data["tracks"];
        })
      );
  }
}
