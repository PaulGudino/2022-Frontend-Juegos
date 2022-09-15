import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-mensajes-error',
  templateUrl: './mensajes-error.component.html',
  styleUrls: ['./mensajes-error.component.css']
})
export class MensajesErrorComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<MensajesErrorComponent>,
    @Inject(MAT_DIALOG_DATA) public errores: string[]
  ) { }

  ngOnInit(): void {
  }
  cerrar(){
    this.dialogRef.close();
  }
  
}
