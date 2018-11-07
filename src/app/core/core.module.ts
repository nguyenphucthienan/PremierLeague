import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { JwtModule } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';

import { SharedModule } from '../shared/shared.module';
import { AuthService } from './services/auth.service';

export function tokenGetter() {
  return localStorage.getItem('token');
}

const jwtOptions = {
  config: {
    tokenGetter: tokenGetter,
    whitelistedDomains: environment.whitelistedDomains,
    blacklistedRoutes: environment.blacklistedRoutes
  }
};

@NgModule({
  imports: [
    HttpClientModule,
    JwtModule.forRoot(jwtOptions),
    SharedModule
  ],
  providers: [
    AuthService
  ]
})
export class CoreModule { }
