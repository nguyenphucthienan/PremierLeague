import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { ClubsRoutingModule } from './clubs-routing.module';
import { ClubsComponent } from './clubs.component';
import { ClubCardComponent } from './components/club-card/club-card.component';
import { ClubDetailComponent } from './components/club-detail/club-detail.component';
import { ClubFixturesComponent } from './components/club-fixtures/club-fixtures.component';
import { ClubSquadComponent } from './components/club-squad/club-squad.component';
import { SquadPlayerCardComponent } from './components/squad-player-card/squad-player-card.component';
import { ClubPlayersResolver } from './resolvers/club-players.resolver';
import { ClubResolver } from './resolvers/club.resolver';
import { ClubsResolver } from './resolvers/clubs.resolver';

@NgModule({
  declarations: [
    ClubsComponent,
    ClubCardComponent,
    ClubDetailComponent,
    ClubSquadComponent,
    SquadPlayerCardComponent,
    ClubFixturesComponent
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
