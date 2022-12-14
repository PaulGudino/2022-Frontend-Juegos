import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PuenteDatosService } from '../comunicacio_componentes/puente-datos.service';

@Injectable({
  providedIn: 'root'
})
export class TicketConfigurationService {

  url = this.puente.geturl();

  constructor(
    private http: HttpClient, 
    private puente: PuenteDatosService
  ) { }

  getTicketConfiguration(){
    return this.http.get(`${this.url}api/ticketconfiguration/1/`);
  }
  updateTicketConfiguration(data: FormData){
    return this.http.put(this.url+'api/ticketconfiguration/1/', data);
  }

}
