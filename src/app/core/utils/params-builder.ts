import { HttpParams } from '@angular/common/http';

import { FilterMode } from '../models/filter-mode.interface';
import { Pagination } from '../models/pagination.interface';
import { SortMode } from '../models/sort-mode.interface';

export class ParamsBuilder {

  private params: HttpParams;

  constructor() {
    this.params = new HttpParams();
  }

  applyPagination(pagination: Pagination) {
    this.params = this.params
      .set('pageNumber', pagination.pageNumber.toString())
      .set('pageSize', pagination.pageSize.toString());

    return this;
  }

  applySort(sortMode: SortMode) {
    this.params = this.params
      .set('sortBy', sortMode.sortBy)
      .set('isSortAscending', sortMode.isSortAscending.toString());

    return this;
  }

  applyFilter(filterMode: FilterMode) {
    for (const key in filterMode) {
      if (filterMode[key]) {
        this.params = this.params.set(key, filterMode[key].toString());
      }
    }

    return this;
  }

  build() {
    return this.params;
  }

}
