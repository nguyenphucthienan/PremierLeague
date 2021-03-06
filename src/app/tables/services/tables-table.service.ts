import { Injectable } from '@angular/core';
import { FilterMode } from 'src/app/core/models/filter-mode.interface';
import { Pagination } from 'src/app/core/models/pagination.interface';
import { SortMode } from 'src/app/core/models/sort-mode.interface';
import { RankingTableService } from 'src/app/core/services/ranking-table.service';
import { TableAction, TableActionType } from 'src/app/datatable/models/table-action.interface';
import { TableCell } from 'src/app/datatable/models/table-cell.interface';
import { TableColumn } from 'src/app/datatable/models/table-column.interface';
import { TableRow } from 'src/app/datatable/models/table-row.interface';
import { TableService } from 'src/app/datatable/services/table.service';

@Injectable()
export class TablesTableService implements TableService {

  columns: TableColumn[] = [
    { name: 'rank', text: 'Rank', type: 'RankTableCellComponent', sortable: false, center: true },
    { name: 'photoUrl', text: 'Club', type: 'ImageTableCellComponent', sortable: false, center: true },
    { name: 'club', text: '', type: 'ObjectTextTableCellComponent', sortable: false },
    { name: 'played', text: 'Played', type: 'TextTableCellComponent', sortable: false, center: true },
    { name: 'won', text: 'W', type: 'TextTableCellComponent', sortable: false, center: true },
    { name: 'drawn', text: 'D', type: 'TextTableCellComponent', sortable: false, center: true },
    { name: 'lost', text: 'L', type: 'TextTableCellComponent', sortable: false, center: true },
    { name: 'goalFor', text: 'GF', type: 'TextTableCellComponent', sortable: false, center: true },
    { name: 'goalAgainst', text: 'GA', type: 'TextTableCellComponent', sortable: false, center: true },
    { name: 'goalDifference', text: 'GD', type: 'TextTableCellComponent', sortable: false, center: true },
    { name: 'point', text: 'P', type: 'TextTableCellComponent', sortable: false, center: true },
    { name: 'actions', text: 'Actions', type: 'ActionsTableCellComponent', sortable: false }
  ];

  rows: TableRow[];

  pagination: Pagination;

  sortMode: SortMode = {
    sortBy: 'rank',
    isSortAscending: true
  };

  filterMode: FilterMode = {};

  actions: TableAction[] = [
    { class: 'btn-primary', icon: '', text: 'Detail', type: TableActionType.GetDetail }
  ];

  constructor(private rankingTableService: RankingTableService) { }

  getDataColumns() {
    return this.columns;
  }

  getRawData() {
    return this.rankingTableService
      .getTable(this.filterMode)
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

            if (key === 'rank') {
              cells[key] = {
                value: row[key],
                textProperty: 'name',
                totalClubs: data.length
              };
            } else if (key === 'club') {
              cells[key] = {
                value: row[key],
                textProperty: 'name',
                bold: true
              };

              cells['photoUrl'] = {
                value: row[key].photoUrl
              };
            } else if (key === 'point') {
              cells[key] = {
                value: row[key],
                bold: true
              };
            } else {
              cells[key] = {
                value: row[key]
              };
            }
          }

          cells['actions'] = {
            value: this.actions,
            showText: true
          };

          return { cells };
        });

        return this.rows;
      });
  }

}
