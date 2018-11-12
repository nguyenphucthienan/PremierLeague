import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AlertService } from 'src/app/core/services/alert.service';

import { Season } from '../models/season.interface';
import { SeasonService } from '../services/season.service';

@Injectable()
export class BriefSeasonsResolver implements Resolve<Season[]> {

  constructor(private seasonService: SeasonService,
    private alertService: AlertService) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<Season[]> {
    return this.seasonService.getBriefListSeason()
      .pipe(
        catchError(error => {
          this.alertService.error('Problem retrieving data');
          return of(null);
        })
      );
  }

}
