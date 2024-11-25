import { Component, OnInit } from '@angular/core';
import { seminarios } from 'src/interfaces/seminarios';
import { ApicrudSesionService } from '../services/apicrud-sesion.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-seminarios',
  templateUrl: './seminarios.page.html',
  styleUrls: ['./seminarios.page.scss'],
})
export class SeminariosPage implements OnInit {

  seminario: seminarios[]=[];
  usuario:any;
  inscripciones: any[] = [];

  constructor(private apicrudSesion: ApicrudSesionService, private router: Router, 
    private auth: AuthService, private alertController: AlertController ) {}

    ngOnInit() {
      this.cargarDatos();
    }
  
    ionViewWillEnter() {
      this.cargarDatos();
    }
  
    cargarDatos() {
      console.log("cargando datos en actividades");
      this.usuario = this.auth.getSesionUser();
      
      this.apicrudSesion.getSeminarios().subscribe((data) => {
        this.seminario = data;
      });
    
      this.apicrudSesion.getInscripciones().subscribe((data) => {
        this.inscripciones = data.filter((inscripcion) => inscripcion.rut === this.usuario.rut);
      });
    }


  async confirmarRegistro(seminario: any) {
    const alert = await this.alertController.create({
      header: 'Confirmación de Inscripción',
      message: `¿Deseas registrarte al seminario "${seminario.nombreseminario} "?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Inscribir',
          handler: () => {
            this.guardarIncripcion(seminario);
            this.verDetalle(seminario);
          },
        },
      ],
    });
  
    await alert.present();
  }
  
  


GenerarQrData(seminario:any){
  return {
    id: seminario.id+this.usuario.rut,
    idTaller: seminario.id,
    nombre: seminario.nombreseminario,
    fecha: seminario.fecha,
    tipo:"seminario",
    rut: this.usuario.rut, //.slice(0, 8), Primeros 8 caracteres del RUT
    email: this.usuario.email,
    asistido:false,
    comentario:""
  }
  
}



guardarIncripcion( seminario:any){
 //preparar datos del qr
  const datoQr = this.GenerarQrData(seminario);

  // guardar incripcion en Json
  this.apicrudSesion.postInscripcion(datoQr).subscribe(() => {
    this.inscripciones.push(datoQr); // Actualizar lista local de inscripciones
  });
  
  //y descontar 1 cupo despues de guardarlo
  this.descontarCupo(seminario);
}


verDetalle(seminario:any) {

  //preparar datos del qr
  const datoQr = this.GenerarQrData(seminario);

  //mostrar Qr en el page lector-qr
  this.router.navigate(['./tabs/lector-qr'], { queryParams: { data: JSON.stringify(datoQr) } });
}

descontarCupo(seminario:any){
  seminario.cupos -= 1;
  this.apicrudSesion.updateSeminario(seminario.id, { cupos: seminario.cupos }).subscribe();
}

// Habilitar botón "Ver QR" si ya está inscrito
habilitarVerQr(seminario: any): boolean {
  return this.inscripciones.some(inscripcion => inscripcion.nombre === seminario.nombreseminario);
}

}