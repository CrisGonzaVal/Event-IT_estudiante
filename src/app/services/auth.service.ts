import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Users } from 'src/interfaces/users';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  usuario: any;


  constructor(private httpclient: HttpClient,
             private router: Router,

  ) { }

  // Obtener todos los usuarios
  getAllUsers(): Observable<Users[]>{
    return this.httpclient.get<Users[]>(`${environment.apiUrl}/usuarios`);
  }
  
  // Obtener usuario por emai
  getByEmail(email: any): Observable<Users> {
    return this.httpclient.get<Users>(`${environment.apiUrl}/usuarios/?email=${email}`);
  }

  // Comprobar si está logueado
  IsLoggedIn(){
    return sessionStorage.getItem('username')!=null;
  }
 

  //persistencia del usuario

  setSesionUser(usuario: any) {
    sessionStorage.setItem('rut', usuario.rut);
    sessionStorage.setItem('username', usuario.username);
    sessionStorage.setItem('email', usuario.email);
    sessionStorage.setItem('password', usuario.password);
    sessionStorage.setItem('carrera', usuario.carrera);
    sessionStorage.setItem('jornada', usuario.jornada);
    sessionStorage.setItem('seccion', usuario.seccion);
    sessionStorage.setItem('ingresado', 'true');
    return 'Sesión Iniciada '+ usuario.username;

     // Almacenar en sessionStorage

  }
  
  getSesionUser() {
    const getUsuario = {
      rut: sessionStorage.getItem('rut'),
      username: sessionStorage.getItem('username'),
      email: sessionStorage.getItem('email'),
      password: sessionStorage.getItem('password'),
      carrera: sessionStorage.getItem('carrera'),
      jornada: sessionStorage.getItem('jornada'),
      seccion: sessionStorage.getItem('seccion')
    };

    return getUsuario;
  }
  
  updateUser(nuevosDatos: any) {
    this.usuario = { ...this.usuario, ...nuevosDatos };
    sessionStorage.setItem('usuario', JSON.stringify(this.usuario));  // Actualizar en sessionStorage
  }

  cerrarSesionUser() {
    //  para limpiar todo
     sessionStorage.clear();
     
     return 'Sesión Cerrada';
  }

  
  

}