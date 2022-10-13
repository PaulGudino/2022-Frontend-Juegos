import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/componentes-compartidos/componentes-compartidos/confirm-dialog/confirm-dialog.component';
import { map, take } from 'rxjs/operators';


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
}
