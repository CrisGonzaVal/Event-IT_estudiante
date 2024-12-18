import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LectorQRPageRoutingModule } from './lector-qr-routing.module';

import { LectorQRPage } from './lector-qr.page';
import { QRCodeModule } from 'angularx-qrcode';

import { CoreModule } from '../core/core.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    QRCodeModule,
    IonicModule,
    LectorQRPageRoutingModule,
    CoreModule //importar header y footer
  ],
  declarations: [LectorQRPage]
})
export class LectorQRPageModule {}
