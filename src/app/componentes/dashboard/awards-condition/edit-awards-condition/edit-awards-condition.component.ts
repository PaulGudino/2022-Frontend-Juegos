import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AwardsConditionService } from 'src/app/servicios/awards-condition/awards-condition.service';
import { AwardsService } from 'src/app/servicios/awards/awards.service';
import { ConfirmDialogService } from 'src/app/servicios/confirm-dialog/confirm-dialog.service';
import { SnackbarService } from 'src/app/servicios/snackbar/snackbar.service';

@Component({
  selector: 'app-edit-awards-condition',
  templateUrl: './edit-awards-condition.component.html',
  styleUrls: ['./edit-awards-condition.component.css']
})
export class EditAwardsConditionComponent implements OnInit {

  minDate = new Date();
  award_condition_id = Number(this.activerouter.snapshot.paramMap.get('id'));
  img_upload = "assets/img/regalo.png";

  public previsulizacion: string = this.img_upload;
  stock_actual:number = 0;
  award_name:string = "";

  startDate: Date = new Date();
  endDate: Date = new Date();

  form: FormGroup;
  beginDate: Date = new Date();
  finishDate: Date = new Date();

  award_condition: any[] = [];
  
  constructor(
    private fb: FormBuilder,
    private awardConditionSrv: AwardsConditionService,
    private awardSrv: AwardsService,
    private snackbar: SnackbarService,
    private dialogService: ConfirmDialogService,
    private router: Router, 
    private activerouter: ActivatedRoute, 
  ) {
    this.form = this.fb.group({
      startTime:['', Validators.required],
      endTime:['', Validators.required],
      award:['', Validators.required],
    })
   }

  async ngOnInit(): Promise<void> {
    this.getAward();
    await this.getAwardConditionId(this.award_condition_id);

    let currentYear = new Date().getFullYear();
    let currentMonth = new Date().getMonth();
    let currentDay = new Date().getDate();
    this.minDate = new Date(currentYear, currentMonth, currentDay);
  }
  cancel(){
    this.router.navigate(['/dashboard/premios/condicion']);
  }
  getAward(){
    this.awardConditionSrv.getAward().subscribe(
      (data:any) => {
        this.award_condition = data;
      }
    )
  }
  async getAwardConditionId(id:number){
    this.awardConditionSrv.getAwardConditionbyId(id).subscribe(
      (res:any) => {
        this.imgAward(res.award);
        let hora_inicio = res.start_date.split(" ")[1].split(":")[0];
        let minute_inicio = res.start_date.split(" ")[1].split(":")[1];
        let hora_fin = res.end_date.split(" ")[1].split(":")[0];
        let minute_fin = res.end_date.split(" ")[1].split(":")[1];

        this.form.controls['award'].setValue(res.award.toString());
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
        this.dialogService.error(err.error);
      }
    )
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
  async editAwardCondition(){
    if (this.form.valid) {

      await this.changetime();
      const options = {
        title: 'CREAR PREMIO CONDICIONADO',
        message: '¿ESTÁ SEGURO QUE QUIERE CREAR EL NUEVO PREMIO CONDICIONADO?',
        cancelText: 'CANCELAR',
        confirmText: 'EDITAR'
      };
      this.dialogService.open(options);
      this.dialogService.confirmed().subscribe(confirmed => {
        if (confirmed) {
          let formData: FormData = new FormData();

          let game = 1;
          let user_register = localStorage.getItem('user_id');
          
          formData.append('start_date', this.startDate.toISOString().split('.')[0]);
          formData.append('end_date', this.endDate.toISOString().split('.')[0]);
          formData.append('award', this.form.get('award')?.value);
          formData.append('game', game.toString());
          formData.append('user_modify', user_register!);

          this.awardConditionSrv.putAwardCondition(this.award_condition_id, formData).subscribe(
            (res) => {
              this.snackbar.mensaje('Premio Condicionado Actualizado Exitosamente');
              this.router.navigate(['dashboard/premios/condicion']);
            },
            (err) => {
              this.dialogService.error(err.error);
            }
          )
        }
      });
    }else{
      this.snackbar.mensaje('Complete todos los campos');
    }
  }
  imgAward(id:number){
    this.awardSrv.getAwardbyId(id).subscribe(
      (data:any) => {
        this.previsulizacion = data.imagen;
        this.stock_actual = data.current_stock;
        this.award_name = data.name;
      }
    )
  }
}
