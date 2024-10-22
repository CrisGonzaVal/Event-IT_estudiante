import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Users } from 'src/interfaces/users';

@Injectable({
  providedIn: 'root'
})
export class ApicrudService {

  constructor(private httpClient: HttpClient,) { }
  


  getUsers():Observable<Users[]>{
    return this.httpClient.get<Users[]>(`${environment.apiUrl}/usuarios`); //me devuelve un arreglo

  }

  postUser(newUsuario: Users):Observable<Users>{
    return this.httpClient.post<Users>(`${environment.apiUrl}/usuarios`, newUsuario);
  }


 // Método para obtener un usuario específico por su id
 getUserById(id: string): Observable<Users> {
  return this.httpClient.get<Users>(`${environment.apiUrl}/usuarios/${id}`);
}

 // Actualizar usuario por ID
 putUserById(id: string, usuario: any): Observable<Users> {
  return this.httpClient.put<Users>(`${environment.apiUrl}/usuarios/${id}`, usuario);
}

deleteUserById(id: string): Observable<void> {
  return this.httpClient.delete<void>(`${environment.apiUrl}/usuarios/${id}`);
}

 
}
