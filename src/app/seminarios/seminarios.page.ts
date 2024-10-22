import { Component, OnInit } from '@angular/core';
import { seminarios } from 'src/interfaces/seminarios';
import { ApicrudSesionService } from '../services/apicrud-sesion.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seminarios',
  templateUrl: './seminarios.page.html',
  styleUrls: ['./seminarios.page.scss'],
})
export class SeminariosPage implements OnInit {

  seminario: seminarios[]=[];

  constructor(private apicrudSesion: ApicrudSesionService, private router: Router) {}

  ngOnInit() {
    this.apicrudSesion.getSeminarios().subscribe(data=>{
      this.seminario=data;
    })
  }

  buscarSeminario(Observable:any){
    this.router.navigate(['/lectorqr'],
      {queryParams:{mascota: JSON.stringify(Observable)}}
    )
  }

}