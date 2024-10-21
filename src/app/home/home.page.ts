import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { Users } from 'src/interfaces/users';
import { AuthService } from '../services/auth.service'; //1

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class homePage {

  usuario: any;

  constructor(private activated: ActivatedRoute,
              private menucontroller:MenuController,
              private router:Router,
              private auth : AuthService) { 
              }

                ngOnInit() {
                  // recuperar objeto recibido por url
                  this.usuario = this.auth.getSesionUser();
                }

  mostrarMenu(){
    this.menucontroller.open('first');
  }

  modificar(){
     this.router.navigate(['./editar-usuario']);
  }

}


