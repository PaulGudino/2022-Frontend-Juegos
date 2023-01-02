import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { getAwardList } from 'src/app/interfaces/awards/getAwardList';
import { PuenteDatosService } from '../comunicacio_componentes/puente-datos.service';

@Injectable({
  providedIn: 'root'
})
export class GameDateService {

  constructor(
    private http: HttpClient,
    private puente: PuenteDatosService
  ) { }

  url = this.puente.geturl();

  postGameDate(data: FormData){
    return this.http.post(this.url+'api/gamedate/', data);
  }
  DateFormat(date : Date ){
    let time = date.getTime();
    let _date = ''
    if (date.getTimezoneOffset() <= 0) {
    //Convert timezoneOffset to hours and add to Date value in milliseconds                              
    let final = time + (Math.abs(date.getTimezoneOffset() * 60000));
    //Convert from milliseconds to date and convert date back to ISO string                              
    _date = new Date(final).toISOString();
    } else {
    let final = time + (-Math.abs(date.getTimezoneOffset() * 60000));
    _date = new Date(final).toISOString();
    }
    return _date.split('.')[0]
  }
}
