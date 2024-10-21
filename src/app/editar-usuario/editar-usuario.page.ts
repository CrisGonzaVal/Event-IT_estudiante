import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { ApicrudService } from '../services/apicrud.service';
import { Users } from 'src/interfaces/users';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.page.html',
  styleUrls: ['./editar-usuario.page.scss'],
})
export class EditarUsuarioPage implements OnInit {

  usuario: any;

  

  constructor(private auth: AuthService,
              private router:Router,
              private api: ApicrudService,
            private toast: ToastController) { }

            

  ngOnInit() {
   // Recuperar datos del usuario del servicio de autenticación
    this.usuario = this.auth.getSesionUser();
  }

  actualizarUsuario(){

    console.log('Datos enviados a la API:', this.usuario);
    this.api.putUser(this.usuario).subscribe({


      next: (response: Users) => {
        this.showToast('Usuario actualizado con éxito:');
        // Redirigir al usuario a la página principal si la actualización fue exitosa
        this.router.navigate(['/tabs/home']);
      },
      error: (error: any) => {
        this.showToast('Error actualizando el usuario: '+ error.message);
        console.log(error.message);
        // Manejar el error
      },
      complete: () => {
        this.showToast('Actualización del usuario completada.');
      }
    });

  }





  async showToast(msg: any){
    const toast= await this.toast.create({
      message:msg,
      duration: 2000
    })
    toast.present();
  }
}
