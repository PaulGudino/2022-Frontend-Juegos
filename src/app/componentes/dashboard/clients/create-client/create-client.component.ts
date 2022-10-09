import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-client',
  templateUrl: './create-client.component.html',
  styleUrls: ['./create-client.component.css']
})
export class CreateClientComponent implements OnInit {

  formGroup : FormGroup;

  constructor(
    private formBuilder : FormBuilder,
  ) {
    // Building the form with the formBuilder
    this.formGroup = this.formBuilder.group({
      id : new FormControl('', [Validators.required]),
      names : new FormControl('', [Validators.required]),
      surnames : new FormControl('', [Validators.required]),
      email : new FormControl('', [Validators.required, Validators.email])
    });
  }

  ngOnInit(): void {
  }

}
