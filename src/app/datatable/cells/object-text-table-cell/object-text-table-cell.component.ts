import { Component } from '@angular/core';

import { AbstractTableCellComponent } from '../abstract-table-cell/abstract-table-cell.component';

@Component({
  selector: 'app-object-text-table-cell',
  templateUrl: './object-text-table-cell.component.html',
  styleUrls: ['./object-text-table-cell.component.scss']
})
export class ObjectTextTableCellComponent extends AbstractTableCellComponent {

  text: string;

  constructor() {
    super();
  }

  updateValue() {
    this.text = this.cell && this.cell.value[this.cell.textProperty];
  }

}
