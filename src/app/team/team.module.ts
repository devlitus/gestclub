import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TeamPage } from './team.page';
import { TeamAddComponent } from '../components/team-add/team-add.component';
import { TeamUpdateComponent } from '../components/team-update/team-update.component';

const routes: Routes = [
  {
    path: '',
    component: TeamPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    TeamPage,
    TeamAddComponent,
    TeamUpdateComponent
  ],
  entryComponents: [
    TeamAddComponent, 
    TeamUpdateComponent
  ],
})
export class TeamPageModule {}
