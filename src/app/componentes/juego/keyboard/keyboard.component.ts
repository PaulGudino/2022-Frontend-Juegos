import { Component, OnInit } from '@angular/core';
import { KeyControllerService } from '../service/keyController/key-controller.service';

@Component({
  selector: 'app-keyboard',
  templateUrl: './keyboard.component.html',
  styleUrls: ['./keyboard.component.css']
})
export class KeyboardComponent implements OnInit {

  constructor(
   private KeyControllerService:KeyControllerService
  ) { }

  ngOnInit(): void {
  }

  getButtonValue(event:Event){
   let btn = event.target as HTMLElement
   if(btn.textContent)
      this.KeyControllerService.setCode(this.KeyControllerService.getCode()+btn.textContent)
      console.log(btn.textContent);

  }

}
