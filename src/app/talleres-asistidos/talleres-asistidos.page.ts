import { Component, OnInit } from '@angular/core';
import { ApicrudSesionService } from '../services/apicrud-sesion.service';
import { inscripciones } from 'src/interfaces/inscripciones';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-talleres-asistidos',
  templateUrl: './talleres-asistidos.page.html',
  styleUrls: ['./talleres-asistidos.page.scss'],
})
export class TalleresAsistidosPage implements OnInit {
  talleresAsistidos: inscripciones[] = [];
  usuario: any;

  constructor(private apicrudSesion: ApicrudSesionService, private auth: AuthService) {}

  ngOnInit() {
    this.usuario = this.auth.getSesionUser();
    this.cargarTalleresAsistidos();
  }

  ionViewWillEnter(){
    this.usuario = this.auth.getSesionUser();
    this.cargarTalleresAsistidos();
  }




  cargarTalleresAsistidos() {
    this.apicrudSesion.getTalleresAsistidos(this.usuario.rut).subscribe((data) => {
      this.talleresAsistidos = data;
      console.log('Talleres asistidos:', this.talleresAsistidos);
    });
  }

  agregarComentario(taller: inscripciones) {
    const nuevoComentario = prompt('Escribe tu comentario:');
    if (nuevoComentario) {
      taller.comentario = nuevoComentario; // Actualizar localmente
      this.apicrudSesion.updateInscripcion(taller.id, { comentario: nuevoComentario }).subscribe(() => {
        console.log('Comentario guardado:', nuevoComentario);
      });
    }
  }
}
