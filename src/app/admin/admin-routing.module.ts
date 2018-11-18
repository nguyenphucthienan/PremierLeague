import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthRoleGuard } from '../core/guards/auth-role.guard';
import { AdminComponent } from './admin.component';
import { AdminSeasonManagerComponent } from './components/admin-season-manager/admin-season-manager.component';

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
