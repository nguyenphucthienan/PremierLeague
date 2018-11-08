import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { ClubsRoutingModule } from './clubs-routing.module';
import { ClubsComponent } from './clubs.component';
import { ClubCardComponent } from './components/club-card/club-card.component';

@NgModule({
  declarations: [
    ClubsComponent,
    ClubCardComponent
  ],
  imports: [
    SharedModule,
    ClubsRoutingModule
  ]
})
export class ClubsModule { }
