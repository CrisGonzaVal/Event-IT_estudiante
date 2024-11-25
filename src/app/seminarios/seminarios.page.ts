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

  constructor(private apicrudSesion: ApicrudSesionService, private router: Router, 
    private auth: AuthService, private alertController: AlertController ) {}

  ngOnInit() {
    this.usuario=this.auth.getSesionUser();
    this.apicrudSesion.getSeminarios().subscribe(data=>{
      this.seminario=data;
    })
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
            this.inscribirSeminario(seminario);
          },
        },
      ],
    });
  
    await alert.present();
  }
  
  
  
  inscribirSeminario(seminario: any) {


    if (seminario.cupos > 0) {
      // Actualiza los cupos del taller
      seminario.cupos -= 1;
  
      // Guardar la actualización en el JSON 
      this.apicrudSesion.updateSeminario(seminario.id, { cupos: seminario.cupos }).subscribe(() => {
        console.log("Cupos actualizados correctamente.");
      });
  
  
  
    // Registrar al usuario y navegar al lector-QR
    const qrdata = {
      nombre: seminario.nombreseminario,
      fecha: seminario.fecha,
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
      message: 'Este evento ya no tiene cupos disponibles.',
      buttons: ['OK'],
    }).then(alert => alert.present());
  }
}