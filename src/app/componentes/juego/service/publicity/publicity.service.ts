import { Injectable } from '@angular/core';
import {Publicity} from '../../../../interfaces/publicity/publicity'



@Injectable({
  providedIn: 'root'
})
export class PublicityService {
   listPublicity: Publicity[]=[];
   top_publicity:string = '';
   bottom_publicity:string = '';

  constructor(

  ) {

  }

  loadData(listPublicity:Publicity[]){
   this.listPublicity = listPublicity;
   this.top_publicity = this.listPublicity[0].image;
   this.bottom_publicity = this.listPublicity[1].image;

  }

  getTopPublicity():string{
   return this.top_publicity;
  }

  getBottomPublicity():string{
   return this.bottom_publicity;
  }
}
