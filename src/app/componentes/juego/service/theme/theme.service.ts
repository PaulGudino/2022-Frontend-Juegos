import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Publicity} from '../../../../interfaces/publicity/publicity'
import { Observable } from 'rxjs';
import { PuenteDatosService } from '../../../../servicios/comunicacio_componentes/puente-datos.service';
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
  getPublicityList():Observable<Publicity[]>{
    return this.http.get<Publicity[]>(`${this.url}api/publicity/`)

  }

  getThemeImages(){
    return this.http.get(`https://juegos.pythonanywhere.com/api/imagenesjuegos/`)
  }
}
