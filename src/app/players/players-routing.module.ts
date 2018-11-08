import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PlayersComponent } from './players.component';
import { PlayersResolver } from './resolvers/players.resolver';

const routes: Routes = [
  {
    path: '',
    component: PlayersComponent,
    resolve: { players: PlayersResolver }
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
export class PlayersRoutingModule { }
