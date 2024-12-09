import { Component, OnInit } from '@angular/core';
import { ApicrudSesionService } from '../services/apicrud-sesion.service';
import { inscripciones } from 'src/interfaces/inscripciones';
import { AuthService } from '../services/auth.service';
import { AlertController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-talleres-asistidos',
  templateUrl: './talleres-asistidos.page.html',
  styleUrls: ['./talleres-asistidos.page.scss'],
})
export class TalleresAsistidosPage implements OnInit {
  talleresAsistidos: inscripciones[] = [];
  usuario: any;

  constructor(private apicrudSesion: ApicrudSesionService, 
              private auth: AuthService,
              private alertController: AlertController,
              private loadingController: LoadingController) {}

  ngOnInit() {
    this.usuario = this.auth.getSesionUser();
    this.cargarTalleresAsistidos();
  }

  ionViewWillEnter(){
    this.usuario = this.auth.getSesionUser();
    this.cargarTalleresAsistidos();
  }




  cargarTalleresAsistidos() {
    this.apicrudSesion.getTalleresAsistidos(this.usuario.rut).subscribe((data) => {
      this.talleresAsistidos = data;
      console.log('Talleres asistidos:', this.talleresAsistidos);
    });
  }

  onEnter(event: any, taller: any) {
    if (event.key === 'Enter') {
      event.preventDefault(); // Evitar el salto de línea
      this.guardarComentario(taller); // Llamar al método para guardar el comentario
    }
  }

  async guardarComentario(taller: any) {
  
      // Mostrar indicador de carga
      const loading = await this.loadingController.create({
        message: 'Guardando comentario...',
        spinner: 'circles',
        mode:"ios"
      });
      await loading.present();
  
      // Guardar el comentario en el backend
      this.apicrudSesion.updateInscripcion(taller.id, { comentario: taller.comentario }).subscribe(
        async () => {
          // Ocultar indicador de carga
          await loading.dismiss();
        },
        async (error) => {
          // Ocultar indicador de carga en caso de error
          await loading.dismiss();
          console.error('Error al guardar el comentario:', error);
  
          // Mostrar alerta de error
          const alert = await this.alertController.create({
            header: 'Error',
            message: 'No se pudo guardar el comentario. Inténtalo nuevamente.',
            buttons: ['OK'],
            mode:"ios"
          });
          await alert.present();
        }
      );
    
  }
  
  
  
}
