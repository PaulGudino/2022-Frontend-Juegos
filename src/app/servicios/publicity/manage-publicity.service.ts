import { Injectable } from '@angular/core';
import { Publicity } from 'src/app/interfaces/publicity/publicity';


@Injectable({
  providedIn: 'root'
})
export class ManagePublicityService {
   publicityList:Publicity[]=[]



  constructor(


  ) { }

  loadData(data:Publicity[]){
   this.publicityList = data

  }
  getTopPublicity():string{
   return this.publicityList[0].image;
  }
  getBottomPublicity():string{
   return this.publicityList[1].image;
  }
}
