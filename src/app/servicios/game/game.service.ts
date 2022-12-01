import { GamePutDate } from 'src/app/interfaces/game/GamePutDate';
import { Game } from 'src/app/interfaces/game/Game';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PuenteDatosService } from '../comunicacio_componentes/puente-datos.service';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  url = this.puente.geturl();

  constructor(
   private http: HttpClient,
   private puente: PuenteDatosService
  ) { }
  postGame(data: any){
    return this.http.post(`${this.url}/game`, data);
  }

  getAll():Observable<Game[]>{
    return this.http.get<Game[]>(this.url+'api/game/');
  }

  getById(id: number):Observable<Game>{
    return this.http.get<Game>(this.url+'api/game/'+id + '/');
  }

  put(id: number, data: any){
    return this.http.put(this.url+'api/game/'+id+'/', data);
  }

  putGame(id: number, data: any){
   return this.http.put(this.url+'api/game/'+id+'/', data);
 }
}