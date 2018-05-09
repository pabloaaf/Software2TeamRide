import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { JugadoresEditPage } from './jugadores-edit';

@NgModule({
  declarations: [
    JugadoresEditPage,
  ],
  imports: [
    IonicPageModule.forChild(JugadoresEditPage),
  ],
})
export class JugadoresEditPageModule {}
