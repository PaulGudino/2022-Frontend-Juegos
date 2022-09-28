import { SnackbarService } from './../../../../../servicios/snackbar/snackbar.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CambiarContraseña } from 'src/app/interfaces/usuarios/cambiarContraseña';
import { ApiService } from 'src/app/servicios/usuarios/api.service';
import { MensajesErrorComponent } from '../../../mensajes-error/mensajes-error.component';

@Component({
  selector: 'app-confirmar-cambiar-contrasenia',
  templateUrl: './confirmar-cambiar-contrasenia.component.html',
  styleUrls: ['./confirmar-cambiar-contrasenia.component.css']
})
export class ConfirmarCambiarContraseniaComponent implements OnInit {

  mensaje_error_lista: string[]=[];

  constructor(
    private api: ApiService,
    private snackBar: SnackbarService,
    private router: Router,
    public dialogRef: MatDialogRef<ConfirmarCambiarContraseniaComponent>,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public cambio : CambiarContraseña
  ) { }

  ngOnInit(): void {
  }
  cerrar(){
    this.dialogRef.close();
  }
  cambiarContrasenia(){
    let id_usuario = Number(localStorage.getItem('user_id'));
    this.api.postCambiarContraseña(id_usuario, this.cambio).subscribe(
      res => {
        this.snackBar.mensaje('Contraseña cambiada correctamente');
        this.router.navigate(['/dashboard']);
      },
      err => {
        for(let message in err.error){
          this.mensaje_error_lista.push(err.error[message])
        }
        this.mensajes_errores(this.mensaje_error_lista)
        this.mensaje_error_lista=[];
      }
    )
  }
  mensajes_errores(mensajes: string[]){
    const dialogref = this.dialog.open(MensajesErrorComponent,{
      width:'50%',
      data: mensajes
    });
  }
}
