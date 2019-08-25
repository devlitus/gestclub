import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TeamPage } from './team.page';
import { TeamAddComponent } from '../components/team-add/team-add.component';
import { TeamUpdateComponent } from '../components/team-update/team-update.component';
import { FormsModule } from '@angular/forms';

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
    FormsModule,
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
