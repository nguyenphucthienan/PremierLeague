import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { FixturesRoutingModule } from './fixtures-routing.module';
import { FixturesComponent } from './fixtures.component';
import { MatchesResolver } from './resolvers/matches.resolver';

@NgModule({
  declarations: [
    FixturesComponent
  ],
  imports: [
    SharedModule,
    FixturesRoutingModule
  ],
  providers: [
    MatchesResolver
  ]
})
export class FixturesModule { }
