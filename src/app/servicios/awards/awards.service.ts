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
    return this.http.get<getAwardList[]>(this.url+'api/premioslist/');
  }
  getAwardbyId(id: number):Observable<getAwardList>{
    return this.http.get<getAwardList>(this.url+'api/premios/'+id);
  }
  getAwardbyIdVisualizer(id: number):Observable<getAwardList>{
    return this.http.get<getAwardList>(this.url+'api/premioslist/'+id);
  }
  postAward(data: FormData){
    return this.http.post(this.url+'api/premios/', data);
  }
  putAward(id: number, data: FormData){
    return this.http.put(this.url+'api/premios/'+id+'/', data);
  }
  deleteAward(id: number){
    return this.http.delete(this.url+'api/premios/'+id);
  }

}
