import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Match } from 'src/app/core/models/match.interface';
import { Pagination } from 'src/app/core/models/pagination.interface';
import { SortMode } from 'src/app/core/models/sort-mode.interface';
import { AlertService } from 'src/app/core/services/alert.service';
import { MatchService } from 'src/app/core/services/match.service';

@Injectable()
export class MatchesResolver implements Resolve<Match[]> {

  private readonly pagination: Pagination = {
    pageNumber: 1,
    pageSize: 20
  };

  private readonly sortMode: SortMode = {
    sortBy: 'matchTime',
    isSortAscending: true
  };

  constructor(private router: Router,
    private matchService: MatchService,
    private alertService: AlertService) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<Match[]> {
    return this.matchService.getMatches(this.pagination, this.sortMode)
      .pipe(
        catchError(error => {
          this.alertService.error('Problem retrieving data');
          this.router.navigate(['/']);
          return of(null);
        })
      );
  }

}
