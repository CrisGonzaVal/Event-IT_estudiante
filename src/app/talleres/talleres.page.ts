import { Component, OnInit } from '@angular/core';
import { talleres } from 'src/interfaces/talleres';
import { ApicrudSesionService } from '../services/apicrud-sesion.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-talleres',
  templateUrl: './talleres.page.html',
  styleUrls: ['./talleres.page.scss'],
})
export class TalleresPage implements OnInit {

  talleres: talleres[]=[];
  usuario:any;
  inscripciones: any[]=[];

  

  constructor(private apicrudSesion: ApicrudSesionService,
    private router: Router,
    private auth: AuthService, 
    private alertController: AlertController) { }

    ngOnInit() {
      this.cargarDatos();
    }
  
    ionViewWillEnter() {
      this.cargarDatos();
    }
  
    cargarDatos() {
      console.log("cargando datos de talleres");
      this.usuario = this.auth.getSesionUser();
      
      this.apicrudSesion.getTalleres().subscribe((data) => {
        this.talleres = data;
      });
    
      this.apicrudSesion.getInscripciones().subscribe((data) => {
        this.inscripciones = data.filter((inscripcion) => inscripcion.rut === this.usuario.rut);
      });
    }
  
  
  
  async confirmarRegistro(taller: any) {
    const alert = await this.alertController.create({
      header: 'Confirmación de Inscripción',
      message: `¿Deseas registrarte al taller "${taller.nombre} "?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Inscribir',
          handler: () => {
            this.guardarIncripcion(taller);
            this.verDetalle(taller);
          },
        },
      ],
    });
  
    await alert.present();
  }
  
  
  
  
  
  
  GenerarQrData(taller:any){
    return {
      id: taller.id+this.usuario.rut,
      idTaller: taller.id,
      nombre: taller.nombre,
      fecha: taller.fecha,
      tipo: taller.tipo,
      rut: this.usuario.rut, //.slice(0, 8), Primeros 8 caracteres del RUT
      email: this.usuario.email,
      asistido:false,
      comentario:""
    }
  }
  
  
  
  guardarIncripcion( taller:any){
   //preparar datos del qr
    const datoQr = this.GenerarQrData(taller);
  
    // guardar incripcion en Json
    this.apicrudSesion.postInscripcion(datoQr).subscribe(
      () => {
        // Añadir inscripción a la lista local
        this.inscripciones.push(datoQr);
      });
    
    //y descontar 1 cupo despues de guardarlo
    this.descontarCupo(taller);
  }
  
  
  
  verDetalle(taller:any) {
  //preparar datos del qr
    const datoQr = this.GenerarQrData(taller);
  
    //mostrar Qr en el page lector-qr
    this.router.navigate(['./tabs/lector-qr'], { queryParams: { data: JSON.stringify(datoQr) } });
  }
  
  
  
  
  descontarCupo(taller:any){
    taller.cupos -= 1;
    this.apicrudSesion.updateTaller(taller.id, { cupos: taller.cupos }).subscribe();
  }
  
  
  
  
  
  habilitarVerQr(taller: any): boolean {
    return this.inscripciones.some(inscripcion => inscripcion.nombre === taller.nombre);
  }

}
