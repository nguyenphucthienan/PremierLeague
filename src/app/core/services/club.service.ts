import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { Club } from '../models/club.interface';
import { FilterMode } from '../models/filter-mode.interface';
import { Pagination } from '../models/pagination.interface';
import { SortMode } from '../models/sort-mode.interface';
import { ParamsBuilder } from '../utils/params-builder';

@Injectable()
export class ClubService {

  private readonly clubUrl = `${environment.apiUrl}/clubs`;

  private readonly defaultPagination: Pagination = {
    pageNumber: 1,
    pageSize: 10
  };

  private readonly defaultSortMode: SortMode = {
    sortBy: 'name',
    isSortAscending: true
  };

  constructor(private http: HttpClient) { }

  getClubs(pagination: Pagination = this.defaultPagination,
    sortMode: SortMode = this.defaultSortMode,
    filterMode?: FilterMode): Observable<Club[]> {
    const params = new ParamsBuilder()
      .applyPagination(pagination)
      .applySort(sortMode)
      .applyFilter(filterMode)
      .build();

    return this.http.get<Club[]>(`${this.clubUrl}`, { params });
  }

  getBriefListClub(): Observable<Club[]> {
    return this.http.get<Club[]>(`${this.clubUrl}/brief-list`);
  }

  getBriefListClubBySeasonId(seasonId: number): Observable<Club[]> {
    const params = new ParamsBuilder()
      .applyFilter({ seasonId })
      .build();

    return this.http.get<Club[]>(`${this.clubUrl}/brief-list`, { params });
  }

  getClub(id: number): Observable<Club> {
    return this.http.get<Club>(`${this.clubUrl}/${id}`);
  }

  createClub(club: Club): Observable<Club> {
    return this.http.post<Club>(`${this.clubUrl}`, club);
  }

  editClub(id: number, club: Club): Observable<Club> {
    return this.http.put<Club>(`${this.clubUrl}/${id}`, club);
  }

  deleteClub(id: number): Observable<Club> {
    return this.http.delete<Club>(`${this.clubUrl}/${id}`);
  }

}
