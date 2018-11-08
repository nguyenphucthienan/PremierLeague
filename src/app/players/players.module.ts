import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { PlayersRoutingModule } from './players-routing.module';
import { PlayersComponent } from './players.component';
import { PlayersResolver } from './resolvers/players.resolver';

@NgModule({
  declarations: [
    PlayersComponent
  ],
  imports: [
    SharedModule,
    PlayersRoutingModule
  ],
  providers: [
    PlayersResolver
  ]
})
export class PlayersModule { }
