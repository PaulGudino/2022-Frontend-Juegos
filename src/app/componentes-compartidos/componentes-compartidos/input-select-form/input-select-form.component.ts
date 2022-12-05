import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
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
  @Input() valor = "";
  @Input() contenido = "";
  @Input() isInList = false;

  filteredOptions!: Observable<any[]>;

  constructor() {
    
   }

  ngOnInit(): void {
    this.filteredOptions = this.control.valueChanges
      .pipe(
        startWith(''),
        map(value => {
          const content = typeof value === 'string' ? value : value[this.contenido];
          return content ? this._filter(content) : this.lista.slice();
        })
      );
  }

  private _filter(value: string): string[] {
    return this.lista.filter(item => item[this.contenido].toLowerCase().includes(value.toLowerCase()));
  }

  validateinput(): boolean {
    let input = this.control.value;
    if (input == null) {
      return false;
    }
    if (input == "") {
      return false;
    }
    for (let item of this.lista) {
      if (item[this.valor] == input) {
        this.isInList = true;
        return true;
      }
    }
    return false;
  }
  
}
