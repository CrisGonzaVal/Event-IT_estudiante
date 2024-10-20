import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Users } from 'src/interfaces/users';

@Injectable({
  providedIn: 'root'
})
export class ApicrudService {

  constructor(private httpClient: HttpClient) { }


  getUser():Observable<Users[]>{
    return this.httpClient.get<Users[]>(`${environment.apiUrl}/usuarios`); //me devuelve un arreglo

  }

  postUser(newUsuario: Users):Observable<Users>{
    return this.httpClient.post<Users>(`${environment.apiUrl}/usuarios`, newUsuario);
  }

  putUser(usuarios:any):Observable<Users>{
    return this.httpClient.put<Users>(`${environment.apiUrl}/usuarios/${usuarios.rut}`, usuarios);
 }

 deleteUser(usuarios:any):Observable<Users>{
  return this.httpClient.delete<Users>(`${environment.apiUrl}/usuarios/${usuarios.rut}`);
 }
}
