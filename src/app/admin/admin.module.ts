import { NgModule } from '@angular/core';

import { DatatableModule } from '../datatable/datatable.module';
import { SharedModule } from '../shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { AdminClubManagerComponent } from './components/admin-club-manager/admin-club-manager.component';
import { AdminPlayerManagerComponent } from './components/admin-player-manager/admin-player-manager.component';
import { AdminSeasonManagerComponent } from './components/admin-season-manager/admin-season-manager.component';
import { AdminStadiumManagerComponent } from './components/admin-stadium-manager/admin-stadium-manager.component';
import { AdminClubAddModalComponent } from './modals/admin-club-add-modal/admin-club-add-modal.component';
import { AdminClubEditModalComponent } from './modals/admin-club-edit-modal/admin-club-edit-modal.component';
import { AdminSeasonAddModalComponent } from './modals/admin-season-add-modal/admin-season-add-modal.component';
import { AdminSeasonEditModalComponent } from './modals/admin-season-edit-modal/admin-season-edit-modal.component';
import { AdminStadiumAddModalComponent } from './modals/admin-stadium-add-modal/admin-stadium-add-modal.component';
import { AdminStadiumEditModalComponent } from './modals/admin-stadium-edit-modal/admin-stadium-edit-modal.component';

@NgModule({
  declarations: [
    AdminComponent,
    AdminSeasonManagerComponent,
    AdminSeasonAddModalComponent,
    AdminSeasonEditModalComponent,
    AdminStadiumManagerComponent,
    AdminStadiumAddModalComponent,
    AdminStadiumEditModalComponent,
    AdminClubManagerComponent,
    AdminClubAddModalComponent,
    AdminClubEditModalComponent,
    AdminPlayerManagerComponent
  ],
  imports: [
    SharedModule,
    AdminRoutingModule,
    DatatableModule
  ],
  entryComponents: [
    AdminSeasonAddModalComponent,
    AdminSeasonEditModalComponent,
    AdminStadiumAddModalComponent,
    AdminStadiumEditModalComponent,
    AdminClubAddModalComponent,
    AdminClubEditModalComponent
  ]
})
export class AdminModule { }
