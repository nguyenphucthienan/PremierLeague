import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { FilterMode } from '../models/filter-mode.interface';
import { Pagination } from '../models/pagination.interface';
import { SortMode } from '../models/sort-mode.interface';
import { Stadium } from '../models/stadium.interface';
import { ParamsBuilder } from '../utils/params-builder';

@Injectable()
export class StadiumService {

  private readonly stadiumUrl = `${environment.apiUrl}/stadiums`;

  private readonly defaultPagination: Pagination = {
    pageNumber: 1,
    pageSize: 10
  };

  private readonly defaultSortMode: SortMode = {
    sortBy: 'name',
    isSortAscending: true
  };

  constructor(private http: HttpClient) { }

  getStadiums(pagination: Pagination = this.defaultPagination,
    sortMode: SortMode = this.defaultSortMode,
    filterMode?: FilterMode): Observable<Stadium[]> {
    const params = new ParamsBuilder()
      .applyPagination(pagination)
      .applySort(sortMode)
      .applyFilter(filterMode)
      .build();

    return this.http.get<Stadium[]>(`${this.stadiumUrl}`, { params: params });
  }

  getBriefListStadium(): Observable<Stadium[]> {
    return this.http.get<Stadium[]>(`${this.stadiumUrl}/brief-list`);
  }

  getStadium(id: number): Observable<Stadium> {
    return this.http.get<Stadium>(`${this.stadiumUrl}/${id}`);
  }

  createStadium(stadium: Stadium): Observable<Stadium> {
    return this.http.post<Stadium>(`${this.stadiumUrl}`, stadium);
  }

  editStadium(id: number, stadium: Stadium): Observable<Stadium> {
    return this.http.put<Stadium>(`${this.stadiumUrl}/${id}`, stadium);
  }

  deleteStadium(id: number): Observable<Stadium> {
    return this.http.delete<Stadium>(`${this.stadiumUrl}/${id}`);
  }

}
