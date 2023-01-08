import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { getAwardList } from 'src/app/interfaces/awards/getAwardList';
import { PuenteDatosService } from '../comunicacio_componentes/puente-datos.service';

@Injectable({
  providedIn: 'root'
})
export class AwardsConditionService {

  constructor(
    private http: HttpClient,
    private puente: PuenteDatosService
  ) { }

  url = this.puente.geturl();

  getAwardConditionFilter(filter: string){
    return this.http.get(this.url+'api/awardconditionfilter/'+filter);
  }
  getAward(){
    return this.http.get(this.url+'api/awardfilter/?is_active=true');
  }
  getAwardConditionbyId(id: number){
    return this.http.get(this.url+'api/awardcondition/'+id + '/');
  }
  postAwardCondition(data: FormData){
    return this.http.post(this.url+'api/awardcondition/', data);
  }
  putAwardCondition(id: number, data: FormData){
    return this.http.put(this.url+'api/awardcondition/'+id+'/', data);
  }
  deleteAwardCondition(id: number){
    return this.http.delete(this.url+'api/awardcondition/'+id + '/');
  }
  getAwardEdit():Observable<getAwardList[]>{
    return this.http.get<getAwardList[]>(this.url+'api/awardlist/');
  }
  changeState(id: number, data: FormData){
    return this.http.post(this.url+'api/awardcondition/'+id+'/change_state/', data);
  }
}
