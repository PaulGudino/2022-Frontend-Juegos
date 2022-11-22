import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-banner-publicity',
  templateUrl: './banner-publicity.component.html',
  styleUrls: ['./banner-publicity.component.css']
})
export class BannerPublicityComponent implements OnInit {
   @Input() urlPublicity: string = '../../../assets/publicity.png'

  constructor() { }

  ngOnInit(): void {
  }

}
