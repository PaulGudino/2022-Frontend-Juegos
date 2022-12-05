import { FormControl } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-input-email-form',
  templateUrl: './input-email-form.component.html',
  styleUrls: ['../Css-Compartido/form-compartido.css']
})
export class InputEmailFormComponent implements OnInit {

  @Input() titulo = "";
  @Input() control = new FormControl();

  constructor() { }

  ngOnInit(): void {
  }

}
