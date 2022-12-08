import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Menu } from 'src/app/interfaces/menu';

export interface ID {
   user_id: number;
}

@Injectable({
   providedIn: 'root',
})
export class PuenteDatosService {

   menu = '/assets/data/menu.json';

   /**
    * For testing environments
    */
   url = 'http://localhost:8000/';
   /**
    * For deployment environmnets
    */
   //
   // url = 'https://juegos.pythonanywhere.com/';

   constructor(private http: HttpClient) {}
   geturl(): string {
      return this.url;
   }
   getMenu():Observable<Menu[]>{
      return this.http.get<Menu[]>(this.menu);
   }
   setMenuTragamonedas(){
      this.menu = '/assets/data/tragamonedas.json';
   }
   setMenuGeneral(){
      this.menu = '/assets/data/menu.json';
   }
}
