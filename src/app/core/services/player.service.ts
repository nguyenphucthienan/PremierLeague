import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Pagination } from '../models/pagination.interface';
import { SortMode } from '../models/sort-mode.interface';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Player } from '../models/player.interface';

@Injectable()
export class PlayerService {

  private readonly playerUrl = `${environment.apiUrl}/players`;

  private readonly defaultPagination: Pagination = {
    pageNumber: 1,
    pageSize: 8
  };

  private readonly defaultSortMode: SortMode = {
    sortBy: 'name',
    isSortAscending: true
  };

  constructor(private http: HttpClient) { }

  getPlayers(pagination: Pagination = this.defaultPagination,
    sortMode: SortMode = this.defaultSortMode, clubId?: number): Observable<Player[]> {
    let params = new HttpParams()
      .set('pageNumber', pagination.pageNumber.toString())
      .set('pageSize', pagination.pageSize.toString())
      .set('sortBy', sortMode.sortBy)
      .set('isSortAscending', sortMode.isSortAscending.toString());

    if (clubId) {
      params = params.set('clubId', clubId.toString());
    }

    return this.http.get<Player[]>(`${this.playerUrl}`, { params: params });
  }

  getPlayer(id: number): Observable<Player> {
    return this.http.get<Player>(`${this.playerUrl}/${id}`);
  }

}
