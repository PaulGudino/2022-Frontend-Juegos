import { FormControl } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';


@Component({
  selector: 'app-input-password-form',
  templateUrl: './input-password-form.component.html',
  styleUrls: ['../Css-Compartido/form-compartido.css']
})
export class InputPasswordFormComponent implements OnInit {

  @Input() inputId = "";
  @Input() titulo = "";
  @Input() control = new FormControl();
  ocultar = true;

  constructor() { }

  ngOnInit(): void {
  }

}
