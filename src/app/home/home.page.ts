import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service'; //1
import { ChangeDetectorRef } from '@angular/core'; 
import { ApicrudService } from '../services/apicrud.service';

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
              private detectaCambio: ChangeDetectorRef,
              private api:ApicrudService) { 
              }

  
  ngOnInit() {
   // recuperar objeto recibido por url
     this.usuario = this.auth.getSesionUser();
     console.log("se inicia vista home con ngOnInit");
  }

  ionViewWillEnter(){
    console.log("Se inicia denuevo la vista home");
    this.usuario = this.auth.getSesionUser();
   }


  mostrarMenu(){
    this.menucontroller.open('first');
  }

  modificarUsuario(){
     this.router.navigate(['./tabs/editar-usuario']);
  }

  eliminarUsuario(){
    this.api.deleteUser(this.usuario);
  }  

}


