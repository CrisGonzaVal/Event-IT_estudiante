import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class loginPage implements OnInit {

  loginForm: FormGroup;

  userdata:any;

  usuario={
    id:"",
    rut:"",
    username:"",
    email:"",
    password:"",
    carrera:"",
    jornada:"",
    seccion:"",
    isactive:true
  }

  

  constructor(private alertcontroller: AlertController,
              private router:Router,
              private authservice: AuthService,
              private toast: ToastController,
              private fbuilder: FormBuilder,
              private loadingController: LoadingController, // Importación del controlador de carga
              ) { 

                this.loginForm = this.fbuilder.group({
                  'email' : new FormControl("",[Validators.required, Validators.email]), 
                  'password' : new FormControl("",[Validators.required, Validators.minLength(8)]),
                })
              } /*Llamar las bibliotecas*/

  ngOnInit() {
    this.authservice.cerrarSesionUser();
  }

  async login(){
    if (!this.loginForm.valid){
      return;
    }



    // Mostrar el indicador de carga
    const loading = await this.loadingController.create({
      message: 'Validando Usuario...',
      spinner: 'circles', // Cambiar el estilo del spinner si lo deseas
    });
    await loading.present();






    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;

    this.authservice.getByEmail(email).subscribe({next: async (resp) => {
      this.userdata = resp;
      console.log(this.userdata);


      if (this.userdata.length === 0) {
        this.loginForm.reset();
        await loading.dismiss(); // Ocultar el loading
        this.UsuarioNoExiste();
        return;
      }

      this.usuario={
        id:this.userdata[0].id,
        rut: this.userdata[0].rut,
        username: this.userdata[0].username,
        password: this.userdata[0].password,
        email:this.userdata[0].email,
        carrera:this.userdata[0].carrera,
        jornada:this.userdata[0].jornada,
        seccion:this.userdata[0].seccion,
        isactive: this.userdata[0].isactive
      };

      if (this.usuario.password !== password) {
        this.loginForm.reset();
        await loading.dismiss(); // Ocultar el loading
        this.ErrorUsuario(); 
        return;
      }

      if (!this.usuario.isactive) {
        this.loginForm.reset();
        await loading.dismiss(); // Ocultar el loading
        this.UsuarioInactivo();
        return;
      }

      // Sesión iniciada correctamente
      this.IniciarSesion(this.usuario);
      await loading.dismiss(); // Ocultar el loading al finalizar
    },

    
      error: async (err) => {
        console.error(err);
        await loading.dismiss(); // Ocultar el loading en caso de error
        this.ErrorUsuario();
      }
    });

  }

  private IniciarSesion(usuario:any){
    this.router.navigateByUrl('/tabs/home', { replaceUrl: true }); // para forzar la recarga completa de la página home si es necesario.
    this.showToast( this.authservice.setSesionUser(usuario) );

  }

  
  async showToast(msg: any){
    const toast= await this.toast.create({
      message:msg,
      duration: 2000
    })
    toast.present();
  }

  
  async UsuarioInactivo(){
    const alerta = await this.alertcontroller.create({ 
      header : 'Usuario inactivo',
      message : 'Contactar a admin@admin.cl',
      buttons : ['OK']
    })
    alerta.present();
  }

  
async ErrorUsuario(){
  const alerta = await this.alertcontroller.create({ 
    header : 'Error..',
    message : 'Revise sus credenciales',
    buttons : ['OK']
  })
  alerta.present();
}

async UsuarioNoExiste(){
  const alerta = await this.alertcontroller.create({ 
    header : 'No existe...',
    message : 'Debe registrarse..',
    buttons : ['OK']
  })
  alerta.present();
}

  registrar(){
    this.router.navigate(['./registrar']); //Permite navegar a otro page
  }



}
