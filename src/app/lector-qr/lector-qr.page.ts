import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApicrudSesionService } from '../services/apicrud-sesion.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { NavController } from '@ionic/angular';


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
    private navCtrl: NavController) { }

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
    console.log(this.qrData.id+" "+this.qrData.tipo+" "+this.qrData.nombre);
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
              // Obtener datos del taller, evento o seminario antes de actualizar
              let updateCupoObservable;
              if (this.qrData.tipo === 'actividad') {
                updateCupoObservable = this.apicrudSesion.getActividad(this.qrData.idTaller).pipe(
                  // Actualizar el cupo sumando 1
                  tap((actividad: any) => {
                    this.apicrudSesion.updateActividad(this.qrData.idTaller, { cupos: actividad.cupos + 1 }).subscribe();
                  })
                );
              }
              
              else if (this.qrData.tipo === 'evento') {
                updateCupoObservable = this.apicrudSesion.getEvento(this.qrData.idTaller).pipe(
                  // Actualizar el cupo sumando 1
                  tap((evento: any) => {
                    this.apicrudSesion.updateEvento(this.qrData.idTaller, { cupos: evento.cupos + 1 }).subscribe();
                  })
                );
              } 
              
              else if (this.qrData.tipo === 'seminario') {
                updateCupoObservable = this.apicrudSesion.getSeminario(this.qrData.idTaller).pipe(
                  // Actualizar el cupo sumando 1
                  tap((seminario: any) => {
                    this.apicrudSesion.updateSeminario(this.qrData.idTaller, { cupos: seminario.cupos + 1 }).subscribe();
                  })
                );
              }
  
              
              if (updateCupoObservable) {
                updateCupoObservable.subscribe(() => {
                  this.volverAtras();
                });
              }
            });
          },
        },
      ],
    });
  
    await alert.present();
  }


  volverAtras(){
    if (this.qrData.tipo === 'actividad') {
      this.router.navigate(['/tabs/actividades']);
    } else if (this.qrData.tipo === 'evento') {
      this.router.navigate(['/tabs/eventos']);
    } else if (this.qrData.tipo === 'seminario') {
      this.router.navigate(['/tabs/seminarios']);
    }
  }
}

