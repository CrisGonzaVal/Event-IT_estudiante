import { Component } from '@angular/core';
import { AuthService } from './services/auth.service'; 
import { ToastController } from '@ionic/angular';
import { MenuController } from '@ionic/angular';



interface Menu{

  icon:string;
  name:string;
  redirectTo:string;
  cantidad:number;
}

interface configuraciones{

  icon:string;
  name:string;
  redirectTo:string;
  action?: () => void;  // Acción para cerrar sesión
}
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  menu:Menu[]=[

    {
      icon:'newspaper-outline',
      name:'ACTIVIDADES',
      redirectTo:'/tabs/actividades',
      cantidad:10
    },
    {
      icon:'chatbubbles-outline',
      name:'SEMINARIOS',
      redirectTo:'/tabs/seminarios',
      cantidad:10
    },
    {
      icon:'calendar-outline',
      name:'EVENTOS',
      redirectTo:'/tabs/eventos',
      cantidad:10
    },

  ]

  configuraciones:configuraciones[]=[

    {
      icon:'settings-outline',
      name:'CONFIGURACIONES',
      redirectTo:'/tabs/tab5',
    },
    {
      icon:'exit-outline',
      name:'CERRAR SESIÓN',
      action: () => this.cerrarSesion(),
      redirectTo:'/',
    }

  ]


  constructor(private auth: AuthService,
            private toast: ToastController,
            private menuController: MenuController
  ) {}
   // this.menuController.swipeGesture(true, 'first'); // Habilita los gestos de deslizamiento
  

  cerrarSesion() {
    this.showToast(this.auth.cerrarSesionUser());  // Llama al método de cierre de sesión en AuthService

    console.log("se ejecutó el cerrar sesion");
  }

  async showToast(msg: any){
    const toast= await this.toast.create({
      message:msg,
      duration: 2000
    })
    toast.present();
  }
}
