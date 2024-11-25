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

  evento: eventos[]=[];
  usuario:any;

  constructor(private apicrudSesion: ApicrudSesionService, private router: Router,
    private auth: AuthService,  private alertController: AlertController
  ) {}

  ngOnInit() {
    this.usuario=this.auth.getSesionUser();
    this.apicrudSesion.getEventos().subscribe(data=>{
      this.evento=data;
    })
  }
  

  async confirmarRegistro(evento: any) {
    const alert = await this.alertController.create({
      header: 'Confirmación de Incripción',
      message: `¿Deseas registrarte al evento "${evento.nombreevento} "?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Inscribir',
          handler: () => {
            this.inscribirEvento(evento);
          },
        },
      ],
    });
  
    await alert.present();
  }
  
  
  
  inscribirEvento(evento: any) {
    const qrdata = {
      // Genera los datos para el QR (RUT y correo del usuario, junto con datos del evento)
      nombre: evento.nombreevento,
      fecha: evento.fecha,
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

