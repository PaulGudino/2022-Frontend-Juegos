import { RolesCrear } from './../../../../interfaces/roles/rolescrear';
import { SnackbarService } from './../../../../servicios/snackbar/snackbar.service';
import { RolesService } from './../../../../servicios/roles/roles.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MensajesErrorComponent } from '../../mensajes-error/mensajes-error.component';

@Component({
  selector: 'app-roles-confirmar-crear',
  templateUrl: './roles-confirmar-crear.component.html',
  styleUrls: ['./roles-confirmar-crear.component.css']
})
export class RolesConfirmarCrearComponent implements OnInit {

  mensaje_error_lista: string[]=[];

  constructor(
    private rol_service: RolesService,
    private router: Router,
    private snackbar: SnackbarService,
    public dialogRef: MatDialogRef<RolesConfirmarCrearComponent>,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public form: FormGroup
  ) { }

  ngOnInit(): void {
  }
  cerrar(){
    this.dialogRef.close();
  }
  regresarRoles(){
    this.router.navigate(['/dashboard/roles']);
  }
  crearRol(){
    const rol: RolesCrear = {
      name: this.form.value.name,
      description: this.form.value.description,
      is_active: this.form.value.is_active
    }
    this.rol_service.postRoles(rol).subscribe({
      next: (res) => {
        this.cerrar();
        this.snackbar.mensaje('Rol Creado Exitosamente');
        this.regresarRoles();
        console.log(res);
      },
      error: (res) => {
        for(let message in res.error){
          this.mensaje_error_lista.push(res.error[message][0])
        }
        this.cerrar()
        this.mensajes_errores(this.mensaje_error_lista)
        this.mensaje_error_lista=[]
      }
    })
  }
  mensajes_errores(mensajes: string[]){
    const dialogref = this.dialog.open(MensajesErrorComponent,{
      width:'50%',
      data: mensajes
    });
  }
}
