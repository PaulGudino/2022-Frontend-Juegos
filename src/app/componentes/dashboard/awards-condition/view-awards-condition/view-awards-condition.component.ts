import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AwardsConditionService } from 'src/app/servicios/awards-condition/awards-condition.service';
import { AwardsService } from 'src/app/servicios/awards/awards.service';
import { PuenteDatosService } from 'src/app/servicios/comunicacio_componentes/puente-datos.service';
import { ConfirmDialogService } from 'src/app/servicios/confirm-dialog/confirm-dialog.service';
import { SnackbarService } from 'src/app/servicios/snackbar/snackbar.service';

@Component({
  selector: 'app-view-awards-condition',
  templateUrl: './view-awards-condition.component.html',
  styleUrls: ['./view-awards-condition.component.css']
})
export class ViewAwardsConditionComponent implements OnInit {

  award_name:string = "";
  award_condition_id = Number(this.activerouter.snapshot.paramMap.get('id'));
  award_image:string = "";
  award_condition: any 

  constructor(
    private fb: FormBuilder,
    private awardConditionSrv: AwardsConditionService,
    private awardSrv: AwardsService,
    private snackbar: SnackbarService,
    private dialogService: ConfirmDialogService,
    private router: Router, 
    private activerouter: ActivatedRoute, 
    private staticData: PuenteDatosService
  ) { }

  async ngOnInit(): Promise<void> {
    this.staticData.setMenuTragamonedas();
    await this.getAwardConditionId(this.award_condition_id);
  }
  async getAwardConditionId(id:number){
    this.awardConditionSrv.getAwardConditionbyId(id).subscribe(
      (res:any) => {
        this.getAward(res.award);
        this.award_condition = res;
      },
      (err:any) => {
        this.dialogService.error(err.error);
      }
    )
  }
  getAward(id:number){
    this.awardSrv.getAwardbyId(id).subscribe(
      (data:any) => {
        this.award_image = data.imagen;
        this.award_name = data.name;
      }
    )
  }
  backAwardCondition(){
    this.router.navigate(['/dashboard/premios/condicion']);
  }

}
