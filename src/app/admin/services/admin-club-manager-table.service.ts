import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { FilterMode } from 'src/app/core/models/filter-mode.interface';
import { Pagination } from 'src/app/core/models/pagination.interface';
import { SortMode } from 'src/app/core/models/sort-mode.interface';
import { ClubService } from 'src/app/core/services/club.service';
import { TableAction, TableActionType } from 'src/app/datatable/models/table-action.interface';
import { TableCell } from 'src/app/datatable/models/table-cell.interface';
import { TableColumn } from 'src/app/datatable/models/table-column.interface';
import { TableRow } from 'src/app/datatable/models/table-row.interface';
import { TableService } from 'src/app/datatable/services/table.service';

@Injectable()
export class AdminClubManagerTableService implements TableService {

  columns: TableColumn[] = [
    { name: 'id', text: 'ID', type: 'IdTableCellComponent', sortable: true },
    { name: 'photoUrl', text: 'Logo', type: 'ImageTableCellComponent', sortable: false, center: true },
    { name: 'code', text: 'Code', type: 'TextTableCellComponent', sortable: true },
    { name: 'name', text: 'Name', type: 'TextTableCellComponent', sortable: true },
    { name: 'establishedYear', text: 'Established Year', type: 'TextTableCellComponent', sortable: true },
    { name: 'stadium', text: 'Stadium', type: 'ObjectTextTableCellComponent', sortable: true },
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
    { class: 'btn-primary', icon: 'fa fa-edit', text: 'Edit', type: TableActionType.Edit },
    { class: 'btn-danger', icon: 'fa fa-trash', text: 'Delete', type: TableActionType.Delete }
  ];

  constructor(private clubService: ClubService) { }

  getDataColumns() {
    return this.columns;
  }

  getRawData() {
    return this.clubService.getClubs(this.pagination,
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

            if (key === 'stadium') {
              cells[key] = {
                value: row[key],
                textProperty: 'name'
              };
            } else {
              cells[key] = {
                value: row[key]
              };
            }
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
