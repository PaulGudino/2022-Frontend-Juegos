import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { PuenteDatosService } from '../../comunicacio_componentes/puente-datos.service';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProbabilityService {
  url = this.puente.geturl();


  constructor(
    private http: HttpClient,
    private puente: PuenteDatosService,


  ) { }

  getAwardsListGame():Observable<any>{
    return this.http.get<any>(this.url+'api/awardGame/')
  }

  getProbabilites():Observable<any>{
    return this.http.get<any>(this.url+'api/probabilidad/1')
  }

  postItemToCategory(data:any){
    return this.http.post(this.url+'api/awardGame/',data)

  }

  putProbabilityConfig(data:FormData){
    return this.http.put(this.url+'api/probabilidad/1/',data)
  }
}
