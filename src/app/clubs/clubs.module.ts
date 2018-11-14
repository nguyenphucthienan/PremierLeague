import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { ClubsRoutingModule } from './clubs-routing.module';
import { ClubsComponent } from './clubs.component';
import { ClubCardComponent } from './components/club-card/club-card.component';
import { ClubDetailComponent } from './components/club-detail/club-detail.component';
import { ClubFixturesComponent } from './components/club-fixtures/club-fixtures.component';
import { ClubKitCardComponent } from './components/club-kit-card/club-kit-card.component';
import { ClubKitsComponent } from './components/club-kits/club-kits.component';
import { ClubResultsComponent } from './components/club-results/club-results.component';
import { ClubSquadComponent } from './components/club-squad/club-squad.component';
import { ClubStadiumComponent } from './components/club-stadium/club-stadium.component';
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
    ClubKitsComponent,
    ClubKitCardComponent,
    ClubStadiumComponent,
    ClubFixturesComponent,
    ClubResultsComponent
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
