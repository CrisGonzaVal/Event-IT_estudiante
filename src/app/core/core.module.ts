import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
    declarations: [
      FooterComponent,
    ],
    imports: [CommonModule, // Para directivas de Angular
    IonicModule // Necesario para componentes Ionic
    ],
    exports: [FooterComponent] // Exporta para reutilizar el footer
  })
  export class CoreModule {}