import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddRegistroPage } from './add-registro';

@NgModule({
  declarations: [
    AddRegistroPage,
  ],
  imports: [
    IonicPageModule.forChild(AddRegistroPage),
  ],
})
export class AddRegistroPageModule {}
