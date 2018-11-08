import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ClubsComponent } from './clubs.component';
import { ClubDetailComponent } from './components/club-detail/club-detail.component';
import { ClubResolver } from './resolvers/club.resolver';
import { ClubsResolver } from './resolvers/clubs.resolver';

const routes: Routes = [
  {
    path: '',
    component: ClubsComponent,
    resolve: { clubs: ClubsResolver }
  },
  {
    path: ':id',
    component: ClubDetailComponent,
    resolve: { club: ClubResolver }
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class ClubsRoutingModule { }
