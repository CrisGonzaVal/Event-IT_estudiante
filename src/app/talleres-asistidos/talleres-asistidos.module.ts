import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TalleresAsistidosPageRoutingModule } from './talleres-asistidos-routing.module';

import { TalleresAsistidosPage } from './talleres-asistidos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TalleresAsistidosPageRoutingModule
  ],
  declarations: [TalleresAsistidosPage]
})
export class TalleresAsistidosPageModule {}
