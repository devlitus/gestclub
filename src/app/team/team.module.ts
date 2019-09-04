import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TeamPage } from './team.page';
import { FormsModule } from '@angular/forms';
import { TeamUpdateComponent } from '../components/team-update/team-update.component';
import { TeamPlayComponent } from '../components/team-play/team-play.component';

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
    TeamUpdateComponent,
    TeamPlayComponent
  ],
  entryComponents: [
    TeamUpdateComponent,
    TeamPlayComponent
  ]
})
export class TeamPageModule {}
