import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BriefSeasonsResolver } from '../core/resolvers/brief-seasons.resolver';
import { FixturesComponent } from './fixtures.component';

const routes: Routes = [
  {
    path: '',
    component: FixturesComponent,
    resolve: { seasons: BriefSeasonsResolver }
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
export class FixturesRoutingModule { }
