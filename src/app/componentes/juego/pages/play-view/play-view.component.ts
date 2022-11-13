import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-play-view',
  templateUrl: './play-view.component.html',
  styleUrls: ['./play-view.component.css']
})
export class PlayViewComponent implements OnInit {
   informationText:string='A JUGAR!'
   availableSpin:number=2;
   informationTextGame:string=`Disponnible ${this.availableSpin} Giro mas`


  constructor() { }

  ngOnInit(): void {
  }

}
