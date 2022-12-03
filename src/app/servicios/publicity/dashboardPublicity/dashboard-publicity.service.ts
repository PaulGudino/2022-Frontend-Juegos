import { Injectable } from '@angular/core';
import { Publicity } from 'src/app/interfaces/publicity/publicity';

@Injectable({
   providedIn: 'root',
})
export class DashboardPublicityService {
   topPublicityList: Publicity[] = [];
   bottomPublicityList: Publicity[] = [];
   secondsShowPublicity: number = 3;
   topImageFile: any;
   bottomImageFile: any;

   constructor() {}

   loadTopData(dataTop: Publicity[]): void {
      this.topPublicityList = dataTop;
   }

   loadBottomData(dataBottom: Publicity[]): void {
      this.bottomPublicityList = dataBottom;
   }

   getTopPublicityList(): Publicity[] {
      return this.topPublicityList;
   }
   getBottomPublicityList(): Publicity[] {
      return this.bottomPublicityList;
   }

   getTopImageFile() {
      return this.topImageFile;
   }

   getBottomImageFile() {
      return this.bottomImageFile;
   }
   setTopImageFile(file: any) {
      this.topImageFile = file;
   }

   setBottomImageFile(file: any) {
      this.bottomImageFile = file;
   }
}
