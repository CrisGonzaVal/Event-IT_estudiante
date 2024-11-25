import { Component, OnInit } from '@angular/core';
import { eventos } from 'src/interfaces/eventos';
import { ApicrudSesionService } from '../services/apicrud-sesion.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.page.html',
  styleUrls: ['./eventos.page.scss'],
})
export class EventosPage implements OnInit {

  evento: eventos[] = [];
  usuario: any;
  inscripciones: any[] = [];

  constructor(
    private apicrudSesion: ApicrudSesionService,
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
    
    this.apicrudSesion.getEventos().subscribe((data) => {
      this.evento = data;
    });
  
    this.apicrudSesion.getInscripciones().subscribe((data) => {
      this.inscripciones = data.filter((inscripcion) => inscripcion.rut === this.usuario.rut);
    });
  }

  // Confirmación de registro
  async confirmarRegistro(evento: any) {
    const alert = await this.alertController.create({
      header: 'Confirmación de Inscripción',
      message: `¿Deseas registrarte al evento "${evento.nombreevento} "?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Inscribir',
          handler: () => {
            this.guardarIncripcion(evento);
            this.verDetalle(evento);
          },
        },
      ],
    });

    await alert.present();
  }

  // Generar datos del QR
  GenerarQrData(evento: any) {
    return {
      id: evento.id+this.usuario.rut,
      idTaller: evento.id,
      nombre: evento.nombreevento,
      fecha: evento.fecha,
      tipo:"evento",
      rut: this.usuario.rut,
      email: this.usuario.email,
      asistido: false,
      comentario: "",
    };
  }

  // Guardar inscripción y descontar cupo
  guardarIncripcion(evento: any) {
    const datoQr = this.GenerarQrData(evento);

    // Guardar inscripción
    this.apicrudSesion.postInscripcion(datoQr).subscribe(() => {
      
      this.inscripciones.push(datoQr); // Actualizar lista local de inscripciones
    });

    // Descontar cupo
    this.descontarCupo(evento);
  }

  // Mostrar QR en lector-qr
  verDetalle(evento: any) {
    const datoQr = this.GenerarQrData(evento);

    
    this.router.navigate(['./tabs/lector-qr'], { queryParams: { data: JSON.stringify(datoQr) } });
  }

  // Actualizar cupos
  descontarCupo(evento: any) {
    evento.cupos -= 1;
    this.apicrudSesion.updateEvento(evento.id, { cupos: evento.cupos }).subscribe();
  }

  // Habilitar botón "Ver QR" si ya está inscrito
  habilitarVerQr(evento: any): boolean {
    return this.inscripciones.some(inscripcion => inscripcion.nombre === evento.nombreevento);
  }
}
