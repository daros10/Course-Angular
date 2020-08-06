import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HeroComponent } from './pages/hero/hero.component';
import { HerosComponent } from './pages/heros/heros.component';

const routes: Routes = [
  { path: 'heroes', component: HerosComponent },
  { path: 'heroe/:id', component: HeroComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'heroes' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
