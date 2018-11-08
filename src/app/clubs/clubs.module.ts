import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { ClubsRoutingModule } from './clubs-routing.module';
import { ClubsComponent } from './clubs.component';
import { ClubCardComponent } from './components/club-card/club-card.component';
import { ClubDetailComponent } from './components/club-detail/club-detail.component';
import { ClubResolver } from './resolvers/club.resolver';
import { ClubsResolver } from './resolvers/clubs.resolver';

@NgModule({
  declarations: [
    ClubsComponent,
    ClubCardComponent,
    ClubDetailComponent
  ],
  imports: [
    SharedModule,
    ClubsRoutingModule
  ],
  providers: [
    ClubsResolver,
    ClubResolver
  ]
})
export class ClubsModule { }
