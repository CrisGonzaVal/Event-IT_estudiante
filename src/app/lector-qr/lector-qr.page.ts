import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApicrudSesionService } from '../services/apicrud-sesion.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lector-qr',
  templateUrl: './lector-qr.page.html',
  styleUrls: ['./lector-qr.page.scss'],
})
export class LectorQRPage implements OnInit {

  //qrData: string ="";
  act: any = {};
  rut: string="";
  email: string="";

  qrData: any = {};

  constructor(private route: ActivatedRoute,
    private apicrudSesion: ApicrudSesionService,
    private alertController: AlertController,
    private router: Router,) { }

  ngOnInit() {
    //capturar los datos de generarQrData
    this.route.queryParams.subscribe(params => {
      if (params['data']) {
        const data = JSON.parse(params['data']);

        this.qrData = data; //generar data para el qr

        
        this.act = {
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

              // Actualizar los cupos según el tipo
              if (this.qrData.tipo === 'actividad') {
                this.apicrudSesion.updateActividad(this.qrData.idTaller, { cupos: this.act.cupos + 1 }).subscribe();
              } 

              else if (this.qrData.tipo === 'evento') {
                this.apicrudSesion.updateEvento(this.qrData.idTaller, { cupos: this.act.cupos + 1 }).subscribe();
              } 

              else if (this.qrData.tipo === 'seminario') {
                this.apicrudSesion.updateSeminario(this.qrData.idTaller, { cupos: this.act.cupos + 1 }).subscribe();
              }




              // Redirigir según el tipo
              if (this.qrData.tipo === 'actividad') {
                this.router.navigate(['./actividades']);
              } 
              
              else if (this.qrData.tipo === 'evento') {
                this.router.navigate(['./eventos']);
              } 
              
              else if (this.qrData.tipo === 'seminario') {
                this.router.navigate(['./seminarios']);
              }

            });
          },
        },
      ],
    });

    await alert.present();
  }
}

