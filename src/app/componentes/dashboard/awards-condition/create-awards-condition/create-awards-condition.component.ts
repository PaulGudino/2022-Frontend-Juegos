import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-awards-condition',
  templateUrl: './create-awards-condition.component.html',
  styleUrls: ['./create-awards-condition.component.css']
})
export class CreateAwardsConditionComponent implements OnInit {

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
  ) { 
    this.form = this.fb.group({
      arrivalTime:['', Validators.required],
    })
  }

  ngOnInit(): void {
  }
  create(){
    let hora = this.form.get('arrivalTime')?.value.hour;
    let minutos = this.form.get('arrivalTime')?.value.minute;
    alert("La hora seleccionada es: "+hora + ':' + minutos);
    console.log(this.form.value);
  }

}
