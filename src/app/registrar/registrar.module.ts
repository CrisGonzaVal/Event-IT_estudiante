import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,  ReactiveFormsModule } from '@angular/forms'; //para usar groupform

import { IonicModule } from '@ionic/angular';

import { RegistrarPageRoutingModule } from './registrar-routing.module';

import { RegistrarPage } from './registrar.page';

import { CoreModule } from '../core/core.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule, //para usar groupform
    IonicModule,
    RegistrarPageRoutingModule,
    CoreModule //importar footer
  ],
  declarations: [RegistrarPage]
})
export class RegistrarPageModule {}
