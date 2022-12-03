import { Component, OnInit, Input } from '@angular/core';
import { Publicity } from 'src/app/interfaces/publicity/publicity';

@Component({
   selector: 'app-banner-publicity',
   templateUrl: './banner-publicity.component.html',
   styleUrls: ['./banner-publicity.component.css'],
})
export class BannerPublicityComponent implements OnInit {
   @Input() isTop: boolean = true;
   @Input() publicityList: Publicity[] = [];

   constructor() {}

   ngOnInit(): void {}
}
