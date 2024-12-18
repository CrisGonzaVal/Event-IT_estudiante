import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { inscripciones } from 'src/interfaces/inscripciones';
import { map } from 'rxjs/operators';
import { talleres } from 'src/interfaces/talleres';

@Injectable({
  providedIn: 'root'
})
export class ApicrudSesionService {
  constructor(private httpClient: HttpClient) { }



getTalleres():Observable<talleres[]>{
  return this.httpClient.get<talleres[]>(`${environment.apiUrl}/talleres`);
}

getTaller(id: string): Observable<any> {
  return this.httpClient.get<any>(`${environment.apiUrl}/talleres/${id}`);
}


updateTaller(id: string, data: any): Observable<any> {
    return this.httpClient.patch(`${environment.apiUrl}/talleres/${id}`, data);
  }









  
  getInscripciones():Observable<inscripciones[]> {
    return this.httpClient.get<inscripciones[]>(`${environment.apiUrl}/inscripciones`);
  }

  getInscripcion(id: string) {
    return this.httpClient.get(`${environment.apiUrl}/inscripciones/${id}`);
  }  

  postInscripcion(newqrdata: inscripciones):Observable<inscripciones>{
  return this.httpClient.post<inscripciones>(`${environment.apiUrl}/inscripciones`, newqrdata);}

  deleteInscripcion(id: string) {
    return this.httpClient.delete(`${environment.apiUrl}/inscripciones/${id}`);
  }


  getTalleresAsistidos(rut: string) {
    return this.httpClient.get<inscripciones[]>(`${environment.apiUrl}/inscripciones`).pipe(
      map((inscripciones: inscripciones[]) =>
        inscripciones.filter(inscripcion => inscripcion.rut === rut && inscripcion.asistido)
      )
    );
  }

  updateInscripcion(id: string, data: Partial<inscripciones>): Observable<any> {
    return this.httpClient.patch(`${environment.apiUrl}/inscripciones/${id}`, data);
  }


}
