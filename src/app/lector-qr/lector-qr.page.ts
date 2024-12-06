import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApicrudSesionService } from '../services/apicrud-sesion.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';


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
    private router: Router) { }

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
          text: 'Sí, Quiero Cancelar mi Incripción',
          handler: () => {
            // Lógica para eliminar la inscripción
            this.apicrudSesion.deleteInscripcion(this.qrData.id).subscribe(() => {
              // Obtener datos del taller antes de actualizar
              let updateCupoObservable;

                updateCupoObservable = this.apicrudSesion.getTaller(this.qrData.idTaller).pipe(
                  // Actualizar el cupo sumando 1
                  tap((taller: any) => {
                    this.apicrudSesion.updateTaller(this.qrData.idTaller, { cupos: taller.cupos + 1 }).subscribe();
                  })
                );
  
              
              if (updateCupoObservable) {
                updateCupoObservable.subscribe(() => {
                  this.router.navigate(['/tabs/talleres']);
                });
              }
            });
          },
        },
      ],
    });
  
    await alert.present();
  }

}

