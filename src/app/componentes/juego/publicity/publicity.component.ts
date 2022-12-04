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
            'transform .3s cubic-bezier(0.61, 1, 0.88, 1)';

         if (this.animationCount == this.publicityList.length) {
            setTimeout(() => {
               this.scrollContainer.nativeElement.style.transform =
                  'translateX(0px)';
               this.scrollContainer.nativeElement.style.transition =
                  'transform 0s';

               this.animationCount = 0;
            });
         } else {
            if (this.animationCount < this.publicityList.length)
               this.animationCount++;
         }
      }, 4000);
   }

   ngOnInit(): void {
      console.log(this.publicity.getTopPublicityList());
   }
}
