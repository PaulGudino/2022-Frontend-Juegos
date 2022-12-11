import { PuenteDatosService } from './../../../servicios/comunicacio_componentes/puente-datos.service';
import { Component, OnInit } from '@angular/core';
import { GameService } from 'src/app/servicios/game/game.service';
import { Game } from 'src/app/interfaces/game/Game';
import { Router } from '@angular/router';
import { SnackbarService } from 'src/app/servicios/snackbar/snackbar.service';

@Component({
   selector: 'app-game-selection',
   styleUrls: ['./game-selection.component.css'],
   templateUrl: './game-selection.component.html',
})
export class GameSelectionComponent implements OnInit {
   singularName: string = 'Juego';
   pluralName: string = 'Juegos';
   actionName: string = 'Seleccionar';
   allGames: Game[] = [];

   constructor(
      private GameAPI: GameService,
      private staticData: PuenteDatosService,
      private router: Router,
      private snackbar: SnackbarService
   ) {
      this.GameAPI.getAll().subscribe((data) => {
         this.allGames = data;
      });
   }

   ngOnInit(): void {
      // this.loadGames();
      this.staticData.setMenuGeneral();
   }

   tragamonedas_settings() {
      this.router.navigate(['/dashboard/juego/fecha']);
   }

   toogleActiveGame(gameId: number) {
      let game: Game[] = this.allGames.filter(
         (game: Game) => game.id == String(gameId)
      );
      let state = game[0].state;
      let newState;
      if (state == 'Activado') {
         newState = 'Desactivado';
      } else {
         newState = 'Activado';
      }

      let gamePut: any = {
         id: String(gameId),
         modification_date: new Date().toISOString(),
         state: newState,
         is_active: 'true',
      };
      this.GameAPI.putGame(gameId, gamePut).subscribe((res) => {
         console.log(res);
      });
      this.snackbar.mensaje('Se a actualizado el estado del juego');
   }
}
