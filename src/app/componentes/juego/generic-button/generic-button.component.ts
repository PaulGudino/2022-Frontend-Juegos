import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-generic-button',
  templateUrl: './generic-button.component.html',
  styleUrls: ['./generic-button.component.css']
})
export class GenericButtonComponent implements OnInit {
  @Input() title: string="Empezar"
  @Input() fontSize: string ='1.6rem';
  @Input() styledPadding: string ='1rem 1.5rem';
  @Input() color: string ='white';
  @Input() color_background: string ='red';


  constructor() { }

  ngOnInit(): void {
  }

}
