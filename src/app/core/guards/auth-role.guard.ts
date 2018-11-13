import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';

import { AlertService } from '../services/alert.service';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthRoleGuard implements CanActivate {

  constructor(private authService: AuthService,
    private alertService: AlertService,
    private router: Router) {
  }

  canActivate(next: ActivatedRouteSnapshot): boolean {
    if (this.authService.isLoggedIn()) {
      const roles = next.data['roles'] as Array<string>;

      if (roles) {
        if (this.authService.isRoleMatch(roles)) {
          return true;
        } else {
          this.router.navigate(['/']);
          this.alertService.error('You cannot access this area');
          return false;
        }
      }

      return false;
    } else {
      this.alertService.error('You must be logged in');
      this.router.navigate(['/']);
      return false;
    }
  }

}
