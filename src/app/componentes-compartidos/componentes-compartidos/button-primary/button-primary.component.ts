import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-button-primary',
  templateUrl: './button-primary.component.html',
  styleUrls: ['./button-primary.component.css']
})
export class ButtonPrimaryComponent implements OnInit {
   @Input() title: string=''
   @Input() backgroundColor: string='#00ffc5'

   constructor() { }

   ngOnInit(): void {
   }

}
