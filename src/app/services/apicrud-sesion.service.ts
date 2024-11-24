import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { actividades } from 'src/interfaces/actividades';
import { seminarios } from 'src/interfaces/seminarios';
import { eventos } from 'src/interfaces/eventos';
import { incripcion } from 'src/interfaces/incripcion';

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

postInscripcion(newqrdata: incripcion):Observable<incripcion>{
  return this.httpClient.post<incripcion>(`${environment.apiUrl}/incripcion`, newqrdata);}





}
