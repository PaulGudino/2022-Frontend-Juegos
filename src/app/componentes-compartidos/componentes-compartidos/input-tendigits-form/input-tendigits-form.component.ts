import { FormControl } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-input-tendigits-form',
  templateUrl: './input-tendigits-form.component.html',
  styleUrls: ['../Css-Compartido/form-compartido.css']
})
export class InputTendigitsFormComponent implements OnInit {

  @Input() titulo = "";
  @Input() control = new FormControl();

  constructor() { }

  ngOnInit(): void {
  }

}
