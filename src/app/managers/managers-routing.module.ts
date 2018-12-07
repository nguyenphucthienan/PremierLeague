import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BriefSeasonsResolver } from '../core/resolvers/brief-seasons.resolver';
import { ManagerDetailComponent } from './components/manager-detail/manager-detail.component';
import { ManagersComponent } from './managers.component';
import { ManagerResolver } from './resolvers/manager.resolver';

const routes: Routes = [
  {
    path: '',
    component: ManagersComponent,
    resolve: { seasons: BriefSeasonsResolver }
  },
  {
    path: ':id',
    component: ManagerDetailComponent,
    resolve: { manager: ManagerResolver }
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
export class ManagersRoutingModule { }
