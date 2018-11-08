import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { PlayerDetailComponent } from './components/player-detail/player-detail.component';
import { PlayersRoutingModule } from './players-routing.module';
import { PlayersComponent } from './players.component';
import { PlayerResolver } from './resolvers/player.resolver';
import { PlayersResolver } from './resolvers/players.resolver';

@NgModule({
  declarations: [
    PlayersComponent,
    PlayerDetailComponent
  ],
  imports: [
    SharedModule,
    PlayersRoutingModule
  ],
  providers: [
    PlayersResolver,
    PlayerResolver
  ]
})
export class PlayersModule { }
