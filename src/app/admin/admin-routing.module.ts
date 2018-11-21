import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthRoleGuard } from '../core/guards/auth-role.guard';
import { BriefSeasonsResolver } from '../core/resolvers/brief-seasons.resolver';
import { AdminComponent } from './admin.component';
import { AdminClubManagerComponent } from './components/admin-club-manager/admin-club-manager.component';
import { AdminMatchCardsManagerComponent } from './components/admin-match-cards-manager/admin-match-cards-manager.component';
import { AdminMatchGoalsManagerComponent } from './components/admin-match-goals-manager/admin-match-goals-manager.component';
import { AdminMatchManagerComponent } from './components/admin-match-manager/admin-match-manager.component';
import { AdminPlayerManagerComponent } from './components/admin-player-manager/admin-player-manager.component';
import { AdminSeasonManagerComponent } from './components/admin-season-manager/admin-season-manager.component';
import { AdminSquadKitsManangerComponent } from './components/admin-squad-kits-mananger/admin-squad-kits-mananger.component';
import { AdminSquadManagerComponent } from './components/admin-squad-manager/admin-squad-manager.component';
import {
  AdminSquadPlayersManagerComponent,
} from './components/admin-squad-players-manager/admin-squad-players-manager.component';
import { AdminStadiumManagerComponent } from './components/admin-stadium-manager/admin-stadium-manager.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    canActivate: [AuthRoleGuard],
    data: { roles: ['Admin', 'Moderator'] }
  },
  {
    path: 'seasons',
    component: AdminSeasonManagerComponent,
    canActivate: [AuthRoleGuard],
    data: { roles: ['Admin'] }
  },
  {
    path: 'stadiums',
    component: AdminStadiumManagerComponent,
    canActivate: [AuthRoleGuard],
    data: { roles: ['Admin'] }
  },
  {
    path: 'clubs',
    component: AdminClubManagerComponent,
    canActivate: [AuthRoleGuard],
    data: { roles: ['Admin'] }
  },
  {
    path: 'players',
    component: AdminPlayerManagerComponent,
    canActivate: [AuthRoleGuard],
    data: { roles: ['Admin'] }
  },
  {
    path: 'squads',
    component: AdminSquadManagerComponent,
    canActivate: [AuthRoleGuard],
    data: { roles: ['Admin'] },
    resolve: { seasons: BriefSeasonsResolver }
  },
  {
    path: 'squads/:squadId/kits',
    component: AdminSquadKitsManangerComponent,
    canActivate: [AuthRoleGuard],
    data: { roles: ['Admin'] }
  },
  {
    path: 'squads/:squadId/players',
    component: AdminSquadPlayersManagerComponent,
    canActivate: [AuthRoleGuard],
    data: { roles: ['Admin'] }
  },
  {
    path: 'matches',
    component: AdminMatchManagerComponent,
    canActivate: [AuthRoleGuard],
    data: { roles: ['Admin'] },
    resolve: { seasons: BriefSeasonsResolver }
  },
  {
    path: 'matches/:matchId/goals',
    component: AdminMatchGoalsManagerComponent,
    canActivate: [AuthRoleGuard],
    data: { roles: ['Admin'] },
  },
  {
    path: 'matches/:matchId/cards',
    component: AdminMatchCardsManagerComponent,
    canActivate: [AuthRoleGuard],
    data: { roles: ['Admin'] },
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AdminRoutingModule { }
