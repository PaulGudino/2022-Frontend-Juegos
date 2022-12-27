import { AwardsConditionService } from './../../../servicios/awards-condition/awards-condition.service';
import { Component, OnInit } from '@angular/core';
import { SnackbarService } from 'src/app/servicios/snackbar/snackbar.service';
import { GameService } from './../../../servicios/game/game.service';
import { GamePutDate } from 'src/app/interfaces/game/GamePutDate';
import { PuenteDatosService } from 'src/app/servicios/comunicacio_componentes/puente-datos.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
   selector: 'app-game-date',
   templateUrl: './game-date.component.html',
   styleUrls: ['./game-date.component.css'],
})
export class GameDateComponent implements OnInit {
   beginDate: Date = new Date();
   finishDate: Date = new Date();

   minDate: Date = new Date();

   form: FormGroup;

   awardConditionList: any[] = [];

   constructor(
      private snackbar: SnackbarService,
      private fb: FormBuilder,

      private game: GameService,
      private staticData: PuenteDatosService,
      private awardsConditionService: AwardsConditionService
   ) {
      this.form = this.fb.group({
         startTime: ['', Validators.required],
         endTime: ['', Validators.required],
      });
      let currentYear = new Date().getFullYear();
      let currentMonth = new Date().getMonth();
      let currentDay = new Date().getDate();
      this.minDate = new Date(currentYear, currentMonth, currentDay);
   }

   ngOnInit(): void {
      this.staticData.setMenuTragamonedas();
      this.awardsConditionService.getAwardConditionFilter('?is_approved=false').subscribe((data: any) => {
         this.awardConditionList = data;
      });
   }

   saveNewDateGame() {
      if (this.validateDates()) {
         let gamePut: any = {
            id: '1',
            start_date: this.beginDate.toISOString(),
            end_date: this.finishDate.toISOString(),
            modification_date: new Date().toISOString(),
            game: 'T',
            is_active: 'true',
         };
         console.log(gamePut);

         this.game.putGame(1, gamePut).subscribe((res) => {
            console.log(res);
         });
         this.snackbar.mensaje(
            'Se a actualizado la fecha de disponibilidad del juego'
         );
      }
   }

   validateDates() {
      if (!this.form.valid) {
         this.snackbar.mensaje('LLene todos los campos');
         return false;
      } else if (!this.validateConditionalAward()) {
         this.snackbar.mensaje(
            'No puede cambiar la fecha del juego mientras existan juegos condicionados en espera.'
         );
         return false;
      }
      let hora_inicio = this.form.value.startTime.hour;
      let minuto_inicio = this.form.value.startTime.minute;

      let hora_fin = this.form.value.endTime.hour;
      let minuto_fin = this.form.value.endTime.minute;

      this.beginDate.setHours(hora_inicio, minuto_inicio, 0, 0);
      this.finishDate.setHours(hora_fin, minuto_fin, 0, 0);

      debugger;

      if (this.beginDate.getTime() == this.finishDate.getTime()) {
         this.snackbar.mensaje(
            'El rango de fechas de disponibilidad debe ser mayor a un dia'
         );
         return false;
      } else if (this.beginDate > this.finishDate) {
         this.snackbar.mensaje(
            'La fecha de inicio no puede ser mayor a la fecha final'
         );
         return false;
      }
      return true;
   }
   validateConditionalAward() {
      if (this.awardConditionList.length > 0) {
         return false;
      }
      return true;
   }

   cancel() {
      this.beginDate = new Date();
      this.finishDate = new Date();

      this.form.value.startTime.hour = 0;
      this.form.value.startTime.minute = 0;

      this.form.controls['startTime'].setValue(0);
      this.form.controls['endTime'].setValue(0);
   }
}
