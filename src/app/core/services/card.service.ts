import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { Card } from '../models/card.interface';
import { FilterMode } from '../models/filter-mode.interface';
import { Pagination } from '../models/pagination.interface';
import { SortMode } from '../models/sort-mode.interface';
import { ParamsBuilder } from '../utils/params-builder';
import { UrlUtils } from '../utils/url-utils';

@Injectable()
export class CardService {

  private readonly cardUrl = `${environment.apiUrl}/matches/{matchId}/cards`;
  private readonly cardDetailUrl = `${environment.apiUrl}/matches/{matchId}/cards/{id}`;

  private readonly defaultPagination: Pagination = {
    pageNumber: 1,
    pageSize: 10
  };

  private readonly defaultSortMode: SortMode = {
    sortBy: 'cardTime',
    isSortAscending: true
  };

  constructor(private http: HttpClient) { }

  getCards(pagination: Pagination = this.defaultPagination,
    sortMode: SortMode = this.defaultSortMode,
    filterMode?: FilterMode): Observable<Card[]> {
    const matchId = filterMode ? filterMode.matchId : null;
    const url = UrlUtils.resolveParams(this.cardUrl, { matchId });
    const params = new ParamsBuilder()
      .applyPagination(pagination)
      .applySort(sortMode)
      .applyFilter(filterMode)
      .build();

    return this.http.get<Card[]>(url, { params });
  }

  getCard(matchId: number, id: number): Observable<Card> {
    const url = UrlUtils.resolveParams(this.cardUrl, { matchId, id });
    return this.http.get<Card>(url);
  }

  createCard(matchId: number, card: Card): Observable<Card> {
    const url = UrlUtils.resolveParams(this.cardUrl, { matchId });
    return this.http.post<Card>(url, card);
  }

  editCard(matchId: number, id: number, card: Card): Observable<Card> {
    const url = UrlUtils.resolveParams(this.cardDetailUrl, { matchId, id });
    return this.http.put<Card>(url, card);
  }

  deleteCard(matchId: number, id: number): Observable<Card> {
    const url = UrlUtils.resolveParams(this.cardDetailUrl, { matchId, id });
    return this.http.delete<Card>(url);
  }

}
