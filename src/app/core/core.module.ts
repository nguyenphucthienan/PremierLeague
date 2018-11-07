import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { AuthService } from './services/auth.service';

@NgModule({
  imports: [
    HttpClientModule,
    SharedModule
  ],
  providers: [
    AuthService
  ]
})
export class CoreModule { }
