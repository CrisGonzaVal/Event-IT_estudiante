import { Component, OnInit } from '@angular/core';
import { actividades } from 'src/interfaces/actividades';
import { ApicrudSesionService } from '../services/apicrud-sesion.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-actividades',
  templateUrl: './actividades.page.html',
  styleUrls: ['./actividades.page.scss'],
})
export class ActividadesPage implements OnInit {

  actividad: actividades[]=[];
  usuario:any;

  constructor(private apicrudSesion: ApicrudSesionService, private router: Router,
    private auth: AuthService, private alertController: AlertController
  ) {}

  ngOnInit() {
    this.usuario=this.auth.getSesionUser();
    this.apicrudSesion.getActividades().subscribe(data=>{
      this.actividad=data;
    })
  }



async confirmarRegistro(actividad: any) {
  const alert = await this.alertController.create({
    header: 'Confirmación de Inscripción',
    message: `¿Deseas registrarte a la actividad "${actividad.nombretaller} "?`,
    buttons: [
      {
        text: 'Cancelar',
        role: 'cancel',
      },
      {
        text: 'Inscribir',
        handler: () => {
          this.inscribirActividad(actividad);
        },
      },
    ],
  });

  await alert.present();
}



inscribirActividad(actividad: any) {
  const qrdata = {
    // Genera los datos para el QR (RUT y correo del usuario, junto con datos del evento)
    nombre: actividad.nombretaller,
    fecha: actividad.fecha,
    rut: this.usuario.rut, //.slice(0, 8), Primeros 8 caracteres del RUT
    email: this.usuario.email,
    asistido:false,
    comentario:""
  };

  this.apicrudSesion.postInscripcion(qrdata).subscribe(() => {
    this.router.navigate(['./lector-qr'], {
      queryParams: { data: JSON.stringify(qrdata) },
    });
  });
}

}
