import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Pagination } from 'src/app/core/models/pagination.interface';
import { Player } from 'src/app/core/models/player.interface';
import { SortMode } from 'src/app/core/models/sort-mode.interface';
import { AlertService } from 'src/app/core/services/alert.service';
import { PlayerService } from 'src/app/core/services/player.service';

@Injectable()
export class PlayersResolver implements Resolve<Player[]> {

  private readonly pagination: Pagination = {
    pageNumber: 1,
    pageSize: 20
  };

  private readonly sortMode: SortMode = {
    sortBy: 'name',
    isSortAscending: true
  };

  constructor(private router: Router,
    private playerService: PlayerService,
    private alertService: AlertService) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<Player[]> {
    return this.playerService.getPlayers(this.pagination, this.sortMode)
      .pipe(
        catchError(error => {
          this.alertService.error('Problem retrieving data');
          this.router.navigate(['/']);
          return of(null);
        })
      );
  }

}
