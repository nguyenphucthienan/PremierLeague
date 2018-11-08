import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { ClubsRoutingModule } from './clubs-routing.module';
import { ClubsComponent } from './clubs.component';
import { ClubCardComponent } from './components/club-card/club-card.component';
import { ClubDetailComponent } from './components/club-detail/club-detail.component';
import { ClubSquadComponent } from './components/club-squad/club-squad.component';
import { ClubPlayersResolver } from './resolvers/club-players.resolver';
import { ClubResolver } from './resolvers/club.resolver';
import { ClubsResolver } from './resolvers/clubs.resolver';
import { SquadPlayerCardComponent } from './components/squad-player-card/squad-player-card.component';

@NgModule({
  declarations: [
    ClubsComponent,
    ClubCardComponent,
    ClubDetailComponent,
    ClubSquadComponent,
    SquadPlayerCardComponent
  ],
  imports: [
    SharedModule,
    ClubsRoutingModule
  ],
  providers: [
    ClubsResolver,
    ClubResolver,
    ClubPlayersResolver
  ]
})
export class ClubsModule { }
