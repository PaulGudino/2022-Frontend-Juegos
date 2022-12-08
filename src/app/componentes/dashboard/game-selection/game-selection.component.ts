import { PuenteDatosService } from './../../../servicios/comunicacio_componentes/puente-datos.service';
import { Component, OnInit } from '@angular/core';
import { GameService } from 'src/app/servicios/game/game.service';
import { Game } from 'src/app/interfaces/game/Game';
import { Router } from '@angular/router';

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
    private staticData: PuenteDatosService,
    private router: Router
  ) { 

    this.GameAPI.getAll().subscribe(
      (data) => {
        this.allGames = data;
      }
    )

  }

  ngOnInit() : void {
    // this.loadGames();
    this.staticData.setMenuGeneral();
  }

  tragamonedas_settings(){
    this.router.navigate(['/dashboard/juego/fecha']);
  }

}
