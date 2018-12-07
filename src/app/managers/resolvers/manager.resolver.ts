import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Manager } from 'src/app/core/models/manager.interface';
import { AlertService } from 'src/app/core/services/alert.service';
import { ManagerService } from 'src/app/core/services/manager.service';

@Injectable()
export class ManagerResolver implements Resolve<Manager> {

  constructor(private managerService: ManagerService,
    private alertService: AlertService) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<Manager> {
    const managerId = parseInt(route.paramMap.get('id'), 10);

    return this.managerService.getManager(managerId)
      .pipe(
        catchError(error => {
          this.alertService.error('Problem retrieving data');
          return of(null);
        })
      );
  }

}
