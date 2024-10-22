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
    sessionStorage.setItem('id', usuario.id);
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
      id: sessionStorage.getItem('id'),
      rut: sessionStorage.getItem('rut'),
      username: sessionStorage.getItem('username'),
      email: sessionStorage.getItem('email'),
      password: sessionStorage.getItem('password'),
      carrera: sessionStorage.getItem('carrera'),
      jornada: sessionStorage.getItem('jornada'),
      seccion: sessionStorage.getItem('seccion'),
      isactive: sessionStorage.getItem('isactive') === 'true' ? true : true
      
    };

    return getUsuario;
  }
  

  cerrarSesionUser() {
    //  para limpiar todo
     sessionStorage.clear();
     this.router.navigateByUrl('/login', { replaceUrl: true });
     
     return 'Sesión Cerrada';
  }

  
  

}