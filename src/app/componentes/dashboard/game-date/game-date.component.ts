import { GameDateService } from './../../../servicios/game-date/game-date.service';
import { AwardsConditionService } from './../../../servicios/awards-condition/awards-condition.service';
import { Component, OnInit } from '@angular/core';
import { SnackbarService } from 'src/app/servicios/snackbar/snackbar.service';
import { GameService } from './../../../servicios/game/game.service';
import { GamePutDate } from 'src/app/interfaces/game/GamePutDate';
import { PuenteDatosService } from 'src/app/servicios/comunicacio_componentes/puente-datos.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ConfirmDialogService } from 'src/app/servicios/confirm-dialog/confirm-dialog.service';

@Component({
   selector: 'app-game-date',
   templateUrl: './game-date.component.html',
   styleUrls: ['./game-date.component.css'],
})
export class GameDateComponent implements OnInit {
   beginDate: Date = new Date();
   finishDate: Date = new Date();

   startDate: Date = new Date();
   endDate: Date = new Date();

   minDate: Date = new Date();

   form: FormGroup;

   game_start_date: string = ''
   game_end_date: string = ''

   awardConditionList: any[] = [];

   constructor(
      private snackbar: SnackbarService,
      private fb: FormBuilder,
      private dialogService: ConfirmDialogService,
      private game: GameService,
      private staticData: PuenteDatosService,
      private awardsConditionService: AwardsConditionService,
      private gameDataSrv: GameDateService
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

   async ngOnInit(): Promise<void>  {
      this.staticData.setMenuTragamonedas();
      await this.getDate();
      this.awardsConditionService.getAwardConditionFilter('?is_approved=false').subscribe((data: any) => {
         this.awardConditionList = data;
      });
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
      console.log(this.startDate)
      this.endDate = new Date(parseInt(year_f), parseInt(month_f) - 1, parseInt(day_f), parseInt(hora_fin), parseInt(minuto_fin));

    }

   async saveNewDateGame() {
      if (this.validateDates()) {

         const options = {
            title: 'ACTUALIZAR FECHA DEL JUEGO',
            message: '¿ESTÁ SEGURO QUE QUIERE ACTUALIZAR LA FECHA DEL JUEGO?',
            cancelText: 'CANCELAR',
            confirmText: 'ACTUALIZAR'
          };
         this.dialogService.open(options);
         await this.changetime();
         console.log(this.startDate)
         this.dialogService.confirmed().subscribe(confirmed => {
            if (confirmed) {
              let formData: FormData = new FormData();
               
              let start_date = this.gameDataSrv.DateFormat(this.startDate)
              formData.append('start_date', start_date);

              let end_date = this.gameDataSrv.DateFormat(this.endDate)
              formData.append('end_date', end_date)

              formData.append('game', 'T');
              formData.append('is_Active', 'true');
               
              this.game.putGame(1, formData).subscribe((res) => {
                  console.log(res);
               });
               this.snackbar.mensaje(
                  'Se ha actualizado la fecha de disponibilidad del juego'
               );
            }
          });
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
      this.getDate()
   }

   async getDate(){
      this.game.getById(1).subscribe(
         (res:any) => {
            this.game_start_date = res.start_date
            this.game_end_date = res.end_date

            let hora_inicio = res.start_date.split(" ")[1].split(":")[0];
            let minute_inicio = res.start_date.split(" ")[1].split(":")[1];
            let hora_fin = res.end_date.split(" ")[1].split(":")[0];
            let minute_fin = res.end_date.split(" ")[1].split(":")[1];

            this.form.controls['startTime'].setValue({
               hour: Number(hora_inicio),
               minute: Number(minute_inicio)
            });
            this.form.controls['endTime'].setValue({
               hour: Number(hora_fin),
               minute: Number(minute_fin)
            });
            this.beginDate = new Date(res.start_date_nf);
            this.finishDate = new Date(res.end_date_nf);
         },
         (err:any) => {
            console.log(err.error)
          }
      )
   }

}
