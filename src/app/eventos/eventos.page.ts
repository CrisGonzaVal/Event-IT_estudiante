import { Component, OnInit } from '@angular/core';
import { eventos } from 'src/interfaces/eventos';
import { ApicrudSesionService } from '../services/apicrud-sesion.service';
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
    private auth: AuthService
  ) {}

  ngOnInit() {
    this.usuario=this.auth.getSesionUser();
    this.apicrudSesion.getEventos().subscribe(data=>{
      this.evento=data;
    })
  }
  

  inscribir(evento: any) {
    // Genera los datos para el QR (RUT y correo del usuario, junto con datos del evento)
    const qrData = {
      nombre: evento.nombreevento,
      fecha: evento.fecha,
      rut: this.usuario.rut, //.slice(0, 8), Primeros 8 caracteres del RUT
      email: this.usuario.email,
    };

    console.log(qrData);
    // Navega a la página de generación de QR, pasando los datos
    this.router.navigate(['./lector-qr'], { queryParams: { data: JSON.stringify(qrData) } });
  }

}

