import { FormControl } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-input-text-form',
  templateUrl: './input-text-form.component.html',
  styleUrls: ['../Css-Compartido/form-compartido.css']
})
export class InputTextFormComponent implements OnInit {

  @Input() titulo = "";
  @Input() control = new FormControl();

  constructor() { }

  ngOnInit(): void {
  }

}
