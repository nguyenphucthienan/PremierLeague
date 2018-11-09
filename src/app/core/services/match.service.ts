import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { Match } from '../models/match.interface';
import { Pagination } from '../models/pagination.interface';
import { SortMode } from '../models/sort-mode.interface';

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
    sortMode: SortMode = this.defaultSortMode, clubId?: number): Observable<Match[]> {
    let params = new HttpParams()
      .set('pageNumber', pagination.pageNumber.toString())
      .set('pageSize', pagination.pageSize.toString())
      .set('sortBy', sortMode.sortBy)
      .set('isSortAscending', sortMode.isSortAscending.toString());

    if (clubId) {
      params = params.set('clubId', clubId.toString());
    }

    return this.http.get<Match[]>(`${this.matchUrl}`, { params: params });
  }

  getMatch(id: number): Observable<Match> {
    return this.http.get<Match>(`${this.matchUrl}/${id}`);
  }

}
