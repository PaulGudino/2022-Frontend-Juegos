import { ClientesCrear } from '../../interfaces/clientes/clientesCrear';
import { Clientes } from '../../interfaces/clientes/clientes';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ClientesEditar } from '../../interfaces/clientes/clientesEditar';
import { PuenteDatosService } from '../comunicacio_componentes/puente-datos.service';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  url = this.puente.geturl();

  constructor(private http: HttpClient, private puente: PuenteDatosService) { }

  getClientes():Observable<Clientes[]>{
    return this.http.get<Clientes[]>(this.url+'api/client/');
  }

  getClienteId(id:number):Observable<Clientes>{
    return this.http.get<Clientes>(this.url+'api/client/'+id);
  }

  postClientes(client: ClientesCrear){
    return this.http.post(this.url+'api/create/client/', client);
  }

  putCliente(id:number, client: ClientesEditar){
    return this.http.put(this.url+'api/client/'+id+'/', client);
  }

  deleteCliente(id:number):Observable<Clientes>{
    return this.http.delete<Clientes>(this.url+'api/client/'+id);
  }

}
