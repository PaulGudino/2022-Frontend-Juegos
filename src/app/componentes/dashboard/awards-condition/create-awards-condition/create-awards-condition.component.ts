import { ProbabilityService } from 'src/app/servicios/probability/probability/probability.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AwardsConditionService } from 'src/app/servicios/awards-condition/awards-condition.service';
import { AwardsService } from 'src/app/servicios/awards/awards.service';
import { PuenteDatosService } from 'src/app/servicios/comunicacio_componentes/puente-datos.service';
import { ConfirmDialogService } from 'src/app/servicios/confirm-dialog/confirm-dialog.service';
import { GameDateService } from 'src/app/servicios/game-date/game-date.service';
import { MatchService } from 'src/app/servicios/match/match.service';
import { SnackbarService } from 'src/app/servicios/snackbar/snackbar.service';
import { getAwardList } from 'src/app/interfaces/awards/getAwardList';
import { map, Observable, startWith } from 'rxjs';

function autocompleteObjectValidator(): ValidatorFn {
   return (control: AbstractControl): { [key: string]: any } | null => {
     if (typeof control.value === 'string') {
       return { 'invalidAutocompleteObject': { value: control.value } }
     }
     return null  /* valid option selected */
   }
 }
 
@Component({
   selector: 'app-create-awards-condition',
   templateUrl: './create-awards-condition.component.html',
   styleUrls: ['./create-awards-condition.component.css'],
})
export class CreateAwardsConditionComponent implements OnInit {
   minDate = new Date();
   minDatefin = new Date();

   img_upload = 'assets/img/regalo.png';

   public previsulizacion: string = this.img_upload;
   stock_actual: number = 0;
   award_name: string = '';

   startDate: Date = new Date();
   endDate: Date = new Date();

   form: FormGroup;
   beginDate: Date = new Date();
   finishDate: Date = new Date();

   len_award_cond_today : number = 0;
   len_match_today : number = 0;
   winner_limit : number = 0;
   limit_award_condition : number = 0;

   allAwards : getAwardList[] = [];
   filteredOptions!: Observable<getAwardList[]>;

   constructor(
      private fb: FormBuilder,
      private awardConditionSrv: AwardsConditionService,
      private awardSrv: AwardsService,
      private snackbar: SnackbarService,
      private dialogService: ConfirmDialogService,
      private router: Router,
      private staticData: PuenteDatosService,
      private gameDataSrv: GameDateService,
      private matchSrv : MatchService,
      private probabilitySrv : ProbabilityService
   ) {
      this.form = this.fb.group({
         startTime: ['', Validators.required],
         endTime: ['', Validators.required],
         award: new FormControl('', [Validators.required, autocompleteObjectValidator()]),
      });
   }

   private _filter(name: string): getAwardList[] {
      if (name === '') {
        return this.allAwards.slice();
      }
      const filterValue = name.toLowerCase();
      return this.allAwards.filter(option => option.name.toLowerCase().includes(filterValue));
   }
   displayFn(award: getAwardList): string | undefined {
      // Muetsra el valor que se asigne en el input
      const valueshow = award.name
      return award && award.name ? valueshow : undefined;
    }
  
    public validation_msgs = {
      'contactAutocompleteControl': [
        { type: 'invalidAutocompleteObject', message: 'Seleccione una opción del listado !!!' },
      ]
    }

   async ngOnInit(): Promise<void> {
      this.staticData.setMenuTragamonedas();
      this.getAward();
      let currentYear = new Date().getFullYear();
      let currentMonth = new Date().getMonth();
      let currentDay = new Date().getDate();
      this.minDate = new Date(currentYear, currentMonth, currentDay);
      this.minDatefin = new Date(currentYear, currentMonth, currentDay);
      this.finishDate = new Date(currentYear, currentMonth, currentDay);
      
      await this.getTodayAwaradCondition()
   }

   async changetime() {
      let hora_inicio = this.form.value.startTime.hour;
      let minuto_inicio = this.form.value.startTime.minute;

      let hora_fin = this.form.value.endTime.hour;
      let minuto_fin = this.form.value.endTime.minute;

      let fin_date = this.finishDate.toISOString().split('T')[0];
      const [year_f, month_f, day_f] = fin_date.split('-');

      this.startDate = new Date(
         parseInt(year_f),
         parseInt(month_f) - 1,
         parseInt(day_f),
         parseInt(hora_inicio),
         parseInt(minuto_inicio)
      );
      this.endDate = new Date(
         parseInt(year_f),
         parseInt(month_f) - 1,
         parseInt(day_f),
         parseInt(hora_fin),
         parseInt(minuto_fin)
      );
      console.log('async s',this.startDate)
      console.log('async f',this.endDate)
   }

