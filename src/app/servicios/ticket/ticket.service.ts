import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PuenteDatosService } from '../comunicacio_componentes/puente-datos.service';
import { Ticket } from 'src/app/interfaces/ticket/Ticket';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  constructor (
    private http: HttpClient,
    private puente: PuenteDatosService
  ) {}

  url = this.puente.geturl();

  getAll():Observable<Ticket[]>{
    return this.http.get<Ticket[]>(this.url+'api/ticket/');
  }
  getById(id: number):Observable<Ticket>{
    return this.http.get<Ticket>(this.url+'api/ticket/'+id + '/');
  }
  post(form: FormData){
    return this.http.post(this.url+'api/ticket/', form);
  }
  put(id: number, form: FormData){
    return this.http.put(this.url+'api/ticket/'+id+'/', form);
  }
  delete(id: number){
    return this.http.delete(this.url+'api/ticket/'+id + '/');
  }

}
