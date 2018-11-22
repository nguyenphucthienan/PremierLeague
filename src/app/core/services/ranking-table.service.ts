import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { FilterMode } from '../models/filter-mode.interface';
import { ParamsBuilder } from '../utils/params-builder';

@Injectable()
export class RankingTableService {

  private readonly tableUrl = `${environment.apiUrl}/tables`;

  constructor(private http: HttpClient) { }

  getTable(filterMode: FilterMode): Observable<any[]> {
    const params = new ParamsBuilder()
      .applyFilter(filterMode)
      .build();

    return this.http.get<any[]>(`${this.tableUrl}`, { params });
  }

}
