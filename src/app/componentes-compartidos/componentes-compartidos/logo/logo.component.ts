import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.css']
})
export class LogoComponent implements OnInit {

   @Input() height:string ='15rem';
   @Input() isHome:boolean = true;
   @Input() isBackground:boolean = false;
   @Input() urlImage:string=''
  constructor() { }

  ngOnInit(): void {
  }

}
