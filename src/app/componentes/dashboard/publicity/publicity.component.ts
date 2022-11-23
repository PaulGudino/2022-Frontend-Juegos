import { Component, OnInit } from '@angular/core';
import { PublicityService } from 'src/app/servicios/publicity/publicity.service';
import {DashboardPublicityService} from '../../../servicios/publicity/dashboardPublicity/dashboard-publicity.service'
import { Publicity } from 'src/app/interfaces/publicity/publicity';

@Component({
  selector: 'app-publicity',
  templateUrl: './publicity.component.html',
  styleUrls: ['./publicity.component.css']
})
export class PublicityComponent implements OnInit {
   top_publicity:string ='';
   bottom_publicity:string ='';


  constructor(
   private publicity: PublicityService,
   private dashboardPublicityService: DashboardPublicityService
  ) { }

  ngOnInit(): void {
   this.publicity.getPublicityList().subscribe(
      (data => {
         console.log(data[0])
         this.dashboardPublicityService.changeTopPublicity(data[0].image)
         this.dashboardPublicityService.changeBottomPublicity(data[1].image)
         this.top_publicity = this.dashboardPublicityService.getTopPublicity()
         this.bottom_publicity = this.dashboardPublicityService.getBottomPublicity();
      })
   )
  }

  changePublicity(publicity: string) {


  }

}
