import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service'; //1
import { AlertController } from '@ionic/angular';
import { ApicrudService } from '../services/apicrud.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class homePage {

  usuario: any;

  constructor(
              private menucontroller:MenuController,
              private router:Router,
              private auth : AuthService,
              private alert: AlertController,
              private api:ApicrudService,
              private toast: ToastController,
              
              ) { 
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
  

  async eliminarUsuario(){
    const alert = await this.alert.create({
      header: 'Eliminar Cuenta!',
      message: 'Estás seguro de eliminar tu cuenta?',
      mode:'ios',  //mismo diseño en ios y android
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            this.showToast('Ha cancelado la acción');
          },
        },
        {
          text: 'Si Seguro',
          role: 'confirm',
          handler: () => {

            this.api.deleteUserById(this.usuario.id).subscribe({
              next: () => {
                this.showToast('Usuario eliminado con éxito');
                // Lógica adicional después de eliminar el usuario, como redirigir o actualizar la lista
              },
              error: (error) => {
                this.showToast('Error al eliminar el usuario:'+ error);
              }
            });
            this.router.navigate(['/login']); 
          },
        },
      ],
    });

    await alert.present();

    
  }





  async showToast(msg: any){
    const toast= await this.toast.create({
      message:msg,
      duration: 4000
    })
    toast.present();
  }
}





