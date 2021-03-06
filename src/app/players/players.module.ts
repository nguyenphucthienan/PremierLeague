import { NgModule } from '@angular/core';

import { DatatableModule } from '../datatable/datatable.module';
import { SharedModule } from '../shared/shared.module';
import { PlayerDetailComponent } from './components/player-detail/player-detail.component';
import { PlayerOverviewComponent } from './components/player-overview/player-overview.component';
import { PlayersRoutingModule } from './players-routing.module';
import { PlayersComponent } from './players.component';
import { PlayerResolver } from './resolvers/player.resolver';
import { PlayersResolver } from './resolvers/players.resolver';

@NgModule({
  declarations: [
    PlayersComponent,
    PlayerDetailComponent,
    PlayerOverviewComponent
  ],
  imports: [
    SharedModule,
    PlayersRoutingModule,
    DatatableModule
  ],
  providers: [
    PlayersResolver,
    PlayerResolver
  ]
})
export class PlayersModule { }
