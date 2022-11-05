import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-game-date',
  templateUrl: './game-date.component.html',
  styleUrls: ['./game-date.component.css']
})
export class GameDateComponent implements OnInit {

   selected:boolean = true;

   constructor() { }

   ngOnInit(): void {
   }

}
