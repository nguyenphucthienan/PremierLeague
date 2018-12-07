import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { FilterMode } from '../models/filter-mode.interface';
import { Manager } from '../models/manager.interface';
import { Pagination } from '../models/pagination.interface';
import { SortMode } from '../models/sort-mode.interface';
import { ParamsBuilder } from '../utils/params-builder';

@Injectable()
export class ManagerService {

  private readonly managerUrl = `${environment.apiUrl}/managers`;

  private readonly defaultPagination: Pagination = {
    pageNumber: 1,
    pageSize: 10
  };

  private readonly defaultSortMode: SortMode = {
    sortBy: 'name',
    isSortAscending: true
  };

  constructor(private http: HttpClient) { }

  getManagers(pagination: Pagination = this.defaultPagination,
    sortMode: SortMode = this.defaultSortMode,
    filterMode?: FilterMode): Observable<Manager[]> {
    const params = new ParamsBuilder()
      .applyPagination(pagination)
      .applySort(sortMode)
      .applyFilter(filterMode)
      .build();

    return this.http.get<Manager[]>(`${this.managerUrl}`, { params: params });
  }

  getBriefListManager(): Observable<Manager[]> {
    return this.http.get<Manager[]>(`${this.managerUrl}/brief-list`);
  }

  getManager(id: number): Observable<Manager> {
    return this.http.get<Manager>(`${this.managerUrl}/${id}`);
  }

  createManager(manager: Manager): Observable<Manager> {
    return this.http.post<Manager>(`${this.managerUrl}`, manager);
  }

  editManager(id: number, manager: Manager): Observable<Manager> {
    return this.http.put<Manager>(`${this.managerUrl}/${id}`, manager);
  }

  deleteManager(id: number): Observable<Manager> {
    return this.http.delete<Manager>(`${this.managerUrl}/${id}`);
  }

}
