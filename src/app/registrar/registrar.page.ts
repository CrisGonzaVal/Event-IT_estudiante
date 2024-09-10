import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular'; //cuadros de mensajes


@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.page.html',
  styleUrls: ['./registrar.page.scss'],
})
export class RegistrarPage implements OnInit {

  constructor(private router:Router,
              private alertcontroller:AlertController) { }

  ngOnInit() {
  }

  async msjRegistro(){
    const alert = await this.alertcontroller.create({
      header: 'Ya te has registrado',
      mode:'ios',  //mismo diseño en ios y android
      buttons: [
        {
          text: 'OK',
          role: 'confirm',
          handler: () => {
            this.router.navigate(['./comienzo']); //Permite navegar a otro page
          },
        },
      ],
    });

    await alert.present();
  }
}
