import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { ApicrudService } from '../services/apicrud.service';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.page.html',
  styleUrls: ['./editar-usuario.page.scss'],
})
export class EditarUsuarioPage implements OnInit {

  usuario: any;

  constructor(private auth: AuthService,
              private router:Router,
              private api: ApicrudService) { }

            

  ngOnInit() {
    // recuperar objeto recibido por url
    this.usuario = this.auth.getSesionUser();
  }

  actualizarUsuario(){


    this.router.navigate(['/tabs/home']);
    this.api.putUser(this.usuario);

  }
}
