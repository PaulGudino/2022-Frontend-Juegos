import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/componentes-compartidos/componentes-compartidos/confirm-dialog/confirm-dialog.component';
import { map, take } from 'rxjs/operators';
import { MensajesErrorComponent } from 'src/app/componentes/dashboard/mensajes-error/mensajes-error.component';


@Injectable({
  providedIn: 'root'
})
export class ConfirmDialogService {

  constructor(
    private dialog: MatDialog
  ) { }

  dialogRef!: MatDialogRef<ConfirmDialogComponent>;

  public open(options: any) {
    this.dialogRef = this.dialog.open(ConfirmDialogComponent, {    
      data: {
        title: options.title,
        message: options.message,
        cancelText: options.cancelText,
        confirmText: options.confirmText
      }
 });  
  }  
  public confirmed(): Observable<any> {
    return this.dialogRef.afterClosed().pipe(take(1), map(res => {
      return res;
    }
    ));
  }

  public error(mensaje: string[]){

    let mensaje_error_lista: string[] = [];

    for(let message in mensaje){
      mensaje_error_lista.push(mensaje[message])
    }

    const dialogref = this.dialog.open(MensajesErrorComponent,{
      data: mensaje_error_lista
    });
  }
}
