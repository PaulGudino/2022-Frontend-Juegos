import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-publicity',
  templateUrl: './publicity.component.html',
  styleUrls: ['./publicity.component.css']
})
export class PublicityComponent implements OnInit {

   @Input() urlPublicity: string = '../../../assets/publicity.png'

  constructor() { }

  ngOnInit(): void {
  }

}
