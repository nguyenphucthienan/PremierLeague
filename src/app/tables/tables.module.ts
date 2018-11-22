import { NgModule } from '@angular/core';

import { DatatableModule } from '../datatable/datatable.module';
import { SharedModule } from '../shared/shared.module';
import { TablesRoutingModule } from './tables-routing.module';
import { TablesComponent } from './tables.component';

@NgModule({
  declarations: [
    TablesComponent
  ],
  imports: [
    SharedModule,
    TablesRoutingModule,
    DatatableModule
  ]
})
export class TablesModule { }
