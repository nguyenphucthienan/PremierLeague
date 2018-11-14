import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JwtModule } from '@auth0/angular-jwt';
import { ProgressAnimationType, ToastrModule } from 'ngx-toastr';
import { environment } from 'src/environments/environment';

import { SharedModule } from '../shared/shared.module';
import { AuthRoleGuard } from './guards/auth-role.guard';
import { BriefClubsResolver } from './resolvers/brief-clubs.resolver';
import { BriefSeasonsResolver } from './resolvers/brief-seasons.resolver';
import { AlertService } from './services/alert.service';
import { AuthService } from './services/auth.service';
import { ClubService } from './services/club.service';
import { KitService } from './services/kit.service';
import { MatchService } from './services/match.service';
import { PlayerService } from './services/player.service';
import { SeasonService } from './services/season.service';

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

const toastrOptions = {
  timeOut: 3000,
  positionClass: 'toast-bottom-right',
  progressBar: true,
  progressAnimation: 'increasing' as ProgressAnimationType
};

@NgModule({
  imports: [
    HttpClientModule,
    BrowserAnimationsModule,
    JwtModule.forRoot(jwtOptions),
    ToastrModule.forRoot(toastrOptions),
    SharedModule
  ],
  providers: [
    AuthService,
    AlertService,
    SeasonService,
    ClubService,
    KitService,
    PlayerService,
    MatchService,
    BriefSeasonsResolver,
    BriefClubsResolver,
    AuthRoleGuard
  ]
})
export class CoreModule { }
