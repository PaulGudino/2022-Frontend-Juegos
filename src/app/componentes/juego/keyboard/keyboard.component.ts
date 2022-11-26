import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-keyboard',
  templateUrl: './keyboard.component.html',
  styleUrls: ['./keyboard.component.css']
})
export class KeyboardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  getButtonValue(event:Event){
   let btn = event.target as HTMLElement
   console.log(btn.textContent);

  }

}
