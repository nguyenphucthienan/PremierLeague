import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { FilterMode } from 'src/app/core/models/filter-mode.interface';
import { Pagination } from 'src/app/core/models/pagination.interface';
import { SortMode } from 'src/app/core/models/sort-mode.interface';
import { PlayerService } from 'src/app/core/services/player.service';
import { TableAction, TableActionType } from 'src/app/datatable/models/table-action.interface';
import { TableCell } from 'src/app/datatable/models/table-cell.interface';
import { TableColumn } from 'src/app/datatable/models/table-column.interface';
import { TableRow } from 'src/app/datatable/models/table-row.interface';
import { TableService } from 'src/app/datatable/services/table.service';
import { PositionTypePipe } from 'src/app/shared/pipes/position-type.pipe';

@Injectable()
export class AdminPlayerManagerTableService implements TableService {

  columns: TableColumn[] = [
    { name: 'id', text: 'ID', type: 'TextTableCellComponent', sortable: true },
    { name: 'photoUrl', text: 'Photo', type: 'ImageTableCellComponent', sortable: false, center: true },
    { name: 'name', text: 'Name', type: 'TextTableCellComponent', sortable: true },
    { name: 'positionType', text: 'Position', type: 'PipedTextTableCellComponent', sortable: true },
    { name: 'nationality', text: 'Nationality', type: 'TextTableCellComponent', sortable: true },
    { name: 'birthdate', text: 'Birthdate', type: 'TextTableCellComponent', sortable: true },
    { name: 'height', text: 'Height', type: 'TextTableCellComponent', sortable: true },
    { name: 'weight', text: 'Weight', type: 'TextTableCellComponent', sortable: true },
    { name: 'actions', text: 'Actions', type: 'ActionsTableCellComponent', sortable: false }
  ];

  rows: TableRow[];

  pagination: Pagination = {
    pageNumber: 1,
    pageSize: 10
  };

  sortMode: SortMode = {
    sortBy: 'name',
    isSortAscending: true
  };

  filterMode: FilterMode = {};

  actions: TableAction[] = [
    { class: 'btn-info', icon: 'fa fa-info-circle', text: 'Detail', type: TableActionType.GetDetail },
    { class: 'btn-primary', icon: 'fa fa-edit', text: 'Edit', type: TableActionType.Edit },
    { class: 'btn-danger', icon: 'fa fa-trash', text: 'Delete', type: TableActionType.Delete }
  ];

  constructor(private playerService: PlayerService,
    private positionTypePipe: PositionTypePipe) { }

  getDataColumns() {
    return this.columns;
  }

  getRawData() {
    return this.playerService.getPlayers(this.pagination,
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

            if (key === 'positionType') {
              cells[key] = {
                value: row[key],
                pipe: this.positionTypePipe
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
