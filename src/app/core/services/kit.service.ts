import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { FilterMode } from '../models/filter-mode.interface';
import { Kit } from '../models/kit.interface';
import { Pagination } from '../models/pagination.interface';
import { SortMode } from '../models/sort-mode.interface';
import { ParamsBuilder } from '../utils/params-builder';
import { UrlUtils } from '../utils/url-utils';

@Injectable()
export class KitService {

  private readonly kitUrl = `${environment.apiUrl}/squads/{squadId}/kits`;
  private readonly kitListUrl = `${environment.apiUrl}/squads/{squadId}/kits/list`;
  private readonly kitDetailUrl = `${environment.apiUrl}/squads/{squadId}/kits/{id}`;

  private readonly defaultPagination: Pagination = {
    pageNumber: 1,
    pageSize: 10
  };

  private readonly defaultSortMode: SortMode = {
    sortBy: 'name',
    isSortAscending: true
  };

  constructor(private http: HttpClient) { }

  getKits(pagination: Pagination = this.defaultPagination,
    sortMode: SortMode = this.defaultSortMode,
    filterMode?: FilterMode): Observable<Kit[]> {
    const params = new ParamsBuilder()
      .applyPagination(pagination)
      .applySort(sortMode)
      .applyFilter(filterMode)
      .build();

    return this.http.get<Kit[]>(`${this.kitUrl}`, { params: params });
  }

  getKitsBySquadId(squadId: number): Observable<Kit[]> {
    const url = UrlUtils.resolveParams(this.kitListUrl, { squadId });
    return this.http.get<Kit[]>(url);
  }

  getKit(squadId: number, id: number): Observable<Kit> {
    const url = UrlUtils.resolveParams(this.kitDetailUrl, { squadId, id });
    return this.http.get<Kit>(url);
  }

}
