import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PuenteDatosService } from '../comunicacio_componentes/puente-datos.service';
import { PublicityGame } from '../../interfaces/publicityGame/PublicityGame';
import { Observable } from 'rxjs';

@Injectable({
   providedIn: 'root',
})
export class PublicityGameService {
   url = this.puente.geturl();

   constructor(private http: HttpClient, private puente: PuenteDatosService) {}

   getAllPublicityGame(): Observable<PublicityGame[]> {
      return this.http.get<PublicityGame[]>(this.url + 'api/Publicity_game/');
   }

   getPublicityGame(id: string): Observable<PublicityGame> {
      return this.http.get<PublicityGame>(
         this.url + 'api/Publicity_game/' + id + '/'
      );
   }
   updatePublicityGame(id: string, form: FormData) {
      return this.http.put(this.url + 'api/Publicity_game/' + id + '/', form);
   }
}
