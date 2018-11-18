import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { FilterMode } from '../models/filter-mode.interface';
import { Pagination } from '../models/pagination.interface';
import { Season } from '../models/season.interface';
import { SortMode } from '../models/sort-mode.interface';
import { ParamsBuilder } from '../utils/params-builder';

@Injectable()
export class SeasonService {

  private readonly seasonUrl = `${environment.apiUrl}/seasons`;

  private readonly defaultPagination: Pagination = {
    pageNumber: 1,
    pageSize: 10
  };

  private readonly defaultSortMode: SortMode = {
    sortBy: 'name',
    isSortAscending: true
  };

  constructor(private http: HttpClient) { }

  getSeasons(pagination: Pagination = this.defaultPagination,
    sortMode: SortMode = this.defaultSortMode,
    filterMode?: FilterMode): Observable<Season[]> {
    const params = new ParamsBuilder()
      .applyPagination(pagination)
      .applySort(sortMode)
      .applyFilter(filterMode)
      .build();

    return this.http.get<Season[]>(`${this.seasonUrl}`, { params: params });
  }

  getBriefListSeason(): Observable<any[]> {
    return this.http.get<any[]>(`${this.seasonUrl}/brief-list`);
  }

  getSeason(id: number): Observable<Season> {
    return this.http.get<Season>(`${this.seasonUrl}/${id}`);
  }

  createSeason(season: Season): Observable<Season> {
    return this.http.post<Season>(`${this.seasonUrl}`, season);
  }

  updateSeason(id: number, season: Season): Observable<Season> {
    return this.http.put<Season>(`${this.seasonUrl}/${id}`, season);
  }

  deleteSeason(id: number): Observable<Season> {
    return this.http.delete<Season>(`${this.seasonUrl}/${id}`);
  }

}
