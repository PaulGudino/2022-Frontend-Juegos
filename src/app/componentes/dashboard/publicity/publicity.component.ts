import { Component, OnInit } from '@angular/core';
import { PublicityService } from 'src/app/servicios/publicity/publicity.service';
import { ManagePublicityService } from 'src/app/servicios/publicity/manage-publicity.service';
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
   private managePublicityService: ManagePublicityService
  ) { }

  ngOnInit(): void {
   this.publicity.getPublicityList().subscribe(
      (data => {
         this.managePublicityService.loadData(data);
         this.top_publicity = this.managePublicityService.getTopPublicity();
         this.bottom_publicity = this.managePublicityService.getBottomPublicity();

      })
   )
  }

}
