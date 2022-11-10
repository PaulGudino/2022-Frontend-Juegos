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

  getTickets():Observable<Ticket[]>{
    return this.http.get<Ticket[]>(this.url+'api/ticket/');
  }
  getTicketById(id: number):Observable<Ticket>{
    return this.http.get<Ticket>(this.url+'api/ticket/'+id);
  }
  postTicket(form: FormData){
    return this.http.post(this.url+'api/ticket/', form);
  }
  putTicket(id: number, form: FormData){
    return this.http.put(this.url+'api/ticket/'+id+'/', form);
  }
  deleteTicket(id: number){
    return this.http.delete(this.url+'api/ticket/'+id);
  }

}
