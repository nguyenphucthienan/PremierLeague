import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { Kit } from '../models/kit.interface';
import { UrlUtils } from '../utils/url-utils';

@Injectable()
export class KitService {

  private readonly kitUrl = `${environment.apiUrl}/squads/{squadId}/kits`;
  private readonly kitDetailUrl = `${environment.apiUrl}/squads/{squadId}/kits/{id}`;

  constructor(private http: HttpClient) { }

  getKitsBySquadId(squadId: number): Observable<Kit[]> {
    const url = UrlUtils.resolveParams(this.kitUrl, { squadId });
    return this.http.get<Kit[]>(url);
  }

  getKit(squadId: number, id: number): Observable<Kit> {
    const url = UrlUtils.resolveParams(this.kitDetailUrl, { squadId, id });
    return this.http.get<Kit>(url);
  }

}
