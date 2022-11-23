import { Component, OnInit,Input } from '@angular/core';
import { DashboardPublicityService } from 'src/app/servicios/publicity/dashboardPublicity/dashboard-publicity.service';

@Component({
  selector: 'app-banner-publicity',
  templateUrl: './banner-publicity.component.html',
  styleUrls: ['./banner-publicity.component.css']
})
export class BannerPublicityComponent implements OnInit {
   urlPublicity: string = this.dashboardPublicityService.getTopPublicity()
   @Input() isTop:boolean = true;

  constructor(
   public dashboardPublicityService:DashboardPublicityService
  ) {
   console.log(this.urlPublicity)
  }

  ngOnInit(): void {
   // this.checkPublicity()
  }

  checkPublicity(): void {
   console.log('entra a check')
   if(this.isTop) {
      this.urlPublicity = this.dashboardPublicityService.getTopPublicity();
      console.log(this.urlPublicity)
   }else{
      this.urlPublicity = this.dashboardPublicityService.getBottomPublicity();
   }
  }



}
