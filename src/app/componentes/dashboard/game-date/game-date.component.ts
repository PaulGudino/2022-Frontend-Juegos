import { Component, OnInit } from '@angular/core';
import { SnackbarService } from 'src/app/servicios/snackbar/snackbar.service';
import {GameService} from './../../../servicios/game/game.service'
import { GamePutDate } from 'src/app/interfaces/game/GamePutDate';

@Component({
  selector: 'app-game-date',
  templateUrl: './game-date.component.html',
  styleUrls: ['./game-date.component.css']
})
export class GameDateComponent implements OnInit {

   beginDate: Date = new Date(2015,10,30);
   finishDate: Date = new Date();

   constructor(
      private snackbar:SnackbarService,
      private game:GameService,
   ) { }

   ngOnInit(): void {
   }

   saveNewDateGame(){
      if(this.validateDates()){
         let gamePut:any ={
            id:'1',
            start_date:this.beginDate.toISOString(),
            end_date:this.finishDate.toISOString(),
            modification_date:new Date().toISOString(),
            game:'T',
            is_active:'true'

         };
         console.log(gamePut)

         this.game.putGame(1,gamePut).subscribe((res) => {
            console.log(res)
         })
         this.snackbar.mensaje('Se a actualizado la fecha de disponibilidad del juego')
      }

   }

   validateDates(){
      let compareDate = new Date(2015,10,30);
      compareDate.setHours(0,0,0,0);
      this.beginDate.setHours(0,0,0,0);
      this.finishDate.setHours(0,0,0,0);

      if(this.beginDate.getTime() == compareDate.getTime()){
         this.snackbar.mensaje('Seleccione un rango de fechas')
         return false;
      }
      else if(this.beginDate > this.finishDate){
         this.snackbar.mensaje('La fecha de inicio no puede ser mayor a la fecha final')
         return false;
      }
      return true;
   }

}
