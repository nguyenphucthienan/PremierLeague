import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { Club } from '../models/club.interface';
import { SortMode } from '../models/sort-mode.interface';

@Injectable()
export class ClubService {

  private readonly clubUrl = `${environment.apiUrl}/clubs`;
  private readonly defaultSortMode = {
    sortBy: 'name',
    isSortAscending: true
  };

  constructor(private http: HttpClient) { }

  getClubs(pageNumber = 1, pageSize = 8,
    sortMode: SortMode = this.defaultSortMode): Observable<Club[]> {
    const params = new HttpParams()
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString())
      .set('sortBy', sortMode.sortBy)
      .set('isSortAscending', sortMode.isSortAscending.toString());

    return this.http.get<Club[]>(`${this.clubUrl}`, { params: params });
  }

}
