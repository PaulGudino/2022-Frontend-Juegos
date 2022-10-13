import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AwardsService } from 'src/app/servicios/awards/awards.service';
import { ConfirmDialogService } from 'src/app/servicios/confirm-dialog/confirm-dialog.service';
import { SnackbarService } from 'src/app/servicios/snackbar/snackbar.service';

@Component({
  selector: 'app-edit-awards',
  templateUrl: './edit-awards.component.html',
  styleUrls: ['./edit-awards.component.css']
})
export class EditAwardsComponent implements OnInit {

  public previsulizacion: string = '';
  form: FormGroup;
  @ViewChild("takeInput", { static: false })
  InputVar!: ElementRef;
  fileToUpload!: File;
  mensaje_error_lista: string[] = [];
  
  Categorias = [
    {id: 'L', name: 'Legendaria'},
    {id: 'E', name: 'Epica'},
    {id: 'R', name: 'Rara'},
    {id: 'C', name: 'Común'},
    {id: 'P', name: 'Publicidad'},
  ]
  Juegos = [
    {id:'T', name: 'Traga Monedas'},
  ]
  
  constructor(
    private router: Router, 
    private fb: FormBuilder, 
    public dialog: MatDialog,
    private sanitizer: DomSanitizer,
    private awardSrv: AwardsService,
    private snackbar: SnackbarService,
    private dialogService: ConfirmDialogService
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      initial_stock: ['', Validators.required],
      is_active: ['', Validators.required],
      category: ['', Validators.required],
      juego: ['', Validators.required],
  })
   }

  ngOnInit(): void {
  }

}
