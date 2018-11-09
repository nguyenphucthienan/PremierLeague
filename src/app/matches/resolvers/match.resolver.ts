import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Match } from 'src/app/core/models/match.interface';
import { AlertService } from 'src/app/core/services/alert.service';
import { MatchService } from 'src/app/core/services/match.service';

@Injectable()
export class MatchResolver implements Resolve<Match> {

  constructor(private matchService: MatchService,
    private alertService: AlertService) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<Match> {
    const matchId = parseInt(route.paramMap.get('id'), 10);

    return this.matchService.getMatch(matchId)
      .pipe(
        catchError(error => {
          this.alertService.error('Problem retrieving data');
          return of(null);
        })
      );
  }

}
