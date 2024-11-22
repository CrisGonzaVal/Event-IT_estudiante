import { Component, OnInit } from '@angular/core';
import { seminarios } from 'src/interfaces/seminarios';
import { ApicrudSesionService } from '../services/apicrud-sesion.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-seminarios',
  templateUrl: './seminarios.page.html',
  styleUrls: ['./seminarios.page.scss'],
})
export class SeminariosPage implements OnInit {

  seminario: seminarios[]=[];
  usuario:any;

  constructor(private apicrudSesion: ApicrudSesionService, private router: Router, 
    private auth: AuthService) {}

  ngOnInit() {
    this.usuario=this.auth.getSesionUser();
    this.apicrudSesion.getSeminarios().subscribe(data=>{
      this.seminario=data;
    })
  }


  inscribir(seminario: any) {
    // Genera los datos para el QR (RUT y correo del usuario, junto con datos del evento)
    const qrData = {
      nombre: seminario.nombreseminario,
      fecha: seminario.fecha,
      rut: this.usuario.rut, //.slice(0, 8), Primeros 8 caracteres del RUT
      email: this.usuario.email,
    };

    console.log(qrData);
    // Navega a la página de generación de QR, pasando los datos
    this.router.navigate(['./lector-qr'], { queryParams: { data: JSON.stringify(qrData) } });
  }

}