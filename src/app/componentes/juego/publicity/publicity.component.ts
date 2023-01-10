import { Publicity } from './../../../interfaces/publicity/publicity';
import { PublicityService } from 'src/app/servicios/publicity/publicity.service';
import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';

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
   @Input() isTop: boolean = true;
   timeIntervalTop: number = 1000;
   timeIntervalBottom: number = 1000;

   constructor(private publicity: PublicityService) {}

   ngOnInit(): void {
      this.publicity.getPublicityConfigTop().subscribe((data) => {
         this.timeIntervalTop = data.time_display * 1000;
         this.publicity.getPublicityConfigBottom().subscribe((data) => {
            this.timeIntervalBottom = data.time_display * 1000;
            this.isTop
               ? this.createInterval(this.timeIntervalTop)
               : this.createInterval(this.timeIntervalBottom);
         });
      });
   }

   createInterval(timeInterval: number) {
      let intervalId: any;
      intervalId = setInterval(() => {
         // console.log('interval ' + timeInterval);
         // console.log('intervalId ' + intervalId);
         let width = this.animationCount * -100;
         this.scrollContainer.nativeElement.style.transform = `translateX(${width}%)`;
         this.scrollContainer.nativeElement.style.transition =
            'transform .3s cubic-bezier(0.61, 1, 0.88, 1)';

         if (this.animationCount == this.publicityList.length) {
            setTimeout(() => {
               this.scrollContainer.nativeElement.style.transform =
                  'translateX(0px)';
               this.scrollContainer.nativeElement.style.transition =
                  'transform 0.3s';

               this.animationCount = 0;
            });
         } else {
            if (this.animationCount < this.publicityList.length)
               this.animationCount++;
         }
      }, timeInterval);
   }
}
