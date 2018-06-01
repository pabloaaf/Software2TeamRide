import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MostrarJugadoresPage } from './mostrar-jugadores';

@NgModule({
  declarations: [
    MostrarJugadoresPage,
  ],
  imports: [
    IonicPageModule.forChild(MostrarJugadoresPage),
  ],
})
export class MostrarJugadoresPageModule {}
