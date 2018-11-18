import { SortMode } from '../core/models/sort-mode.interface';
import { TableColumn } from '../datatable/models/table-column.interface';

export class TableUtils {

  static getHeaderIconClass(sortMode: SortMode, column: TableColumn) {
    if (sortMode.sortBy === column.name) {
      if (sortMode.isSortAscending) {
        return 'fa fa-sort-asc';
      }

      return 'fa fa-sort-desc';
    }

    return 'fa fa-sort';
  }

}
