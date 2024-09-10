import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular'; //cuadros de mensajes

@Component({
  selector: 'app-comienzo',
  templateUrl: './comienzo.page.html',
  styleUrls: ['./comienzo.page.scss'],
})
export class ComienzoPage implements OnInit {

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

     this.router.navigate(['./tabs/tab1']); //Permite navegar a otro page   
  }

  registrar(){
    this.router.navigate(['./registrar']); //Permite navegar a otro page
  }

}
