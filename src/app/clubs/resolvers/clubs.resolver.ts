import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Club } from 'src/app/core/models/club.interface';
import { Pagination } from 'src/app/core/models/pagination.interface';
import { AlertService } from 'src/app/core/services/alert.service';
import { ClubService } from 'src/app/core/services/club.service';

@Injectable()
export class ClubsResolver implements Resolve<Club[]> {

  private readonly pagination: Pagination = {
    pageNumber: 1,
    pageSize: 8
  };

  constructor(private router: Router,
    private clubService: ClubService,
    private alertService: AlertService) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<Club[]> {
    return this.clubService.getClubs(this.pagination)
      .pipe(
        catchError(error => {
          this.alertService.error('Problem retrieving data');
          this.router.navigate(['/']);
          return of(null);
        })
      );
  }

}