   async create() {
      if (this.form.valid) {
         if (this.len_award_cond_today < this.limit_award_condition){
            await this.changetime();
            const options = {
               title: 'CREAR PREMIO CONDICIONADO',
               message:
                  '¿ESTÁ SEGURO QUE DESEA CREAR EL NUEVO PREMIO CONDICIONADO?',
               cancelText: 'CANCELAR',
               confirmText: 'CREAR',
            };
            this.dialogService.open(options);
            this.dialogService.confirmed().subscribe((confirmed) => {
               if (confirmed) {
                  let formData: FormData = new FormData();
   
                  let game = 1;
                  let user_register = sessionStorage.getItem('user_id');
                  
                  console.log(this.startDate)
                  console.log(this.endDate)

                  let start_date = this.gameDataSrv.DateFormat(this.startDate)
                  formData.append(
                     'start_date',
                     start_date
                  );
                  let end_date = this.gameDataSrv.DateFormat(this.endDate)
                  formData.append(
                     'end_date',
                     end_date
                  );
                  console.log(start_date)
                  console.log(end_date)
                  formData.append('award', this.form.get('award')?.value.id);
                  formData.append('game', game.toString());
                  formData.append('user_register', user_register!);
                  formData.append('user_modify', user_register!);
   
                  this.awardConditionSrv.postAwardCondition(formData).subscribe(
                     (res) => {
                        this.snackbar.mensaje(
                           'Premio Condicionado Creado Exitosamente'
                        );
                        this.router.navigate(['dashboard/premios/condicion']);
                     },
                     (err) => {
                        this.dialogService.error(err.error);
                     }
                  );
               }
            });
         }else{
            this.snackbar.mensaje('Alcanzó el máximo de Premios Condicionados de hoy')
         }
      } else {
         this.snackbar.mensaje('Complete todos los campos');
      }
   }

   getAward() {
      this.awardConditionSrv.getAward().subscribe((data: any) => {
         this.allAwards = data;
         if (data.length == 0){
            // let award_message = ['No hay un premio activo disponible']
            let award_message = ['No hay un premio activo disponible']
            this.dialogService.error(award_message);
         }
         this.filteredOptions = this.form.controls['award'].valueChanges.pipe(
            startWith(''),
            map(value => {
              const name = typeof value === 'string' ? value : value?.name;
              return name ? this._filter(name as string) : this.allAwards.slice();
            }),
          );
      });
   }
   imgAward(object : any) {
      let id = this.form.get('award')?.value.id
      this.awardSrv.getAwardbyId(id).subscribe((data: any) => {
         this.previsulizacion = data.imagen;
         this.stock_actual = data.initial_stock;
         this.award_name = data.name;
      });
   }
   cancel() {
      this.router.navigate(['dashboard/premios/condicion']);
   }
   async getTodayAwaradCondition(){
      let today = new Date();
      let current_day = this.gameDataSrv.DateFormat(today).split('T')[0]

      await this.getLenAwardCondToday(current_day)
      await this.getLenMatchToday(current_day)
      await this.getWinnerLimit()
   }

   async getLenAwardCondToday(current_day:string){
      let filter_today = '?start_date__date__range='+current_day+'%2C'+current_day
      this.awardConditionSrv.getAwardConditionFilter(filter_today).subscribe(
         (res) => {
            this.len_award_cond_today = Object.keys(res).length;
         }
      )
   }

   async getLenMatchToday(current_day:string){
      let filter_match = '?win_match=true&start_date__date__range='+current_day+'%2C'+current_day
      this.matchSrv.getMatchFilter(filter_match).subscribe(
         (res) => {
            this.len_match_today = Object.keys(res).length;
         }
      )
   }

   async getWinnerLimit(){
      this.probabilitySrv.getProbabilites().subscribe(
         (res) => {
            this.winner_limit = res.winners_limit;
            this.limit_award_condition = this.winner_limit - this.len_match_today
         }
      )
   }
}
