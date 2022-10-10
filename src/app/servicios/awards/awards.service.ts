import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { getAwardList } from 'src/app/interfaces/awards/getAwardList';
import { PuenteDatosService } from '../comunicacio_componentes/puente-datos.service';

@Injectable({
  providedIn: 'root'
})
export class AwardsService {

  constructor(
    private http: HttpClient,
    private puente: PuenteDatosService
  ) { }

  url = this.puente.geturl();

  

  getAward():Observable<getAwardList[]>{
    return this.http.get<getAwardList[]>(this.url+'api/premios/');
  }
  getAwardbyId(id: number):Observable<getAwardList>{
    return this.http.get<getAwardList>(this.url+'api/premios/'+id);
  }
}
