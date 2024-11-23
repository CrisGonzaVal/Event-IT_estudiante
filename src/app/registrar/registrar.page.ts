import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApicrudService } from '../services/apicrud.service';
import { AlertController } from '@ionic/angular'; //cuadros de mensajes
import { Users } from 'src/interfaces/users';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';



@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.page.html',
  styleUrls: ['./registrar.page.scss'],
})
export class RegistrarPage implements OnInit {

  loginForm: FormGroup;

  usuario: Users={
  
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
              private apiCrud: ApicrudService,
              private fbuilder: FormBuilder,) { 
                this.loginForm = this.fbuilder.group({
                  nombre : ['',[Validators.required]],
                  rut : ['',[Validators.required, Validators.minLength(8)]],
                  carrera : ['',[Validators.required]],
                  jornada : ['',[Validators.required]],
                  email : ["",[Validators.required, Validators.email]], 
                  seccion :['',[Validators.required]],
                  password : ['',[Validators.required, Validators.minLength(8)]],
                  confpassword :['',[Validators.required, Validators.minLength(8)]],
                })
              }

  ngOnInit() {
  }

  crearUsuario(){

    if (!this.loginForm.valid){
      return;
    }
    const usuario = this.loginForm.value; // Obtiene los datos del formulario
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
