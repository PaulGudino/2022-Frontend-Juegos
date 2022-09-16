import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA,MatDialog } from '@angular/material/dialog';
import { ApiService } from '../../../../servicios/usuarios/api.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UsuariosEditar } from 'src/app/interfaces/usuarios/usuarioeditar';
import { MensajesErrorComponent } from '../../mensajes-error/mensajes-error.component';

@Component({
  selector: 'app-confirmacion-editar',
  templateUrl: './confirmacion-editar.component.html',
  styleUrls: ['./confirmacion-editar.component.css']
})
export class ConfirmacionEditarComponent implements OnInit {

  mensaje_error_lista: string[]=[];

  constructor(
    private api: ApiService,
    private snackBar: MatSnackBar,
    private router: Router,
    public dialogRef: MatDialogRef<ConfirmacionEditarComponent>,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public usuario: UsuariosEditar
  ) { }

  ngOnInit(): void {
  }
  cerrar(){
    this.dialogRef.close();
  }
  
  regresarUsuarios(){
    this.router.navigate(['/dashboard/usuarios']);
  }

  exito(){
    this.snackBar.open('Usuario Actualizado Exitosamente', '', {
      duration: 2500,
      horizontalPosition: 'right',
      verticalPosition: 'bottom'
    })
  }

  editarUsuario(){
    this.api.putUsuario(this.usuario.id, this.usuario).subscribe({ 
      next: (res) => {
        this.cerrar();
        this.regresarUsuarios();
        this.exito();
      },
      error: (res)=>{
        for(let message in res.error){
          this.mensaje_error_lista.push(res.error[message][0])
        }
        this.cerrar()
        this.mensajes_errores(this.mensaje_error_lista)
        this.mensaje_error_lista=[]
      } 
    });
  }
  mensajes_errores(mensajes: string[]){
    const dialogref = this.dialog.open(MensajesErrorComponent,{
      width:'50%',
      data: mensajes
    });
  }
}
