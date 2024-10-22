import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service'; //1
import { ChangeDetectorRef } from '@angular/core'; 

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
              private auth : AuthService,
              private detectaCambio: ChangeDetectorRef) { 
              }

  ngOnInit() {
   // recuperar objeto recibido por url
     console.log(this.usuario = this.auth.getSesionUser());
  }

  ionViewWillEnter(){
    console.log("Se inicia denuevo la vista home");
  }



  mostrarMenu(){
    this.menucontroller.open('first');
  }

  modificar(){
     this.router.navigate(['./editar-usuario']);
  }

}


