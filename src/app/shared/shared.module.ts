import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { FileDropDirective, FileSelectDirective } from 'ng2-file-upload';
import {
  BsDatepickerModule,
  BsDropdownModule,
  CollapseModule,
  ModalModule,
  PaginationModule,
  TabsModule,
} from 'ngx-bootstrap';

import { FilterBarComponent } from './components/filter-bar/filter-bar.component';
import { PhotoUploaderComponent } from './components/photo-uploader/photo-uploader.component';
import { HasRoleDirective } from './directives/has-role.directive';
import { ConfirmModalComponent } from './modals/confirm-modal/confirm-modal.component';
import { CardTypePipe } from './pipes/card-type.pipe';
import { GoalTypePipe } from './pipes/goal-type.pipe';
import { KitTypePipe } from './pipes/kit-type.pipe';
import { PositionTypePipe } from './pipes/position-type.pipe';

@NgModule({
  declarations: [
    FileSelectDirective,
    FileDropDirective,
    KitTypePipe,
    PositionTypePipe,
    GoalTypePipe,
    CardTypePipe,
    HasRoleDirective,
    FilterBarComponent,
    PhotoUploaderComponent,
    ConfirmModalComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    BsDropdownModule.forRoot(),
    CollapseModule.forRoot(),
    PaginationModule.forRoot(),
    TabsModule.forRoot(),
    ModalModule.forRoot(),
    BsDatepickerModule.forRoot()
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
    ModalModule.forRoot().ngModule,
    BsDatepickerModule.forRoot().ngModule,
    KitTypePipe,
    PositionTypePipe,
    HasRoleDirective,
    FilterBarComponent,
    PhotoUploaderComponent
  ],
  providers: [
    KitTypePipe,
    PositionTypePipe,
    GoalTypePipe,
    CardTypePipe
  ],
  entryComponents: [
    ConfirmModalComponent
  ]
})
export class SharedModule { }
