import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FixturesComponent } from './fixtures.component';
import { MatchesResolver } from './resolvers/matches.resolver';

const routes: Routes = [
  {
    path: '',
    component: FixturesComponent,
    resolve: { matches: MatchesResolver }
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
