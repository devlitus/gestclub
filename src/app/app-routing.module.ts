import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'home/:team/:planning', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'team', loadChildren: './team/team.module#TeamPageModule' },
  { path: 'deport', loadChildren: './deport/deport.module#DeportPageModule' },
  { path: 'management', loadChildren: './management/management.module#ManagementPageModule' },
  { path: 'list-users', loadChildren: './list-users/list-users.module#ListUsersPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
