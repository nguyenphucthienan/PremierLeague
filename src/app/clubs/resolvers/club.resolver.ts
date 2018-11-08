import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Club } from 'src/app/core/models/club.interface';
import { AlertService } from 'src/app/core/services/alert.service';
import { ClubService } from 'src/app/core/services/club.service';

@Injectable()
export class ClubResolver implements Resolve<Club> {

  constructor(private router: Router,
    private clubService: ClubService,
    private alertService: AlertService) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<Club> {
    const clubId = parseInt(route.paramMap.get('id'), 10);

    return this.clubService.getClub(clubId)
      .pipe(
        catchError(error => {
          this.alertService.error('Problem retrieving data');
          this.router.navigate(['/clubs']);
          return of(null);
        })
      );
  }

}
