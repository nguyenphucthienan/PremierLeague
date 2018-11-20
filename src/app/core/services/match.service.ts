import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { FilterMode } from '../models/filter-mode.interface';
import { Match } from '../models/match.interface';
import { Pagination } from '../models/pagination.interface';
import { SortMode } from '../models/sort-mode.interface';
import { ParamsBuilder } from '../utils/params-builder';

@Injectable()
export class MatchService {

  private readonly matchUrl = `${environment.apiUrl}/matches`;

  private readonly defaultPagination: Pagination = {
    pageNumber: 1,
    pageSize: 10
  };

  private readonly defaultSortMode: SortMode = {
    sortBy: 'matchTime',
    isSortAscending: true
  };

  constructor(private http: HttpClient) { }

  getMatches(pagination: Pagination = this.defaultPagination,
    sortMode: SortMode = this.defaultSortMode,
    filterMode?: FilterMode): Observable<Match[]> {
    const params = new ParamsBuilder()
      .applyPagination(pagination)
      .applySort(sortMode)
      .applyFilter(filterMode)
      .build();

    return this.http.get<Match[]>(`${this.matchUrl}`, { params });
  }

  getMatch(id: number): Observable<Match> {
    return this.http.get<Match>(`${this.matchUrl}/${id}`);
  }

  generateMatches(seasonId: number): Observable<any> {
    const params = new ParamsBuilder()
      .applyFilter({ seasonId })
      .build();

    return this.http.post<any>(`${this.matchUrl}/generate`, null, { params });
  }

  createMatch(match: Match): Observable<Match> {
    return this.http.post<Match>(`${this.matchUrl}`, match);
  }

  editMatch(id: number, match: Match): Observable<Match> {
    return this.http.put<Match>(`${this.matchUrl}/${id}`, match);
  }

  deleteMatch(id: number): Observable<Match> {
    return this.http.delete<Match>(`${this.matchUrl}/${id}`);
  }

  getListRounds(seasonId: number): Observable<number[]> {
    const params = new ParamsBuilder()
      .applyFilter({ seasonId })
      .build();

    return this.http.get<number[]>(`${this.matchUrl}/round-list`, { params });
  }

}
