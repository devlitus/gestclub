import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { UserAddComponent } from './components/user-add/user-add.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'home/:team/:planning', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'team', loadChildren: './team/team.module#TeamPageModule' },
  { path: 'deport', loadChildren: './deport/deport.module#DeportPageModule' },
  { path: 'management', loadChildren: './management/management.module#ManagementPageModule' },
  { path: 'users', loadChildren: './users/users.module#UsersPageModule' },
  { path: 'users/:?', component: UserAddComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
