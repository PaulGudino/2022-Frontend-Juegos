import { Injectable } from '@angular/core';
import { Publicity } from 'src/app/interfaces/publicity/publicity';

@Injectable({
   providedIn: 'root',
})
export class DashboardPublicityService {
   topPublicityList: Publicity[] = [];
   bottomPublicityList: Publicity[] = [];
   secondsShowPublicity: number = 3;
   topImageFileToUpload!: File;
   bottomImageFileToUpload!: File;
   previewTopImage: string = '';
   previewBottomImage: string = '';

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

   getTopImageFileToUpload() {
      return this.topImageFileToUpload;
   }

   getBottomImageFileToUpload() {
      return this.bottomImageFileToUpload;
   }
   setTopImageFileToUpload(file: any) {
      this.topImageFileToUpload = file;
   }

   setBottomImageFileToUpload(file: any) {
      this.bottomImageFileToUpload = file;
   }
   setPreviewTopImage(url: string) {
      this.previewTopImage = url;
   }
   setPreviewBottomImage(url: string) {
      this.previewBottomImage = url;
   }
}
