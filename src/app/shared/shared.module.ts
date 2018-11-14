import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { BsDropdownModule, CollapseModule, PaginationModule, TabsModule } from 'ngx-bootstrap';

import { FilterBarComponent } from './components/filter-bar/filter-bar.component';
import { HasRoleDirective } from './directives/has-role.directive';
import { PositionTypePipe } from './pipes/position-type.pipe';

@NgModule({
  declarations: [
    PositionTypePipe,
    HasRoleDirective,
    FilterBarComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    BsDropdownModule.forRoot(),
    CollapseModule.forRoot(),
    PaginationModule.forRoot(),
    TabsModule.forRoot()
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    BsDropdownModule.forRoot().ngModule,
    CollapseModule.forRoot().ngModule,
    PaginationModule.forRoot().ngModule,
    TabsModule.forRoot().ngModule,
    PositionTypePipe,
    HasRoleDirective,
    FilterBarComponent
  ]
})
export class SharedModule { }
