import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { actividades } from 'src/interfaces/actividades';
import { seminarios } from 'src/interfaces/seminarios';
import { eventos } from 'src/interfaces/eventos';
import { inscripciones } from 'src/interfaces/inscripciones';

@Injectable({
  providedIn: 'root'
})
export class ApicrudSesionService {
  constructor(private httpClient: HttpClient) { }



 getActividades():Observable<actividades[]>{
  return this.httpClient.get<actividades[]>(`${environment.apiUrl}/Actividades`);
}

getSeminarios():Observable<seminarios[]>{
  return this.httpClient.get<seminarios[]>(`${environment.apiUrl}/Seminarios`);
}

getEventos():Observable<eventos[]>{
  return this.httpClient.get<eventos[]>(`${environment.apiUrl}/Eventos`);
}



updateActividad(id: string, data: any): Observable<any> {
    return this.httpClient.patch(`${environment.apiUrl}/Actividades/${id}`, data);
  }

updateEvento(id: string, data: any): Observable<any> {
    return this.httpClient.patch(`${environment.apiUrl}/Eventos/${id}`, data);
  }

updateSeminario(id: string, data: any): Observable<any> {
    return this.httpClient.patch(`${environment.apiUrl}/Seminarios/${id}`, data);
  }


  getInscripciones():Observable<inscripciones[]> {
    return this.httpClient.get<inscripciones[]>(`${environment.apiUrl}/inscripciones`);
  }

  postInscripcion(newqrdata: inscripciones):Observable<inscripciones>{
  return this.httpClient.post<inscripciones>(`${environment.apiUrl}/inscripciones`, newqrdata);}


}
