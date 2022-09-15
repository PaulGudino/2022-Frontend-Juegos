import { MensajesErrorComponent } from './../mensajes-error/mensajes-error.component';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { FormGroup } from '@angular/forms';
import { UsuariosCrear } from 'src/app/interfaces/usuariocrear';
import { ApiService } from './../../../../servicios/api.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-confirmacion-crear',
  templateUrl: './confirmacion-crear.component.html',
  styleUrls: ['./confirmacion-crear.component.css']
})
export class ConfirmacionCrearComponent implements OnInit {

  mensaje_error_lista: string[]=[];
  constructor(
    private api: ApiService,
    private snackBar: MatSnackBar,
    private router: Router,
    public dialogRef: MatDialogRef<ConfirmacionCrearComponent>,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public form: FormGroup
  ) {}

  ngOnInit(): void {
  }

  cerrar(){
    this.dialogRef.close();
  }

  regresarUsuarios(){
    this.router.navigate(['/dashboard/usuarios']);
  }

  exito(){
    this.snackBar.open('Usuario Creado Exitosamente', '', {
      duration: 2500,
      horizontalPosition: 'right',
      verticalPosition: 'bottom'
    })
  }
  crearUsuario(){
    const usuario: UsuariosCrear = {
      cedula: this.form.value.cedula,
      username: this.form.value.username,
      names: this.form.value.names,
      surnames: this.form.value.surnames,
      email: this.form.value.email,
      password: this.form.value.password,
      phone: this.form.value.phone,
      sex: this.form.value.sex,
      address: this.form.value.address,
      rol: this.form.value.rol,
      is_active: this.form.value.is_active
    }
    this.api.postUsuarios(usuario).subscribe({
      next: (res) => {
        console.log(res)
        this.cerrar()
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
    })
  }
  mensajes_errores(mensajes: string[]){
    const dialogref = this.dialog.open(MensajesErrorComponent,{
      width:'50%',
      data: mensajes
    });
  }
}
