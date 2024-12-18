import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
    declarations: [
      FooterComponent, // Declarar FooterComponent
      HeaderComponent  // Declarar HeaderComponent
    ],
    imports: [CommonModule, // Para directivas de Angular
    IonicModule // Necesario para componentes Ionic
    ],
    exports: [FooterComponent, 
              HeaderComponent] // Exporta para reutilizar el footer y Header
  })
  export class CoreModule {}