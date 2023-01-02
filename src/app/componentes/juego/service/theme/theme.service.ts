import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PuenteDatosService } from '../../../../servicios/comunicacio_componentes/puente-datos.service';
import { Styles } from 'src/app/interfaces/styles/Styles';
import { PublicityGameService } from 'src/app/servicios/publicityGame/publicity-game.service';
import { PublicityGame } from 'src/app/interfaces/publicityGame/PublicityGame';

@Injectable({
   providedIn: 'root',
})
export class ThemeService {
   publicityGameList: PublicityGame[] = [];
   columna2 = [5, 6, 7, 8, 9, 10, 1, 2, 3, 4];
   columna3 = [3, 4, 5, 6, 7, 8, 9, 10, 1, 2];
   publicityGameListCol2: PublicityGame[] = [];
   publicityGameListCol3: PublicityGame[] = [];

   constructor(
      private http: HttpClient,
      private puente: PuenteDatosService,
      private publicityGame: PublicityGameService
   ) {
      this.publicityGame.getAllPublicityGame().subscribe((publicityGame) => {
         this.publicityGameList = publicityGame;
         this.columna2.map((i) => {
            publicityGame.forEach((image) => {
               if (image.id == i) {
                  this.publicityGameListCol2.push(image);
               }
            });
         });
         this.columna3.map((i) => {
            publicityGame.forEach((image) => {
               if (image.id == i) {
                  this.publicityGameListCol3.push(image);
               }
            });
         });
      });
   }

   url = this.puente.geturl();

   getDesignInformation(): Observable<Styles[]> {
      return this.http.get<Styles[]>(`${this.url}api/design/`);
   }
}
