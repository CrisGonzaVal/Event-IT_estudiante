import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApicrudSesionService } from '../services/apicrud-sesion.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { LoadingController } from '@ionic/angular';


@Component({
  selector: 'app-lector-qr',
  templateUrl: './lector-qr.page.html',
  styleUrls: ['./lector-qr.page.scss'],
})
export class LectorQRPage implements OnInit {


  rut: string="";
  email: string="";

  qrData: any = {};

  constructor(private route: ActivatedRoute,
    private apicrudSesion: ApicrudSesionService,
    private alertController: AlertController,
    private router: Router,
    private loadingController: LoadingController ) { }



    
  ngOnInit() {
    //capturar los datos de generarQrData
    this.route.queryParams.subscribe(params => {
      if (params['data']) {
        const data = JSON.parse(params['data']);

        this.qrData = JSON.stringify(data.id); //generar data para el qr con la id de la inscripcion

        
        this.qrData = {
          id:data.id ,
          idTaller:data.idTaller,
          nombre: data.nombre,
          fecha: data.fecha,
          tipo: data.tipo
        };
        this.rut = data.rut;
        this.email = data.email;
      }
    }) 
  }





  async cancelarInscripcion() {
    const alert = await this.alertController.create({
      header: 'Cancelar Inscripción',
      message: '¿Estás seguro de que deseas cancelar tu inscripción?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
        },
        {
          text: 'Sí, Quiero Cancelar mi Inscripción',
          handler: async () => {
            // Mostrar indicador de carga
            const loading = await this.loadingController.create({
              message: 'Cancelando inscripción...',
              spinner: 'circles', // Cambiar estilo si lo deseas
            });
            await loading.present();
  
            // Eliminar la inscripción
            this.apicrudSesion.deleteInscripcion(this.qrData.id).subscribe(
              async () => {
                // Obtener datos del taller antes de actualizar
                const updateCupoObservable = this.apicrudSesion.getTaller(this.qrData.idTaller).pipe(
                  // Actualizar el cupo sumando 1
                  tap((taller: any) => {
                    this.apicrudSesion.updateTaller(this.qrData.idTaller, { cupos: taller.cupos + 1 }).subscribe();
                  })
                );
  
                // Ejecutar la actualización del cupo
                updateCupoObservable.subscribe(
                  async () => {
                    // Ocultar indicador de carga
                    await loading.dismiss();
  
                    // Navegar de regreso a la lista de talleres
                    const successAlert = await this.alertController.create({
                      header: 'Inscripción Cancelada',
                      message: 'Tu inscripción ha sido cancelada correctamente.',
                      buttons: ['OK'],
                    });
                    await successAlert.present();
                    this.router.navigate(['/tabs/talleres']);
                  },
                  async (error) => {
                    // Ocultar indicador de carga en caso de error
                    await loading.dismiss();
  
                    // Mostrar mensaje de error
                    const errorAlert = await this.alertController.create({
                      header: 'Error',
                      message: 'Hubo un problema al cancelar tu inscripción. Inténtalo nuevamente.',
                      buttons: ['OK'],
                    });
                    await errorAlert.present();
                  }
                );
              },
              async (error) => {
                // Ocultar indicador de carga en caso de error
                await loading.dismiss();
  
                // Mostrar mensaje de error
                const errorAlert = await this.alertController.create({
                  header: 'Error',
                  message: 'No se pudo eliminar tu inscripción. Inténtalo nuevamente.',
                  buttons: ['OK'],
                });
                await errorAlert.present();
              }
            );
          },
        },
      ],
    });
  
    await alert.present();
  }
  

}

