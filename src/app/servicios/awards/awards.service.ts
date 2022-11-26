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
    return this.http.get<getAwardList[]>(this.url+'api/awardlist/');
  }
  getAwardbyId(id: number):Observable<getAwardList>{
    return this.http.get<getAwardList>(this.url+'api/award/'+id+'/');
  }
  getAwardbyIdVisualizer(id: number):Observable<getAwardList>{
    return this.http.get<getAwardList>(this.url+'api/awardlist/'+id + '/');
  }
  postAward(data: FormData){
    return this.http.post(this.url+'api/award/', data);
  }
  putAward(id: number, data: FormData){
    return this.http.put(this.url+'api/award/'+id+'/', data);
  }
  deleteAward(id: number){
    return this.http.delete(this.url+'api/award/'+id + '/');
  }
  getFilterAward(filter: string):Observable<getAwardList[]>{ 
    return this.http.get<getAwardList[]>(this.url+'api/awardfilter/'+filter);
  }

}
