import { Component, OnInit } from '@angular/core';
import { PuenteDatosService } from 'src/app/servicios/comunicacio_componentes/puente-datos.service';

@Component({
  selector: 'app-game-summary',
  templateUrl: './game-summary.component.html',
  styleUrls: ['./game-summary.component.css']
})
export class GameSummaryComponent implements OnInit {

  constructor(
    private staticData: PuenteDatosService,
  ) { }

  ngOnInit(): void {
    this.staticData.setMenuTragamonedas()
  }

}
