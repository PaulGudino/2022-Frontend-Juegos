import { Component, OnInit,Input } from '@angular/core';
import { DashboardPublicityService } from 'src/app/servicios/publicity/dashboardPublicity/dashboard-publicity.service';

@Component({
  selector: 'app-banner-publicity',
  templateUrl: './banner-publicity.component.html',
  styleUrls: ['./banner-publicity.component.css']
})
export class BannerPublicityComponent implements OnInit {

   @Input() isTop:boolean = true;

  constructor(
   public dashboardPublicityService:DashboardPublicityService
  ) {}

  ngOnInit(): void {

  }





}
