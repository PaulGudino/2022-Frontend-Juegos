import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DashboardPublicityService {
   top_publicity:string = '';
   bottom_publicity:string = '';

  constructor() { }

  getTopPublicity():string {
   return this.top_publicity;
  }

  getBottomPublicity():string {
   return this.bottom_publicity;
  }

  changeTopPublicity(publicity:string) {
   this.top_publicity = publicity;
  }

  changeBottomPublicity(publicity:string) {
   this.bottom_publicity = publicity;
  }

}
