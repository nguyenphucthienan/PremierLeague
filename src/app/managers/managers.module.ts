import { NgModule } from '@angular/core';

import { DatatableModule } from '../datatable/datatable.module';
import { SharedModule } from '../shared/shared.module';
import { ManagersRoutingModule } from './managers-routing.module';
import { ManagersComponent } from './managers.component';

@NgModule({
  declarations: [
    ManagersComponent
  ],
  imports: [
    SharedModule,
    ManagersRoutingModule,
    DatatableModule
  ]
})
export class ManagersModule { }
