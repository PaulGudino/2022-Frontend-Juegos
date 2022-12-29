import { PuenteDatosService } from 'src/app/servicios/comunicacio_componentes/puente-datos.service';
import { Component, OnInit, SimpleChanges } from '@angular/core';
import { getAwardList } from 'src/app/interfaces/awards/getAwardList';
import {AwardsService} from "../../../servicios/awards/awards.service";
import { ControllerProbabilityService } from 'src/app/servicios/probability/controllerProbability/controller-probability.service';
import { ProbabilityService } from 'src/app/servicios/probability/probability/probability.service';
import {Publicity} from '../../../interfaces/publicity/publicity'
import { FormGroup,FormControl,FormBuilder } from '@angular/forms';
import { ConfirmDialogService } from 'src/app/servicios/confirm-dialog/confirm-dialog.service';
import {SnackbarService} from '../../../servicios/snackbar/snackbar.service'


@Component({
  selector: 'app-probabilidades',
  templateUrl: './probabilidades.component.html',
  styleUrls: ['./probabilidades.component.css'],

})
export class ProbabilidadesComponent implements OnInit {

  isModalOpen:boolean=false;
  awardsGame:getAwardList[]=[];

  legendary:getAwardList[]=[];
  legendary_box:Number[] = this.controller.getLegendaryBoxes();
  epic:getAwardList[]=[];
  epic_box:Number[] = this.controller.getEpicBoxes();

  rare:getAwardList[]=[];
  common:getAwardList[]=[];
  common_box:Number[] = this.controller.getCommonBoxes();

  modalAwards:getAwardList[]=[];
  publicityList: Publicity[]=[]
  categoryModal:string='';

  form:FormGroup;
  probabilityData:any;

  totalSquares:number=0;
  limitWinners:number=0;
  limitAttempts:number=0;
  percentage:number=0;
  limitMessage:string=''

  constructor(
    private awards:AwardsService,
    private controller:ControllerProbabilityService,
    private probability:ProbabilityService,
    private fb:FormBuilder,
    private dialog:ConfirmDialogService,
    private snackBar:SnackbarService,
    private staticData: PuenteDatosService

  ) {
    this.form = this.fb.group({
      percent_win:[''],
      limit_winners:[''],
      limit_attempts:[''],

    })

   }

  ngOnInit(){
    this.staticData.setMenuTragamonedas();
    this.awards.getAward()
      .subscribe(data => {
        this.probability.getAwardsListGame().subscribe(
          awardGameData =>{
         this.getAwardsPerCategory(data,awardGameData)

        })

       this.probability.getProbabilites()
			.subscribe(data =>{
            if(data.length > 0){
               console.log(data)
               this.probabilityData = data[data.length-1]
               console.log(this.probabilityData);
               this.limitWinners = this.probabilityData.winners_limit
               this.percentage = this.probabilityData.percent_win
               this.limitAttempts = this.probabilityData.attempts_limit
               this.limitMessage = `limite actual Intentos ${this.limitWinners}`

            }


			})

   })
}





private getAwardsPerCategory(awardsList:getAwardList[],awardGameList:any){
   awardsList.forEach((award:getAwardList) => {
     awardGameList.forEach((awardGame:any) =>{
       if(award.category=="Legendaria" && awardGame.premio_id == award.id){
         this.legendary.push(award);
       }else if(award.category=="Epica" && awardGame.premio_id == award.id){
         this.epic.push(award);
       }else if(award.category=="Rara" && awardGame.premio_id == award.id){
         this.rare.push(award);
       }else if(awardGame.premio_id == award.id){
         this.common.push(award);
       }
     })


   })

 }

  addProbabilityConfig(){
    if(this.form.valid && this.validateData()){
      const options = {
        title: 'CAMBIAR CONFIGURACION PROBABILIDADES JUEGO',
        message: '¿ESTÁ SEGURO QUE QUIERE CAMBIAR LA CONFIGURACION DE PROBABILIDADES?',
        cancelText: 'CANCELAR',
        confirmText: 'ACTUALIZAR'
      }
      // let user_register = localStorage.getItem('user_id');
      let body = {
        percent_win: this.form.get('percent_win')?.value,
        winners_limit: this.form.get('limit_winners')?.value,
        attempts_limit: this.form.get('limit_attempts')?.value,
        is_active: true,
        game_id: '1',
      }
      this.dialog.open(options);
      this.dialog.confirmed().subscribe(confirmed =>{
        if(confirmed){
          this.probability.postProbabilityConfig(body)
          .subscribe(res =>{
            console.log(res);
            this.snackBar.mensaje('Configuracion Cambiada con exito');
            this.limitWinners = body.winners_limit
            this.limitMessage = `Todavia no ha pasado el limite actual ${this.limitWinners}`
            this.percentage = body.percent_win;
            this.limitAttempts = body.attempts_limit

          })

        }

      })


    }else{
      this.snackBar.mensaje('Debe llenar todos los campos de probabilidad antes de poder guardar cambios');

    }
  }



  padreOpenModal(modalChange:any):void{
    this.isModalOpen=modalChange.isModalOpen;
    this.modalAwards = modalChange.awards;
    this.categoryModal = modalChange.category;
    this.publicityList = modalChange.publicity;
  }
  manageCloseModal(modalChange:boolean):void{
    this.isModalOpen = modalChange;
  }
  validateData():Boolean{
    let percent = this.form.get('percent_win')?.value
    let limit_winner = this.form.get('limit_winners')?.value
    let limit_attempts= this.form.get('limit_attempts')?.value

    if(percent>100){
      this.snackBar.mensaje('El porcentaje de ganar no puede ser mayor a 100');
      return false;

    }else if (percent<1){
      this.snackBar.mensaje('El porcentaje de ganar no puede ser menor a 1');
      return false;
    }

    if(limit_winner<1){
      this.snackBar.mensaje('El limite de ganadores no puede ser menor a 1');
      return false;
    }

    if(limit_attempts<1){
      this.snackBar.mensaje('El limite de Intentos no puede ser menor a 1');
      return false;
    }

    return true;

  }

}
