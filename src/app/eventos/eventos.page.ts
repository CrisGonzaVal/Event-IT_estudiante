import { Component, OnInit } from '@angular/core';
import { eventos } from 'src/interfaces/eventos';
import { ApicrudSesionService } from '../services/apicrud-sesion.service';
import { ApicrudService } from '../services/apicrud.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.page.html',
  styleUrls: ['./eventos.page.scss'],
})
export class EventosPage implements OnInit {

  evento: eventos[]=[];
  usuario:any;

  constructor(private apicrudSesion: ApicrudSesionService, private router: Router,
    private apicrud: ApicrudService,
    private auth: AuthService
  ) {}

  ngOnInit() {
    this.usuario=this.auth.getSesionUser();
    this.apicrudSesion.getEventos().subscribe(data=>{
      this.evento=data;
    })
  }
  
  obtenerEventos() {
    this.apicrudSesion.getEventos().subscribe(data => {
      console.log('Datos obtenidos de eventos:', data);
      this.evento = data;
    });
  }

  inscribirEvento(evento: any) {
    // Genera los datos para el QR (RUT y correo del usuario, junto con datos del evento)
   // Supongamos que tienes los datos del usuario
    const qrData = {
      nombreEvento: evento.nombreevento,
      fechaEvento: evento.fecha,
      rut: this.usuario.rut, //.slice(0, 8), Primeros 8 caracteres del RUT
      email: this.usuario.email,
    };

    console.log(qrData);
    // Navega a la página de generación de QR, pasando los datos
    this.router.navigate(['./lector-qr'], { queryParams: { data: JSON.stringify(qrData) } });
  }

}

