import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ClubsComponent } from './clubs.component';
import { ClubsResolver } from './resolvers/clubs.resolver';

const routes: Routes = [
  {
    path: '',
    component: ClubsComponent,
    resolve: { clubs: ClubsResolver }
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
