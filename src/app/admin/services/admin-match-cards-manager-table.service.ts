import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { FilterMode } from 'src/app/core/models/filter-mode.interface';
import { Pagination } from 'src/app/core/models/pagination.interface';
import { SortMode } from 'src/app/core/models/sort-mode.interface';
import { CardService } from 'src/app/core/services/card.service';
import { TableAction, TableActionType } from 'src/app/datatable/models/table-action.interface';
import { TableCell } from 'src/app/datatable/models/table-cell.interface';
import { TableColumn } from 'src/app/datatable/models/table-column.interface';
import { TableRow } from 'src/app/datatable/models/table-row.interface';
import { TableService } from 'src/app/datatable/services/table.service';
import { GoalTypePipe } from 'src/app/shared/pipes/goal-type.pipe';

@Injectable()
export class AdminMatchCardsManagerTableService implements TableService {

  columns: TableColumn[] = [
    { name: 'id', text: 'ID', type: 'TextTableCellComponent', sortable: true },
    { name: 'club', text: 'Club', type: 'ObjectTextTableCellComponent', sortable: true },
    { name: 'player', text: 'Player', type: 'ObjectTextTableCellComponent', sortable: true },
    { name: 'cardType', text: 'Type', type: 'PipedTextTableCellComponent', sortable: true },
    { name: 'isOwnGoal', text: 'OG', type: 'BooleanTableCellComponent', sortable: true },
    { name: 'cardTime', text: 'Time', type: 'TextTableCellComponent', sortable: true },
    { name: 'actions', text: 'Actions', type: 'ActionsTableCellComponent', sortable: false }
  ];

  rows: TableRow[];

  pagination: Pagination = {
    pageNumber: 1,
    pageSize: 10
  };

  sortMode: SortMode = {
    sortBy: 'cardTime',
    isSortAscending: true
  };

  filterMode: FilterMode = {};

  actions: TableAction[] = [
    { class: 'btn-primary', icon: 'fa fa-edit', text: 'Edit', type: TableActionType.Edit },
    { class: 'btn-danger', icon: 'fa fa-trash', text: 'Delete', type: TableActionType.Delete }
  ];

  constructor(private cardService: CardService,
    private goalTypePipe: GoalTypePipe) { }

  getDataColumns() {
    return this.columns;
  }

  getRawData() {
    return this.cardService.getCards(this.pagination,
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

            if (key === 'club' || key === 'player') {
              cells[key] = {
                value: row[key],
                textProperty: 'name'
              };
            } else if (key === 'cardType') {
              cells[key] = {
                value: row[key],
                pipe: this.goalTypePipe
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
