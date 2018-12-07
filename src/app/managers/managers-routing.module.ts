import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BriefSeasonsResolver } from '../core/resolvers/brief-seasons.resolver';
import { ManagersComponent } from './managers.component';

const routes: Routes = [
  {
    path: '',
    component: ManagersComponent,
    resolve: { seasons: BriefSeasonsResolver }
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
