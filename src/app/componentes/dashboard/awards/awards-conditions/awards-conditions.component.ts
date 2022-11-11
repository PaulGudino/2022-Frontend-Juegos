import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgZone, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { ThemePalette } from '@angular/material/core';

@Component({
  selector: 'app-awards-conditions',
  templateUrl: './awards-conditions.component.html',
  styleUrls: ['./awards-conditions.component.css']
})
export class AwardsConditionsComponent implements OnInit {

  @ViewChild('picker') picker : any;

  public date!: moment.Moment;
  public disabled = false;
  public showSpinners = true;
  public showSeconds = true;
  public touchUi = false;
  public enableMeridian = false;
  public minDate!: moment.Moment;
  public maxDate!: moment.Moment;
  public stepHour = 1;
  public stepMinute = 1;
  public stepSecond = 1;
  public color: ThemePalette = 'primary';


  public formGroup = new FormGroup({
    date: new FormControl(null, [Validators.required]),
    date2: new FormControl(null, [Validators.required])
  })
  public dateControl = new FormControl(new Date(2021,9,4,5,6,7));
  public dateControlMinMax = new FormControl(new Date());

  constructor() { }

  ngOnInit(): void {
    
  }
}
