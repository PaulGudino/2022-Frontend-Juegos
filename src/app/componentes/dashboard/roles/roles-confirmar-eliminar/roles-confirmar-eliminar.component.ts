import { RolesService } from 'src/app/servicios/roles/roles.service';
import { UsuariosFiltradobyRol } from './../../../../interfaces/usuarios/usuariofilterbyRol';
import { SnackbarService } from './../../../../servicios/snackbar/snackbar.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/servicios/usuarios/api.service';
import { MensajesErrorComponent } from '../../mensajes-error/mensajes-error.component';

@Component({
  selector: 'app-roles-confirmar-eliminar',
  templateUrl: './roles-confirmar-eliminar.component.html',
  styleUrls: ['./roles-confirmar-eliminar.component.css']
})
export class RolesConfirmarEliminarComponent implements OnInit {

  UsuariosconRol: UsuariosFiltradobyRol[] = [];
  Mensaje: string[] = [];

  constructor(
    private router: Router,
    public dialogRef: MatDialogRef<RolesConfirmarEliminarComponent>,
    private rol_api: RolesService,
    private api: ApiService,
    @Inject(MAT_DIALOG_DATA) public id: number,
    public dialog: MatDialog,
    private snackbar: SnackbarService
  ) { }

  ngOnInit(): void {
  }
  cerrar(){
    this.dialogRef.close();
  }
  eliminar(){
    this.api.getfilteUsuariobyRol(this.id).subscribe((data) => {
      this.UsuariosconRol = data;
      if(this.UsuariosconRol.length > 0){
        this.Mensaje.push('No se puede eliminar el rol, hay usuarios con este rol')
        this.mensajes_errores(this.Mensaje)
        this.Mensaje = []
      }else{
        this.rol_api.deleteRol(this.id).subscribe({
          next: (res) => {
            this.cerrar();
            this.snackbar.mensaje('Rol Eliminado Exitosamente')
            this.router.navigate(['/dashboard/roles']);
          }
        });
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
