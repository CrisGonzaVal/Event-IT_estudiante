import { Component, OnInit } from '@angular/core';
import { actividades } from 'src/interfaces/actividades';
import { ApicrudSesionService } from '../services/apicrud-sesion.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-actividades',
  templateUrl: './actividades.page.html',
  styleUrls: ['./actividades.page.scss'],
})
export class ActividadesPage implements OnInit {

  actividad: actividades[]=[];
  usuario:any;

  constructor(private apicrudSesion: ApicrudSesionService, private router: Router,
    private auth: AuthService
  ) {}

  ngOnInit() {
    this.usuario=this.auth.getSesionUser();
    this.apicrudSesion.getActividades().subscribe(data=>{
      this.actividad=data;
    })
  }

  inscribir(actividad: any) {
    // Genera los datos para el QR (RUT y correo del usuario, junto con datos del evento)
    const qrData = {
      nombre: actividad.nombretaller,
      fecha: actividad.fecha,
      rut: this.usuario.rut, //.slice(0, 8), Primeros 8 caracteres del RUT
      email: this.usuario.email,
    };

    console.log(qrData);
    // Navega a la página de generación de QR, pasando los datos
    this.router.navigate(['./lector-qr'], { queryParams: { data: JSON.stringify(qrData) } });
  }
}
