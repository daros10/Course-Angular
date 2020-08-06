import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ng-style',
  template: `

  <div *ngIf="mostrarValidacionFuente" class="alert alert-danger" role="alert">
    El tamaño de la fuente es inferior a cero.
  </div>


    <p *ngIf="!mostrarValidacionFuente" [style.fontSize.px]="tamanio">
      Hola mundo...esta es una etiqueta!
    </p>

    <button class="btn btn-primary" (click)="aumentarTamanio()">
      <i class="fa fa-plus"></i>
    </button>
    <button class="btn btn-primary ml-2" (click)="disminuirTamanio()">
      <i class="fa fa-minus"></i>
    </button>
  `,
  styles: []
})
export class NgStyleComponent implements OnInit {

  tamanio = 10;
  mostrarValidacionFuente: boolean;

  constructor() { }

  ngOnInit() {
  }

  aumentarTamanio() {
    this.tamanio = this.tamanio + 5;
    if (this.tamanio <= 0) {
      this.mostrarValidacionFuente = true;
    } else {
      this.mostrarValidacionFuente = false;
    }
  }

  disminuirTamanio() {
    this.tamanio = this.tamanio - 5;
    if (this.tamanio <= 0) {
      this.mostrarValidacionFuente = true;
    } else {
      this.mostrarValidacionFuente = false;
    }

  }

}
