import { NgModule } from '@angular/core';

import { DatatableModule } from '../datatable/datatable.module';
import { SharedModule } from '../shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { AdminSeasonManagerComponent } from './components/admin-season-manager/admin-season-manager.component';

@NgModule({
  declarations: [
    AdminComponent,
    AdminSeasonManagerComponent
  ],
  imports: [
    SharedModule,
    AdminRoutingModule,
    DatatableModule
  ]
})
export class AdminModule { }
