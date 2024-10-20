import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { Users } from 'src/interfaces/users';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.page.html',
  styleUrls: ['./editar-usuario.page.scss'],
})
export class EditarUsuarioPage implements OnInit {

  usuario: any;

  constructor(private activated: ActivatedRoute,
             private menucontroller:MenuController,
             private router:Router,
            private auth: AuthService) { }
            

  ngOnInit() {
    // recuperar objeto recibido por url
    this.usuario = this.auth.getSesionUser();
  }

}
