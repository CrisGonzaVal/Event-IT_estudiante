import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class homePage {

  constructor(private menucontroller:MenuController,
              private router:Router) {}

  mostrarMenu(){
    this.menucontroller.open('first');
  }

  modificar(){
     this.router.navigate(['./editar-usuario']);
  }

}


