import { Component, OnInit } from '@angular/core';
import { actividades } from 'src/interfaces/actividades';
import { ApicrudSesionService } from '../services/apicrud-sesion.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-actividades',
  templateUrl: './actividades.page.html',
  styleUrls: ['./actividades.page.scss'],
})
export class ActividadesPage implements OnInit {

  actividad: actividades[]=[];

  constructor(private apicrudSesion: ApicrudSesionService, private router: Router) {}

  ngOnInit() {
    this.apicrudSesion.getActividades().subscribe(data=>{
      this.actividad=data;
    })
  }

  buscarActividades(Observable:any){
    this.router.navigate(['/detalle-mascota'],
      {queryParams:{mascota: JSON.stringify(Observable)}}
    )
  }
}
