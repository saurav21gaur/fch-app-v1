import { MbscModule } from '@mobiscroll/angular';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StudyPlanPage } from './study-plan';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    StudyPlanPage,
  ],
  imports: [
    IonicPageModule.forChild(StudyPlanPage),
    MbscModule, // add the mobiscroll module
    FormsModule // add the forms module
  ],
  exports: [
    StudyPlanPage
  ]
})
export class StudyPlanPageModule {}
