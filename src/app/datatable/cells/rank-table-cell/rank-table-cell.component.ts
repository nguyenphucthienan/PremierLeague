import { Component } from '@angular/core';
import { AbstractTableCellComponent } from 'src/app/datatable/cells/abstract-table-cell/abstract-table-cell.component';

@Component({
  selector: 'app-rank-table-cell',
  templateUrl: './rank-table-cell.component.html',
  styleUrls: ['./rank-table-cell.component.scss']
})
export class RankTableCellComponent extends AbstractTableCellComponent {

  totalClubs: number;
  rank: number;

  constructor() {
    super();
  }

  updateValue() {
    if (this.cell) {
      this.totalClubs = this.cell.totalClubs;
      this.rank = this.cell && this.cell.value;
    }
  }

}
