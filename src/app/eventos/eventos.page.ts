import { Component, OnInit } from '@angular/core';
import { eventos } from 'src/interfaces/eventos';
import { ApicrudSesionService } from '../services/apicrud-sesion.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.page.html',
  styleUrls: ['./eventos.page.scss'],
})
export class EventosPage implements OnInit {

  evento: eventos[]=[];

  constructor(private apicrudSesion: ApicrudSesionService, private router: Router) {}

  ngOnInit() {
    this.apicrudSesion.getEventos().subscribe(data=>{
      this.evento=data;
    })
  }

  buscarEvento(Observable:any){
    this.router.navigate(['/detalle-mascota'],
      {queryParams:{mascota: JSON.stringify(Observable)}}
    )
  }
}

