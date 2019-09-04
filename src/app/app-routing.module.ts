import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { UserAddComponent } from './components/user-add/user-add.component';
import { UserCreateComponent } from './components/user-create/user-create.component';
import { TeamUpdateComponent } from './components/team-update/team-update.component';
import { TeamPlayComponent } from './components/team-play/team-play.component';
import { RatingDetailComponent } from './components/rating-detail/rating-detail.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'home/:team/:planning', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'team', loadChildren: './team/team.module#TeamPageModule' },
  { path: 'team/update', component: TeamUpdateComponent },
  { path: 'team/play/:id', component: TeamPlayComponent },
  { path: 'deport', loadChildren: './deport/deport.module#DeportPageModule' },
  { path: 'management', loadChildren: './management/management.module#ManagementPageModule' },
  { path: 'users', loadChildren: './users/users.module#UsersPageModule' },
  { path: 'users/create/:id', component: UserCreateComponent },
  { path: 'users/add', component: UserAddComponent },
  { path: 'planning', loadChildren: './planning/planning.module#PlanningPageModule' },
  { path: 'macro', loadChildren: './macro/macro.module#MacroPageModule' },
  { path: 'micro/:id', loadChildren: './micro/micro.module#MicroPageModule' },
  { path: 'session/:id', loadChildren: './session/session.module#SessionPageModule' },
  { path: 'exercises/:id', loadChildren: './exercises/exercises.module#ExercisesPageModule' },
  { path: 'ratings', loadChildren: './ratings/ratings.module#RatingsPageModule' },
  { path: 'ratings/detail/:id', component: RatingDetailComponent },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
