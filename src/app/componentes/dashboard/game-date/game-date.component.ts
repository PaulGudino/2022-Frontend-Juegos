import { Component, OnInit } from '@angular/core';
import { SnackbarService } from 'src/app/servicios/snackbar/snackbar.service';
import {GameService} from './../../../servicios/game/game.service'
import { GamePutDate } from 'src/app/interfaces/game/GamePutDate';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-game-date',
  templateUrl: './game-date.component.html',
  styleUrls: ['./game-date.component.css']
})
export class GameDateComponent implements OnInit {

   minDate = new Date();
   minDatefin  = new Date();

   startDate: Date = new Date();
   endDate: Date = new Date();

   form: FormGroup;
   beginDate: Date = new Date();
   finishDate: Date = new Date();
   constructor(
      private snackbar:SnackbarService,
      private game:GameService,
      private fb: FormBuilder,
   ) {
      this.form = this.fb.group({
         startTime:['', Validators.required],
         endTime:['', Validators.required],
       })
    }

   ngOnInit(): void {
   }

   async changetime(){
      let hora_inicio = this.form.value.startTime.hour
      let minuto_inicio = this.form.value.startTime.minute
  
      let hora_fin = this.form.value.endTime.hour
      let minuto_fin = this.form.value.endTime.minute
    
  
      let inicio_date = this.beginDate.toISOString().split('T')[0];
      const [year_i, month_i, day_i] = inicio_date.split('-');
  
      let fin_date = this.finishDate.toISOString().split('T')[0];
      const [year_f, month_f, day_f] = fin_date.split('-');
  
      this.startDate = new Date(parseInt(year_i), parseInt(month_i) - 1, parseInt(day_i), parseInt(hora_inicio), parseInt(minuto_inicio));
      this.endDate = new Date(parseInt(year_f), parseInt(month_f) - 1, parseInt(day_f), parseInt(hora_fin), parseInt(minuto_fin));
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

   cancel(){

   }

}
