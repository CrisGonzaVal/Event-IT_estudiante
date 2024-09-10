import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular'; //cuadros de mensajes

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class loginPage implements OnInit {

  constructor(private router:Router,
              private alertcontroller:AlertController) {
                this.bienvenido();
               }

  ngOnInit() {
  }

  async bienvenido(){
    const alert = await this.alertcontroller.create({
      header: 'Bienvenid@ a Event IT',
      mode:'ios',  //mismo diseño en ios y android
      buttons: [
        {
          text: 'OK',
          role: 'confirm',
        },
      ],
    });

    await alert.present();
  }
  login(){

     this.router.navigate(['./tabs/home']); //Permite navegar a otro page   
  }

  registrar(){
    this.router.navigate(['./registrar']); //Permite navegar a otro page
  }

}
