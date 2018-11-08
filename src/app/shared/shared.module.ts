import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDropdownModule, CollapseModule, PaginationModule, TabsModule } from 'ngx-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BsDropdownModule.forRoot(),
    CollapseModule.forRoot(),
    PaginationModule.forRoot(),
    TabsModule.forRoot()
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BsDropdownModule.forRoot().ngModule,
    CollapseModule.forRoot().ngModule,
    PaginationModule.forRoot().ngModule,
    TabsModule.forRoot().ngModule
  ]
})
export class SharedModule { }
