import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PuenteDatosService } from '../comunicacio_componentes/puente-datos.service';
import { Client } from 'src/app/interfaces/client/Client';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor (
    private http: HttpClient,
    private puente: PuenteDatosService
  ) {}

  url = this.puente.geturl();

  getAll():Observable<Client[]>{
    return this.http.get<Client[]>(this.url+'api/client/');
  }
  getById(id: number):Observable<Client>{
    return this.http.get<Client>(this.url+'api/client/'+id);
  }
  post(form: FormData){
    return this.http.post(this.url+'api/client/', form);
  }
  put(id: number, form: FormData){
    return this.http.put(this.url+'api/client/'+id+'/', form);
  }
  delete(id: number){
    return this.http.delete(this.url+'api/client/'+id);
  }
  getFilter(filter: string):Observable<Client[]>{    
    return this.http.get<Client[]>(this.url+'api/clientfilter/'+filter);
  }

}
