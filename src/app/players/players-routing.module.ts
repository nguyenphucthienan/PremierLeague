import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BriefClubsResolver } from '../core/resolvers/brief-clubs.resolver';
import { PlayerDetailComponent } from './components/player-detail/player-detail.component';
import { PlayersComponent } from './players.component';
import { PlayerResolver } from './resolvers/player.resolver';
import { PlayersResolver } from './resolvers/players.resolver';

const routes: Routes = [
  {
    path: '',
    component: PlayersComponent,
    resolve: {
      clubs: BriefClubsResolver,
      players: PlayersResolver
    }
  },
  {
    path: ':id',
    component: PlayerDetailComponent,
    resolve: { player: PlayerResolver }
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
