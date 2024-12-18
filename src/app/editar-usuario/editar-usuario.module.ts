import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditarUsuarioPageRoutingModule } from './editar-usuario-routing.module';

import { EditarUsuarioPage } from './editar-usuario.page';

import { CoreModule } from '../core/core.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditarUsuarioPageRoutingModule,
    CoreModule //importar footer y header
  ],
  declarations: [EditarUsuarioPage]
})
export class EditarUsuarioPageModule {}
