import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { TableCellComponent } from './cells/table-cell/table-cell.component';
import { TextTableCellComponent } from './cells/text-table-cell/text-table-cell.component';
import { DatatableComponent } from './datatable.component';
import { TableRowSelectTrackingService } from './services/table-row-select-tracking.service';
import { ActionsTableCellComponent } from './cells/actions-table-cell/actions-table-cell.component';
import { ObjectTextTableCellComponent } from './cells/object-text-table-cell/object-text-table-cell.component';

@NgModule({
  declarations: [
    DatatableComponent,
    TableCellComponent,
    TextTableCellComponent,
    ActionsTableCellComponent,
    ObjectTextTableCellComponent
  ],
  imports: [
    SharedModule
  ],
  exports: [
    DatatableComponent
  ],
  providers: [
    TableRowSelectTrackingService
  ]
})
export class DatatableModule { }
