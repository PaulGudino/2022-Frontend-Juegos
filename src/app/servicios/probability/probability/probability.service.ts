import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { PuenteDatosService } from '../../comunicacio_componentes/puente-datos.service';



@Injectable({
  providedIn: 'root'
})
export class ProbabilityService {
  url = this.puente.geturl();

  constructor(
    private http: HttpClient,
    private puente: PuenteDatosService,


  ) { }
  getAwardsListGame(){
    return this.http.get<any>(this.url+'api/awardGame/')
  }
}
