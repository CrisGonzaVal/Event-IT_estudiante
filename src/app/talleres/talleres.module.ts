import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TalleresPageRoutingModule } from './talleres-routing.module';

import { TalleresPage } from './talleres.page';

import { CoreModule } from '../core/core.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TalleresPageRoutingModule,
    CoreModule //importar header y footer
  ],
  declarations: [TalleresPage]
})
export class TalleresPageModule {}
