import { Component, OnInit, Input } from '@angular/core';
import { DashboardPublicityService } from 'src/app/servicios/publicity/dashboardPublicity/dashboard-publicity.service';
import { Publicity } from '../../../interfaces/publicity/publicity';

@Component({
   selector: 'app-publicity',
   templateUrl: './publicity.component.html',
   styleUrls: ['./publicity.component.css'],
})
export class PublicityComponent implements OnInit {
   @Input() publicityList: Publicity[] = [];

   constructor(public publicity: DashboardPublicityService) {}

   ngOnInit(): void {
      console.log(this.publicity.getTopPublicityList());
   }
}
