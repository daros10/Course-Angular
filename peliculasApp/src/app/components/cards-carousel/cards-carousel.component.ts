import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cards-carousel',
  templateUrl: './cards-carousel.component.html',
  styleUrls: ['./cards-carousel.component.css'],
})
export class CardsCarouselComponent implements OnInit {
  @Input('peliculas') peliculas: [];
  constructor(private router: Router) {}

  ngOnInit(): void {}

  imageClick(id: string) {
    this.router.navigate(['detalle', id]);
  }
}
