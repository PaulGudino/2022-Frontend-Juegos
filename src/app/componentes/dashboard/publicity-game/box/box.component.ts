import { Component, OnInit, Input } from '@angular/core';

@Component({
   selector: 'app-box',
   templateUrl: './box.component.html',
   styleUrls: ['./box.component.css'],
})
export class BoxComponent implements OnInit {
   @Input() number: string = '0';
   title: string = `Casilla ${this.number}`;
   constructor() {}

   ngOnInit(): void {}
}
