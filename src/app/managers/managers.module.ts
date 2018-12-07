import { NgModule } from '@angular/core';

import { DatatableModule } from '../datatable/datatable.module';
import { SharedModule } from '../shared/shared.module';
import { ManagerDetailComponent } from './components/manager-detail/manager-detail.component';
import { ManagersRoutingModule } from './managers-routing.module';
import { ManagersComponent } from './managers.component';
import { ManagerResolver } from './resolvers/manager.resolver';
import { ManagerOverviewComponent } from './components/manager-overview/manager-overview.component';

@NgModule({
  declarations: [
    ManagersComponent,
    ManagerDetailComponent,
    ManagerOverviewComponent
  ],
  imports: [
    SharedModule,
    ManagersRoutingModule,
    DatatableModule
  ],
  providers: [
    ManagerResolver
  ]
})
export class ManagersModule { }
