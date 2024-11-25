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
  inscripciones: any[] = [];
  

  constructor(private apicrudSesion: ApicrudSesionService,
              private router: Router,
              private auth: AuthService, 
              private alertController: AlertController
  ) {}

  ngOnInit() {
    this.cargarDatos();
  }

  ionViewWillEnter() {
    this.cargarDatos();
  }

  cargarDatos() {
    console.log("cargando datos en actividades");
    this.usuario = this.auth.getSesionUser();
    
    this.apicrudSesion.getActividades().subscribe((data) => {
      this.actividad = data;
    });
  
    this.apicrudSesion.getInscripciones().subscribe((data) => {
      this.inscripciones = data.filter((inscripcion) => inscripcion.rut === this.usuario.rut);
    });
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
          this.guardarIncripcion(actividad);
          this.verDetalle(actividad);
        },
      },
    ],
  });

  await alert.present();
}






GenerarQrData(actividad:any){
  return {
    id: actividad.id+this.usuario.rut,
    idTaller: actividad.id,
    nombre: actividad.nombretaller,
    fecha: actividad.fecha,
    tipo: "actividad",
    rut: this.usuario.rut, //.slice(0, 8), Primeros 8 caracteres del RUT
    email: this.usuario.email,
    asistido:false,
    comentario:""
  }
}



guardarIncripcion( actividad:any){
 //preparar datos del qr
  const datoQr = this.GenerarQrData(actividad);

  // guardar incripcion en Json
  this.apicrudSesion.postInscripcion(datoQr).subscribe(
    () => {
      // Añadir inscripción a la lista local
      this.inscripciones.push(datoQr);
    });
  
  //y descontar 1 cupo despues de guardarlo
  this.descontarCupo(actividad);
}



verDetalle(actividad:any) {
//preparar datos del qr
  const datoQr = this.GenerarQrData(actividad);

  //mostrar Qr en el page lector-qr
  this.router.navigate(['./tabs/lector-qr'], { queryParams: { data: JSON.stringify(datoQr) } });
}




descontarCupo(actividad:any){
  actividad.cupos -= 1;
  this.apicrudSesion.updateActividad(actividad.id, { cupos: actividad.cupos }).subscribe();
}





habilitarVerQr(actividad: any): boolean {
  return this.inscripciones.some(inscripcion => inscripcion.nombre === actividad.nombretaller);
}

}
