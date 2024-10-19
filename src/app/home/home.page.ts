import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { Users } from 'src/interfaces/users';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class homePage {

  usuario: any;

  constructor(private activated: ActivatedRoute,
              private menucontroller:MenuController,
              private router:Router) { 
                //recuperar objeto recibido por url
                this.activated.queryParams.subscribe(param => {
                  this.usuario = JSON.parse (param['usuarios']);
                })}

  mostrarMenu(){
    this.menucontroller.open('first');
  }

  modificar(){
     this.router.navigate(['./editar-usuario']);
  }

}


