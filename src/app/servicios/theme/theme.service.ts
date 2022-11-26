import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { PuenteDatosService } from '../comunicacio_componentes/puente-datos.service'
import { Styles } from 'src/app/interfaces/styles/Styles';
@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  constructor(
   private http:HttpClient,
    private puente: PuenteDatosService
  ) { }
  url = this.puente.geturl();


  getDesignInformation():Observable<Styles[]>{
   return this.http.get<Styles[]>(`${this.url}api/design/`)
  }

  updateDesgin(id:number,data:FormData){
   return this.http.put(this.url+'api/design/'+id+'/', data).subscribe((data) => {
      console.log(data);
   })
  }

}
