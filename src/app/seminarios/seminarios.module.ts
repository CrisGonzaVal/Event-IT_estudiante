import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SeminariosPageRoutingModule } from './seminarios-routing.module';

import { SeminariosPage } from './seminarios.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SeminariosPageRoutingModule
  ],
  declarations: [SeminariosPage]
})
export class SeminariosPageModule {}
