import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class disableMenuGuard implements CanActivate {
  constructor(private menuCtrl: MenuController) {}

  canActivate(): boolean {
    this.menuCtrl.enable(false); // Desactiva el menú
    return true;
  }
}


// Crear un guard para habilitar el menú
@Injectable({
    providedIn: 'root',
  })
  export class enableMenuGuard implements CanActivate {
    constructor(private menuCtrl: MenuController) {}
  
    canActivate(): boolean {
      this.menuCtrl.enable(true); // Habilita el menú
      return true;
    }
  }