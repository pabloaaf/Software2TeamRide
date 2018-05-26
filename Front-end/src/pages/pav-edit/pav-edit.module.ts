import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PavEditPage } from './pav-edit';

@NgModule({
  declarations: [
    PavEditPage,
  ],
  imports: [
    IonicPageModule.forChild(PavEditPage),
  ],
})
export class PavEditPageModule {}
