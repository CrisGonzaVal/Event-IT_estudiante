import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApicrudService } from '../services/apicrud.service';
import { AlertController } from '@ionic/angular'; //cuadros de mensajes
import { Users } from 'src/interfaces/users';


@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.page.html',
  styleUrls: ['./registrar.page.scss'],
})
export class RegistrarPage implements OnInit {

  usuario: Users={
    id:"",
    rut: "",
    username: "",
    email: "",
    password: "",
    carrera: "",
    jornada: "",
    seccion: "",
    isactive: true,

  }

  constructor(private router:Router,
              private alertcontroller:AlertController,
              private apiCrud: ApicrudService) { }

  ngOnInit() {
  }

  crearUsuario(){
    this.apiCrud.postUser(this.usuario).subscribe();
    this.msjRegistro();
  }

  async msjRegistro(){
    const alert = await this.alertcontroller.create({
      header: 'registrado de estudiante',
      message: 'Estudiente ha sido registrado',
      mode:'ios',  //mismo diseño en ios y android
      buttons: [
        {
          text: 'OK',
          role: 'confirm',
          handler: () => {
            this.router.navigate(['./login']); //Permite navegar a otro page
          },
        },
      ],
    });

    await alert.present();
  }
}
