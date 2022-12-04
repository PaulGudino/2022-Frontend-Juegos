import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
import { DashboardPublicityService } from 'src/app/servicios/publicity/dashboardPublicity/dashboard-publicity.service';
import { Publicity } from '../../../interfaces/publicity/publicity';

@Component({
   selector: 'app-publicity',
   templateUrl: './publicity.component.html',
   styleUrls: ['./publicity.component.css'],
})
export class PublicityComponent implements OnInit {
   @ViewChild('scrollContainer', { static: false })
   scrollContainer!: ElementRef;
   @Input() publicityList: Publicity[] = [];
   animationCount: number = 0;

   constructor(public publicity: DashboardPublicityService) {
      setInterval(() => {
         console.log('interval ' + this.animationCount);
         let width = this.animationCount * -100;
         this.scrollContainer.nativeElement.style.transform = `translateX(${width}%)`;
         this.scrollContainer.nativeElement.style.transition =
            'transform .3s easey 1s';

         if (this.animationCount == this.publicityList.length) {
            setTimeout(() => {
               this.scrollContainer.nativeElement.style.transform =
                  'translateX(0px)';
               this.scrollContainer.nativeElement.style.transition =
                  'transform 0s';

               this.animationCount = 0;
            });
         } else {
            this.animationCount++;
         }
      }, 3000);
   }

   ngOnInit(): void {
      console.log(this.publicity.getTopPublicityList());
   }
}
