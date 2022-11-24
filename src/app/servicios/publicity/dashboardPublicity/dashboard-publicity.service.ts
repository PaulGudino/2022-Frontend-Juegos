import { Injectable } from '@angular/core';
import { Publicity } from 'src/app/interfaces/publicity/publicity';


@Injectable({
  providedIn: 'root'
})
export class DashboardPublicityService {
   top_publicity:string = '';
   bottom_publicity:string = '';
   publicityList:Publicity[]=[]
   topImageFile:any;
   bottomImageFile:any;

  constructor() { }

  loadData(data:Publicity[]){
   this.publicityList = data

  }
  getTopPublicity():Publicity{
   return this.publicityList[0];
  }
  getBottomPublicity():Publicity{
   return this.publicityList[1];
  }

  getTopPublicityImage():string {
   return this.top_publicity;
  }

  getBottomPublicityImage():string {
   return this.bottom_publicity;
  }

  changeTopPublicityImage(publicity:string) {
   this.top_publicity = publicity;
  }

  changeBottomPublicityImage(publicity:string) {
   this.bottom_publicity = publicity;
  }

  getTopImageFile(){
   return this.topImageFile;
  }

  getBottomImageFile(){
   return this.bottomImageFile;
  }
  setTopImageFile(file:any){
   this.topImageFile = file;
  }

  setBottomImageFile(file:any){
   this.bottomImageFile = file;
  }

}
