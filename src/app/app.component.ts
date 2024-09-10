import { Component } from '@angular/core';


interface Menu{

  icon:string;
  name:string;
  redirectTo:string;
  cantidad:number;
}

interface configuraciones{

  icon:string;
  name:string;
  redirectTo:string;
}
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  menu:Menu[]=[

    {
      icon:'newspaper-outline',
      name:'ACTIVIDADES',
      redirectTo:'/actividades',
      cantidad:10
    },
    {
      icon:'chatbubbles-outline',
      name:'SEMINARIOS',
      redirectTo:'/seminarios',
      cantidad:10
    },
    {
      icon:'calendar-outline',
      name:'EVENTOS',
      redirectTo:'/eventos',
      cantidad:10
    },

  ]

  configuraciones:configuraciones[]=[

    {
      icon:'settings-outline',
      name:'CONFIGURACIONES',
      redirectTo:'/tabs/tab5',
    },
    {
      icon:'exit-outline',
      name:'CERRAR SESIÓN',
      redirectTo:'/login',
    },

  ]


  constructor() {}
}
