import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { RatingsPage } from './ratings.page';
import { RatingDetailComponent } from '../components/rating-detail/rating-detail.component';

const routes: Routes = [
  {
    path: '',
    component: RatingsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [RatingsPage, RatingDetailComponent],
  entryComponents: [RatingDetailComponent]
})
export class RatingsPageModule {}
