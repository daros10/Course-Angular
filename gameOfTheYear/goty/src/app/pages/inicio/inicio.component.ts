import { Game } from './../../interfaces/interfaces';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
})
export class InicioComponent implements OnInit {
  juegos: any[] = [];

  constructor(private db: AngularFirestore) {}

  ngOnInit(): void {
    this.db
      .collection('goty')
      .valueChanges()
      .pipe(
        map((respuesta: Game[]) => {
          return respuesta.map(({ name, votos }) => ({ name, value: votos }));
        })
      )
      .subscribe((juegos) => {
        // console.log(juegos);
        this.juegos = juegos;
      });
  }
}
