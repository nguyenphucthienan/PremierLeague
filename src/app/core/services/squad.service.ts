import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { FilterMode } from '../models/filter-mode.interface';
import { Pagination } from '../models/pagination.interface';
import { Player } from '../models/player.interface';
import { SortMode } from '../models/sort-mode.interface';
import { Squad } from '../models/squad.interface';
import { ParamsBuilder } from '../utils/params-builder';
import { UrlUtils } from '../utils/url-utils';

@Injectable()
export class SquadService {

  private readonly squadUrl = `${environment.apiUrl}/squads`;
  private readonly squadPlayersUrl = `${environment.apiUrl}/squads/{id}/players`;
  private readonly squadPlayersDetailUrl = `${environment.apiUrl}/squads/{id}/players/{playerId}`;

  private readonly defaultPagination: Pagination = {
    pageNumber: 1,
    pageSize: 10
  };

  private readonly defaultSortMode: SortMode = {
    sortBy: 'id',
    isSortAscending: true
  };

  constructor(private http: HttpClient) { }

  getSquads(pagination: Pagination = this.defaultPagination,
    sortMode: SortMode = this.defaultSortMode,
    filterMode?: FilterMode): Observable<Squad[]> {
    const params = new ParamsBuilder()
      .applyPagination(pagination)
      .applySort(sortMode)
      .applyFilter(filterMode)
      .build();

    return this.http.get<Squad[]>(`${this.squadUrl}`, { params });
  }

  getSquad(id: number): Observable<Squad> {
    return this.http.get<Squad>(`${this.squadUrl}/${id}`);
  }

  createSquad(squad: Squad): Observable<Squad> {
    return this.http.post<Squad>(`${this.squadUrl}`, squad);
  }

  editSquad(id: number, squad: Squad): Observable<Squad> {
    return this.http.put<Squad>(`${this.squadUrl}/${id}`, squad);
  }

  deleteSquad(id: number): Observable<Squad> {
    return this.http.delete<Squad>(`${this.squadUrl}/${id}`);
  }

  getPlayersInSquadById(id: number): Observable<Player[]> {
    const url = UrlUtils.resolveParams(this.squadPlayersUrl, { id });
    return this.http.get<Player[]>(url);
  }

  getPlayersInSquad(seasonId: number, clubId: number): Observable<Player[]> {
    const url = UrlUtils.resolveParams(this.squadPlayersUrl, { id: 0 });
    const params = new ParamsBuilder()
      .applyFilter({ seasonId, clubId })
      .build();

    return this.http.get<Player[]>(url, { params });
  }

  addPlayerToSquad(id: number, squadPlayer: { squadId: number, playerId: number })
    : Observable<any> {
    const url = UrlUtils.resolveParams(this.squadPlayersUrl, { id });
    return this.http.post<any>(url, squadPlayer);
  }

  editPlayerInSquad(id: number, squadPlayer: { squadId: number, playerId: number })
    : Observable<any> {
    const url = UrlUtils.resolveParams(
      this.squadPlayersDetailUrl,
      { id, playerId: squadPlayer.playerId }
    );

    return this.http.put<any>(url, squadPlayer);
  }

  removePlayerFromSquad(id: number, playerId: number): Observable<any> {
    const url = UrlUtils.resolveParams(this.squadPlayersDetailUrl, { id, playerId });
    return this.http.delete<any>(url);
  }

}
