import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { UsersPage } from './users.page';
import { UserAddComponent } from '../components/user-add/user-add.component';
import { UserCreateComponent } from '../components/user-create/user-create.component';

const routes: Routes = [
  {
    path: '',
    component: UsersPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    UsersPage,
    UserAddComponent,
    UserCreateComponent
  ],
  entryComponents: [
    UserAddComponent,
    UserCreateComponent
  ]
})
export class UsersPageModule {}
