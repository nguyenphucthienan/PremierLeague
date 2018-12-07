import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AboutComponent } from './public/components/about/about.component';
import { HomeComponent } from './public/components/home/home.component';
import { LoginComponent } from './public/components/login/login.component';
import { RegisterComponent } from './public/components/register/register.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'about', component: AboutComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'admin', loadChildren: './admin/admin.module#AdminModule' },
  { path: 'clubs', loadChildren: './clubs/clubs.module#ClubsModule' },
  { path: 'managers', loadChildren: './managers/managers.module#ManagersModule' },
  { path: 'players', loadChildren: './players/players.module#PlayersModule' },
  { path: 'fixtures', loadChildren: './fixtures/fixtures.module#FixturesModule' },
  { path: 'results', loadChildren: './results/results.module#ResultsModule' },
  { path: 'matches', loadChildren: './matches/matches.module#MatchesModule' },
  { path: 'tables', loadChildren: './tables/tables.module#TablesModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
