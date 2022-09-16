import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from '../../../../servicios/usuarios/api.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UsuariosEditar } from 'src/app/interfaces/usuarios/usuarioeditar';


@Component({
  selector: 'app-confirmacion-eliminar',
  templateUrl: './confirmacion-eliminar.component.html',
  styleUrls: ['./confirmacion-eliminar.component.css']
})
export class ConfirmacionEliminarComponent implements OnInit {

  constructor(
    private api: ApiService,
    private snackBar: MatSnackBar,
    private router: Router,
    public dialogRef: MatDialogRef<ConfirmacionEliminarComponent>,
    @Inject(MAT_DIALOG_DATA) public id: number
  ) { }

  ngOnInit(): void {
  }
  cerrar(){
    this.dialogRef.close();
  }
  exito(){
    this.snackBar.open('Usuario Eliminado Exitosamente', '', {
      duration: 2500,
      horizontalPosition: 'right',
      verticalPosition: 'bottom'
    })
  }
  eliminarUsuario(){
    this.api.deleteUsuario(this.id).subscribe((data) => {
      this.cerrar();
      this.exito();
      this.router.navigate(['/dashboard/usuarios']);
    });
  }
}
