import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { Club } from '../models/club.interface';
import { Pagination } from '../models/pagination.interface';
import { SortMode } from '../models/sort-mode.interface';

@Injectable()
export class ClubService {

  private readonly clubUrl = `${environment.apiUrl}/clubs`;

  private readonly defaultPagination: Pagination = {
    pageNumber: 1,
    pageSize: 8
  };

  private readonly defaultSortMode: SortMode = {
    sortBy: 'name',
    isSortAscending: true
  };

  constructor(private http: HttpClient) { }

  getClubs(pagination = this.defaultPagination,
    sortMode: SortMode = this.defaultSortMode): Observable<Club[]> {
    const params = new HttpParams()
      .set('pageNumber', pagination.pageNumber.toString())
      .set('pageSize', pagination.pageSize.toString())
      .set('sortBy', sortMode.sortBy)
      .set('isSortAscending', sortMode.isSortAscending.toString());

    return this.http.get<Club[]>(`${this.clubUrl}`, { params: params });
  }

  getClub(id: number): Observable<Club> {
    return this.http.get<Club>(`${this.clubUrl}/${id}`);
  }

}
