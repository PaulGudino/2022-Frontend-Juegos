import { FormControl } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-input-select-form',
  templateUrl: './input-select-form.component.html',
  styleUrls: ['../Css-Compartido/form-compartido.css']
})
export class InputSelectFormComponent implements OnInit {

  @Input() titulo = "";
  @Input() control = new FormControl();
  @Input() lista: any[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
