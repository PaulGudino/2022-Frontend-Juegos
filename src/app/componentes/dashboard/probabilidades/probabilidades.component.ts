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
  awardsList:getAwardList[]=[];

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
  limitWinners:number=5;
  limitMessage:string=`Todavia no ha pasado el limite actual ${this.limitWinners}`

  constructor(
    private awards:AwardsService,
    private controller:ControllerProbabilityService,
    private probability:ProbabilityService,
    private fb:FormBuilder,
    private dialog:ConfirmDialogService,
    private snackBar:SnackbarService
  ) {
    this.form = this.fb.group({
      percent_win:[''],
      limit_winners:[''],

    })

   }

  ngOnInit(){
    this.awards.getAward()
    .subscribe(data => {
      this.probability.getAwardsListGame().subscribe(
        awardGameData =>{
          this.getAwardsPerCategory(data,awardGameData)

        }
      )
    })
    // this.asyncFunctionAwards();
    // this.asyncFunctionAwardsGame();

    // this.probability.getAwardsListGame()
    // .subscribe(data => {
    //   this.awardsGame = data
    // })
    this.probability.getProbabilites()
    .subscribe(data =>{
      this.probabilityData = data[data.length-1]
      this.limitWinners = this.probabilityData.winners_limit
      this.limitMessage = `Todavia no ha pasado el limite actual ${this.limitWinners}`

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

  // asyncFunctionAwards = async () => {
  //   this.awards.getAward().subscribe((data => {
  //     this.awardsList = data;

  //   }))

  // }
  // asyncFunctionAwardsGame = async () => {
  //   this.probability.getAwardsListGame()
  //     .subscribe(data => {
  //       this.awardsGame = data;
  //       this.getAwardsPerCategory(data);
  //     })

  // }

  addProbabilityConfig(){
    if(this.form.valid){
      const options = {
        title: 'CAMBIAR CONFIGURACION PROBABILIDADES JUEGO',
        message: '¿ESTÁ SEGURO QUE QUIERE CAMBIAR LA CONFIGURACION DE PROBABILIDADES?',
        cancelText: 'CANCELAR',
        confirmText: 'CREAR'
      }
      let body = {
        porcent_win: this.form.get('percent_win')?.value,
        winners_limit: this.form.get('limit_winners')?.value,
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

          })

        }

      })


    }

    //formData.append('',this.form.get('percent_win')?.value);
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

}
