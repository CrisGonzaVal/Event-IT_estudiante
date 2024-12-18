import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent  implements OnInit {

  

  @Input() title: string = 'Default Title'; // Título dinámico
  @Input() icon: string = 'menu'; // Icono dinámico
  @Input() defaultHref: string = '/'; // Ruta por defecto para el back-button
  

  constructor() { }

  ngOnInit() {}

}
