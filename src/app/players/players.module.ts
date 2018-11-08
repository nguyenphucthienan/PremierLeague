import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { PlayersRoutingModule } from './players-routing.module';
import { PlayersComponent } from './players.component';

@NgModule({
  declarations: [
    PlayersComponent
  ],
  imports: [
    SharedModule,
    PlayersRoutingModule
  ]
})
export class PlayersModule { }
