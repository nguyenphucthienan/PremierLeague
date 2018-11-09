import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { MatchDetailComponent } from './components/match-detail/match-detail.component';
import { MatchGoalsComponent } from './components/match-goals/match-goals.component';
import { MatchesRoutingModule } from './matches-routing.module';
import { MatchesComponent } from './matches.component';
import { MatchResolver } from './resolvers/match.resolver';

@NgModule({
  declarations: [
    MatchesComponent,
    MatchDetailComponent,
    MatchGoalsComponent
  ],
  imports: [
    SharedModule,
    MatchesRoutingModule
  ],
  providers: [
    MatchResolver
  ]
})
export class MatchesModule { }
