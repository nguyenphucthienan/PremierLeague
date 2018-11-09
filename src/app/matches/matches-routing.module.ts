import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MatchDetailComponent } from './components/match-detail/match-detail.component';
import { MatchesComponent } from './matches.component';
import { MatchResolver } from './resolvers/match.resolver';

const routes: Routes = [
  {
    path: '',
    component: MatchesComponent,
  },
  {
    path: ':id',
    component: MatchDetailComponent,
    resolve: { match: MatchResolver }
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
export class MatchesRoutingModule { }
