import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PuenteDatosService } from '../comunicacio_componentes/puente-datos.service';
import { Publicity } from '../../interfaces/publicity/publicity';
import { Observable } from 'rxjs';

@Injectable({
   providedIn: 'root',
})
export class PublicityService {
   url = this.puente.geturl();

   constructor(private http: HttpClient, private puente: PuenteDatosService) {}

   getPublicityTopList(): Observable<Publicity[]> {
      return this.http.get<Publicity[]>(this.url + 'api/Publicity_top/');
   }
   getPublicityBottomList(): Observable<Publicity[]> {
      return this.http.get<Publicity[]>(this.url + 'api/Publicity_bottom/');
   }

   postTopPublicity(form: FormData) {
      return this.http.post(this.url + 'api/Publicity_top/', form);
   }
   postBottomPublicity(form: FormData) {
      return this.http.post(this.url + 'api/Publicity_bottom/', form);
   }
   // put(id: number, data: FormData) {
   //    return this.http
   //       .put(this.url + 'api/Publicity/' + id + '/', data)
   //       .subscribe((data) => {
   //          console.log(data);
   //       });
   // }
   deleteTopPublicity(id: number) {
      return this.http.delete(this.url + 'api/Publicity_top/' + id + '/');
   }
   deleteBottomPublicity(id: number) {
      return this.http.delete(this.url + 'api/Publicity_bottom/' + id + '/');
   }
}
