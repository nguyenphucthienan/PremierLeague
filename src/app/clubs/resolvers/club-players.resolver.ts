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
export class ClubPlayersResolver implements Resolve<Player[]> {

  private readonly pagination: Pagination = {
    pageNumber: 1,
    pageSize: 8
  };

  private readonly sortMode: SortMode = {
    sortBy: 'number',
    isSortAscending: true
  };

  constructor(private router: Router,
    private playerService: PlayerService,
    private alertService: AlertService) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<Player[]> {
    const clubId = parseInt(route.paramMap.get('id'), 10);

    return this.playerService.getPlayers(this.pagination,
      this.sortMode, clubId)
      .pipe(
        catchError(error => {
          this.alertService.error('Problem retrieving data');
          this.router.navigate(['/clubs']);
          return of(null);
        })
      );
  }

}
