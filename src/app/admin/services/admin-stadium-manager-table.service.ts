import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { FilterMode } from 'src/app/core/models/filter-mode.interface';
import { Pagination } from 'src/app/core/models/pagination.interface';
import { SortMode } from 'src/app/core/models/sort-mode.interface';
import { StadiumService } from 'src/app/core/services/stadium.service';
import { TableAction, TableActionType } from 'src/app/datatable/models/table-action.interface';
import { TableCell } from 'src/app/datatable/models/table-cell.interface';
import { TableColumn } from 'src/app/datatable/models/table-column.interface';
import { TableRow } from 'src/app/datatable/models/table-row.interface';
import { TableService } from 'src/app/datatable/services/table.service';

@Injectable()
export class AdminStadiumManagerTableService implements TableService {

  columns: TableColumn[] = [
    { name: 'id', text: 'ID', type: 'TextTableCellComponent', sortable: true, center: true },
    { name: 'name', text: 'Name', type: 'TextTableCellComponent', sortable: true },
    { name: 'capacity', text: 'Capacity', type: 'TextTableCellComponent', sortable: true, center: true },
    { name: 'builtYear', text: 'Built', type: 'TextTableCellComponent', sortable: true, center: true },
    { name: 'pitchSize', text: 'Pitch Size', type: 'TextTableCellComponent', sortable: true },
    { name: 'address', text: 'Address', type: 'TextTableCellComponent', sortable: true },
    { name: 'phone', text: 'Phone', type: 'TextTableCellComponent', sortable: true },
    { name: 'photoUrl', text: 'Photo', type: 'ImageTableCellComponent', sortable: false, center: true },
    { name: 'actions', text: 'Actions', type: 'ActionsTableCellComponent', sortable: false }
  ];

  rows: TableRow[];

  pagination: Pagination = {
    pageNumber: 1,
    pageSize: 10
  };

  sortMode: SortMode = {
    sortBy: 'id',
    isSortAscending: true
  };

  filterMode: FilterMode = {};

  actions: TableAction[] = [
    { class: 'btn-dark', icon: 'fa fa-edit', text: 'Edit', type: TableActionType.Edit },
    { class: 'btn-danger', icon: 'fa fa-trash', text: 'Delete', type: TableActionType.Delete }
  ];

  constructor(private stadiumService: StadiumService) { }

  getDataColumns() {
    return this.columns;
  }

  getRawData() {
    return this.stadiumService.getStadiums(this.pagination,
      this.sortMode, this.filterMode)
      .pipe(
        map((response: any) => {
          this.pagination = response.pagination;
          return response.items;
        })
      )
      .toPromise();
  }

  async getDataRows() {
    return await this.getRawData()
      .then(data => {
        this.rows = data.map(row => {
          const cells: TableCell = <any>{};

          for (const key in row) {
            if (!row.hasOwnProperty(key)) {
              continue;
            }
            cells[key] = {
              value: row[key]
            };
          }

          cells['actions'] = {
            value: this.actions,
            showText: false
          };

          return { cells };
        });

        return this.rows;
      });
  }

}
