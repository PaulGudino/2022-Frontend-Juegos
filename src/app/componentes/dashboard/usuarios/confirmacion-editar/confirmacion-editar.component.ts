import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from './../../../../servicios/api.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UsuariosEditar } from 'src/app/interfaces/usuarioeditar';

@Component({
  selector: 'app-confirmacion-editar',
  templateUrl: './confirmacion-editar.component.html',
  styleUrls: ['./confirmacion-editar.component.css']
})
export class ConfirmacionEditarComponent implements OnInit {

  constructor(
    private api: ApiService,
    private snackBar: MatSnackBar,
    private router: Router,
    public dialogRef: MatDialogRef<ConfirmacionEditarComponent>,
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
    this.api.putUsuario(this.usuario.id, this.usuario).subscribe((data) => {  
      this.cerrar();
      this.regresarUsuarios();
      this.exito();
    });
  }

}
