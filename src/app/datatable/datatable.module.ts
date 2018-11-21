import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { ActionsTableCellComponent } from './cells/actions-table-cell/actions-table-cell.component';
import { BooleanTableCellComponent } from './cells/boolean-table-cell/boolean-table-cell.component';
import { DateTimeTableCellComponent } from './cells/date-time-table-cell/date-time-table-cell.component';
import { ImageTableCellComponent } from './cells/image-table-cell/image-table-cell.component';
import { MatchClubsTableCellComponent } from './cells/match-clubs-table-cell/match-clubs-table-cell.component';
import { ObjectTextTableCellComponent } from './cells/object-text-table-cell/object-text-table-cell.component';
import { PipedTextTableCellComponent } from './cells/piped-text-table-cell/piped-text-table-cell.component';
import { TableCellComponent } from './cells/table-cell/table-cell.component';
import { TextTableCellComponent } from './cells/text-table-cell/text-table-cell.component';
import { DatatableComponent } from './datatable.component';
import { TableRowSelectTrackingService } from './services/table-row-select-tracking.service';

@NgModule({
  declarations: [
    DatatableComponent,
    TableCellComponent,
    TextTableCellComponent,
    ObjectTextTableCellComponent,
    PipedTextTableCellComponent,
    BooleanTableCellComponent,
    ActionsTableCellComponent,
    ImageTableCellComponent,
    DateTimeTableCellComponent,
    MatchClubsTableCellComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild([])
  ],
  exports: [
    DatatableComponent
  ],
  providers: [
    TableRowSelectTrackingService
  ]
})
export class DatatableModule { }
