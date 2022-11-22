import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { PuenteDatosService } from '../comunicacio_componentes/puente-datos.service';
import {Publicity} from '../../interfaces/publicity/publicity'
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PublicityService {
  url = this.puente.geturl();

  constructor(
    private http: HttpClient,
    private puente: PuenteDatosService,
  ) { }

  getPublicityList():Observable<Publicity[]> {
    return this.http.get<Publicity[]>(this.url+'api/publicity/')
  }

}
