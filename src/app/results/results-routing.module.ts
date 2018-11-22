import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BriefSeasonsResolver } from '../core/resolvers/brief-seasons.resolver';
import { ResultsComponent } from './results.component';

const routes: Routes = [
  {
    path: '',
    component: ResultsComponent,
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
export class ResultsRoutingModule { }
