import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { FilterMode } from '../models/filter-mode.interface';
import { Goal } from '../models/goal.interface';
import { Pagination } from '../models/pagination.interface';
import { SortMode } from '../models/sort-mode.interface';
import { ParamsBuilder } from '../utils/params-builder';
import { UrlUtils } from '../utils/url-utils';

@Injectable()
export class GoalService {

  private readonly goalUrl = `${environment.apiUrl}/matches/{matchId}/goals`;
  private readonly goalDetailUrl = `${environment.apiUrl}/matches/{matchId}/goals/{id}`;

  private readonly defaultPagination: Pagination = {
    pageNumber: 1,
    pageSize: 10
  };

  private readonly defaultSortMode: SortMode = {
    sortBy: 'goalTime',
    isSortAscending: true
  };

  constructor(private http: HttpClient) { }

  getGoals(pagination: Pagination = this.defaultPagination,
    sortMode: SortMode = this.defaultSortMode,
    filterMode?: FilterMode): Observable<Goal[]> {
    const matchId = filterMode ? filterMode.matchId : null;
    const url = UrlUtils.resolveParams(this.goalUrl, { matchId });
    const params = new ParamsBuilder()
      .applyPagination(pagination)
      .applySort(sortMode)
      .applyFilter(filterMode)
      .build();

    return this.http.get<Goal[]>(url, { params });
  }

  getGoal(matchId: number, id: number): Observable<Goal> {
    const url = UrlUtils.resolveParams(this.goalUrl, { matchId, id });
    return this.http.get<Goal>(url);
  }

  createGoal(matchId: number, goal: Goal): Observable<Goal> {
    const url = UrlUtils.resolveParams(this.goalUrl, { matchId });
    return this.http.post<Goal>(url, goal);
  }

  editGoal(matchId: number, id: number, goal: Goal): Observable<Goal> {
    const url = UrlUtils.resolveParams(this.goalDetailUrl, { matchId, id });
    return this.http.put<Goal>(url, goal);
  }

  deleteGoal(matchId: number, id: number): Observable<Goal> {
    const url = UrlUtils.resolveParams(this.goalDetailUrl, { matchId, id });
    return this.http.delete<Goal>(url);
  }

}
