import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-lector-qr',
  templateUrl: './lector-qr.page.html',
  styleUrls: ['./lector-qr.page.scss'],
})
export class LectorQRPage implements OnInit {

  //qrData: string ="";
  act: any = {};
  rut: string="";
  email: string="";
  qrData: string ="";

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['data']) {
        const data = JSON.parse(params['data']);
        this.qrData = JSON.stringify(data); //generar data para el qr
        this.act = {
          nombre: data.nombre,
          fecha: data.fecha
        };
        this.rut = data.rut;
        this.email = data.email;
      }
    }) 
  }
}
