import { Component, OnInit } from '@angular/core';
import { getAwardList } from 'src/app/interfaces/awards/getAwardList';
import {AwardsService} from "../../../servicios/awards/awards.service";

@Component({
  selector: 'app-probabilidades',
  templateUrl: './probabilidades.component.html',
  styleUrls: ['./probabilidades.component.css']
})
export class ProbabilidadesComponent implements OnInit {
  isModalOpen:boolean=false;
  legendary:getAwardList[]=[];
  epic:getAwardList[]=[];
  rare:getAwardList[]=[];
  common:getAwardList[]=[];
  modalAwards:getAwardList[]=[];

  constructor(
    private awards:AwardsService
  ) { }

  ngOnInit(): void {
    this.awards.getAward()
    .subscribe(data => {
      console.log(data);
      this.getAwardsPerCategory(data);
    })
  }

  private getAwardsPerCategory(data:any):void{
    data.forEach((award:any) => {
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
  }
  manageCloseModal(modalChange:boolean):void{
    this.isModalOpen = modalChange;
  }

}
