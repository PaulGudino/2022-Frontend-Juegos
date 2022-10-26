import { Component, OnInit } from '@angular/core';
import { getAwardList } from 'src/app/interfaces/awards/getAwardList';
import {AwardsService} from "../../../servicios/awards/awards.service";
import { ControllerProbabilityService } from 'src/app/servicios/probability/controllerProbability/controller-probability.service';
import { ProbabilityService } from 'src/app/servicios/probability/probability/probability.service';

@Component({
  selector: 'app-probabilidades',
  templateUrl: './probabilidades.component.html',
  styleUrls: ['./probabilidades.component.css']
})
export class ProbabilidadesComponent implements OnInit {
  isModalOpen:boolean=false;
  awardsList:getAwardList[]=[];
  legendary:getAwardList[]=[];
  epic:getAwardList[]=[];
  rare:getAwardList[]=[];
  common:getAwardList[]=[];
  modalAwards:getAwardList[]=[];
  categoryModal:string='';

  totalSquares:number=0;
  limitWinners:number=5;
  limitMessage:string=`Todavia no ha pasado el limite actual ${this.limitWinners}`

  constructor(
    private awards:AwardsService,
    private controller:ControllerProbabilityService,
    private probability:ProbabilityService,
  ) {

   }

  ngOnInit(){
    this.awards.getAward()
    .subscribe(data => {
      console.log(data);
      this.getAwardsPerCategory(data);

    })

  }

  private getAwardsPerCategory(data:getAwardList[]):void{
    debugger;
    data.forEach((award:getAwardList) => {
      if(award.category=="Legendaria"){
        this.legendary.push(award);
      }else if(award.category=="Epica"){
        this.epic.push(award);
      }else if(award.category=="Rara"){
        this.rare.push(award);
      }else{
        this.common.push(award);
      }
    })

  }

  padreOpenModal(modalChange:any):void{
    this.isModalOpen=modalChange.isModalOpen;
    this.modalAwards = modalChange.awards;
    this.categoryModal = modalChange.category;
  }
  manageCloseModal(modalChange:boolean):void{
    this.isModalOpen = modalChange;
  }

}
