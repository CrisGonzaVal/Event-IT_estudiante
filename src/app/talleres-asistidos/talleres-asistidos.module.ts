import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TalleresAsistidosPageRoutingModule } from './talleres-asistidos-routing.module';

import { TalleresAsistidosPage } from './talleres-asistidos.page';

import { CoreModule } from '../core/core.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TalleresAsistidosPageRoutingModule,
    CoreModule //importar header y footer
  ],
  declarations: [TalleresAsistidosPage]
})
export class TalleresAsistidosPageModule {}
