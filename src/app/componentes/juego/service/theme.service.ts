import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  constructor(
    private http:HttpClient
  ) { }

  getThemeImages(){
    return this.http.get(`https://juegos.pythonanywhere.com/api/imagenesjuegos/`)
  }
}
