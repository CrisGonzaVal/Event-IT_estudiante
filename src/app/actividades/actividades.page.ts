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

  if (actividad.cupos > 0) {
    // Actualiza los cupos del taller
    actividad.cupos -= 1;

    // Guardar la actualización en el JSON 
    this.apicrudSesion.updateActividad(actividad.id, { cupos: actividad.cupos }).subscribe(() => {
      console.log("Cupos actualizados correctamente.");
    });



  // Registrar al usuario y navegar al lector-QR
  const qrdata = {
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
}else{
  console.log("No hay cupos disponibles");
    this.noHayCupoAlert();
}
}


noHayCupoAlert() {
  this.alertController.create({
    header: 'Cupos agotados',
    message: 'Esta actividad ya no tiene cupos disponibles.',
    buttons: ['OK'],
  }).then(alert => alert.present());
}

}
