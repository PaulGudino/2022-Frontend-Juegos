import { SnackbarService } from './../../../../servicios/snackbar/snackbar.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { RolesService } from 'src/app/servicios/roles/roles.service';
import { MensajesErrorComponent } from '../../mensajes-error/mensajes-error.component';
import { Roles } from 'src/app/interfaces/roles/roles';

@Component({
  selector: 'app-roles-confirmar-editar',
  templateUrl: './roles-confirmar-editar.component.html',
  styleUrls: ['./roles-confirmar-editar.component.css']
})
export class RolesConfirmarEditarComponent implements OnInit {

  mensaje_error_lista: string[]=[];
  constructor(
    public dialogRef: MatDialogRef<RolesConfirmarEditarComponent>,
    public dialog: MatDialog,
    private router: Router,
    private snackbar: SnackbarService,
    private rol: RolesService,
    @Inject(MAT_DIALOG_DATA) public roles: Roles
  ) { }

  ngOnInit(): void {
  }
  cerrar(){
    this.dialogRef.close();
  }
  regresarRoles(){
    this.router.navigate(['/dashboard/roles']);
  }
  editarRol(){
    this.rol.putRol(this.roles.id,this.roles).subscribe({
      next: (res) => {
        this.cerrar();
        this.regresarRoles();
        this.snackbar.mensaje('Rol Actualizado Exitosamente')
      },
      error: (res) => {
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
