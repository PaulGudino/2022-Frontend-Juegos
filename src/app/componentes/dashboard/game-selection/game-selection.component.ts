import { Component, OnInit } from '@angular/core';
import { GameService } from 'src/app/servicios/game/game.service';
import { Game } from 'src/app/interfaces/game/Game';

@Component({
  selector: 'app-game-selection',
  styleUrls: ['./game-selection.component.css'],
  templateUrl: './game-selection.component.html',
})
export class GameSelectionComponent implements OnInit{

  singularName : string = 'Juego';
  pluralName : string = 'Juegos';
  actionName : string = 'Seleccionar';
  allGames : Game[] = [];

  constructor(
    private GameAPI : GameService,
  ) { 

    this.GameAPI.getAll().subscribe(
      (data) => {
        this.allGames = data;
      }
    )

  }

  ngOnInit() : void {
    // this.loadGames();
  }

}
