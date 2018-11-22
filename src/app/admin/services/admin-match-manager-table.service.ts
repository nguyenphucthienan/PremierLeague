import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { FilterMode } from 'src/app/core/models/filter-mode.interface';
import { Pagination } from 'src/app/core/models/pagination.interface';
import { SortMode } from 'src/app/core/models/sort-mode.interface';
import { MatchService } from 'src/app/core/services/match.service';
import { TableAction, TableActionType } from 'src/app/datatable/models/table-action.interface';
import { TableCell } from 'src/app/datatable/models/table-cell.interface';
import { TableColumn } from 'src/app/datatable/models/table-column.interface';
import { TableRow } from 'src/app/datatable/models/table-row.interface';
import { TableService } from 'src/app/datatable/services/table.service';

@Injectable()
export class AdminMatchManagerTableService implements TableService {

  columns: TableColumn[] = [
    { name: 'id', text: 'ID', type: 'TextTableCellComponent', sortable: true, center: true },
    { name: 'round', text: 'R.', type: 'TextTableCellComponent', sortable: true, center: true },
    { name: 'matchClubs', text: 'Clubs', type: 'MatchClubsTableCellComponent', sortable: false },
    { name: 'matchTime', text: 'Match Time', type: 'DateTimeTableCellComponent', sortable: true },
    { name: 'isPlayed', text: 'Played', type: 'BooleanTableCellComponent', sortable: true, center: true },
    { name: 'stadium', text: 'Stadium', type: 'ObjectTextTableCellComponent', sortable: true },
    { name: 'actions', text: 'Actions', type: 'ActionsTableCellComponent', sortable: false }
  ];

  rows: TableRow[];

  pagination: Pagination = {
    pageNumber: 1,
    pageSize: 10
  };

  sortMode: SortMode = {
    sortBy: 'matchTime',
    isSortAscending: true
  };

  filterMode: FilterMode = {};

  actions: TableAction[] = [
    { class: 'btn-primary', icon: 'fa fa-info-circle', text: 'Detail', type: TableActionType.GetDetail },
    { class: 'btn-dark', icon: 'fa fa-empire', text: 'Goals', type: TableActionType.NavigateToMatchGoals },
    { class: 'btn-dark', icon: 'fa fa-file-o', text: 'Cards', type: TableActionType.NavigateToMatchCards },
    { class: 'btn-dark', icon: 'fa fa-edit', text: 'Edit', type: TableActionType.Edit },
    { class: 'btn-danger', icon: 'fa fa-trash', text: 'Delete', type: TableActionType.Delete }
  ];

  constructor(private matchService: MatchService) { }

  getDataColumns() {
    return this.columns;
  }

  getRawData() {
    return this.matchService.getMatches(this.pagination,
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

          cells['matchClubs'] = {
            value: {
              isPlayed: cells['isPlayed'].value,
              homeClub: cells['homeClub'].value,
              awayClub: cells['awayClub'].value,
              homeScore: cells['homeScore'].value,
              awayScore: cells['awayScore'].value
            }
          };

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
