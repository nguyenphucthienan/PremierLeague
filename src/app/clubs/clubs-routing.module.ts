import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BriefSeasonsResolver } from '../core/resolvers/brief-seasons.resolver';
import { ClubsComponent } from './clubs.component';
import { ClubDetailComponent } from './components/club-detail/club-detail.component';
import { ClubResolver } from './resolvers/club.resolver';

const routes: Routes = [
  {
    path: '',
    component: ClubsComponent,
    resolve: {
      seasons: BriefSeasonsResolver
    }
  },
  {
    path: ':id',
    component: ClubDetailComponent,
    resolve: {
      club: ClubResolver
    }
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
