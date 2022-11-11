import { GamePutDate } from 'src/app/interfaces/game/GamePutDate';
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

  getAll():Observable<GamePutDate[]>{
    return this.http.get<GamePutDate[]>(this.url+'api/game/');
  }

  put(id: number, data: any){
    return this.http.put(this.url+'api/game/'+id+'/', data);
  }

  putGame(id: number, data: any){
   return this.http.put(this.url+'api/game/'+id+'/', data);
 }
}
