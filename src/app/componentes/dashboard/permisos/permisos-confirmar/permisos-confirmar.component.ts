import { PermisosGuardaar } from './../../../../interfaces/permisos/permisosGuardar';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { PermisosService } from 'src/app/servicios/permisos/permisos.service';
import { SnackbarService } from 'src/app/servicios/snackbar/snackbar.service';
import { RolesConfirmarCrearComponent } from '../../roles/roles-confirmar-crear/roles-confirmar-crear.component';

@Component({
  selector: 'app-permisos-confirmar',
  templateUrl: './permisos-confirmar.component.html',
  styleUrls: ['./permisos-confirmar.component.css']
})
export class PermisosConfirmarComponent implements OnInit {

  constructor(
    private router: Router,
    private snackbar: SnackbarService,
    public dialogRef: MatDialogRef<RolesConfirmarCrearComponent>,
    public dialog: MatDialog,
    private permiso_service: PermisosService,
    private activerouter: ActivatedRoute, 
    @Inject(MAT_DIALOG_DATA) public permisos_actualizados: PermisosGuardaar
  ) { }

  ngOnInit(): void {
  }
  cerrar(){
    this.dialogRef.close();
  }
  eliminarPermisos(){
    let permisoseliminar = this.permisos_actualizados.permission_viejos;
    if(permisoseliminar.length > 0){
      for( let i = 0; i < permisoseliminar.length; i++){
        this.permiso_service.deletePermissionRol(Number(permisoseliminar[i])).subscribe(
          (data) => {
            console.log(data);
          });
      }
    }
  }

  guardarPermisos(){
    this.eliminarPermisos();
    let permisosnuevos = this.permisos_actualizados.permission_nuevos;
    let rol_id = this.permisos_actualizados.rol;
    if(permisosnuevos.length > 0){
      for( let i = 0; i < permisosnuevos.length; i++){   
        let p = Number(permisosnuevos[i]);
        this.permiso_service.postPermisosbyRol({rol: rol_id, permission: p}).subscribe(
          (data) => {
            console.log('Permisos actualizados correctamente');
          });
      }
      this.snackbar.mensaje('Permisos actualizados correctamente');
      this.cerrar();
      this.router.navigate(['/dashboard/roles']);
    }else{
      this.snackbar.mensaje('Este rol no tiene permisos');
      this.cerrar();
      this.router.navigate(['/dashboard/roles']);
    }
  }
}
